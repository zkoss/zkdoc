---
title: "Write Your First ZUL UI with AI"
description: "Describe a UI in plain English and let the zul-writer Agent skill generate the ZUL markup and a matching Java controller for your ZK project."
---

# Write Your First ZUL UI with AI

Building a ZK UI for the first time means learning ZUL syntax, component names, and layout patterns all at once. The `zul-writer` Agent skill removes that barrier: describe what you want in plain English and get working ZUL markup instantly.

The `zul-writer` skill works with any AI coding agent that supports Agent Skills, including Claude Code, Codex CLI, and Gemini CLI.

# What Is the zul-writer Skill?

An Agent skill is a specialized AI assistant pre-loaded with domain knowledge. The `zul-writer` skill knows ZK components, ZUL syntax, and common layout patterns. You describe the UI in English; it produces ready-to-use `.zul` markup and a controller Java class.

What it produces:
- A `.zul` file with correct component markup and nesting
- An MVC or MVVM skeleton controller matching your request

What it does not do:
- Write Application logic
- Connect to your data layer

# Before You Start

You need three things before using the skill:

1. **A ZK project** — follow the [Quick Start guide]({{site.baseurl}}/zk_installation_guide/quick_start) to create a ZK Maven project.
2. **An AI coding agent** — Claude Code, Codex CLI, Gemini CLI, or any other agent that supports Agent Skills. You also need Node.js and npm, because the installer runs through `npx`.
3. **The zul-writer skill** — run this in a terminal and follow the prompts:

   ```bash
   npx skills add zkoss-demo/agent-skill
   ```

   Choose the symlink option when asked: one copy of the skill then serves every agent you have installed, and updating it later is a single command.

For what the skill can do beyond this page, see [Agent Skills]({{site.baseurl}}/zk_dev_ref/agent_skills).

# Your First ZUL File: A Login Form

We recommend starting with the MVC pattern. The Java controller it produces is simpler to read and extend than MVVM for a first project.

**Step 1.** Open a terminal inside your ZK Maven project and start your AI coding agent there.

**Step 2.** Ask the agent to use the skill. In Claude Code, type `/zul-writer` and then describe
the UI; in other agents, name the skill in your prompt:

```
Use the zul-writer skill.
Create a login form using the MVC pattern.
Include a username field, a password field, and a Login button.
```

The skill asks a few questions first — your ZK version, and whether you want MVC or MVVM — so
answer those and let it continue.

**Step 3.** The skill generates a `.zul` file. A typical result looks like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<window title="Login" border="normal" width="400px"
        apply="com.example.LoginController">
    <grid>
        <rows>
            <row>
                <label value="Username:"/>
                <textbox id="username" width="200px"/>
            </row>
            <row>
                <label value="Password:"/>
                <textbox id="password" type="password" width="200px"/>
            </row>
            <row>
                <cell colspan="2" align="center">
                    <button id="loginBtn" label="Login"/>
                </cell>
            </row>
        </rows>
    </grid>
</window>
```

**Step 4.** Run it. Save the file under your web content folder — `src/main/webapp/login.zul`
in a standard Maven layout — then start the server and open the page:

```bash
./mvnw jetty:run
```

The page is now at <http://localhost:8080/login.zul>. The Login button does nothing yet; the
skill also generates a `LoginController` skeleton for you to fill in.

# Understanding the Generated Code

Here is what each element does:

| Element | Purpose |
|---|---|
| `<window>` | Root container. The `apply` attribute names the Java MVC controller class. |
| `<grid>` | Table-style layout container. |
| `<rows>` / `<row>` | Each `<row>` becomes one horizontal row in the grid. |
| `<label>` | Read-only text. Used here for field labels. |
| `<textbox>` | Text input. `type="password"` masks the input. `id` lets the controller find it. |
| `<button>` | Clickable button. `label` sets its display text. |

To learn about each component in detail, see the [ZK Component Reference]({{site.baseurl}}/zk_component_ref).

For the Java controller that handles the `loginBtn` click, see [Creating UI Controllers]({{site.baseurl}}/get_started/get_zk_up_and_running_with_mvc#creating-ui-controllers) in the MVC guide.

# Editing the Output

The generated file is a starting point. Open it and edit freely:

- **Change a label** — update the `value` attribute on any `<label>`
- **Add a field** — copy a `<row>` block and change the `id` and `value` attributes
- **Adjust width** — change `width` on `<window>`
- **Add a reset button** — add `<button label="Reset"/>` next to the Login button in the last `<row>`


# Try More Complicated Pages

Once you are comfortable with a simple form, describe more complex UIs. These tips help you get better output:

- **Describe layout and purpose** — "a two-column form with labels on the left"
- **Name the main action** — "submit", "search", "filter"
- **Describe the data shown** — "a table listing orders with columns for ID, date, and status"
- **Focus on structure, not visual style** — let ZK's default theme handle colors and fonts

Here are example prompts for common UI patterns:

| What you want | Example prompt |
|---|---|
| Login form | "A login form with username, password, and a Login button using MVC" |
| Search + results | "A search bar at the top, and a grid below showing product name, category, and price" |
| Master-detail | "A listbox on the left listing customer names, a detail panel on the right showing name, email, and phone" |
| Dashboard with tabs | "A tabbox with three tabs: Overview, Sales, and Settings" |
| Data entry form | "An order form with fields for customer name, product, quantity, and a Submit button" |

# Next Steps

- **Explore components** — [ZK Component Reference]({{site.baseurl}}/zk_component_ref) covers every available component with examples
- **Learn ZUL syntax** — [ZUML Reference]({{site.baseurl}}/zuml_ref) covers attributes, expressions, and includes
- **Add controller logic** — [Get ZK Up and Running with MVC]({{site.baseurl}}/get_started/get_zk_up_and_running_with_mvc) walks through writing the Java side
- **Try the MVVM pattern** — [Get ZK Up and Running with MVVM]({{site.baseurl}}/get_started/get_zk_up_and_running_with_mvvm) shows a data-binding approach
- **Build the UI in Java instead** — [Build UI in Java]({{site.baseurl}}/get_started/building_ui_in_java); ask `zul-writer` for a minimal ZUL root and write the rest in the Composer
- **Preview ZUL without deploying** — the [ZK IntelliJ IDEA Plugin]({{site.baseurl}}/zk_dev_ref/zkidea) renders a generated `.zul` in a split pane every time you save
