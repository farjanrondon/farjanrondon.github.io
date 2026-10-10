---
title: "Synchronous machine parameters"
section: machines
order: 2
summary: "IEEE 115 tests on a 5 kVA synchronous machine: saturation curves, slip test, sequence reactances, Potier triangle, a sudden short circuit and load characteristics."
context: "Lab course, Energy Conversion Laboratory II"
year: 2025
tools: [Oscilloscope, MATLAB]
specs:
  - value: "5 kVA"
    label: "rated power"
  - value: "416 V, 1800 rpm"
    label: "rated voltage and speed"
  - value: "IEEE 115"
    label: "test guide"
cover: cover.jpg
cover_alt: "Slip rings and brushes that feed the field winding of the synchronous machine."
cover_caption: "Slip rings and brushes that feed the field winding."
gallery:
  - file: open-circuit-saturation.png
    caption: "Open-circuit saturation curve against the air-gap line."
  - file: short-circuit-saturation.png
    caption: "Short-circuit saturation curve."
  - file: slip-test.png
    caption: "Slip test: stator current and voltage, with the peaks I detected marked in red."
  - file: potier-triangle.png
    caption: "Potier triangle built from a zero power factor, overexcited operating point."
  - file: sudden-short-circuit.png
    caption: "Sudden short circuit: the stator current and the curves fitted to its upper and lower envelopes."
  - file: damper-cage.jpg
    caption: "The damper cage on the rotor."
  - file: nameplate.jpg
    caption: "The machine’s nameplate: 5 kVA, 416/240 V, 1800 rpm, 60 Hz."
---

## Goal

Determine the parameters of the lab’s synchronous machine following IEEE Std 115-2009, and see how it behaves under resistive, inductive and capacitive loads.

## What I did

- Measured the stator winding resistance, and the field resistance with the voltmeter-ammeter method because the field is reached through slip rings.
- Measured the open-circuit and short-circuit saturation curves at rated speed to get the unsaturated direct-axis reactance.
- Ran the slip test, recording the stator voltage and current with an oscilloscope and finding their peaks in MATLAB, to get the quadrature-axis reactance.
- Measured the negative-sequence reactance by injecting negative-sequence current, and the zero-sequence reactance with the parallel-circuit method.
- Built the Potier triangle to estimate the leakage reactance.
- Applied a sudden three-phase short circuit and fitted curves to the current envelopes to extract the transient and subtransient reactances and time constants.
- Measured the regulation and load characteristics with R, RL and RC loads.

## Result

| Parameter | Value |
|---|---|
| Unsaturated direct-axis reactance, from the saturation curves | 0.522 pu |
| Direct-axis reactance, from the slip test | 0.539 pu |
| Unsaturated quadrature-axis reactance | 0.288 pu |
| Negative-sequence reactance | 0.161 pu |
| Zero-sequence reactance | 0.056 pu |
| Stator resistance | 0.033 pu |

The two methods gave direct-axis reactances within 4 % of each other, which cross-checks the tests. Under an RL load, the terminal voltage fell from 416 V to about 310 V at 8.5 A, and holding it at 416 V took more field current as the load grew.
