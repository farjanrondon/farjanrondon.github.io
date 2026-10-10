---
title: "Induction machine parameters, starting and drives"
section: machines
order: 1
summary: "IEEE 112 tests on a 4 kW wound-rotor induction machine to find its equivalent circuit, plus starting tests: direct-on-line, reduced voltage, star-delta and a Danfoss VLT 5000 drive."
context: "Lab course, Energy Conversion Laboratory II"
year: 2025
tools: [Oscilloscope, MATLAB, Danfoss VLT 5000]
specs:
  - value: "4 kW"
    label: "wound-rotor machine"
  - value: "416 V, 60 Hz"
    label: "rated supply"
  - value: "IEEE 112"
    label: "test procedure"
cover: cover.jpg
cover_alt: "The Danfoss VLT 5000 drive used in the lab, with its keypad and power terminals."
gallery:
  - file: equivalent-circuit.svg
    caption: "Equivalent circuit built from the resistance, no-load and locked-rotor tests."
    wide: true
  - file: magnetization.png
    caption: "Magnetization curve, linear up to about 320 V and near the knee at the rated 416 V."
  - file: torque-speed.png
    caption: "Torque–speed characteristic with the rotor short-circuited."
  - file: dol-start-current.png
    caption: "Stator current during a direct-on-line start from the grid at 416 V."
  - file: vf-start-speed.png
    caption: "Start at 332 V and 48 Hz, keeping the voltage-to-frequency ratio. The DC machine’s armature voltage follows the speed."
  - file: drive-voltage.png
    caption: "Stator voltage from the Danfoss drive at 40 Hz in steady state."
  - file: drive-current.png
    caption: "Stator current with the drive at 40 Hz."
  - file: abb-nameplate.jpg
    caption: "Nameplate of the ABB motor used with the drive."
---

## Goal

Find the equivalent circuit and operating characteristics of a three-phase induction machine following IEEE Std 112-2017, and see how it behaves when started in different ways.

## What I did

- Measured the insulation resistance of a squirrel-cage machine with a megohmmeter and calculated its dielectric absorption ratio.
- On a 4 kW wound-rotor machine, measured the winding resistances and corrected them to 75 °C, then ran the no-load test, with and without the DC machine driving it to separate the mechanical losses, and the locked-rotor test.
- Measured the stator-to-rotor turns ratio at two rotor positions and built the equivalent circuit.
- Measured the magnetization curve and the torque–speed, efficiency and regulation characteristics with the rotor short-circuited and with 1.5 Ω and 2.5 Ω added to it.
- Recorded starting transients with an oscilloscope: direct-on-line from the grid and through a variac, at 75 % and 60 % of rated voltage with load, at reduced frequency, at constant V/f, with an open-transition star-delta starter, and with a Danfoss VLT 5000 drive feeding an ABB motor.

## Result

- The tests gave the equivalent circuit in the figures, with 144 W of mechanical losses. The turns ratio came out at 3.16 and 3.17 for the two rotor positions, so the position made no real difference.
- The megohmmeter test gave a dielectric absorption ratio close to 1, which showed that the squirrel-cage machine’s insulation was in poor condition.
- Adding resistance to the rotor lowered the efficiency and changed the slope of the torque–speed curve, as expected.
- A direct-on-line start reached steady speed in about 0.3 s, but took 0.8 s through the variac because it saturated. With load, the start took about 2.5 s at 75 % voltage and 7.5 s at 60 %.
- With the Danfoss drive at 40 Hz, the speed stayed at about 1198 rpm while the stator voltage went from 460 V down to 250 V.
