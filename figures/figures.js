/* themetaisok.com/figures: one count at a time. d3 7.9.0. Data: window.FIG_DAT = [[name, realized, realistic, max], ...] */
(function () {
  var data = window.FIG_DAT, host = document.getElementById("f-chart");
  if (!host || !window.d3) return;
  var KEYS = { realized: 1, realistic: 2, max: 3 };
  var LABEL = { realized: "Realized", realistic: "Realistic", max: "Max" };
  var state = "realized";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fmt = function (v) { return (v >= 1 ? v.toFixed(2) : v.toFixed(2)).replace(/\.?0+$/, "") + "×"; };
  var rows = data.map(function (d) { return { name: d[0], realized: d[1], realistic: d[2], max: d[3], cross: d[1] < 1 && d[3] >= 1 }; });
  var count = function (k) { return rows.filter(function (r) { return r[k] < 1; }).length; };

  var tally = document.getElementById("f-n"), tallyOf = document.getElementById("f-of");
  tallyOf.textContent = rows.length;
  var buttons = Array.prototype.slice.call(document.querySelectorAll("#f-ctl button[data-k]"));
  var play = document.getElementById("f-play");

  var svg = d3.select(host).append("svg").attr("role", "img")
    .attr("aria-label", "Dot plot of " + rows.length + " treasury companies on a log scale from 0.1 to 10 times, with 1.0 times marked. Use the buttons above to switch between realized, realistic, and max mNAV.");
  var gWash = svg.append("rect").attr("class", "b-wash");
  var gAxis = svg.append("g").attr("class", "b-axis");
  var par = svg.append("line").attr("class", "b-par");
  var head = svg.append("g").attr("class", "b-head");
  head.append("text").attr("class", "l").text("Below the crypto it holds");
  head.append("text").attr("class", "r").text("Above it");
  var gRows = svg.append("g");

  var row = gRows.selectAll("g.b-row").data(rows).join("g")
    .attr("class", function (d) { return "b-row" + (d.cross ? " cross" : ""); })
    .attr("tabindex", 0)
    .attr("aria-label", function (d) { return d.name + ": realized " + fmt(d.realized) + ", realistic " + fmt(d.realistic) + ", max " + fmt(d.max); });
  row.append("rect").attr("class", "b-hit");
  row.append("text").attr("class", "b-nm").attr("dy", "0.35em");
  row.append("line").attr("class", "b-trail");
  row.append("circle").attr("class", "b-ghost").attr("r", 3);
  row.append("circle").attr("class", "b-dot").attr("r", 5.5);

  var x, y, W, H, M;
  function layout() {
    W = Math.max(220, host.clientWidth);
    var narrow = W < 560;
    M = { top: 26, right: narrow ? 14 : 24, bottom: 30, left: narrow ? Math.min(118, Math.round(W * 0.42)) : 228 };
    var rh = narrow ? 24 : 28;
    H = M.top + rows.length * rh + M.bottom;
    svg.attr("viewBox", "0 0 " + W + " " + H).attr("width", W).attr("height", H).classed("narrow", narrow);
    x = d3.scaleLog().domain([0.1, 10]).range([M.left, W - M.right]).clamp(true);
    y = d3.scaleBand().domain(rows.map(function (d) { return d.name; })).range([M.top, H - M.bottom]).paddingInner(0);
    gWash.attr("x", x(1)).attr("y", M.top).attr("width", W - M.right - x(1)).attr("height", H - M.top - M.bottom);
    par.attr("x1", x(1)).attr("x2", x(1)).attr("y1", M.top - 4).attr("y2", H - M.bottom);
    head.select(".l").attr("x", x(1) - 10).attr("y", M.top - 9);
    head.select(".r").attr("x", x(1) + 10).attr("y", M.top - 9);
    gAxis.attr("transform", "translate(0," + (H - M.bottom + 6) + ")")
      .call(d3.axisBottom(x).tickValues([0.1, 0.25, 0.5, 1, 2, 4, 10]).tickFormat(fmt).tickSize(0).tickPadding(6))
      .call(function (g) { g.select(".domain").remove(); });
    row.attr("transform", function (d) { return "translate(0," + (y(d.name) + y.bandwidth() / 2) + ")"; });
    row.select(".b-hit").attr("x", 0).attr("y", -y.bandwidth() / 2).attr("width", W).attr("height", y.bandwidth());
    row.select(".b-nm").attr("x", M.left - 12).each(function (d) {
      var t = d3.select(this).text(d.name), max = M.left - 20;
      var s = d.name;
      while (this.getComputedTextLength() > max && s.length > 4) { s = s.slice(0, -1); t.text(s.trim() + "…"); }
    });
    row.select(".b-ghost").attr("cx", function (d) { return x(d.realized); });
    place(0);
  }

  function place(dur) {
    var k = state;
    var t = row.transition().duration(reduce ? 0 : dur).ease(d3.easeCubicInOut).delay(function (d, i) { return reduce ? 0 : i * 10; });
    t.select(".b-dot").attr("cx", function (d) { return x(d[k]); });
    t.select(".b-trail").attr("x1", function (d) { return x(d.realized); }).attr("x2", function (d) { return x(d[k]); });
    row.classed("above", function (d) { return d[k] >= 1; });
    row.select(".b-ghost").style("opacity", k === "realized" ? 0 : 1);
  }

  function animateCount(to) {
    var from = +tally.textContent || to;
    if (reduce || from === to) { tally.textContent = to; return; }
    d3.select(tally).transition().duration(700).tween("text", function () {
      var i = d3.interpolateRound(from, to), el = this;
      return function (t) { el.textContent = i(t); };
    });
  }

  function set(k, dur) {
    state = k;
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-k") === k ? "true" : "false"); });
    place(dur === undefined ? 750 : dur);
    animateCount(count(k));
    document.getElementById("f-k").textContent = LABEL[k].toLowerCase();
  }

  buttons.forEach(function (b) { b.addEventListener("click", function () { stop(); set(b.getAttribute("data-k")); }); });
  var timer = null;
  function stop() { if (timer) { clearTimeout(timer); timer = null; play.textContent = "Play"; play.setAttribute("aria-pressed", "false"); } }
  play.addEventListener("click", function () {
    if (timer) { stop(); return; }
    var seq = ["realized", "realistic", "max"], i = 0;
    play.textContent = "Stop"; play.setAttribute("aria-pressed", "true");
    (function step() { set(seq[i]); i += 1; if (i < seq.length) { timer = setTimeout(step, 1500); } else { timer = setTimeout(stop, 900); } })();
  });

  // shared tooltip
  row.on("pointermove", function (e, d) { window.tipShow && window.tipShow(this.getAttribute("aria-label"), e.clientX, e.clientY); })
     .on("pointerleave", function () { window.tipHide && window.tipHide(); })
     .on("focus", function () { var q = this.getBoundingClientRect(); window.tipShow && window.tipShow(this.getAttribute("aria-label"), q.left + M.left, q.bottom); })
     .on("blur", function () { window.tipHide && window.tipHide(); });

  layout();
  set("realized", 0);
  host.classList.add("ready");
  var last = W;
  new ResizeObserver(function () { if (Math.abs(host.clientWidth - last) > 2) { last = host.clientWidth; layout(); } }).observe(host);
})();
