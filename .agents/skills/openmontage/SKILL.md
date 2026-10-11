---
name: openmontage
description: Produce high-production explainer, pitch, and showcase videos for any project using the OpenMontage engine. Use when someone says "/openmontage", "openmontage", "make an openmontage video", "create video with openmontage", or wants a polished Remotion-based motion graphics video for their application.
---

# /openmontage

Generate professional, polished 1080p motion graphic showcase and explainer videos for any software project or website using the OpenMontage engine.

## Prerequisites & Installation

OpenMontage is globally installed and configured at:
- **Global Path**: `d:\OpenMontage`
- **Python Virtualenv**: `d:\OpenMontage\.venv\Scripts\python.exe`
- **Remotion Composer**: `d:\OpenMontage\remotion-composer`
- **Runner Script**: `d:\OpenMontage\generate_project_video.py`

---

## When to Use This Skill

Activate this skill when the user asks:
- `/openmontage`
- "generate video with openmontage"
- "openmontage se video banao"
- "create an explainer / showcase video using openmontage"

---

## Workflow

### 1. Analyze Current Project
Inspect the current workspace directory:
- Project title & description (from `package.json`, `README.md`, or main page `index.html` / `app/page.tsx`).
- Visual brand assets: Locate logos or screenshots in `public/`, `assets/`, or root directory.
- Key value propositions: Speed metrics, core architecture, problem vs solution.

### 2. Run OpenMontage Generator
Execute the automated generator pointing to the current project:

```powershell
d:\OpenMontage\.venv\Scripts\python.exe d:\OpenMontage\generate_project_video.py --project-path "<PROJECT_ROOT>"
```

Optional arguments:
- `--title "Custom App Title"`: Override the display title.
- `--subtitle "Tagline or pitch"`: Override the tagline.
- `--theme "flat-motion-graphics"`: Select theme (`flat-motion-graphics`, `clean-professional`, `minimalist-diagram`, `anime-ghibli`).
- `--output "custom-name.mp4"`: Specify output path.

### 3. Custom Storyboarding (Advanced)
If custom cuts, specific KPIs, or bespoke scene sequences are requested:
1. Create or edit a JSON storyboard in:
   `d:\OpenMontage\remotion-composer\public\demo-props\<slug>.json`
2. Supported cut types:
   - `hero_title`: Main hook title + subtitle + optional background image.
   - `stat_card`: Large animated KPI stat with subtitle.
   - `bar_chart` / `line_chart` / `pie_chart`: Animated data visualizations.
   - `comparison`: Side-by-side cards (e.g. Before vs After, or Frontend vs Backend).
   - `terminal_scene`: Animated terminal shell commands typing out.
   - `screenshot_scene`: Pan & zoom across application screenshots.
   - `text_card`: Outro call-to-action.
3. Render the storyboard:
   ```powershell
   cd d:\OpenMontage
   .venv\Scripts\python.exe render_demo.py <slug>
   ```

### 4. Interactive Visual Studio
To edit compositions visually with live preview in the browser:
```powershell
cd d:\OpenMontage\remotion-composer
npx remotion preview
```

### 5. Report Deliverable
Report the completed MP4 video path, resolution (1920x1080), duration, file size, and key scene breakdown to the user.
