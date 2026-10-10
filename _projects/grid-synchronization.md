---
title: "Synchronizing a synchronous machine with the grid"
section: machines
order: 3
summary: "Synchronized a 5 kVA machine with the grid and ran it in all four quadrants of active and reactive power, then paralleled two machines in island mode to feed an RL load."
context: "Lab course, Energy Conversion Laboratory II"
year: 2025
tools: [Oscilloscope, MATLAB]
specs:
  - value: "4"
    label: "operating quadrants"
  - value: "12"
    label: "operating points measured"
  - value: "2"
    label: "machines in island mode"
cover: cover.svg
cover_fit: contain
cover_alt: "Chart of the twelve measured operating points in the active and reactive power plane, three in each quadrant."
cover_caption: "The twelve operating points I measured, three in each quadrant of the active and reactive power plane."
gallery:
  - file: waveforms-by-quadrant.png
    caption: "Stator voltage (blue) and current (red) at one operating point in each quadrant."
    wide: true
---

## Goal

Connect the lab’s synchronous machine to the grid safely, then control the active and reactive power it exchanges and observe each operating mode. Then repeat the synchronization between two machines with no grid, so they feed a load on their own.

## What I did

- Brought the machine to synchronizing conditions: 1800 rpm through the field of the DC machine driving it, terminal voltage equal to the grid’s through its own field current, and phase sequence and angle checked with synchronizing lamps and a voltmeter across the breaker. I closed the breaker only when that voltmeter read zero.
- Changed the active power with the DC machine’s field and the reactive power with the synchronous machine’s field, recording each operating point with its voltage and current waveforms.
- Measured the RL load on its own (0.61 kW and 0.72 kvar, power factor 0.65), then synchronized two identical machines off the grid to supply it, varied the load’s resistance and inductance, and finally disconnected it.

## Result

I measured 12 operating points, three in each quadrant: as a generator and as a motor, both delivering and absorbing reactive power. In island mode, any adjustment on one machine moved the other, unlike the grid, which holds voltage and frequency on its own. I kept the load shared as evenly as possible, and both machines delivered similar stator currents in every case. After the load was disconnected, reactive power kept flowing between the two machines running at no load.
