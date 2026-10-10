# Farjan Rondón — portfolio

Source of [farjanrondon.github.io](https://farjanrondon.github.io). GitHub Pages builds it with Jekyll every time you commit, so there is nothing to install. After a commit, the new version is online in about a minute; the **Actions** tab shows the build and any error.

## Where things are

| To change | Edit |
|---|---|
| Your name, intro, contact details, experience, education, courses and skills | `_data/profile.yml` |
| The annotated photo at the top of the home page | `_data/hero.yml` |
| The sections of the home page and their order | `_data/sections.yml` |
| A project | its file in `_projects/` |
| A project's images | `assets/img/projects/<project-name>/` |
| Your CV | `CV_Farjan_Rondon.pdf` in the root of the repository |

The folders `_layouts`, `_includes` and `assets/css`, `assets/js` hold the design. You don't need to touch them to add or change content.

## Add a project

1. Copy `_templates/project.md` into the `_projects` folder and rename it. The file name becomes the address of the page, so use lowercase words joined by hyphens, for example `_projects/buck-converter-design.md` → `/projects/buck-converter-design/`.
2. Make a folder with exactly the same name for its images: `assets/img/projects/buck-converter-design/`.
3. Fill in the fields at the top of the file (every field is explained there) and write the text below them.
4. Commit. The project appears in its section on the home page, with its own page.

On github.com you can do all of this in the browser:

- **New file:** open the `_projects` folder, choose **Add file → Create new file**, type the file name, paste the template and edit it.
- **Images:** on your computer, put the images in a folder named like the project. Open `assets/img/projects` on GitHub, choose **Add file → Upload files** and drag the whole folder in.

To hide a project without deleting it, move its file out of `_projects` (for example into `_templates`).

## Images

- **Cover:** shown on the card and beside the text. Photos look best in landscape, about 1600 px wide. For plots and schematics, add `cover_fit: contain` so they are never cropped.
- **Formats:** JPG for photos, PNG or SVG for plots, schematics and screenshots.
- **Size:** keep each image under about 500 KB so the pages load quickly. Squoosh (squoosh.app) can shrink a photo without visible loss.
- **Gallery:** figures can be any shape. Add `wide: true` to a figure to show it across the full width, which suits wide schematics.

## Sections

Sections are listed in `_data/sections.yml`, in the order they appear. To add one, copy a block, give it a new `id` (lowercase, hyphens) and use that id in the `section:` field of your projects. A section with no projects doesn't show.

## A few rules for the text fields

- Indent with spaces, never tabs, and keep the same indentation as the lines around it.
- Put text in double quotes when it contains a colon (`:`) or starts with a number or a symbol.
- If the site stops updating after a commit, open the **Actions** tab: the failed build names the file and the line to fix.

## Your details

- **LinkedIn:** add your profile address to the `linkedin:` line in `_data/profile.yml`; a LinkedIn button then appears at the top of the page and in the footer.
- **CV:** upload the new PDF with the same name, `CV_Farjan_Rondon.pdf`, to replace the old one. If you use another name, update the `cv:` line in `_data/profile.yml`.
- **Footer:** the "Revision" field shows the month of the last build, so it updates on its own.
