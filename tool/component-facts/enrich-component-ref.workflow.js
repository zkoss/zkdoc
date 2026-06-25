export const meta = {
  name: 'enrich-component-ref',
  description: 'Stage 2: per-component Analyze→Draft→Verify pipeline producing annotated Gap Reports from component facts + the canonical template',
  phases: [
    { title: 'Analyze', detail: 'structural + factual diff of each doc vs facts & template', model: 'sonnet' },
    { title: 'Draft', detail: 'turn gaps into template-keyed markdown snippets', model: 'sonnet' },
    { title: 'Verify', detail: 'Graphify-first re-confirm each fact; sort verified vs uncertain', model: 'opus' },
  ],
}

// ---------------------------------------------------------------------------
// Stage 2 of tasks/zk-component-ref-enrichment-plan.md.
//
// IMPORTANT: workflow scripts run in a pure-JS sandbox (no fs / no require). The
// orchestration script does NO file I/O; its agents read the source files with their own
// Read/Bash tools, and this script returns the assembled Gap Report markdown per
// component for the MAIN loop to write to disk.
//
// args = [ "button", "drawer", ... ]   // component names to enrich
//
// GRAPHIFY-FIRST: the Verify stage confirms every fact by querying the Graphify graph
// and reading the resolved ZK10 source, and echoes back the provenance (graphify
// command + resolved path:line). A "verified" verdict with no provenance.graphify is
// downgraded to "uncertain", so an agent cannot mark something verified without leaving
// the audit trail; provenance is carried into the Gap Report HTML comment so Stage 3 can
// enforce it mechanically.
// ---------------------------------------------------------------------------

const GRAPH = '~/.graphify/global-graph.json'
const ROOT = '/Users/hawk/Documents/workspace/DOC/zkdoc'
const FACTS = `${ROOT}/tool/component-facts/component-facts.json`
const TEMPLATE = `${ROOT}/zk_component_ref/_TEMPLATE.md`
let rawArgs = args
if (typeof rawArgs === 'string') { try { rawArgs = JSON.parse(rawArgs) } catch (e) { rawArgs = rawArgs.split(/[,\s]+/).filter(Boolean) } }
const names = Array.isArray(rawArgs) && rawArgs.length ? rawArgs
  : (rawArgs && Array.isArray(rawArgs.components) ? rawArgs.components : [])
log(`Stage 2: args type=${typeof args}, resolved ${names.length} name(s): ${names.join(', ')}`)
const components = names.map((name) => ({ name }))

// ---- schemas -------------------------------------------------------------

const GAP_SCHEMA = {
  type: 'object',
  required: ['component', 'missingSections', 'missingProperties', 'missingEvents', 'missingMolds', 'staleClaims', 'formatDeviations'],
  properties: {
    component: { type: 'string' },
    missingSections: { type: 'array', items: { type: 'string' } },
    missingProperties: { type: 'array', items: { type: 'string' }, description: 'fact property names absent from the doc' },
    missingEvents: { type: 'array', items: { type: 'string' } },
    missingMolds: { type: 'array', items: { type: 'string' } },
    staleClaims: { type: 'array', items: { type: 'string' }, description: 'doc statements contradicted by the facts' },
    formatDeviations: { type: 'array', items: { type: 'string' }, description: 'heading-level/casing/order deviations vs the template' },
  },
}

const PATCH_SCHEMA = {
  type: 'object',
  required: ['patches', 'norms'],
  properties: {
    patches: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'type', 'section', 'anchor', 'summary', 'snippet', 'provenance'],
        properties: {
          id: { type: 'string', description: 'stable id like button-prop-iconSclass' },
          type: { type: 'string', enum: ['property', 'event', 'mold', 'section'] },
          section: { type: 'string', description: 'target canonical H2 heading, e.g. "## Properties"' },
          anchor: { type: 'string', enum: ['append', 'create'] },
          summary: { type: 'string', description: 'one-line checkbox label' },
          snippet: { type: 'string', description: 'markdown to insert, matching the template section contract' },
          provenance: {
            type: 'object',
            required: ['graphify', 'resolved'],
            properties: {
              graphify: { type: 'string' },
              resolved: { type: 'string' },
              line: { type: 'number' },
            },
          },
        },
      },
    },
    norms: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'type', 'summary'],
        properties: {
          id: { type: 'string' },
          type: { type: 'string', enum: ['reorder', 'rename', 'remove'] },
          summary: { type: 'string' },
        },
      },
    },
  },
}

const VERDICT_SCHEMA = {
  type: 'object',
  required: ['verdicts'],
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'verified', 'reason'],
        properties: {
          id: { type: 'string' },
          verified: { type: 'boolean' },
          reason: { type: 'string' },
          provenance: {
            type: 'object',
            properties: {
              graphify: { type: 'string', description: 'the exact graphify/graph command re-run to confirm' },
              resolved: { type: 'string', description: 'module-relative path:line confirmed' },
            },
          },
        },
      },
    },
  },
}

// ---- prompts -------------------------------------------------------------

const READ_FACTS = `Read the facts for this component from ${FACTS} — it is a JSON file with a
"components" array; find the entry whose "name" === "%NAME%". That entry has componentClass,
widgetClass, textAs, molds, ownProperties[], inheritedProperties[], excludedProperties[],
events[], javaApiUrl, jsApiUrl, and a provenance object on every property/event. Each property
also carries \`since\` and \`deprecated\` (null, or { replacement, text } parsed from @deprecated — CR-L9).
DOCUMENT ONLY \`ownProperties\` on THIS page — they are the properties whose SETTER is declared
in this component's own class (already filtered to documentable: both setter+getter, not common,
not inner-class). \`inheritedProperties\` are documented on their setter-declaring ancestor's page
(each carries \`ancestorDocPath\`); they are NOT gaps for this page — do NOT propose them here.
\`excludedProperties\` lists what was deliberately left out (read/write-only, common, inner-class)
and why — do NOT propose them. Treat the facts as the authoritative ground truth.
OUT-OF-GRAPH ADDON COMPONENTS: if the facts entry has \`addon: true\` (gmaps family, charts,
pivottable, calendars), its source is NOT in the Graphify graph or the ZK10 repos. Each fact's
\`provenance.graphify\` is a replayable \`grep\` against the real addon source file (absolute path),
and \`provenance.resolved\` is relative to /Users/hawk/Documents/workspace/ADDON/. To confirm such a
fact, run that grep / read that ADDON file directly — do NOT look for it under ZK10.`

const HEADING_RULES = `HEADING LEVELS (the docs use H1 sections — never change a heading's #-count):
  - top sections use H1 ("# Properties", "# Supported Events", …),
  - property names use H2 ("## Autodisable"), Common Use Cases uses H2,
  - finer sub-examples use H3.
NEVER propose changing a heading LEVEL (#-count). Casing/order/forbidden-section fixes are fine.`

function analyzePrompt(c) {
  return `You are auditing the ZK Component Reference page for "${c.name}" against (a) the ground-truth
facts extracted from ZK source and (b) the canonical doc template. Return ONLY the structured diff.

STEP 1 — ${READ_FACTS.replace('%NAME%', c.name)}
STEP 2 — Read the canonical template at ${TEMPLATE} (section contract: fixed order & casing).
STEP 3 — Read the current doc at ${ROOT}/zk_component_ref/${c.name}.md (it may not exist → undocumented).
STEP 4 — Consider ONLY \`ownProperties\` as candidate missing properties (CR-L5). Every
  \`inheritedProperty\` is documented on its setter-declaring ancestor's page (\`ancestorDocPath\`),
  NOT here — never report an inherited property as missing for this page.

${HEADING_RULES}

Then identify: \`ownProperties\` in the facts but missing from the doc (missingProperties —
names only; NEVER an inheritedProperty); events in facts but undocumented (missingEvents);
molds in facts but not shown (missingMolds); required template sections that are absent
(missingSections — exact template headings); doc claims contradicted by the facts (staleClaims);
and casing/order/forbidden-section deviations vs the template (formatDeviations, e.g.
"heading 'Supported events' should be 'Supported Events'", "has a 'Version History' section the
template forbids", "sections out of template order"). Do NOT report heading-LEVEL deviations.`
}

function draftPrompt(c, gap) {
  return `Draft documentation snippets for "${c.name}" that fill the gaps below, matching the canonical
template's section contract (property = "## PropertyName" H2 subsection, events table columns
"Name | Event Type | Description"). Output ONLY structured patches + norms.

${HEADING_RULES}

STEP 1 — ${READ_FACTS.replace('%NAME%', c.name)}
  For each factual patch you MUST copy the matching fact's provenance object
  (graphify + resolved + line) VERBATIM from the facts file. Never invent provenance.

== GAPS TO FILL ==
${JSON.stringify(gap, null, 1)}

Rules:
- One patch per missing property (type:"property", section:"# Properties", anchor:"append"),
  per missing event (type:"event", section:"# Supported Events"), per missing mold
  (type:"mold", section:"# Supported Molds").
- id = "${c.name}-<type>-<name>". summary = concise one-line checkbox label.
- snippet = ready-to-insert markdown for that one item only — a property is a "## PropertyName"
  (H2) block, an event is a single table row, a mold is a note. Do NOT restate the section heading
  inside append snippets, and do NOT change existing heading levels.
- **CR-L7 — a property snippet shows a ZUL USAGE EXAMPLE, never Java method signatures.** Format:
  the "## PropertyName" heading, an optional "**Default Value:** \`x\`" line, one or two sentences
  of prose (accepted values, caveats, any \`{% include supported-since.html version="x.y.z" %}\`),
  then a fenced \`\`\`xml ZUL example using the attribute, e.g. \`<${c.name} propertyName="..."/>\`.
  Do NOT emit \`public void setX(...)\` / \`public String getX()\` Java signatures — the linked
  Javadoc covers the Java API.
  **Object-typed properties (value is a Java object, not a String/enum/number/boolean — e.g.
  \`LocalDateTime\`, \`Date\`, \`TimeZone\`, a \`ListModel\`, a renderer):** never show a raw
  \`comp.setX(obj)\` Java line. Instead construct the object in an inline \`<zscript>\` block and
  reference it via EL, so the example is self-contained and shows the required type. Format:
  \`\`\`xml
  <zscript>
      import java.time.LocalDateTime;
      LocalDateTime startOfYear = LocalDateTime.of(2024, 1, 1, 0, 0);
  </zscript>
  <datebox defaultDateTime="\${startOfYear}"/>
  \`\`\`
  (This matches the established doc idiom — see timepicker \`min\`, searchbox/grid \`model\`.) Add a
  one-line note that the value is an object constructed in \`<zscript>\` / a composer / a ViewModel.
  Plain String/enum/number attributes still use the simple literal form \`<comp attr="value"/>\`.
- **CR-L9 — enumerate acceptable values + flag deprecation, FROM SOURCE.** For any property
  whose \`type\` is \`String\` (or whose javadoc hints at a fixed set of values), OPEN the setter
  at the fact's \`provenance.resolved\` (read that ZK10 file). If the setter validates against a
  fixed value set — a \`WrongValueException\`, a \`switch\`, or \`equals\`/constant comparisons —
  OR the javadoc lists the values, add a small markdown table to the snippet:
  \`| Value | Meaning |\` with one row per acceptable value (note the default). Do NOT guess
  values; only list what the source actually accepts. If the fact's \`deprecated\` is non-null
  (or the setter is \`@Deprecated\` in source), prepend a blockquote to the snippet:
  \`> **Deprecated since <since>** — use [\\\`<replacement>\\\`](#<replacement-anchor>) instead.\`
  (take \`<replacement>\` from \`deprecated.replacement\`/\`deprecated.text\`; resolve the real
  property name against source if the parsed hint is rough).
- provenance: copy the fact's provenance object (graphify + resolved + line) EXACTLY. Never invent it.
- norms: for each formatDeviation propose a norm item — type is "rename" (casing only, NOT level),
  "remove" (e.g. Version History), or "reorder" (section order). No provenance needed for norms.`
}

function verifyPrompt(c, draft) {
  return `Adversarially verify each proposed patch for "${c.name}" against the REAL ZK 10 source.
GRAPHIFY-FIRST: to locate/confirm a symbol, query the Graphify graph, then read the resolved file.
  - The graph is at ${GRAPH}. Resolve module-relative paths against
    /Users/hawk/Documents/workspace/ZK10/zk/<path> and /Users/hawk/Documents/workspace/ZK10/zkcml/<path>.
  - ADDON EXCEPTION: a patch whose provenance.graphify is a \`grep ... <abs path under /Users/hawk/Documents/workspace/ADDON/>\`
    is an out-of-graph addon (gmaps family, charts, pivottable, calendars). Confirm it by RUNNING that grep and
    reading that ADDON file directly (provenance.resolved is relative to .../ADDON/). Such a grep-based provenance
    IS valid here — echo it back verbatim on a verified verdict; do NOT demote it merely for being a grep not a jq.
  - Each patch already cites a provenance.resolved (path:line) and a graphify command — RUN/READ it
    to confirm the property/event/mold genuinely exists with the stated meaning. The class-level
    graphify command resolves the file (e.g. jq '.nodes[]|select(.id=="...")' ${GRAPH}); the
    resolved path:line points at the exact declaration — read it with sed/Read to confirm.
  - Each patch includes its full \`snippet\` — verify the ACTUAL snippet content against source,
    not just the summary. In particular, an acceptable-values TABLE in the snippet must enumerate
    exactly what the setter accepts (no more, no fewer), and a deprecation blockquote must match a
    real @deprecated marker. Do NOT demote a correct snippet just because the summary is terse.

For every patch return a verdict:
  - verified=true ONLY if you actually confirmed it in source. You MUST then fill provenance with the
    graphify command you ran (or the equivalent graph lookup) AND the resolved path:line you read.
    A verified verdict with empty provenance.graphify is invalid and will be treated as uncertain.
  - verified=false if you could not confirm it (it then goes to "Needs human review").
  - CR-L9: when a patch includes an acceptable-values table or a deprecation flag, ALSO confirm
    those against source — the value set must match what the setter actually accepts (the
    WrongValueException / switch / javadoc), and a deprecation flag must match a real @deprecated
    /@Deprecated marker. A patch whose table or deprecation note is unconfirmed is verified=false.

== PROPOSED PATCHES ==
${JSON.stringify(draft.patches.map((p) => ({ id: p.id, type: p.type, summary: p.summary, snippet: p.snippet, provenance: p.provenance })), null, 1)}`
}

// ---- pipeline ------------------------------------------------------------

// Model split (user choice): Analyze + Draft on Sonnet (cheaper), Verify on Opus (the
// adversarial source re-confirmation is where the strongest model pays off).
const results = await pipeline(
  components,
  (c) => agent(analyzePrompt(c), { label: `analyze:${c.name}`, phase: 'Analyze', model: 'sonnet', schema: GAP_SCHEMA })
    .then((gap) => ({ c, gap })),
  ({ c, gap }) => agent(draftPrompt(c, gap), { label: `draft:${c.name}`, phase: 'Draft', model: 'sonnet', schema: PATCH_SCHEMA })
    .then((draft) => ({ c, gap, draft })),
  ({ c, gap, draft }) => agent(verifyPrompt(c, draft), { label: `verify:${c.name}`, phase: 'Verify', model: 'opus', schema: VERDICT_SCHEMA })
    .then((verdict) => ({ c, gap, draft, verdict })),
)

// ---- deterministic Gap Report assembly (pure string — returned, not written) ----

const reports = []
const summary = []

for (const r of results.filter(Boolean)) {
  const { c, draft, verdict } = r
  const vmap = new Map((verdict?.verdicts || []).map((v) => [v.id, v]))

  const proposed = []
  const review = []
  for (const p of draft.patches) {
    const v = vmap.get(p.id)
    // Gate (Graphify enforcement): the verify agent must have ECHOED a provenance.graphify
    // to prove it actually ran the lookup; otherwise the item is demoted to human review.
    const echoed = !!(v && v.verified && v.provenance && v.provenance.graphify)
    // Machine field always uses the CLEAN, deterministic Stage-1/draft provenance (the
    // replayable `jq '.nodes[]|select(.id==...)' ...` command + resolved path:line), never
    // the verify agent's freeform prose — so Stage 3 can parse it and the audit can replay it.
    const prov = (p.provenance && p.provenance.graphify) ? p.provenance
      : (v && v.provenance) ? v.provenance : p.provenance
    const item = { ...p, provenance: prov, verifyReason: v ? v.reason : 'no verdict returned' }
    if (echoed) proposed.push(item)
    else review.push(item)
  }

  reports.push({ name: c.name, markdown: renderReport(c, proposed, review, draft.norms || []) })
  summary.push(`| ${c.name} | ${proposed.length} | ${review.length} | ${(draft.norms || []).length} |`)
  log(`  ${c.name}: ${proposed.length} verified, ${review.length} need review, ${(draft.norms || []).length} norms`)
}

const summaryMd = `# Stage 2 enrichment summary\n\n| Component | Verified (apply) | Needs review | Norms |\n|---|---|---|---|\n${summary.join('\n')}\n`
return { reports, summaryMd }

// ---- renderer ------------------------------------------------------------

function esc(s) { return String(s == null ? '' : s).replace(/"/g, '\\"') }

function gapComment(p) {
  const base = `id=${p.id} section="${p.section}" anchor=${p.anchor} type=${p.type}`
  if (p.type === 'property' || p.type === 'event' || p.type === 'mold') {
    return `<!-- gap ${base} graphify="${esc(p.provenance && p.provenance.graphify)}" resolved="${esc(p.provenance && p.provenance.resolved)}" -->`
  }
  return `<!-- gap ${base} -->`
}

function indentSnippet(s) {
  return String(s || '').trim().split('\n').map((l) => (l ? '      ' + l : '')).join('\n')
}

function howToAnnotate(c) {
  return `## How to annotate this report

Two independent ways your edits drive doc changes:

**A. Direct — the apply tool reads these mechanically (no AI, deterministic):**
- **Checkbox** — \`[x]\` = apply this item, \`[ ]\` = skip it. Toggle to accept / reject.
- **Snippet text** — the indented block under an item is inserted *verbatim*. Edit it
  freely to fix wording, examples, or defaults; the tool applies exactly what you leave there.
- **Norm checkboxes** — same \`[x]\`/\`[ ]\` for the formatting fixes at the bottom.

  → then run: \`node tool/component-facts/apply-gap-report.js --component ${c.name} --dry-run\`

**B. Guidance to me — consumed when this report is *regenerated* (Stage 2), not by the apply tool.**
Add a blockquote line under the item with ONE tag:
- \`> @skip: <reason>\` — this item is wrong/unwanted; record why (a one-off rejection).
- \`> @rule: <policy>\` — promote to a permanent policy (I update the extractor / template / CR-Lx).
- \`> @rewrite: <how>\` — keep the item but redraft it per your instruction.
- \`> @note: <text>\` — FYI only, no action.

`
}

function renderReport(c, proposed, review, norms) {
  const fm = `---\ncomponent: ${c.name}\nmd_path: zk_component_ref/${c.name}.md\ntemplate_version: 1\n---\n`
  let out = fm + '\n' + howToAnnotate(c) + '## Proposed patches (verified — default APPLY; uncheck to skip)\n\n'
  if (!proposed.length) out += '_(none)_\n\n'
  for (const p of proposed) {
    out += `${gapComment(p)}\n- [x] **${p.summary}**\n\n${indentSnippet(p.snippet)}\n\n`
  }
  out += '## Needs human review (uncertain — default SKIP; check to apply)\n\n'
  if (!review.length) out += '_(none)_\n\n'
  for (const p of review) {
    out += `${gapComment(p)}\n- [ ] ${p.summary} — _${esc(p.verifyReason)}_\n\n${indentSnippet(p.snippet)}\n\n`
  }
  out += '## Format normalization (default APPLY)\n\n'
  if (!norms.length) out += '_(none)_\n\n'
  for (const n of norms) {
    out += `<!-- norm id=${n.id} type=${n.type} -->\n- [x] ${n.summary}\n\n`
  }
  return out
}
