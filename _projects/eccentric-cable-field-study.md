---
title: "Effect of a metal sheet on a cable with an eccentric conductor"
section: power-systems
order: 2
summary: "An electrostatic FEM study in QuickField: how an off-centre conductor, the permittivity of each insulating layer and a floating metal sheet shape a cable’s electric field and capacitance."
context: "Course project, High-Voltage Installations"
year: 2024
tools: [QuickField]
specs:
  - value: "10 cm"
    label: "cable diameter"
  - value: "2.2–4.4"
    label: "relative permittivity"
  - value: "6"
    label: "field simulations"
cover: cover.png
cover_fit: contain
cover_alt: "Electric field map of the cable cross-section, with the strongest field around the off-centre conductor and in the outer layer on the side closest to it."
cover_caption: "Electric field strength in the cross-section. The field concentrates around the off-centre conductor and on the side of the insulation closest to it."
gallery:
  - file: field-maps.png
    caption: "Electric field strength for the three permittivity cases, without (top) and with (bottom) the floating metal sheet. Each map has its own colour scale."
    wide: true
  - file: dimensions-sketch.jpg
    caption: "The dimensions I chose for the model: a 10 cm cable, a 6 cm inner layer and a 1 cm conductor placed off-centre."
---

## Goal

When a cable’s conductor sits off-centre, the electric field doesn’t spread evenly through the insulation. The assignment was to study that effect in a cable with two insulating layers, with and without a floating metal sheet between them, for three combinations of permittivity, and to find the capacitance of each layer.

## What I did

- Modeled the cable cross-section in QuickField 6.6 as a plane-parallel electrostatic problem: a 10 cm cable with a 1 cm conductor placed off-centre, over a 1 m length.
- Simulated three cases, each with and without the metal sheet: equal permittivities (3.2 and 3.2), the inner layer double the outer (4.4 and 2.2), and the outer layer double the inner (2.2 and 4.4).
- Calculated the capacitance of each insulating layer with QuickField’s capacitance matrix calculator.
- Wrote the report as a step-by-step guide, so that someone who has never used QuickField could reproduce every result.

## Result

The off-centre conductor concentrates the field on one side of the insulation. When the two layers have different permittivities, the field intensifies in the layer with the lower permittivity. The floating sheet evens out the field beyond it, although the charge it collects still lets the permittivities change the field on the outside. The capacitance of each layer scaled with its permittivity:

| Case | Inner layer εr | Outer layer εr | Inner layer C | Outer layer C |
|---|---|---|---|---|
| I | 3.2 | 3.2 | 106.7 pF | 344.3 pF |
| II | 4.4 | 2.2 | 146.7 pF | 236.7 pF |
| III | 2.2 | 4.4 | 73.3 pF | 473.4 pF |

Capacitances are for a 1 m length of cable.
