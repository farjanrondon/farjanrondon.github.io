---
title: "Three-phase inverter for reactive power compensation"
section: power-electronics
order: 4
summary: "A grid-connected converter in PLECS that injects reactive current when the voltage sags, with dq current control, component selection and a thermal check of the IGBT module."
context: "Course project, Power Controllers"
tools: [PLECS]
specs:
  - value: "800 V"
    label: "DC link"
  - value: "416 V, 60 Hz"
    label: "grid connection"
  - value: "1.7 kV / 1.4 kA"
    label: "IGBT module rating"
cover: cover.png
cover_fit: contain
cover_alt: "Phase currents of the converter: close to zero before the sag, about 1 kA peak while the voltage is low, and back to zero after it recovers."
cover_caption: "Phase currents during the sag: close to zero before it, about 1 kA peak while the voltage is low, and back to zero shortly after it recovers."
gallery:
  - file: main-schematic.png
    caption: "The full PLECS model: IGBT bridge on its heatsink, DC link, LCL filter, grid sources with the voltage sag, and the control subsystems."
  - file: iq-reference-logic.png
    caption: "The reactive current reference switches on when the RMS grid voltage leaves the 0.8 to 1.2 pu band."
  - file: current-control.png
    caption: "Current control in the dq frame, with a PLL for synchronization and PI controllers for each axis."
    wide: true
  - file: iq-reference-waveforms.png
    caption: "Grid voltages, their RMS values and the reference signals as the voltage changes."
  - file: third-harmonic.png
    caption: "Third-harmonic injection: the modulating signals before and after adding the min/max offset."
  - file: sag-voltage.png
    caption: "Grid voltages during the test: a sag to about 60 % between 1.8 s and 2.0 s."
  - file: igbt-current.png
    caption: "Current through one IGBT during the sag, with peaks of about 1.2 kA."
  - file: igbt-voltage.png
    caption: "Voltage across the same IGBT, with peaks of about 1.2 kV."
  - file: junction-temperature.png
    caption: "Diode junction temperature from the PLECS thermal model, settling near 110 °C."
---

## Goal

Passive compensators such as capacitor banks deliver reactive power that depends on the voltage, so they help least when the voltage drops. The project was to design an active alternative: a three-phase power electronic converter that supports the grid voltage by injecting reactive current.

## What I did

- Modeled a two-level IGBT inverter in PLECS with an 800 V DC link, connected to a 416 V, 60 Hz grid through an LCL filter with damping resistors.
- Designed the control in the dq frame: a PLL for synchronization, PI current controllers for both axes, a DC-link voltage loop that sets the d-axis reference, and logic that sets the reactive (q-axis) reference when the grid voltage leaves the 0.8 to 1.2 pu band.
- Added third-harmonic injection to the modulation, so the converter makes better use of its DC-link voltage.
- Selected an Infineon FF1400R17IP4 module, rated 1700 V and 1400 A, and a water-cooled heatsink, and checked them with PLECS thermal models.
- Tested the design with a grid voltage sag to about 60 % lasting 200 ms.

## Result

During the sag, the converter injected about 1 kA (peak) of reactive current and returned to idle once the voltage recovered. In the worst case, the IGBT saw peaks of about 1.2 kA and 1.2 kV, within the module’s ratings, and the diode junction settled near 110 °C, below its 150 °C limit.
