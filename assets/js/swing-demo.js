/* Transient stability demo: one machine against an infinite bus, classical model.
   The swing equation is integrated with fourth-order Runge-Kutta. */
(function () {
  "use strict";

  var svg = document.getElementById("swing");
  var slider = document.getElementById("swing-tc");
  if (!svg || !slider) return;

  var f = 60, H = 5, Pm = 1.0;
  var Pmax = { pre: 2.0, fault: 0.5, post: 1.5 };
  var k = Math.PI * f / H;                 // d2(delta)/dt2 = k (Pm - Pe)
  var delta0 = Math.asin(Pm / Pmax.pre);   // operating angle before the fault
  var dt = 0.0005;
  var T_PLOT = 2.5, T_SIM = 5.0;
  var DEG = 180 / Math.PI;

  function simulate(tc, tEnd, keepPoints) {
    var d = delta0, w = 0, t = 0, peak = d, lostAt = null, n = 0;
    var pts = keepPoints ? [[0, d]] : null;
    var acc = function (tt, dd) {
      return k * (Pm - (tt < tc ? Pmax.fault : Pmax.post) * Math.sin(dd));
    };
    while (t < tEnd - 1e-12) {
      var k1d = w,                  k1w = acc(t, d);
      var k2d = w + 0.5 * dt * k1w, k2w = acc(t + 0.5 * dt, d + 0.5 * dt * k1d);
      var k3d = w + 0.5 * dt * k2w, k3w = acc(t + 0.5 * dt, d + 0.5 * dt * k2d);
      var k4d = w + dt * k3w,       k4w = acc(t + dt, d + dt * k3d);
      d += dt / 6 * (k1d + 2 * k2d + 2 * k3d + k4d);
      w += dt / 6 * (k1w + 2 * k2w + 2 * k3w + k4w);
      t += dt; n++;
      if (d > peak) peak = d;
      if (keepPoints && t <= T_PLOT + 1e-9 && n % 8 === 0 && d * DEG <= 205) pts.push([t, d]);
      if (d > Math.PI && lostAt === null) lostAt = t;
      if (lostAt !== null && (!keepPoints || t > T_PLOT || d * DEG > 205)) break;
    }
    return { pts: pts, peak: peak, lostAt: lostAt };
  }

  function criticalClearingTime() {
    var lo = 0.01, hi = 1.0;
    for (var i = 0; i < 30; i++) {
      var mid = (lo + hi) / 2;
      if (simulate(mid, T_SIM, false).lostAt === null) lo = mid; else hi = mid;
    }
    return lo;
  }

  /* Chart */
  var NS = "http://www.w3.org/2000/svg";
  var axes = document.getElementById("swing-axes");
  var trace = document.getElementById("swing-trace");
  var clearLine = document.getElementById("swing-clear");
  var clearLabel = document.getElementById("swing-clear-label");
  var faultBand = document.getElementById("swing-fault");
  var valueOut = document.getElementById("swing-tc-value");
  var verdict = document.getElementById("swing-verdict");
  var cctText = document.getElementById("swing-cct");
  var yMax = 200;
  var L = null;

  function el(name, attrs, text) {
    var node = document.createElementNS(NS, name);
    for (var a in attrs) node.setAttribute(a, attrs[a]);
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function isNarrow() { return svg.parentElement.clientWidth < 520; }

  function buildAxes() {
    var narrow = isNarrow();
    var W = narrow ? 400 : 640, Ht = narrow ? 330 : 380;
    var M = narrow ? { l: 52, r: 12, t: 26, b: 48 } : { l: 64, r: 16, t: 26, b: 50 };
    var X0 = M.l, X1 = W - M.r, Y0 = Ht - M.b, Y1 = M.t;
    L = {
      narrow: narrow, W: W, Ht: Ht, X0: X0, X1: X1, Y0: Y0, Y1: Y1,
      sx: function (t) { return X0 + (t / T_PLOT) * (X1 - X0); },
      sy: function (deg) { return Y0 - (deg / yMax) * (Y0 - Y1); }
    };
    svg.setAttribute("viewBox", "0 0 " + W + " " + Ht);
    axes.textContent = "";
    for (var deg = 0; deg <= 180; deg += (narrow ? 60 : 30)) {
      axes.appendChild(el("line", { x1: X0, x2: X1, y1: L.sy(deg), y2: L.sy(deg), "class": deg === 180 ? "swing__limit" : "swing__gridline" }));
      axes.appendChild(el("text", { x: X0 - 8, y: L.sy(deg) + 4, "text-anchor": "end", "class": "swing__label" }, deg + "°"));
    }
    axes.appendChild(el("text", { x: X1, y: L.sy(180) - 6, "text-anchor": "end", "class": "swing__label swing__label--limit" }, "180°: loss of synchronism"));
    for (var t = 0; t <= T_PLOT + 1e-9; t += (narrow ? 1.0 : 0.5)) {
      axes.appendChild(el("line", { x1: L.sx(t), x2: L.sx(t), y1: Y0, y2: Y0 + 6, "class": "swing__axis" }));
      axes.appendChild(el("text", { x: L.sx(t), y: Y0 + 22, "text-anchor": "middle", "class": "swing__label" }, t.toFixed(1)));
    }
    axes.appendChild(el("line", { x1: X0, x2: X1, y1: Y0, y2: Y0, "class": "swing__axis" }));
    axes.appendChild(el("text", { x: (X0 + X1) / 2, y: Ht - 8, "text-anchor": "middle", "class": "swing__label" }, "Time after the fault (s)"));
    axes.appendChild(el("text", { x: 14, y: (Y0 + Y1) / 2, "text-anchor": "middle", "class": "swing__label", transform: "rotate(-90 14 " + (Y0 + Y1) / 2 + ")" }, "Rotor angle"));

    var clip = document.getElementById("swing-clip");
    if (!clip) {
      clip = el("clipPath", { id: "swing-clip" });
      clip.appendChild(el("rect", {}));
      svg.insertBefore(clip, svg.firstChild);
      trace.setAttribute("clip-path", "url(#swing-clip)");
    }
    var r = clip.firstChild;
    r.setAttribute("x", X0); r.setAttribute("y", Y1 - 10);
    r.setAttribute("width", X1 - X0 + 4); r.setAttribute("height", Y0 - Y1 + 10);
  }

  var cct = criticalClearingTime();
  cctText.textContent = "Critical clearing time for this system: about " + Math.round(cct * 1000) + " ms.";

  function render(animate) {
    var tc = Number(slider.value) / 1000;
    valueOut.textContent = slider.value;
    var run = simulate(tc, T_SIM, true);
    var lost = run.lostAt !== null;

    trace.setAttribute("points", run.pts.map(function (p) {
      return L.sx(p[0]).toFixed(1) + "," + L.sy(p[1] * DEG).toFixed(1);
    }).join(" "));
    trace.classList.toggle("is-lost", lost);

    var x = L.sx(tc);
    clearLine.setAttribute("x1", x); clearLine.setAttribute("x2", x);
    clearLine.setAttribute("y1", L.Y1 - 6); clearLine.setAttribute("y2", L.Y0);
    faultBand.setAttribute("x", L.X0); faultBand.setAttribute("y", L.Y1 - 6);
    faultBand.setAttribute("width", Math.max(0, x - L.X0)); faultBand.setAttribute("height", L.Y0 - L.Y1 + 6);
    var nearRight = x > L.X1 - 110;
    clearLabel.setAttribute("x", nearRight ? x - 6 : x + 6);
    clearLabel.setAttribute("text-anchor", nearRight ? "end" : "start");
    clearLabel.setAttribute("y", L.Y1 - 10);

    verdict.classList.toggle("is-lost", lost);
    verdict.textContent = lost
      ? "Unstable. The generator loses synchronism about " + run.lostAt.toFixed(2) + " s after the fault."
      : "Stable. The rotor angle peaks at " + Math.round(run.peak * DEG) + "° and swings back.";

    trace.classList.remove("is-drawing");
    trace.style.strokeDasharray = "";
    trace.style.strokeDashoffset = "";
    if (animate && typeof trace.getTotalLength === "function") {
      var len = trace.getTotalLength();
      trace.style.strokeDasharray = len;
      trace.style.strokeDashoffset = len;
      void trace.getBoundingClientRect();
      trace.classList.add("is-drawing");
    }
  }

  buildAxes();
  var lastNarrow = L.narrow;
  slider.addEventListener("input", function () { render(false); });
  window.addEventListener("resize", function () {
    var narrow = isNarrow();
    if (narrow !== lastNarrow) { lastNarrow = narrow; buildAxes(); render(false); }
  });

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  render(!reduce);
})();
