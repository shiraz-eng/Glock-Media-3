const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in
const SH = pres.ShapeType;

// ---------- PALETTE ----------
const C = {
  black: "0A0A0B",
  graphite: "16171A",
  charcoal: "1F2023",
  white: "F5F5F4",
  gray: "9A9A9E",
  dim: "5C5C60",
  blue: "3B82F6",
  emerald: "10B981",
  amber: "F59E0B",
  crimson: "EF4444",
  purple: "A855F7",
};

const FONT = "Arial";
const W = 13.333, H = 7.5;

// ---------- HELPERS ----------
function bgSlide(chapter, pageLabel, bg) {
  const s = pres.addSlide();
  s.background = { color: bg || C.black };
  // wayfinding footer (subtle, not a decorative stripe)
  s.addText(chapter, {
    x: 0.6, y: H - 0.55, w: 6, h: 0.35, fontFace: FONT, fontSize: 9,
    color: C.dim, align: "left", charSpacing: 2,
  });
  s.addText(pageLabel, {
    x: W - 2.1, y: H - 0.55, w: 1.5, h: 0.35, fontFace: FONT, fontSize: 9,
    color: C.dim, align: "right", charSpacing: 2,
  });
  return s;
}

function headline(s, text, opts = {}) {
  s.addText(text, Object.assign({
    x: 0.7, y: 0.55, w: W - 1.4, h: 0.9,
    fontFace: FONT, fontSize: 28, bold: true, color: C.white,
    align: "left", charSpacing: 0.2,
  }, opts));
}

function kicker(s, text, opts = {}) {
  s.addText(text.toUpperCase(), Object.assign({
    x: 0.7, y: 0.3, w: 8, h: 0.3, fontFace: FONT, fontSize: 11,
    color: C.dim, align: "left", charSpacing: 2,
  }, opts));
}

function line(s, x1, y1, x2, y2, opts = {}) {
  s.addShape(SH.line, Object.assign({
    x: Math.min(x1, x2), y: Math.min(y1, y2),
    w: Math.abs(x2 - x1) || 0.001, h: Math.abs(y2 - y1) || 0.001,
    line: { color: C.dim, width: 1.5 },
    flipH: x2 < x1, flipV: y2 < y1,
  }, opts));
}

function node(s, cx, cy, d, opts = {}) {
  s.addShape(SH.ellipse, Object.assign({
    x: cx - d / 2, y: cy - d / 2, w: d, h: d,
    fill: { color: C.graphite }, line: { color: C.gray, width: 1.5 },
  }, opts));
}

function label(s, text, cx, cy, opts = {}) {
  s.addText(text, Object.assign({
    x: cx - 1, y: cy - 0.18, w: 2, h: 0.36, fontFace: FONT, fontSize: 11,
    color: C.gray, align: "center", valign: "middle",
  }, opts));
}

function breathingSlide(chapter, pageLabel, text) {
  const s = bgSlide(chapter, pageLabel, C.black);
  s.addText(text, {
    x: 0.9, y: 2.9, w: 9.5, h: 1.6, fontFace: FONT, fontSize: 34, bold: true,
    color: C.white, align: "left", valign: "middle",
  });
  line(s, 8.9, 3.75, 12.6, 3.75, { line: { color: C.dim, width: 1.5 } });
  return s;
}

function heroQuote(chapter, pageLabel, quote, footNote) {
  const s = bgSlide(chapter, pageLabel, C.black);
  s.addShape(SH.line, { x: 6.55, y: 1.3, w: 0.001, h: 0.001 }); // no-op spacer
  s.addText("“", {
    x: 5.9, y: 0.85, w: 1.5, h: 1, fontFace: "Georgia", fontSize: 44,
    color: C.purple, align: "center",
  });
  s.addText(quote, {
    x: 2.2, y: 2.4, w: 8.9, h: 2.4, fontFace: FONT, fontSize: 30, bold: true,
    color: C.white, align: "center", valign: "middle", italic: false,
  });
  if (footNote) {
    s.addText(footNote.toUpperCase(), {
      x: 1.5, y: 6.15, w: 10.3, h: 0.5, fontFace: FONT, fontSize: 11,
      color: C.gray, align: "center", charSpacing: 1.5,
    });
  }
  return s;
}

// generic timeline component used by B1 and H2
function stageTimeline(s, opts) {
  const stages = [
    { label: "$0–50K", tag: "PRODUCT-MARKET FIT", color: C.purple },
    { label: "$50–200K", tag: "CREATIVE", color: C.blue },
    { label: "$200–500K", tag: "SYSTEMS", color: C.emerald },
    { label: "$500K+", tag: "FOUNDER", color: C.crimson },
  ];
  const axisY = 4.0, x0 = 1.3, x1 = 12.0;
  line(s, x0, axisY, x1, axisY, { line: { color: C.dim, width: 2 } });
  const n = stages.length;
  const positions = stages.map((_, i) => x0 + (i * (x1 - x0)) / (n - 1));

  stages.forEach((st, i) => {
    const cx = positions[i];
    const active = opts.allLit || opts.activeIndex === i;
    const tagColor = active ? st.color : C.dim;
    const tickColor = active ? st.color : C.dim;
    // tick
    s.addShape(SH.rect, { x: cx - 0.012, y: axisY - 0.09, w: 0.024, h: 0.18, fill: { color: tickColor } });
    // range label under axis
    s.addText(st.label, {
      x: cx - 0.9, y: axisY + 0.22, w: 1.8, h: 0.3, fontFace: FONT, fontSize: 12,
      color: C.gray, align: "center",
    });
    // tag pill above axis
    const pillW = 2.0, pillH = 0.5;
    s.addShape(SH.roundRect, {
      x: cx - pillW / 2, y: axisY - 1.05, w: pillW, h: pillH, rectRadius: 0.08,
      fill: { color: active ? C.charcoal : C.graphite },
      line: { color: tagColor, width: active ? 1.75 : 1 },
    });
    s.addText(st.tag, {
      x: cx - pillW / 2, y: axisY - 1.05, w: pillW, h: pillH, fontFace: FONT,
      fontSize: 12, bold: active, color: active ? C.white : C.dim, align: "center", valign: "middle",
    });
    // connector from pill to axis
    line(s, cx, axisY - 0.55, cx, axisY - 0.1, { line: { color: tagColor, width: active ? 1.5 : 0.75 } });
  });

  if (opts.marker !== undefined) {
    // single glowing dot marker at a given stage index
    const mx = positions[opts.marker];
    s.addShape(SH.ellipse, {
      x: mx - 0.14, y: axisY - 0.14, w: 0.28, h: 0.28,
      fill: { color: C.blue }, line: { color: C.white, width: 1 },
    });
  }
  if (opts.markerBar) {
    // glowing bar spanning full axis (H2 payoff version)
    s.addShape(SH.rect, {
      x: x0, y: axisY - 0.05, w: x1 - x0, h: 0.1,
      fill: { color: C.white, transparency: 55 }, line: { type: "none" },
    });
  }
}

// ============================================================
// CHAPTER A — THE PLATEAU MYTH
// ============================================================

// A1 — Hero Cold Open
(function A1() {
  const s = bgSlide("CHAPTER A — THE PLATEAU MYTH", "01 / 26", C.black);
  s.addText("$500,000/MO.", {
    x: 0.5, y: 2.15, w: 12.33, h: 1.6, fontFace: FONT, fontSize: 66, bold: true,
    color: C.white, align: "center",
  });
  line(s, 2.2, 4.0, 11.1, 4.0, { line: { color: C.dim, width: 1.5 } });
  s.addText("MONTHLY REVENUE — 4 MONTHS RUNNING", {
    x: 0.5, y: 4.15, w: 12.33, h: 0.35, fontFace: FONT, fontSize: 12,
    color: C.gray, align: "center", charSpacing: 2,
  });
  s.addText("Then it stopped.", {
    x: 0.5, y: 4.65, w: 12.33, h: 0.5, fontFace: FONT, fontSize: 20,
    color: C.gray, align: "center", italic: true,
  });
})();

// A2 — Tunnel Vision Diagram
(function A2() {
  const s = bgSlide("CHAPTER A — THE PLATEAU MYTH", "02 / 26", C.black);
  headline(s, "EVERYONE LOOKS HERE FIRST.");
  // funnel via trapezoid (wide->narrow), pointing right: use trapezoid rotated
  s.addShape(SH.trapezoid, {
    x: 1.3, y: 2.1, w: 7.6, h: 3.2, rotate: 90 - 0, flipH: true,
    fill: { type: "none" }, line: { color: C.dim, width: 1.5 },
  });
  // scattered faded labels (left/wide mouth area)
  const scattered = ["Offer", "Ops", "Retention", "Cash Flow", "Inventory", "Reporting", "Team"];
  const sx = [1.7, 2.3, 1.9, 2.6, 2.1, 1.6, 2.4];
  const sy = [2.35, 2.75, 3.15, 3.55, 3.95, 4.35, 4.7];
  scattered.forEach((t, i) => {
    s.addText(t, {
      x: sx[i], y: sy[i], w: 1.6, h: 0.3, fontFace: FONT, fontSize: 13,
      color: C.dim, align: "left",
    });
  });
  // ADS glowing tip
  s.addShape(SH.ellipse, {
    x: 9.6, y: 3.45, w: 0.35, h: 0.35, fill: { color: C.crimson }, line: { type: "none" },
  });
  s.addText("ADS", {
    x: 9.4, y: 3.85, w: 1.4, h: 0.5, fontFace: FONT, fontSize: 24, bold: true,
    color: C.crimson, align: "center",
  });
})();

// ============================================================
// CHAPTER B — THE STAGE LADDER
// ============================================================

// B1 — Bottleneck Timeline (first statement)
(function B1() {
  const s = bgSlide("CHAPTER B — THE STAGE LADDER", "03 / 26", C.black);
  headline(s, "THE BOTTLENECK ALWAYS MOVES.");
  stageTimeline(s, { activeIndex: 3, marker: 3 });
  s.addText("Every stage of scale rewards a different constraint — and hides the next one.", {
    x: 0.7, y: 5.6, w: 11, h: 0.5, fontFace: FONT, fontSize: 14, italic: true,
    color: C.gray, align: "left",
  });
})();

// B2 — Inflection Zoom
(function B2() {
  const s = bgSlide("CHAPTER B — THE STAGE LADDER", "04 / 26", C.black);
  headline(s, "WHAT GOT YOU HERE WON'T SCALE YOU FURTHER.");
  line(s, 6.65, 1.7, 6.65, 6.6, { line: { color: C.dim, width: 1.5 } });
  // left panel
  s.addText("$0 → $200K", { x: 0.9, y: 1.9, w: 5, h: 0.4, fontFace: FONT, fontSize: 12, color: C.gray, charSpacing: 1.5 });
  s.addText("MARKETING SOLVES IT.", { x: 0.9, y: 2.35, w: 5.4, h: 0.7, fontFace: FONT, fontSize: 24, bold: true, color: C.emerald });
  ["Find the product", "Build the offer", "Refresh the creative"].forEach((t, i) => {
    s.addText(t, { x: 0.9, y: 3.3 + i * 0.5, w: 5.4, h: 0.4, fontFace: FONT, fontSize: 15, color: C.gray });
  });
  // right panel
  s.addText("$200K → $500K+", { x: 6.95, y: 1.9, w: 5, h: 0.4, fontFace: FONT, fontSize: 12, color: C.gray, charSpacing: 1.5 });
  s.addText("MARKETING ISN'T ENOUGH.", { x: 6.95, y: 2.35, w: 5.6, h: 0.7, fontFace: FONT, fontSize: 24, bold: true, color: C.amber });
  ["Manage a bigger team", "Forecast inventory", "Balance cash flow"].forEach((t, i) => {
    s.addText(t, { x: 6.95, y: 3.3 + i * 0.5, w: 5.4, h: 0.4, fontFace: FONT, fontSize: 15, color: C.gray });
  });
})();

// ============================================================
// CHAPTER C — THE BUSINESS-AS-SYSTEM REFRAME
// ============================================================

// C1 — Ecosystem Map
(function C1() {
  const s = bgSlide("CHAPTER C — THE SYSTEM REFRAME", "05 / 26", C.black);
  headline(s, "THIS IS THE SYSTEM. ADS ARE ONE NODE.");
  const leftX = 1.7, rightX = 11.6, midY = 4.1;
  // anchors
  s.addShape(SH.roundRect, { x: leftX - 0.9, y: midY - 0.4, w: 1.8, h: 0.8, rectRadius: 0.06, fill: { color: C.charcoal }, line: { color: C.blue, width: 2 } });
  s.addText("ACQUISITION", { x: leftX - 0.9, y: midY - 0.4, w: 1.8, h: 0.8, fontFace: FONT, fontSize: 12, bold: true, color: C.blue, align: "center", valign: "middle" });
  s.addShape(SH.roundRect, { x: rightX - 0.9, y: midY - 0.4, w: 1.8, h: 0.8, rectRadius: 0.06, fill: { color: C.charcoal }, line: { color: C.emerald, width: 2 } });
  s.addText("RETENTION", { x: rightX - 0.9, y: midY - 0.4, w: 1.8, h: 0.8, fontFace: FONT, fontSize: 12, bold: true, color: C.emerald, align: "center", valign: "middle" });

  const funcs = ["Offer", "Creative", "Reporting", "Operations", "Inventory", "Customer\nExperience", "Cash Flow", "Decision-\nMaking"];
  const n = funcs.length;
  const arcX0 = leftX + 1.6, arcX1 = rightX - 1.6;
  funcs.forEach((f, i) => {
    const t = i / (n - 1);
    const cx = arcX0 + t * (arcX1 - arcX0);
    const cy = midY - 1.15 + Math.sin(Math.PI * t) * 1.15; // arc bow upward
    // connectors to both anchors
    line(s, leftX, midY, cx, cy, { line: { color: C.dim, width: 0.75 } });
    line(s, cx, cy, rightX, midY, { line: { color: C.dim, width: 0.75 } });
    const isCreative = f === "Creative";
    node(s, cx, cy, 0.62, { line: { color: isCreative ? C.crimson : C.gray, width: isCreative ? 1.75 : 1.25 } });
    s.addText(f, { x: cx - 0.75, y: cy + 0.36, w: 1.5, h: 0.5, fontFace: FONT, fontSize: 10.5, color: C.gray, align: "center" });
  });
})();

// C2 — Pressure System
(function C2() {
  const s = bgSlide("CHAPTER C — THE SYSTEM REFRAME", "06 / 26", C.black);
  headline(s, "A WINNING AD DOESN'T FIX A BROKEN SYSTEM. IT FLOODS IT.", { fontSize: 24 });
  const pipeY = 4.0, pipeH = 1.1;
  // wide inlet
  s.addShape(SH.rect, { x: 1.0, y: pipeY - pipeH / 2, w: 4.6, h: pipeH, fill: { type: "none" }, line: { color: C.gray, width: 1.5 } });
  // constriction (trapezoid narrowing)
  s.addShape(SH.trapezoid, { x: 5.6, y: pipeY - 0.35, w: 1.6, h: 0.7, fill: { type: "none" }, line: { color: C.crimson, width: 1.5 }, rotate: 180 });
  // narrow outlet
  s.addShape(SH.rect, { x: 7.2, y: pipeY - 0.2, w: 4.6, h: 0.4, fill: { type: "none" }, line: { color: C.gray, width: 1.5 } });
  s.addText("CAPACITY CONSTRAINT", { x: 5.3, y: pipeY + 0.55, w: 2.2, h: 0.35, fontFace: FONT, fontSize: 10.5, color: C.crimson, align: "center", charSpacing: 1 });

  // inflow particles (even)
  for (let i = 0; i < 5; i++) {
    s.addShape(SH.ellipse, { x: 1.4 + i * 0.75, y: pipeY - 0.13, w: 0.26, h: 0.26, fill: { color: C.blue }, line: { type: "none" } });
  }
  // backup cluster near constriction
  const backupX = [4.9, 5.05, 5.2, 5.35, 5.15];
  const backupY = [pipeY - 0.3, pipeY - 0.05, pipeY + 0.2, pipeY - 0.15, pipeY + 0.05];
  backupX.forEach((x, i) => {
    s.addShape(SH.ellipse, { x, y: backupY[i], w: 0.22, h: 0.22, fill: { color: C.crimson, transparency: 10 }, line: { type: "none" } });
  });
  // thin trickle outflow
  for (let i = 0; i < 3; i++) {
    s.addShape(SH.ellipse, { x: 7.6 + i * 1.2, y: pipeY - 0.07, w: 0.14, h: 0.14, fill: { color: C.dim }, line: { type: "none" } });
  }
})();

// C3 — Right Question vs Wrong Question
(function C3() {
  const s = bgSlide("CHAPTER C — THE SYSTEM REFRAME", "07 / 26", C.black);
  line(s, 1.0, 3.6, 12.3, 3.6, { line: { color: C.purple, width: 1 } });
  s.addText('"What ad should we make next?"', {
    x: 1.5, y: 1.6, w: 10.3, h: 1.3, fontFace: FONT, fontSize: 24, italic: true,
    color: C.dim, align: "center", valign: "middle", strike: true,
  });
  s.addShape(SH.downArrow, { x: 6.47, y: 3.35, w: 0.4, h: 0.4, fill: { color: C.purple }, line: { type: "none" } });
  s.addText('"WHAT\'S THE BIGGEST CONSTRAINT TODAY?"', {
    x: 1.0, y: 4.1, w: 11.3, h: 1.6, fontFace: FONT, fontSize: 30, bold: true,
    color: C.purple, align: "center", valign: "middle",
  });
})();

// C4 — Breathing page
breathingSlide("CHAPTER C — THE SYSTEM REFRAME", "08 / 26", "THE BOTTLENECK IS NEVER WHERE YOU'RE LOOKING.");

// ============================================================
// CHAPTER D — THE CREATIVE SYSTEM SHIFT
// ============================================================

// D1 — Two Loops
(function D1() {
  const s = bgSlide("CHAPTER D — THE CREATIVE SYSTEM", "09 / 26", C.black);
  headline(s, "ONE LOOP REPEATS. THE OTHER COMPOUNDS.");
  // left flat loop
  const lcx = 3.5, lcy = 4.2, lr = 1.25;
  s.addShape(SH.ellipse, { x: lcx - lr, y: lcy - lr, w: lr * 2, h: lr * 2, fill: { type: "none" }, line: { color: C.amber, width: 2 } });
  ["Launch", "Win / Lose", "Repeat"].forEach((t, i) => {
    const ang = (Math.PI * 2 * i) / 3 - Math.PI / 2;
    const tx = lcx + Math.cos(ang) * lr, ty = lcy + Math.sin(ang) * lr;
    s.addText(t, { x: tx - 0.7, y: ty - 0.18, w: 1.4, h: 0.36, fontFace: FONT, fontSize: 11, color: C.amber, align: "center", valign: "middle" });
  });
  s.addText("Same result, six weeks later.", { x: lcx - 1.8, y: lcy + lr + 0.35, w: 3.6, h: 0.4, fontFace: FONT, fontSize: 13, italic: true, color: C.gray, align: "center" });

  // right spiral loop (approximate: three concentric arcs growing)
  const rcx = 9.6, rcy = 4.2;
  [0.7, 1.0, 1.3].forEach((rr, i) => {
    s.addShape(SH.arc, { x: rcx - rr, y: rcy - rr, w: rr * 2, h: rr * 2, angleRange: [0, 300], fill: { type: "none" }, line: { color: C.blue, width: 2 } });
  });
  ["Hypothesis", "Result", "Insight"].forEach((t, i) => {
    const ang = (Math.PI * 2 * i) / 3 - Math.PI / 2;
    const rr = 1.55;
    const tx = rcx + Math.cos(ang) * rr, ty = rcy + Math.sin(ang) * rr;
    s.addText(t, { x: tx - 0.7, y: ty - 0.18, w: 1.4, h: 0.36, fontFace: FONT, fontSize: 11, color: C.blue, align: "center", valign: "middle" });
  });
  s.addText("Different result, every time.", { x: rcx - 1.8, y: rcy + 1.55 + 0.25, w: 3.6, h: 0.4, fontFace: FONT, fontSize: 13, italic: true, color: C.gray, align: "center" });
})();

// D2 — Experiment Framework Card
(function D2() {
  const s = bgSlide("CHAPTER D — THE CREATIVE SYSTEM", "10 / 26", C.black);
  headline(s, "TREAT EVERY CAMPAIGN LIKE AN EXPERIMENT.");
  const cols = [
    ["HYPOTHESIS", "What do we believe this ad will prove?"],
    ["RESULT", "What happened?"],
    ["WHY", "Why do we think it happened?"],
    ["NEXT TEST", "What does this tell us to try next?"],
  ];
  const cardX = 1.0, cardY = 2.3, cardW = 11.3, cardH = 3.1;
  s.addShape(SH.roundRect, { x: cardX, y: cardY, w: cardW, h: cardH, rectRadius: 0.06, fill: { color: C.graphite }, line: { color: C.charcoal, width: 1 } });
  const colW = cardW / 4;
  cols.forEach((c, i) => {
    const cx = cardX + i * colW;
    if (i > 0) line(s, cx, cardY + 0.3, cx, cardY + cardH - 0.3, { line: { color: C.charcoal, width: 1 } });
    s.addText(c[0], { x: cx + 0.25, y: cardY + 0.45, w: colW - 0.5, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: C.blue });
    s.addText(c[1], { x: cx + 0.25, y: cardY + 1.0, w: colW - 0.5, h: 1.8, fontFace: FONT, fontSize: 13, color: C.gray, valign: "top" });
    if (i < 3) {
      s.addShape(SH.rightArrow, { x: cx + colW - 0.3, y: cardY + 0.5, w: 0.35, h: 0.2, fill: { color: C.blue }, line: { type: "none" } });
    }
  });
})();

// D3 — 10 Creatives Example
(function D3() {
  const s = bgSlide("CHAPTER D — THE CREATIVE SYSTEM", "11 / 26", C.black);
  headline(s, "10 CREATIVES. 2 WINNERS. 0 REPEATABLE INSIGHT.", { fontSize: 24 });
  const rowY = 2.1, cardW = 0.85, cardH = 1.0, gap = 0.24, startX = 1.0;
  for (let i = 0; i < 10; i++) {
    const x = startX + i * (cardW + gap);
    const isWinner = i === 2 || i === 6;
    s.addShape(SH.roundRect, {
      x, y: isWinner ? rowY - 0.15 : rowY, w: cardW, h: cardH, rectRadius: 0.05,
      fill: { color: C.graphite }, line: { color: isWinner ? C.emerald : C.dim, width: isWinner ? 2 : 1 },
      shadow: isWinner ? { type: "outer", color: "000000", opacity: 0.4, blur: 6, offset: 3, angle: 90 } : undefined,
    });
    s.addText(String(i + 1), { x, y: rowY + cardH + (isWinner ? 0.0 : 0.05), w: cardW, h: 0.3, fontFace: FONT, fontSize: 10, color: C.gray, align: "center" });
  }
  line(s, 1.0, 3.9, 12.3, 3.9, { line: { color: C.dim, width: 1, dashType: "dash" } });
  s.addText("6 WEEKS LATER", { x: 1.0, y: 3.98, w: 11.3, h: 0.3, fontFace: FONT, fontSize: 11, color: C.gray, align: "center", charSpacing: 2 });

  const row2Y = 4.5;
  for (let i = 0; i < 10; i++) {
    const x = startX + i * (cardW + gap);
    s.addShape(SH.roundRect, { x, y: row2Y, w: cardW, h: cardH, rectRadius: 0.05, fill: { color: C.graphite, transparency: 65 }, line: { color: C.dim, width: 1 } });
  }
  s.addText("?", { x: 6.0, y: row2Y + 0.15, w: 1.3, h: 0.9, fontFace: FONT, fontSize: 40, bold: true, color: C.crimson, align: "center" });
})();

// D4 — Breathing
breathingSlide("CHAPTER D — THE CREATIVE SYSTEM", "12 / 26", "DOCUMENTATION IS WHAT TURNS LUCK INTO A SYSTEM.");

// ============================================================
// CHAPTER E — OFFER FATIGUE > CREATIVE FATIGUE
// ============================================================

// E1 — Worn Groove vs Living Offer (waveform)
(function E1() {
  const s = bgSlide("CHAPTER E — OFFER FATIGUE", "13 / 26", C.black);
  headline(s, "THE CREATIVE CHANGED. THE OFFER DIDN'T.");
  s.addText("CREATIVE", { x: 0.7, y: 2.0, w: 2, h: 0.3, fontFace: FONT, fontSize: 11, color: C.gray, charSpacing: 1.5 });
  // busy waveform via zigzag segments
  const wx0 = 0.9, wx1 = 12.2, wy = 2.55, amp = 0.35;
  const pts = 14;
  const colors = [C.blue, C.purple, C.emerald];
  for (let i = 0; i < pts - 1; i++) {
    const x1 = wx0 + (i * (wx1 - wx0)) / pts;
    const x2 = wx0 + ((i + 1) * (wx1 - wx0)) / pts;
    const y1 = wy + Math.sin(i * 1.3) * amp;
    const y2 = wy + Math.sin((i + 1) * 1.3) * amp;
    line(s, x1, y1, x2, y2, { line: { color: colors[i % colors.length], width: 2 } });
  }
  ["MONTH 1", "MONTH 3", "MONTH 6"].forEach((t, i) => {
    const x = wx0 + (i + 1) * (wx1 - wx0) / 4;
    line(s, x, 2.0, x, 5.0, { line: { color: C.dim, width: 0.75, dashType: "dash" } });
    s.addText(t, { x: x - 0.6, y: 5.05, w: 1.2, h: 0.3, fontFace: FONT, fontSize: 10, color: C.dim, align: "center" });
  });
  s.addText("OFFER", { x: 0.7, y: 4.25, w: 2, h: 0.3, fontFace: FONT, fontSize: 11, color: C.gray, charSpacing: 1.5 });
  line(s, wx0, 4.7, wx1, 4.7, { line: { color: C.amber, width: 3 } });
})();

// E2 — Sameness Grid
(function E2() {
  const s = bgSlide("CHAPTER E — OFFER FATIGUE", "14 / 26", C.black);
  headline(s, "EVERY BRAND IS SAYING THE SAME THING.");
  const cols = 4, rows = 4, cw = 1.7, ch = 0.9, gapX = 0.3, gapY = 0.25;
  const gridW = cols * cw + (cols - 1) * gapX;
  const startX = (W - gridW) / 2, startY = 1.95;
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * (cw + gapX), y = startY + r * (ch + gapY);
      const isYou = idx === 9;
      s.addShape(SH.roundRect, {
        x, y, w: cw, h: ch, rectRadius: 0.04, fill: { color: C.graphite },
        line: { color: isYou ? C.purple : C.dim, width: isYou ? 1.75 : 1 },
      });
      s.addText("★", { x, y: y + 0.05, w: cw, h: ch - 0.3, fontFace: FONT, fontSize: 14, color: C.dim, align: "center", valign: "middle" });
      if (isYou) {
        s.addText("YOU?", { x, y: y + ch + 0.02, w: cw, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: C.purple, align: "center" });
      }
      idx++;
    }
  }
})();

// E3 — Reframe hero
heroQuote("CHAPTER E — OFFER FATIGUE", "15 / 26",
  '"If I saw this offer for the first time today — would it stand out?"',
  'The question that replaces "what creative should we test next?"');

// ============================================================
// CHAPTER F — CUSTOMER ECONOMICS
// ============================================================

// F1 — Iceberg
(function F1() {
  const s = bgSlide("CHAPTER F — CUSTOMER ECONOMICS", "16 / 26", C.black);
  headline(s, "ROAS IS THE TIP. YOUR BUSINESS IS UNDERNEATH.", { fontSize: 24 });
  const waterY = 2.6;
  line(s, 1.0, waterY, 12.3, waterY, { line: { color: C.gray, width: 1.5 } });
  // tip
  s.addShape(SH.triangle, { x: 5.9, y: waterY - 0.9, w: 1.5, h: 0.9, fill: { color: C.blue }, line: { type: "none" } });
  s.addText("3.0 ROAS", { x: 5.15, y: waterY - 1.35, w: 3.0, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: C.blue, align: "center" });
  // submerged mass (large inverted triangle)
  s.addShape(SH.triangle, { x: 3.9, y: waterY, w: 5.5, h: 3.6, flipV: true, fill: { color: C.charcoal, transparency: 10 }, line: { color: C.dim, width: 1 } });
  ["GROSS MARGIN", "REPEAT PURCHASE RATE", "CUSTOMER LIFETIME VALUE", "CASH FLOW TIMING"].forEach((t, i) => {
    s.addText(t, { x: 4.4, y: waterY + 0.4 + i * 0.7, w: 4.5, h: 0.4, fontFace: FONT, fontSize: 13, color: C.gray, align: "center" });
  });
})();

// F2 — Brand A vs B Dashboard
(function F2() {
  const s = bgSlide("CHAPTER F — CUSTOMER ECONOMICS", "17 / 26", C.black);
  headline(s, "SAME ROAS. OPPOSITE BUSINESS.");
  const cardY = 1.9, cardW = 5.4, cardH = 4.6;
  const leftX = 0.9, rightX = 7.0;
  [
    { x: leftX, label: "BRAND A", color: C.emerald, metrics: [["Gross Margin", "70%", 0.9], ["Repeat Purchase Rate", "High", 0.85], ["Reacquisition Needed", "Low", 0.25]] },
    { x: rightX, label: "BRAND B", color: C.crimson, metrics: [["Gross Margin", "45%", 0.5], ["Repeat Purchase Rate", "Low", 0.2], ["Reacquisition Needed", "High", 0.9]] },
  ].forEach((card) => {
    s.addShape(SH.roundRect, { x: card.x, y: cardY, w: cardW, h: cardH, rectRadius: 0.06, fill: { color: C.graphite }, line: { color: C.charcoal, width: 1 } });
    s.addText(card.label, { x: card.x + 0.4, y: cardY + 0.3, w: cardW - 0.8, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: C.white, charSpacing: 1 });
    s.addText("3.0 ROAS", { x: card.x, y: cardY + 0.85, w: cardW, h: 0.7, fontFace: FONT, fontSize: 32, bold: true, color: C.white, align: "center" });
    card.metrics.forEach((m, i) => {
      const my = cardY + 2.0 + i * 0.85;
      s.addText(`${m[0]} — ${m[1]}`, { x: card.x + 0.4, y: my, w: cardW - 0.8, h: 0.3, fontFace: FONT, fontSize: 13, color: C.gray });
      s.addShape(SH.rect, { x: card.x + 0.4, y: my + 0.32, w: (cardW - 0.8) * m[2], h: 0.16, fill: { color: card.color }, line: { type: "none" } });
      s.addShape(SH.rect, { x: card.x + 0.4, y: my + 0.32, w: cardW - 0.8, h: 0.16, fill: { type: "none" }, line: { color: C.charcoal, width: 0.75 } });
    });
  });
  line(s, 6.65, 2.0, 6.65, 6.4, { line: { color: C.dim, width: 1 } });
  s.addText("IDENTICAL ON THE SURFACE", { x: 5.15, y: 6.55, w: 3.0, h: 0.3, fontFace: FONT, fontSize: 10, color: C.dim, align: "center", charSpacing: 1.5 });
})();

// F3 — ROAS to Customer Value hero
(function F3() {
  const s = bgSlide("CHAPTER F — CUSTOMER ECONOMICS", "18 / 26", C.black);
  headline(s, "STOP OPTIMIZING ROAS. START BUILDING CUSTOMER VALUE.", { fontSize: 24 });
  s.addText("ROAS", { x: 0.9, y: 3.3, w: 3.2, h: 1.0, fontFace: FONT, fontSize: 34, color: C.dim, align: "left", valign: "middle" });
  s.addShape(SH.rightArrow, { x: 4.3, y: 3.6, w: 1.6, h: 0.5, fill: { color: C.emerald }, line: { type: "none" } });
  s.addText("CUSTOMER VALUE", { x: 6.1, y: 2.9, w: 6.3, h: 1.6, fontFace: FONT, fontSize: 50, bold: true, color: C.emerald, align: "left", valign: "middle" });
})();

// F4 — Breathing
breathingSlide("CHAPTER F — CUSTOMER ECONOMICS", "19 / 26", "REVENUE HIDES PROBLEMS. MARGIN REVEALS THEM.");

// ============================================================
// CHAPTER G — THE FOUNDER BECOMES THE BOTTLENECK
// ============================================================

// G1 — Dependency Hub
(function G1() {
  const s = bgSlide("CHAPTER G — THE FOUNDER BOTTLENECK", "20 / 26", C.black);
  headline(s, "EVERY DECISION ROUTES THROUGH ONE PERSON.");
  const cx = 6.65, cy = 4.3, R = 2.1;
  const spokes = ["Campaign\nLaunches", "Hiring", "Pricing", "New Offers", "Creative\nApprovals", "Budget\nChanges"];
  spokes.forEach((t, i) => {
    const ang = (Math.PI * 2 * i) / spokes.length - Math.PI / 2;
    const nx = cx + Math.cos(ang) * R, ny = cy + Math.sin(ang) * R;
    line(s, nx, ny, cx, cy, { line: { color: C.crimson, width: 1, transparency: 30 } });
    node(s, nx, ny, 0.6, { line: { color: C.gray, width: 1 } });
    s.addText(t, { x: nx - 0.75, y: ny + 0.36, w: 1.5, h: 0.45, fontFace: FONT, fontSize: 10, color: C.gray, align: "center" });
  });
  s.addShape(SH.ellipse, { x: cx - 0.55, y: cy - 0.55, w: 1.1, h: 1.1, fill: { color: C.crimson }, line: { type: "none" } });
  s.addText("FOUNDER", { x: cx - 0.8, y: cy - 0.18, w: 1.6, h: 0.36, fontFace: FONT, fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle" });
})();

// G2 — Two-Week Test
(function G2() {
  const s = heroQuote("CHAPTER G — THE FOUNDER BOTTLENECK", "21 / 26",
    '"If you disappeared for two weeks — what would stop moving?"', null);
  const items = ["Campaign Launches", "Hiring", "Pricing", "New Offers", "Creative Approvals", "Budget Changes"];
  const startX = 1.0, gap = (11.3) / items.length;
  items.forEach((t, i) => {
    s.addText(t, { x: startX + i * gap, y: 5.4, w: gap - 0.1, h: 0.6, fontFace: FONT, fontSize: 10, color: C.dim, align: "center" });
  });
})();

// G3 — Dependency vs Leverage
(function G3() {
  const s = bgSlide("CHAPTER G — THE FOUNDER BOTTLENECK", "22 / 26", C.black);
  headline(s, "DEPENDENCY VS. LEVERAGE.");
  line(s, 6.65, 1.9, 6.65, 6.7, { line: { color: C.dim, width: 1 } });
  // left mini hub (faded)
  const lcx = 3.3, lcy = 4.3, lr = 1.15;
  for (let i = 0; i < 5; i++) {
    const ang = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const nx = lcx + Math.cos(ang) * lr, ny = lcy + Math.sin(ang) * lr;
    line(s, nx, ny, lcx, lcy, { line: { color: C.crimson, width: 0.75, transparency: 50 } });
    node(s, nx, ny, 0.3, { line: { color: C.dim, width: 0.75 } });
  }
  s.addShape(SH.ellipse, { x: lcx - 0.28, y: lcy - 0.28, w: 0.56, h: 0.56, fill: { color: C.crimson, transparency: 30 }, line: { type: "none" } });
  s.addText("DEPENDENCY", { x: lcx - 1.3, y: lcy + lr + 0.35, w: 2.6, h: 0.35, fontFace: FONT, fontSize: 12, color: C.crimson, align: "center" });

  // right mesh (all-to-all)
  const rcx = 9.9, rcy = 4.3, rr = 1.15;
  const meshPts = [];
  for (let i = 0; i < 6; i++) {
    const ang = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    meshPts.push([rcx + Math.cos(ang) * rr, rcy + Math.sin(ang) * rr]);
  }
  for (let i = 0; i < 6; i++) {
    for (let j = i + 1; j < 6; j++) {
      line(s, meshPts[i][0], meshPts[i][1], meshPts[j][0], meshPts[j][1], { line: { color: C.blue, width: 0.5, transparency: 40 } });
    }
  }
  meshPts.forEach((p) => node(s, p[0], p[1], 0.3, { line: { color: C.blue, width: 1 } }));
  s.addText("LEVERAGE", { x: rcx - 1.3, y: rcy + rr + 0.35, w: 2.6, h: 0.35, fontFace: FONT, fontSize: 12, color: C.blue, align: "center" });
})();

// ============================================================
// CHAPTER H — THE UNIVERSAL LAW + CLOSE
// ============================================================

// H1 — Constraint Loop
(function H1() {
  const s = bgSlide("CHAPTER H — THE UNIVERSAL LAW", "23 / 26", C.black);
  headline(s, "FIND IT. FIX IT. REPEAT.");
  const cx = 6.65, cy = 4.3, r = 1.6;
  s.addShape(SH.ellipse, { x: cx - r, y: cy - r, w: r * 2, h: r * 2, fill: { type: "none" }, line: { color: C.emerald, width: 2.5 } });
  const steps = ["FIND THE\nCONSTRAINT", "FIX IT", "SCALE"];
  steps.forEach((t, i) => {
    const ang = (Math.PI * 2 * i) / 3 - Math.PI / 2;
    const tx = cx + Math.cos(ang) * r, ty = cy + Math.sin(ang) * r;
    s.addShape(SH.ellipse, { x: tx - 0.12, y: ty - 0.12, w: 0.24, h: 0.24, fill: { color: C.emerald }, line: { type: "none" } });
    s.addText(t, { x: tx - 1.0, y: ty + 0.18, w: 2.0, h: 0.55, fontFace: FONT, fontSize: 13, bold: true, color: C.emerald, align: "center" });
  });
})();

// H2 — Bottleneck timeline (completed bookend)
(function H2() {
  const s = bgSlide("CHAPTER H — THE UNIVERSAL LAW", "24 / 26", C.black);
  headline(s, "THE BOTTLENECK ALWAYS MOVES. YOURS IS SOMEWHERE ON THIS LINE.", { fontSize: 22 });
  stageTimeline(s, { allLit: true, markerBar: true });
})();

// H3 — Closing CTA
(function H3() {
  const s = bgSlide("CHAPTER H — THE UNIVERSAL LAW", "25 / 26", C.black);
  s.addShape(SH.ellipse, { x: 4.67, y: 1.55, w: 4.0, h: 4.0, fill: { type: "none" }, line: { color: C.white, width: 1, transparency: 82 } });
  s.addText("FIND YOUR CONSTRAINT.", {
    x: 0.5, y: 3.0, w: 12.33, h: 1.1, fontFace: FONT, fontSize: 42, bold: true,
    color: C.white, align: "center",
  });
  s.addText("Then do it again.", {
    x: 0.5, y: 4.05, w: 12.33, h: 0.6, fontFace: FONT, fontSize: 20, italic: true,
    color: C.gray, align: "center",
  });
})();

// ---------- WRITE ----------
pres.writeFile({ fileName: "/mnt/user-data/outputs/Why_Your_Brand_Plateaued_Documentary_Deck.pptx" })
  .then(() => console.log("done"))
  .catch((e) => { console.error(e); process.exit(1); });