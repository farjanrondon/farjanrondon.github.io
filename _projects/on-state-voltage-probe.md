---
title: "On-state voltage probe for IGBTs"
section: power-electronics
order: 1
summary: "A probe that measures an IGBT’s voltage only while it conducts. I simulated it in LTspice, laid out the board in KiCad, built it and used it in the lab."
context: "Capstone project, Universidad Simón Bolívar"
year: 2025
tools: [LTspice, KiCad, MATLAB]
specs:
  - value: "1200 V"
    label: "peak input rating"
  - value: "200 µA"
    label: "constant test current"
  - value: "0.4 V/V"
    label: "isolated output gain"
cover: cover.jpg
cover_alt: "The finished probe in its black enclosure, with red collector and black emitter terminals rated 1200 V peak."
gallery:
  - file: ltspice-schematic.svg
    caption: "The complete measuring circuit in LTspice, with the manufacturers’ SPICE models and a double-pulse test on a 1200 V IGBT."
    wide: true
  - file: kicad-3d.png
    caption: "The board in KiCad’s 3D viewer. The slots under the optocoupler and the isolation amplifier separate the high-voltage side from the low-voltage side."
  - file: board-inside.jpg
    caption: "The assembled board inside its enclosure."
  - file: sim-vce-comparison.png
    caption: "Simulated on-state voltage. The probe’s reconstruction (red) overlaps the IGBT’s real voltage (blue); the isolated output scaled back by 2.5 (black) follows with a small delay."
  - file: sim-output.png
    caption: "Simulated probe output during the double-pulse test. The flat level is the reference reading taken while the IGBT blocks; the rising part is the reading while it conducts, which grows with the collector current."
  - file: enclosure-signal-side.jpg
    caption: "Gate-signal input, BNC output to the oscilloscope and USB-C power."
  - file: scope-measurement.jpg
    caption: "Bench measurement: gate-emitter voltage (CH1), probe output (CH2) and collector current (CH3)."
---

## Goal

Estimating an IGBT’s junction temperature from its on-state voltage means measuring one or two volts across a device that blocks the full DC bus as soon as it turns off. A normal probe can’t resolve that. My capstone needed an instrument that reads the collector-emitter voltage only while the IGBT conducts and stays safe while it blocks.

## What I did

- Started from a probe topology published by Yang, Zhang and Zhang, where a 200 µA constant current flows through one of two diode paths depending on whether the IGBT under test is on or off.
- Changed the design so both paths use the same diode pair, a 1200 V SiC Schottky diode with a TVS diode, plus 0.1 % resistors. The diode drops cancel out, so the on-state voltage is simply the difference between two readings of the test point.
- Added galvanic isolation on both sides. An optocoupler switches the auxiliary MOSFET from the inverter’s gate signal, and an AMC1350 isolation amplifier carries the reading to the low-voltage side. An isolated DC/DC converter powers the high-voltage side from USB-C.
- Simulated the whole circuit in LTspice with the manufacturers’ SPICE models, running a double-pulse test on a 1200 V IGBT.
- Drew the schematic and PCB in KiCad, had the board manufactured, assembled it in an enclosure and used it on the three-phase inverter of my capstone.

## Result

In simulation, the voltage rebuilt from the two test-point readings overlapped the IGBT’s real collector-emitter voltage, so the measuring side adds no visible error. The isolation amplifier adds a short delay but keeps the signal linear. On the bench, the probe started reading as soon as the IGBT saturated and the collector current began to rise, and it was the instrument behind the [calibration curves](../igbt-calibration-curves/) of my capstone.
