---
title: "High-voltage differential probe"
section: power-electronics
order: 3
status: "In progress"
summary: "A 1:1000 differential probe for signals between 1 and 2 kV, built around an AD8130 receiver. I’m sizing the divider and trimming offset and gain in LTspice before the PCB."
context: "Personal project"
year: 2026
tools: [LTspice]
specs:
  - value: "1–2 kV"
    label: "measuring range"
  - value: "1:1000"
    label: "attenuation"
  - value: "10 MΩ"
    label: "input resistance per leg"
cover: front-end.svg
cover_fit: contain
cover_alt: "Simplified front end of the probe: each input goes through a 10 megohm, 1 picofarad divider leg into an AD8130 differential receiver."
cover_caption: "Simplified front end. Each input goes through a compensated divider, 10 MΩ and 1 pF over about 10 kΩ and 987 pF, into the AD8130 differential receiver."
gallery:
  - file: notes-requirements-divider.jpg
    caption: "From my design notes (in Spanish): the requirements and the first sizing of the divider."
  - file: notes-offset.jpg
    caption: "Finding the constant 1.4 mV output and planning the offset trim on the REF pin."
  - file: notes-gain-trim.jpg
    caption: "Setting the gain with RF and RG so that 1000 V at the input gives 1 V at the output."
---

## Goal

A differential probe that measures signals between 1000 V and 2000 V with a 1:1000 ratio, 10 MΩ of input impedance and 0.1 % resistors. The bandwidth target is 100 MHz, with 20 to 50 MHz as a realistic first goal.

## What I’ve done so far

- Designed each input leg as a compensated divider: ten 1 MΩ resistors, each with 10 pF in parallel, give 10 MΩ and 1 pF, over a lower leg of about 10 kΩ and 987 pF.
- Included the AD8130’s own input impedance in the calculation. Its SPICE model only describes the differential part, so I added the common-mode resistance and capacitance to the simulation myself.
- Found a constant output of about 1.4 mV whatever the common-mode voltage (0, 240, 1000 or 2000 V), which pointed to an offset rather than a common-mode error. I designed a trim network on the REF pin, fed from the ±12 V supply, to cancel it.
- Set the gain with the feedback resistors so that 1000 V gives 1 V at the output, and sized a second range with a gain of 10.
- Ran the simulations with every resistor tolerance included, used potentiometers to balance the two legs, and added BAV99 protection diodes, taking their capacitance into account in the divider.

## Where it stands

With every tolerance applied, a 1000 V differential input gives 1.00008 V at the output. With both inputs at 1000 V, the output still shows about −1.35 mV, which I expect to remove by tuning the variable capacitors. The next steps are the component list and the PCB.
