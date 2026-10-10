---
# ---------------------------------------------------------------------------
# NEW PROJECT TEMPLATE
#
# 1. Copy this file into the _projects folder and rename it. The file name
#    becomes the page address, so use lowercase words joined by hyphens:
#    _projects/buck-converter-design.md  ->  /projects/buck-converter-design/
# 2. Create a folder for its images with exactly the same name:
#    assets/img/projects/buck-converter-design/
# 3. Fill in the fields below, write the text under the second "---" line,
#    and commit. GitHub rebuilds the site in about a minute.
#
# Lines starting with # are notes; you can delete them.
# Put text in quotes when it contains a colon (:) or starts with a number.
# ---------------------------------------------------------------------------

# Title of the project, in sentence case.
title: "Buck converter for a 48 V battery charger"

# Which home page section it goes in: the id of a section in _data/sections.yml
# (power-electronics, machines or power-systems).
section: power-electronics

# Position inside its section: 1 goes first.
order: 5

# Optional. Shows a badge on the card and the page. Delete the line when finished.
status: "In progress"

# One or two sentences for the card on the home page.
summary: "A synchronous buck converter that charges a 48 V battery from a 72 V bus. I sized the inductor and capacitors, simulated the control loop and built a prototype."

# Where the work comes from: course, capstone, internship, personal project...
context: "Personal project"

# Optional. Delete the line if you'd rather not show a year.
year: 2026

# Software and instruments you used, separated by commas.
tools: [LTspice, KiCad, Oscilloscope]

# Three key numbers shown on the rating plate. Keep values short.
specs:
  - value: "500 W"
    label: "output power"
  - value: "100 kHz"
    label: "switching frequency"
  - value: "96 %"
    label: "measured efficiency"

# Main image, used on the card and at the top of the page. File name only;
# the file goes in this project's image folder.
cover: cover.jpg
# Write "contain" for plots, schematics and drawings so they are never cropped.
# Delete the line for photos, which fill the frame.
# cover_fit: contain
# Describe the image for people who can't see it.
cover_alt: "The converter prototype on the bench, with the inductor and heatsink in front."
# Optional caption under the image on the project page.
# cover_caption: "The prototype during the first full-power test."

# Optional figures at the end of the page. Add as many as you want.
# wide: true makes a figure span the full width (good for schematics).
gallery:
  - file: schematic.png
    caption: "Power stage and gate driver."
    wide: true
  - file: efficiency.png
    caption: "Measured efficiency from 10 % to 100 % load."
  - file: bench.jpg
    caption: "Test setup with the electronic load."

# Optional buttons under the rating plate, for code, reports or videos.
links:
  - label: "Code on GitHub"
    url: "https://github.com/farjanrondon/your-repository"
---

## Goal

What the project had to achieve, and why. Two or three sentences are enough.

## What I did

- One line for each main step, starting with a verb: designed, simulated, built, measured...
- Mention the decisions that took real thought, and why you made them.
- Name the standards, components and methods you used.

## Result

The outcome in numbers when you have them, and what you learned or would change.

You can also add a table:

| Quantity | Value |
|---|---|
| Output voltage ripple | 0.4 % |
| Full-load efficiency | 96 % |

And link to another project: [on-state voltage probe](../on-state-voltage-probe/).
