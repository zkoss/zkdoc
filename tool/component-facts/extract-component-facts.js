#!/usr/bin/env node

/**
 * extract-component-facts.js  —  Stage 1 of the ZK Component Reference enrichment plan
 * (tasks/zk-component-ref-enrichment-plan.md).
 *
 * Deterministic, near-zero-cost fact extractor. NO LLM. For each ZK UI component it
 * emits the machine-readable truth pulled straight from the ZK 10.x source:
 *
 *   - component-class / widget-class / text-as / molds[]   (from the lang.xml registry)
 *   - own properties     (public set/get/is methods + first javadoc sentence, from the Java class)
 *   - inherited properties (walk `extends` up the chain, flagged with their source class)
 *   - events             (best-effort: addClientEvent(<Class>.class, Events.ON_*, ...))
 *   - Java + JavaScript javadoc URLs
 *   - provenance         (per fact: how it was resolved through the Graphify graph)
 *
 * GRAPHIFY-FIRST RESOLUTION (see the MANDATE in the plan)
 *   Every "which file does this class live in / what does it extend" lookup is resolved
 *   against the machine-wide Graphify knowledge graph at ~/.graphify/global-graph.json
 *   — NOT by blindly globbing the source tree. We query the graph artifact directly
 *   (by source_file) rather than via `graphify explain "<FQN>"`, because the CLI's
 *   `explain` matches only by short label and collides (e.g. "Button" resolves to the
 *   zhtml Button, not org.zkoss.zul.Button). Reading the graph JSON IS using the Graphify
 *   knowledge graph, and it yields both the file path and the declaration line.
 *
 *   Each emitted fact records a `provenance` object:
 *     { graphify: "<replayable jq query against global-graph.json>",
 *       resolved: "<module-relative source path>:<line>",
 *       line: <n>, node: "<graph node id>" }
 *   A fact with no provenance.graphify is invalid; downstream Stage 3 refuses to apply it.
 *
 * Usage:
 *   node --max-old-space-size=4096 extract-component-facts.js [options]
 *
 * Options:
 *   --all                 Extract every component found in the lang.xml registry
 *   --component <name>    Extract a single component by its ZUL element name
 *   --graph <path>        Path to global-graph.json (default ~/.graphify/global-graph.json)
 *   --out <path>          Output JSON (default tool/component-facts/component-facts.json)
 *   --progress            Also (re)seed tasks/component-gaps/_progress.md with Facts=done
 *   --help
 *
 * Default scope (no --all/--component): the 15-component pilot from the plan.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ZK_ROOTS = [
  '/Users/hawk/Documents/workspace/ZK10/zk',
  '/Users/hawk/Documents/workspace/ZK10/zkcml',
];

// lang.xml / lang-addon.xml files to scan (src/main/resources only — skip bin/build/debug/target dupes).
const LANG_FILES = [
  'zk/zul/src/main/resources/metainfo/zk/lang.xml',
  'zk/zhtml/src/main/resources/metainfo/zk/lang.xml',
  'zk/zkbind/src/main/resources/metainfo/zk/lang-addon.xml',
  'zk/zkplus/src/main/resources/metainfo/zk/lang-addon.xml',
  'zkcml/zml/src/main/resources/metainfo/zk/lang.xml',
  'zkcml/stateless/src/main/resources/metainfo/zk/lang.xml',
  'zkcml/zkmax/src/main/resources/metainfo/zk/lang-addon.xml',
  'zkcml/zkex/src/main/resources/metainfo/zk/lang-addon.xml',
  'zkcml/za11y/src/main/resources/metainfo/zk/lang-addon.xml',
  'zkcml/zuti/src/main/resources/metainfo/zk/lang-addon.xml',
  'zkcml/client-bind/src/main/resources/metainfo/zk/lang-addon.xml',
].map((rel) => path.join('/Users/hawk/Documents/workspace/ZK10', rel));

// Out-of-graph ADDON components (Google Maps, Charts, Pivottable, Calendars). These live
// in separate addon projects that are NOT indexed in the Graphify graph, so their classes
// are resolved by globbing these source roots instead (resolveClass falls back here). Their
// ancestors (XulElement, HtmlBasedComponent, …) ARE in ZK10/graph, so the inheritance walk
// still resolves inherited props to their core base-class pages (CR-L5). Provenance for an
// addon class is a replayable `grep` against the real source file (no graph node exists).
const ADDON_DIR = '/Users/hawk/Documents/workspace/ADDON';
const ADDON_ROOTS = [
  path.join(ADDON_DIR, 'zkgmapsz/gmapsz/src/main/java'),
  path.join(ADDON_DIR, 'charts/src/main/java'),
  path.join(ADDON_DIR, 'zkcalendar/calendar/src/main/java'),
  path.join(ADDON_DIR, 'pivottable/pivottable/src'),
];
const ADDON_LANG_FILES = [
  path.join(ADDON_DIR, 'zkgmapsz/gmapsz/src/main/resources/metainfo/zk/lang-addon.xml'),
  path.join(ADDON_DIR, 'charts/src/main/resources/metainfo/zk/lang-addon.xml'),
  path.join(ADDON_DIR, 'zkcalendar/calendar/src/main/resources/metainfo/zk/lang-addon.xml'),
  path.join(ADDON_DIR, 'pivottable/pivottable/src/archive/metainfo/zk/lang-addon.xml'),
];

const PILOT = [
  'button', 'listbox', 'combobox', 'window', 'drawer', 'grid', 'tabbox', 'label',
  'menupopup', 'datebox', 'tree', 'chart', 'borderlayout', 'fileupload', 'captcha',
];

// Stop walking `extends` at these framework-generic roots — their members are not
// component-documentable (id, widgetAttributes, …). NOTE HtmlBasedComponent and XulElement
// are deliberately NOT here: they have doc pages and are the home of real properties
// (e.g. zclass), so we must parse them to resolve setter-declaring classes (CR-L5).
const HARD_STOP = new Set([
  'Object', 'AbstractComponent', 'Component',
  'HtmlShadowElement', 'ShadowElement', 'AbstractTag', 'GenericComponent',
]);
const MAX_INHERIT_DEPTH = 8;

// Abstract/impl ancestor classes that have a zk_component_ref doc page but NO lang.xml
// entry. The `--base` flag (and FQN-seeded extraction) treats them as first-class
// components so their pages host the properties they declare (CR-L5, revised).
const BASE_CLASSES = {
  htmlbasedcomponent: 'org.zkoss.zk.ui.HtmlBasedComponent',
  xulelement: 'org.zkoss.zul.impl.XulElement',
  labelelement: 'org.zkoss.zul.impl.LabelElement',
  labelimageelement: 'org.zkoss.zul.impl.LabelImageElement',
};

const DOC_DIR = path.join(__dirname, '..', '..', 'zk_component_ref');

// Universally-common, self-explanatory attributes we do NOT write a section for
// (CR-L4 — rely on Javadoc). Tunable; the user can still opt-in via the gap-report checkbox.
const COMMON_PROPERTIES = new Set([
  'disabled', 'visible', 'width', 'height', 'style', 'sclass', 'tooltiptext',
  'draggable', 'droppable', 'context', 'popup', 'tabindex', 'focus', 'id',
]);

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const a = { graph: path.join(os.homedir(), '.graphify/global-graph.json'),
              out: path.join(__dirname, 'component-facts.json'),
              all: false, component: null, progress: false, base: false };
  for (let i = 2; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--all') a.all = true;
    else if (t === '--base') a.base = true;
    else if (t === '--component') a.component = argv[++i];
    else if (t === '--graph') a.graph = argv[++i];
    else if (t === '--out') a.out = argv[++i];
    else if (t === '--progress') a.progress = true;
    else if (t === '--help' || t === '-h') { printHelp(); process.exit(0); }
  }
  return a;
}

function printHelp() {
  const header = fs.readFileSync(__filename, 'utf8').split('\n').slice(2, 46).join('\n');
  console.log(header.replace(/^ \*?/gm, '').trim());
}

// ---------------------------------------------------------------------------
// Graphify graph index (class FQN -> file path + declaration line)
// ---------------------------------------------------------------------------

/**
 * Build a lookup from module-relative source_file -> the class-level graph node.
 * We keep only nodes whose label has no '.'/'(' (i.e. type declarations, not members),
 * which keeps the index small and unambiguous.
 */
function buildGraphIndex(graphPath) {
  if (!fs.existsSync(graphPath)) {
    throw new Error(`Graphify graph not found at ${graphPath}. Stage 1 requires it (see plan MANDATE).`);
  }
  const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
  // bySourceFile: source_file -> { id, line, repo }  (class declaration node)
  const bySourceFile = new Map();
  for (const n of graph.nodes) {
    if (n.file_type !== 'code' || !n.source_file || !n.source_file.endsWith('.java')) continue;
    const label = n.label || '';
    if (label.includes('.') || label.includes('(')) continue; // skip member nodes
    const base = path.basename(n.source_file, '.java');
    if (label !== base) continue; // class node whose label == file basename
    const line = parseInt(String(n.source_location || 'L0').replace(/^L/, ''), 10) || 0;
    if (!bySourceFile.has(n.source_file)) {
      bySourceFile.set(n.source_file, { id: n.id, line, repo: n.repo });
    }
  }
  return { graphPath, bySourceFile };
}

/**
 * Resolve a fully-qualified class name to its source file via the graph.
 * Returns { resolved, line, node, absPath, repo } or null.
 */
function resolveClass(index, fqn) {
  const rel = fqn.replace(/\./g, '/') + '.java';
  // Find a graph node whose source_file ends with the package/class path.
  for (const [src, meta] of index.bySourceFile) {
    if (src.endsWith(rel)) {
      const absPath = locateAbs(src);
      if (!absPath) continue;
      return {
        resolved: `${src}:${meta.line}`,
        line: meta.line,
        node: meta.id,
        absPath,
        repo: meta.repo,
        provenance: {
          graphify: `jq '.nodes[]|select(.id=="${meta.id}")' ${shortGraph(index.graphPath)}`,
          resolved: `${src}:${meta.line}`,
          line: meta.line,
          node: meta.id,
        },
      };
    }
  }
  // Out-of-graph fallback: addon classes (gmaps/charts/pivottable/calendars) are not in the
  // Graphify graph. Glob the addon source roots for <fqn>.java and resolve from the file
  // directly. Provenance is a replayable `grep` against the real source (no graph node).
  return resolveClassAddon(fqn);
}

function resolveClassAddon(fqn) {
  const rel = fqn.replace(/\./g, '/') + '.java';
  const simple = fqn.split('.').pop();
  for (const root of ADDON_ROOTS) {
    const abs = path.join(root, rel);
    if (!fs.existsSync(abs)) continue;
    const text = fs.readFileSync(abs, 'utf8');
    const lines = text.split('\n');
    let line = 1;
    for (let i = 0; i < lines.length; i++) {
      if (new RegExp(`\\bclass\\s+${simple}\\b`).test(lines[i])) { line = i + 1; break; }
    }
    const addonRel = abs.replace(ADDON_DIR + '/', '');
    return {
      resolved: `${addonRel}:${line}`,
      line,
      node: null,
      absPath: abs,
      repo: 'addon',
      provenance: {
        graphify: `grep -n 'class ${simple}' ${abs}`,
        resolved: `${addonRel}:${line}`,
        line,
        node: null,
        addon: true,
      },
    };
  }
  return null;
}

function shortGraph(p) {
  return p.replace(os.homedir(), '~');
}

function locateAbs(moduleRelative) {
  for (const root of ZK_ROOTS) {
    const p = path.join(root, moduleRelative);
    if (fs.existsSync(p)) return p;
  }
  for (const root of ADDON_ROOTS) {
    const p = path.join(root, moduleRelative);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// ---------------------------------------------------------------------------
// lang.xml parsing
// ---------------------------------------------------------------------------

function parseLangFiles() {
  const components = new Map(); // name -> { name, componentClass, widgetClass, textAs, molds[], langFile }
  for (const file of [...LANG_FILES, ...ADDON_LANG_FILES]) {
    if (!fs.existsSync(file)) continue;
    const xml = fs.readFileSync(file, 'utf8');
    const rel = file.replace('/Users/hawk/Documents/workspace/ZK10/', '').replace(ADDON_DIR + '/', '');
    const blocks = xml.split(/<component>/).slice(1);
    for (const raw of blocks) {
      const block = raw.split(/<\/component>/)[0];
      const name = tag(block, 'component-name');
      if (!name) continue;
      const componentClass = tag(block, 'component-class');
      const widgetClass = tag(block, 'widget-class');
      const textAs = tag(block, 'text-as');
      const molds = [];
      const moldRe = /<mold-name>\s*([^<]+?)\s*<\/mold-name>/g;
      let m;
      while ((m = moldRe.exec(block)) !== null) molds.push(m[1].trim());
      // Merge across lang files: keep the first entry but backfill null fields and
      // union molds — a stateless/addon entry may list a component-name with no class
      // while the real definition (class/widget) lives in another file.
      if (!components.has(name)) {
        components.set(name, { name, componentClass, widgetClass, textAs,
                               molds: [...molds], langFile: rel });
      } else {
        const e = components.get(name);
        if (!e.componentClass && componentClass) { e.componentClass = componentClass; e.langFile = rel; }
        if (!e.widgetClass && widgetClass) e.widgetClass = widgetClass;
        if (!e.textAs && textAs) e.textAs = textAs;
        for (const md of molds) if (!e.molds.includes(md)) e.molds.push(md);
      }
    }
  }
  return components;
}

function tag(xml, name) {
  const m = new RegExp(`<${name}>\\s*([^<]*?)\\s*</${name}>`).exec(xml);
  return m ? m[1].trim() : null;
}

// ---------------------------------------------------------------------------
// Java class parsing (properties, extends, events)
// ---------------------------------------------------------------------------

function parseJavaClass(absPath, src) {
  const text = fs.readFileSync(absPath, 'utf8');
  const lines = text.split('\n');

  // imports: simpleName -> FQN, plus wildcard package prefixes (e.g. org.zkoss.zul.impl.*)
  const imports = {};
  const wildcardPkgs = [];
  for (const line of lines) {
    const wc = /^\s*import\s+([\w.]+)\.\*\s*;/.exec(line);
    if (wc) { wildcardPkgs.push(wc[1]); continue; }
    const im = /^\s*import\s+(static\s+)?([\w.]+)\.(\w+)\s*;/.exec(line);
    if (im && !im[1]) imports[im[3]] = `${im[2]}.${im[3]}`;
  }

  // package
  const pkgM = /^\s*package\s+([\w.]+)\s*;/m.exec(text);
  const pkg = pkgM ? pkgM[1] : null;

  // class declaration + extends (extends may be written as a dotted FQN inline)
  const clsRe = /(?:public\s+)?(?:abstract\s+)?class\s+(\w+)(?:<[^>]*>)?\s+extends\s+([\w.]+)/;
  const clsM = clsRe.exec(text);
  const superRaw = clsM ? clsM[2] : null;
  const superSimple = superRaw ? superRaw.split('.').pop() : null;
  const superFqn = superRaw
    ? (superRaw.includes('.') ? superRaw
       : (imports[superSimple] || (pkg ? `${pkg}.${superSimple}` : superSimple)))
    : null;

  // CR-L3: only the OUTER class body counts; mask out nested type declarations.
  const mask = computeTopLevelMask(lines);

  // properties: scan for public setters/getters with optional preceding javadoc
  const props = collectProperties(lines, src, mask);

  // events
  const events = collectEvents(lines, src);

  return { superSimple, superFqn, wildcardPkgs, props, events };
}

// Common ZK base classes whose FQN is fixed — used to recover a super resolved only by a
// wildcard import (e.g. addon classes doing `import org.zkoss.zul.impl.*`).
const KNOWN_SUPER_FQN = {
  XulElement: 'org.zkoss.zul.impl.XulElement',
  LabelElement: 'org.zkoss.zul.impl.LabelElement',
  LabelImageElement: 'org.zkoss.zul.impl.LabelImageElement',
  HtmlBasedComponent: 'org.zkoss.zk.ui.HtmlBasedComponent',
};

/**
 * Resolve a parsed class's superclass to a graph/addon source, recovering from wildcard
 * imports: try the guessed FQN, then each wildcard package + simple name, then the known
 * ZK base-class FQNs. Returns { fqn, res } or null.
 */
function resolveSuper(index, parsed) {
  if (!parsed.superSimple) return null;
  const candidates = [];
  if (parsed.superFqn) candidates.push(parsed.superFqn);
  for (const pkg of parsed.wildcardPkgs || []) candidates.push(`${pkg}.${parsed.superSimple}`);
  if (KNOWN_SUPER_FQN[parsed.superSimple]) candidates.push(KNOWN_SUPER_FQN[parsed.superSimple]);
  for (const fqn of candidates) {
    if (HARD_STOP.has(fqn.split('.').pop())) return { fqn, res: null, hardStop: true };
    const res = resolveClass(index, fqn);
    if (res) return { fqn, res };
  }
  return null;
}

function lineNumberOf(lines, idx) { return idx + 1; }

/**
 * Returns boolean[] — mask[i] is true when line i sits directly in the OUTERMOST type
 * body (brace depth 1), so inner-class / nested-type members are excluded (CR-L3).
 * Comments and string/char literals are stripped before counting braces so javadoc
 * `{@link}` and string braces do not skew the depth.
 */
function computeTopLevelMask(lines) {
  const mask = new Array(lines.length).fill(false);
  let depth = 0;
  let inBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const startDepth = depth;
    mask[i] = startDepth === 1;
    let s = lines[i];
    // strip block comments (possibly spanning lines)
    let out = '';
    let j = 0;
    while (j < s.length) {
      if (inBlock) {
        const end = s.indexOf('*/', j);
        if (end === -1) { j = s.length; } else { inBlock = false; j = end + 2; }
        continue;
      }
      if (s[j] === '/' && s[j + 1] === '*') { inBlock = true; j += 2; continue; }
      if (s[j] === '/' && s[j + 1] === '/') { break; } // line comment
      out += s[j]; j++;
    }
    // strip string + char literals
    out = out.replace(/"(\\.|[^"\\])*"/g, '""').replace(/'(\\.|[^'\\])*'/g, "''");
    for (const ch of out) { if (ch === '{') depth++; else if (ch === '}') depth = Math.max(0, depth - 1); }
  }
  return mask;
}

function collectProperties(lines, src, mask) {
  const props = {}; // PropName -> { name, type, kinds:Set, since, doc, line }
  const methodRe = /public\s+(?:static\s+)?(?:final\s+)?([\w.<>\[\],\s?]+?)\s+(set|get|is)([A-Z]\w*)\s*\(([^)]*)\)/;
  for (let i = 0; i < lines.length; i++) {
    if (mask && !mask[i]) continue; // CR-L3: skip inner-class / nested-type methods
    const m = methodRe.exec(lines[i]);
    if (!m) continue;
    const [, retType, verb, rawName, params] = m;
    const propName = rawName.charAt(0).toLowerCase() + rawName.slice(1);
    // javadoc immediately above
    const { doc, since, deprecated } = javadocAbove(lines, i);
    const type = verb === 'set'
      ? (params.trim().split(/\s+/)[0] || '').replace(/<.*>/, '') || retType.trim()
      : retType.trim();
    const existing = props[propName];
    // Prefer getter doc; keep first non-empty doc; record setter presence.
    // Deprecation: prefer the SETTER's marker (the setter is what ZUL deprecates), CR-L9.
    if (!existing) {
      props[propName] = { name: propName, type, kinds: new Set([verb]),
                          doc: doc || '', since: since || null,
                          deprecated: deprecated || null,
                          line: lineNumberOf(lines, i), src };
    } else {
      existing.kinds.add(verb);
      if (!existing.doc && doc) existing.doc = doc;
      if (!existing.since && since) existing.since = since;
      if (deprecated && (verb === 'set' || !existing.deprecated)) existing.deprecated = deprecated;
      if (verb === 'set' && (!existing.type || existing.type === 'void')) existing.type = type;
    }
  }
  // finalize — record accessor presence so callers can apply the both-accessor policy (CR-L2)
  return Object.values(props).map((p) => {
    const hasSetter = p.kinds.has('set');
    const hasGetter = p.kinds.has('get') || p.kinds.has('is');
    return {
      name: p.name,
      type: p.type,
      accessors: [...p.kinds].sort().join('/'),
      hasSetter,
      hasGetter,
      since: p.since,
      deprecated: p.deprecated || null, // CR-L9: { replacement, text } when @deprecated
      description: p.doc,
      provenance: { resolved: `${p.src}:${p.line}`, line: p.line },
    };
  });
}

/** Extract the first sentence of a javadoc block immediately preceding line idx, plus
 * @since and any @deprecated marker (CR-L9). */
function javadocAbove(lines, idx) {
  let j = idx - 1;
  // skip annotation lines, noting a @Deprecated annotation (CR-L9)
  let annDeprecated = false;
  while (j >= 0 && /^\s*@\w+/.test(lines[j])) {
    if (/^\s*@Deprecated\b/.test(lines[j])) annDeprecated = true;
    j--;
  }
  const none = { doc: '', since: null, deprecated: annDeprecated ? { replacement: null, text: '' } : null };
  if (j < 0 || !/\*\//.test(lines[j])) return none;
  // collect block upward
  const buf = [];
  while (j >= 0) {
    buf.unshift(lines[j]);
    if (/\/\*\*/.test(lines[j])) break;
    j--;
  }
  const block = buf.join('\n');
  if (!/\/\*\*/.test(block)) return none;
  const clean = block
    .replace(/\/\*\*|\*\//g, ' ')
    .replace(/^\s*\*/gm, ' ')
    .replace(/\{@link\s+#?([^}]+)\}/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const sinceM = /(?:@since|since)\s+([\d.]+)/i.exec(block);
  // first sentence (up to period or @tag)
  const firstSentence = clean.split(/(?<=\.)\s|@/)[0].trim();
  return { doc: firstSentence, since: sinceM ? sinceM[1] : null,
           deprecated: parseDeprecated(block, annDeprecated) };
}

/** Parse a @deprecated javadoc tag (or a bare @Deprecated annotation) into
 * { replacement, text } | null (CR-L9). `replacement` is a best-effort property name; the
 * Draft/Verify agents finalize the exact replacement link against source. */
function parseDeprecated(block, annDeprecated) {
  const m = /@deprecated\b([\s\S]*?)(?=\n\s*\*\s*@\w|\*\/|$)/i.exec(block);
  if (!m && !annDeprecated) return null;
  const text = (m ? m[1] : '')
    .replace(/^\s*\*/gm, ' ')
    .replace(/\{@link\s+#?([^}]+)\}/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  // best-effort replacement: first identifier after use/using/replaced by/see;
  // setX/getX/isX -> x, drop any (params), keep just the simple name.
  let replacement = null;
  const use = /(?:use|using|replaced\s+by|see)\s+#?([A-Za-z_][\w.]*)\s*(?:\([^)]*\))?/i.exec(text);
  if (use) replacement = use[1].split('.').pop().replace(/^(set|get|is)([A-Z])/, (_, p, c) => c.toLowerCase());
  return { replacement, text };
}

function collectEvents(lines, src) {
  const events = [];
  const seen = new Set();
  const re = /addClientEvent\(\s*\w+\.class\s*,\s*([\w.]+(?:\.[A-Z_]+)?|"[^"]+")\s*,/;
  for (let i = 0; i < lines.length; i++) {
    const m = re.exec(lines[i]);
    if (!m) continue;
    let raw = m[1];
    let eventName;
    if (raw.startsWith('"')) {
      eventName = raw.replace(/"/g, '');
    } else {
      // Events.ON_FOCUS -> onFocus
      const cst = raw.split('.').pop(); // ON_FOCUS
      eventName = constToEvent(cst);
    }
    if (!eventName || seen.has(eventName)) continue;
    seen.add(eventName);
    events.push({ name: eventName, raw,
                  provenance: { resolved: `${src}:${lineNumberOf(lines, i)}`, line: lineNumberOf(lines, i) } });
  }
  return events;
}

function constToEvent(cst) {
  if (!/^ON_/.test(cst)) return null;
  const parts = cst.slice(3).toLowerCase().split('_');
  return 'on' + parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

// ---------------------------------------------------------------------------
// Per-component extraction
// ---------------------------------------------------------------------------

/**
 * Why a property is NOT a documentable section (returns null if it IS documentable).
 *   CR-L2: needs BOTH a setter and a getter — checked across the WHOLE inheritance chain
 *   (a class may override only the getter while the setter lives in a parent, e.g. zclass).
 *   CR-L4: skip universally-common attributes.
 */
function exclusionReason(p, accIndex) {
  const a = accIndex[p.name] || { set: p.hasSetter, get: p.hasGetter };
  if (!a.set && a.get) return 'readOnly (getter-only — not ZUL-settable)';
  if (a.set && !a.get) return 'writeOnly (setter-only)';
  if (!a.set && !a.get) return 'no public accessor';
  if (COMMON_PROPERTIES.has(p.name)) return 'common (self-explanatory; see Javadoc)';
  return null;
}

/**
 * Resolve the zk_component_ref doc page that is the HOME for a class's properties (CR-L5):
 * a registered component name if the class is one, else `<simpleClassName>.md` if it exists.
 * Returns the page basename (no `.md`) or null.
 */
function docPageFor(fqn, fqnToComponent) {
  if (!fqn) return null;
  if (fqnToComponent[fqn]) return fqnToComponent[fqn];
  const simple = fqn.split('.').pop().toLowerCase();
  return fs.existsSync(path.join(DOC_DIR, `${simple}.md`)) ? simple : null;
}

function extractComponent(reg, index, fqnToComponent, warnings) {
  const fqn = reg.componentClass;
  const out = {
    name: reg.name,
    componentClass: fqn,
    widgetClass: reg.widgetClass || null,
    textAs: reg.textAs || null,
    molds: reg.molds,
    langFile: reg.langFile,
    javaApiUrl: fqn ? javaUrl(fqn) : null,
    jsApiUrl: reg.widgetClass ? jsUrl(reg.widgetClass) : null,
    classProvenance: null,
    ownProperties: [],
    inheritedProperties: [],
    excludedProperties: [], // {name, source, reason, accessors} — kept for transparency (coverage)
    events: [],
    inheritanceChain: [],
    warnings: [],
  };

  if (!fqn) {
    out.warnings.push('no component-class in lang.xml');
    warnings.push(`${reg.name}: no component-class`);
    return out;
  }

  const resolved = resolveClass(index, fqn);
  if (!resolved) {
    out.warnings.push(`class ${fqn} not found in Graphify graph`);
    warnings.push(`${reg.name}: ${fqn} not in graph`);
    return out;
  }
  out.classProvenance = resolved.provenance;

  // Addon classes (out-of-graph) live in separate addon projects with their own javadoc
  // hosts; the core zkoss.org/javadoc URL pattern would 404, so null the API links and let
  // the existing hand-authored page keep its correct ones. Flag the entry as an addon.
  if (resolved.repo === 'addon') {
    out.addon = true;
    out.javaApiUrl = null;
    out.jsApiUrl = null;
  }

  const own = parseJavaClass(resolved.absPath, relOf(resolved.absPath));
  out.events = own.events.map((e) => ({ ...e,
    provenance: { ...e.provenance, graphify: resolved.provenance.graphify } }));

  // CR-L5 (revised): a property's documentation HOME is the class that declares its SETTER.
  // Parse the WHOLE chain (own first, then ancestors top-down to the framework roots),
  // recording per-class property records, chain-wide accessor presence (accIndex, CR-L2),
  // and the LOWEST class that declares each property's setter (setterClassOf).
  const accIndex = {};        // propName -> { set, get } across the whole chain
  const setterClassOf = {};   // propName -> FQN of the lowest class declaring the setter
  const propByClass = {};     // FQN -> { propName -> decorated record }
  const recordClass = (props, classFqn, graphifyCmd) => {
    const dec = decorate(props, graphifyCmd);
    propByClass[classFqn] = propByClass[classFqn] || {};
    for (const p of dec) {
      propByClass[classFqn][p.name] = p;
      const a = accIndex[p.name] || (accIndex[p.name] = { set: false, get: false });
      if (p.hasSetter) { a.set = true; if (!setterClassOf[p.name]) setterClassOf[p.name] = classFqn; }
      if (p.hasGetter) a.get = true;
    }
  };

  const ownFqn = fqn;
  recordClass(own.props, ownFqn, resolved.provenance.graphify);

  let curParsed = own;
  let depth = 0;
  while (curParsed && curParsed.superSimple && depth < MAX_INHERIT_DEPTH + 6) {
    const sr = resolveSuper(index, curParsed);
    if (!sr) { out.warnings.push(`super ${curParsed.superFqn || curParsed.superSimple} not resolvable`); break; }
    if (sr.hardStop) break; // framework-generic root — nothing documentable above
    const sup = parseJavaClass(sr.res.absPath, relOf(sr.res.absPath));
    recordClass(sup.props, sr.fqn, sr.res.provenance.graphify);
    out.inheritanceChain.push({ class: sr.fqn, resolved: sr.res.resolved });
    curParsed = sup;
    depth++;
  }

  // Classify every property seen across the chain by its setter-home (CR-L5).
  const accStr = (name) => {
    const a = accIndex[name] || {};
    return [a.set ? 'set' : null, a.get ? 'get' : null].filter(Boolean).join('/') || 'none';
  };
  const recordOf = (name, home) => (home && propByClass[home] && propByClass[home][name])
    || (propByClass[ownFqn] && propByClass[ownFqn][name])
    || (() => { for (const k of Object.keys(propByClass)) if (propByClass[k][name]) return propByClass[k][name]; return null; })();

  const allNames = new Set();
  for (const k of Object.keys(propByClass)) for (const n of Object.keys(propByClass[k])) allNames.add(n);

  for (const name of [...allNames].sort()) {
    const home = setterClassOf[name]; // undefined => getter-only => excluded below
    const rec = recordOf(name, home);
    if (!rec) continue;
    const reason = exclusionReason(rec, accIndex);
    if (reason) {
      out.excludedProperties.push({ name, source: home ? home.split('.').pop() : 'own', reason, accessors: accStr(name) });
      continue;
    }
    if (home === ownFqn) {
      out.ownProperties.push(rec);
    } else {
      const page = docPageFor(home, fqnToComponent);
      out.inheritedProperties.push({
        ...rec,
        setterClass: home,
        sourceClass: home,
        // CR-L5: this property is documented on the setter-declaring class's page, NOT here.
        ancestorDoc: page,
        ancestorDocPath: page ? `zk_component_ref/${page}.md` : null,
      });
    }
  }

  return out;
}

function decorate(props, graphifyCmd) {
  return props.map((p) => ({ ...p,
    provenance: { ...p.provenance, graphify: graphifyCmd } }));
}

function relOf(absPath) {
  for (const root of ZK_ROOTS) {
    if (absPath.startsWith(root + path.sep)) {
      return path.relative(path.dirname(root), absPath); // keep zk/ or zkcml/ prefix
    }
  }
  if (absPath.startsWith(ADDON_DIR + path.sep)) {
    return path.relative(ADDON_DIR, absPath); // addon-relative path
  }
  return absPath;
}

function javaUrl(fqn) {
  return `https://www.zkoss.org/javadoc/latest/zk/${fqn.replace(/\./g, '/')}.html`;
}
function jsUrl(widgetClass) {
  return `https://www.zkoss.org/javadoc/latest/jsdoc/classes/${widgetClass}.html`;
}

// ---------------------------------------------------------------------------
// Progress tracker seeding
// ---------------------------------------------------------------------------

function batchOf(name) {
  return BATCHES[name] !== undefined ? BATCHES[name] : '';
}

// Batch assignments mirror the plan's "Rollout batches" table.
const BATCHES = {};
['button','listbox','combobox','window','drawer','grid','tabbox','label','menupopup','datebox','tree','chart','borderlayout','fileupload','captcha'].forEach((c) => BATCHES[c] = 0);
// Batch "B": the abstract/impl base classes that host inherited properties (CR-L5).
['htmlbasedcomponent','xulelement','labelelement','labelimageelement'].forEach((c) => BATCHES[c] = 'B');

function seedProgress(results) {
  const dir = path.join(__dirname, '..', '..', 'tasks', 'component-gaps');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, '_progress.md');
  const head = `# Component enrichment progress

> Auto-maintained by the Stage 1/2/3 tools — do not hand-edit status cells except **Annotated (you)**.
> Legend: ⬜ pending · 🟡 in progress · ✅ done · ➖ n/a

| Component | Batch | Facts (S1) | Gap report (S2) | Annotated (you) | Applied (S3) | Lint/links | Notes |
|---|---|---|---|---|---|---|---|
`;
  const rows = results.map((r) => {
    const facts = r.classProvenance ? '✅' : '⬜';
    const note = r.warnings.length ? r.warnings.join('; ') : '';
    return `| ${r.name} | ${batchOf(r.name)} | ${facts} | ⬜ | ⬜ | ⬜ | ⬜ | ${note} |`;
  });
  fs.writeFileSync(file, head + rows.join('\n') + '\n');
  return file;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = parseArgs(process.argv);
  console.error('Loading Graphify graph index (this is the source-of-truth resolver)…');
  const index = buildGraphIndex(args.graph);
  console.error(`  indexed ${index.bySourceFile.size} class declarations from the graph`);

  const registry = parseLangFiles();
  console.error(`  parsed ${registry.size} components from lang.xml registry`);

  // FQN-seeded mode (CR-L5): inject the abstract/impl ancestor classes that have a doc page
  // but no lang.xml entry, so they extract as first-class components (their pages host the
  // properties they declare). Done BEFORE fqnToComponent so leaf inherited props resolve to them.
  for (const [pg, fqn] of Object.entries(BASE_CLASSES)) {
    if (!registry.has(pg)) registry.set(pg, { name: pg, componentClass: fqn, widgetClass: null,
                                              textAs: null, molds: [], langFile: null, isBaseClass: true });
  }

  // CR-L5: map each component-class FQN -> doc-page name, so a property whose setter is
  // declared in an ancestor resolves to the ancestor's page (its documentation home).
  const fqnToComponent = {};
  for (const [name, reg] of registry) if (reg.componentClass) fqnToComponent[reg.componentClass] = name;

  let targets;
  if (args.component) targets = [args.component];
  else if (args.all) targets = [...registry.keys()].sort();
  else targets = [...PILOT, ...(args.base ? Object.keys(BASE_CLASSES) : [])];

  const warnings = [];
  const results = [];
  for (const name of targets) {
    const reg = registry.get(name);
    if (!reg) {
      warnings.push(`${name}: not found in any lang.xml (skipped)`);
      results.push({ name, componentClass: null, classProvenance: null,
                     warnings: [`not found in lang.xml registry`], ownProperties: [],
                     inheritedProperties: [], excludedProperties: [], events: [], molds: [] });
      continue;
    }
    results.push(extractComponent(reg, index, fqnToComponent, warnings));
  }

  const payload = {
    generated: 'run date stamped post-hoc',
    source: 'ZK 10.x at ' + ZK_ROOTS.join(' , '),
    graph: shortGraph(args.graph),
    note: 'Class->file resolution via Graphify graph (global-graph.json). Each fact carries provenance. Properties are classified by their SETTER-declaring class (CR-L5): ownProperties = setter declared in this component class (document here); inheritedProperties = setter declared in an ancestor (document on ancestorDocPath, NOT here) — carries setterClass + ancestorDocPath. excludedProperties records what was filtered (read/write-only, common, inner-class) and why. All documentable props have both setter+getter (CR-L2) and are top-level non-inner-class (CR-L3).',
    componentCount: results.length,
    components: results,
  };
  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(args.out, JSON.stringify(payload, null, 2));
  console.error(`\nWrote ${results.length} components -> ${args.out}`);

  // coverage / never silently cap
  const ok = results.filter((r) => r.classProvenance).length;
  console.error(`  resolved via Graphify: ${ok}/${results.length}`);
  if (warnings.length) {
    console.error('\nWARNINGS (logged, never silently dropped):');
    warnings.forEach((w) => console.error('  - ' + w));
  }

  if (args.progress) {
    const pf = seedProgress(results);
    console.error(`\nSeeded progress tracker -> ${pf}`);
  }
}

main();
