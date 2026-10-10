---
title: "Power flow and transient stability analysis"
section: power-systems
order: 1
summary: "A MATLAB tool that solves the load flow with four methods and simulates how the generators swing after a line fault. The load flow also has a Python version."
context: "Software project"
tools: [MATLAB, Python, Excel]
specs:
  - value: "4"
    label: "load flow methods"
  - value: "RK4"
    label: "and Heun integration"
  - value: "Excel"
    label: "case input and results"
cover: cover.svg
cover_fit: contain
cover_alt: "Rotor angle after a fault for two clearing times: cleared at 150 ms the angle swings back; cleared at 270 ms it passes 180 degrees and the machine loses synchronism."
demo: swing
links:
  - label: "MATLAB code on GitHub"
    url: "https://github.com/farjanrondon/Power-System"
  - label: "Python load flow on GitHub"
    url: "https://github.com/farjanrondon/PowerFlow"
---

## Goal

Study a power system’s steady state and its stability after a fault in a single tool, with the whole case described in an Excel workbook so it’s easy to change and compare cases.

## What I did

- Built the Y-bus from π-equivalent models of lines and of transformers with off-nominal taps, plus shunt elements, with voltage-dependent ZIP loads.
- Implemented the Gauss-Seidel, Newton-Raphson, fast-decoupled and DC load flow methods. The DC angles can be used as the starting point for the iterative ones.
- Took the solution with the lowest error as the pre-fault state, expanded the network with the generators’ internal buses, Kron-reduced it for the pre-fault, fault and post-fault conditions, and integrated the swing equation with Heun’s method or fourth-order Runge-Kutta.
- Wrote every result back to Excel: bus voltages and angles, line flows and losses, the power balance, and the iterations, error and time of each method.
- Implemented the load flow in Python as well, with pandas and NumPy.

## Result

One run takes an Excel case to the load flow results of each method and to the rotor-angle curves for the fault and clearing time you choose. The demo below runs the same kind of study on a single machine, in your browser.
