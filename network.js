(function () {

  // ==========================================================================
  // Shared icon rendering — differentiated glyphs per entity kind so
  // categories are readable without relying on color alone.
  // ==========================================================================
  const ICON_BUILDING = "m52.18947444,0H.81590886c-.45061402,0-.81590886.36529484-.81590886.81590886v70.96280561c0,.45061402.36529484.81590886.81590886.81590886h16.05369588c.45557473,0,.82489101-.36931629.82489101-.82489101v-10.26173684c0-.45557473.36931629-.82489101.82489101-.82489101h15.96684431c.45557473,0,.82489101.36931629.82489101.82489101v10.26173684c0,.45557473.36931629.82489101.82489101.82489101h16.05338315c.45061402,0,.81590886-.36529484.81590886-.81590886V.81583068c0-.45057084-.36525984-.81583068-.81583068-.81583068ZM12.8869193,53.77125559c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886v-10.56217322c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Zm0-18.28961824c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886v-10.56217322c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Zm0-18.28961824c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886V6.62984588c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Zm11.21194503,36.57923648c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886v-10.56217322c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Zm0-18.28961824c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886v-10.56217322c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Zm0-18.28961824c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886V6.62984588c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Zm11.21194503,36.57923648c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886v-10.56217322c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Zm0-18.28961824c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886v-10.56217322c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Zm0-18.28961824c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886V6.62984588c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Zm11.21194503,36.57923648c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886v-10.56217322c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Zm0-18.28961824c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886v-10.56217322c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Zm0-18.28961824c0,.45061402-.36529484.81590886-.81590886.81590886h-4.77286358c-.45061402,0-.81590886-.36529484-.81590886-.81590886V6.62984588c0-.45057084.36525984-.81583068.81583068-.81583068h4.77294176c.45061402,0,.81590886.36529484.81590886.81590886v10.56209504Z";

  function pentagonPoints(r) {
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI/2 + i * (2*Math.PI/5);
      pts.push((r*Math.cos(a)).toFixed(2) + "," + (r*Math.sin(a)).toFixed(2));
    }
    return pts.join(" ");
  }

  // kind: "org" | "person" | "asset" | "ball"
  function appendIcon(nodeSel, kind, r, color) {
    const g = nodeSel.append("g").attr("class", "n-icon");
    if (kind === "person") {
      g.append("circle").attr("cx", 0).attr("cy", -r*0.30).attr("r", r*0.24).attr("fill", color);
      g.append("path")
        .attr("d", "M " + (-r*0.44) + " " + (r*0.46) + " Q " + (-r*0.44) + " " + (-r*0.02) + " 0 " + (-r*0.02) + " Q " + (r*0.44) + " " + (-r*0.02) + " " + (r*0.44) + " " + (r*0.46) + " Z")
        .attr("fill", color);
    } else if (kind === "asset") {
      g.append("rect")
        .attr("x", -r*0.46).attr("y", -r*0.32).attr("width", r*0.92).attr("height", r*0.64)
        .attr("rx", r*0.08).attr("fill", "none").attr("stroke", color)
        .attr("stroke-width", Math.max(1.4, r*0.07));
      g.append("circle").attr("cx", 0).attr("cy", 0).attr("r", r*0.16)
        .attr("fill", "none").attr("stroke", color).attr("stroke-width", Math.max(1.2, r*0.06));
    } else if (kind === "ball") {
      g.append("circle").attr("cx", 0).attr("cy", 0).attr("r", r*0.5)
        .attr("fill", "none").attr("stroke", color).attr("stroke-width", Math.max(1.4, r*0.08));
      g.append("polygon").attr("points", pentagonPoints(r*0.22)).attr("fill", color);
    } else {
      const ih = r * 1.18, iw = ih * (53.005 / 72.595);
      g.attr("transform", "translate(" + (-iw/2) + "," + (-ih/2) + ")")
        .append("path").attr("d", ICON_BUILDING).attr("fill", color)
        .attr("transform", "scale(" + (iw/53.005) + "," + (ih/72.595) + ")");
    }
    return g;
  }

  function escHtml(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }

  // Rough label footprint used by the edge-label decluttering pass below.
  function labelHalfExtents(text) {
    return { hw: text.length * 2.6 + 5, hh: 7 };
  }

  function formatUSD(v) {
    if (v >= 1000000) return "$" + (v / 1000000).toFixed(v >= 10000000 ? 0 : 1) + "M";
    if (v >= 1000) return "$" + Math.round(v / 1000) + "K";
    return "$" + v;
  }

  // ==========================================================================
  // Factory — builds one full network graph instance inside a suffixed set
  // of DOM elements ("a" or "b"). Returns {flashNode, clearHighlight}.
  // ==========================================================================
  function initNetworkGraph(suffix, cfg) {
    const el = id => document.getElementById(id + "-" + suffix);
    const wrap = el("wrap");
    const catCfg = cfg.catCfg;
    const nodes = cfg.nodes;
    const linkDefs = cfg.linkDefs;
    const tierX = cfg.tierX;
    const tierY = { 0:0.09, 1:0.28, 2:0.48, 3:0.67, 4:0.88 };
    const linkData = linkDefs.map(l => {
      const amount = l.amount != null ? l.amount : null;
      const label = l.label || null;
      return {
        source: l.s, target: l.t, type: l.tp, label: label, amount: amount, date: l.date || null,
        displayLabel: label ? (label + (amount != null ? " · " + formatUSD(amount) : "")) : null
      };
    });

    // -- Value-driven sizing: asset $ value -> node radius (log scale) -------
    const valueExtent = d3.extent(nodes.filter(n => n.value != null), n => n.value);
    const valueRadiusScale = valueExtent[0] != null
      ? d3.scaleLog().domain(valueExtent).range([11, 27]).clamp(true)
      : null;
    function nodeR(d) { return (d.value != null && valueRadiusScale) ? valueRadiusScale(d.value) : catCfg[d.cat].r; }

    // -- Value-driven sizing: bet $ amount -> edge thickness + anomaly glow --
    const amounts = linkData.filter(l => l.amount != null).map(l => l.amount).sort((a, b) => a - b);
    const amountWidthScale = amounts.length
      ? d3.scaleSqrt().domain([amounts[0], amounts[amounts.length - 1]]).range([1.3, 6]).clamp(true)
      : null;
    const largeBetThreshold = amounts.length ? amounts[Math.floor(amounts.length * 0.8)] : Infinity;
    function baseLinkWidth(l) { return l.amount != null && amountWidthScale ? amountWidthScale(l.amount) : (l.type === "sh" ? 1.6 : 1.2); }
    function isAnomalousLink(l) { return l.amount != null && l.type === "sh" && l.amount >= largeBetThreshold; }

    const W = cfg.width || Math.max(wrap.getBoundingClientRect().width, wrap.clientWidth, wrap.offsetWidth, 400) || 800;
    const H = 620;
    const svg = d3.select(el("network-svg")).attr("viewBox", "0 0 " + W + " " + H);
    const g = svg.append("g");

    const zoomBehavior = d3.zoom()
      .scaleExtent([0.18, 4])
      .filter(function(e) {
        if (e.type === "wheel") {
          const r = wrap.getBoundingClientRect();
          const inX = e.clientX >= r.left ? e.clientX <= r.right : false;
          const inY = e.clientY >= r.top ? e.clientY <= r.bottom : false;
          return inX ? inY : false;
        }
        return !e.ctrlKey ? !e.button : false;
      })
      .on("zoom", function(e) { g.attr("transform", e.transform); });
    svg.call(zoomBehavior);

    // -- BFS distance from the hub category — powers the radial layout -------
    const hubDist = (function () {
      const adj = new Map();
      nodes.forEach(n => adj.set(n.id, []));
      linkDefs.forEach(l => { adj.get(l.s).push(l.t); adj.get(l.t).push(l.s); });
      const dist = new Map();
      const queue = [];
      nodes.forEach(n => { if (catCfg[n.cat].tier === 2) { dist.set(n.id, 0); queue.push(n.id); } });
      let qi = 0;
      while (qi < queue.length) {
        const id = queue[qi++];
        const d = dist.get(id);
        adj.get(id).forEach(nb => { if (!dist.has(nb)) { dist.set(nb, d + 1); queue.push(nb); } });
      }
      nodes.forEach(n => { if (!dist.has(n.id)) dist.set(n.id, 3); });
      return dist;
    })();
    const RADIAL_BASE = 42, RADIAL_GAP = Math.min(96, (Math.min(W, H) / 2 - 60) / 3);
    function radialR(d) { return RADIAL_BASE + Math.min(hubDist.get(d.id), 3) * RADIAL_GAP; }

    // -- Even x-slots per tier row — powers the tiered layout ----------------
    const tieredSlotX = (function () {
      const rows = {};
      nodes.forEach(n => { const t = catCfg[n.cat].tier; (rows[t] = rows[t] || []).push(n); });
      const slot = new Map();
      Object.keys(rows).forEach(t => {
        const arr = rows[t];
        const margin = 64;
        const usable = Math.max(W - margin * 2, 1);
        arr.forEach((n, i) => slot.set(n.id, arr.length === 1 ? W / 2 : margin + usable * (i / (arr.length - 1))));
      });
      return slot;
    })();

    const sim = d3.forceSimulation(nodes)
      .force("collide", d3.forceCollide(d => nodeR(d) + cfg.collidePad));

    let layoutMode = "force";
    function applyLayout(mode) {
      layoutMode = mode;
      nodes.forEach(n => { n.fx = null; n.fy = null; });
      if (mode === "radial") {
        sim.force("x", null);
        sim.force("y", null);
        sim.force("center", null);
        sim.force("radial", d3.forceRadial(radialR, W / 2, H / 2).strength(0.85));
        sim.force("charge", d3.forceManyBody().strength(-130));
        sim.force("link", d3.forceLink(linkData).id(d => d.id).distance(44).strength(0.25));
      } else if (mode === "tiered") {
        sim.force("radial", null);
        sim.force("center", null);
        sim.force("x", d3.forceX(d => tieredSlotX.get(d.id)).strength(0.9));
        sim.force("y", d3.forceY(d => H * tierY[catCfg[d.cat].tier]).strength(0.9));
        sim.force("charge", d3.forceManyBody().strength(-50));
        sim.force("link", d3.forceLink(linkData).id(d => d.id).distance(56).strength(0.3));
      } else {
        sim.force("radial", null);
        sim.force("center", d3.forceCenter(W / 2, H / 2).strength(0.05));
        sim.force("y", d3.forceY(d => H * tierY[catCfg[d.cat].tier]).strength(0.28));
        sim.force("x", d3.forceX(d => tierX[d.cat]).strength(d =>
          (d.cat === "defense" || d.cat === "statesec") ? 0.40 :
          d.cat === "customer" ? 0.30 : 0.02
        ));
        sim.force("charge", d3.forceManyBody().strength(d =>
          catCfg[d.cat].tier === 2 ? -520 :
          catCfg[d.cat].tier === 1 ? -360 : -170));
        sim.force("link", d3.forceLink(linkData).id(d => d.id)
          .distance(d => d.type === "sh" ? 100 : d.type === "sup" ? 92 : 108)
          .strength(0.22));
      }
      saved = null;
      sim.alpha(1).restart();
    }

    const link = g.append("g").selectAll("line").data(linkData).join("line")
      .attr("class", d => "n-link" + (d.type === "sh" ? " sh-link" : "") + (isAnomalousLink(d) ? " n-link-anomalous" : ""))
      .attr("stroke-width", d => baseLinkWidth(d));

    // -- Edge labels — decluttered each tick so nearby labels push apart -----
    const labelNodes = linkData.filter(l => l.displayLabel).map(l => {
      const ext = labelHalfExtents(l.displayLabel);
      return { link: l, lx: null, ly: null, tx: 0, ty: 0, hw: ext.hw, hh: ext.hh };
    });

    function declutterLabels(iterations) {
      labelNodes.forEach(ln => {
        const s = ln.link.source, t = ln.link.target;
        const tx = (s.x + t.x) / 2, ty = (s.y + t.y) / 2;
        ln.tx = tx; ln.ty = ty;
        if (ln.lx === null) { ln.lx = tx; ln.ly = ty; }
        else { ln.lx += (tx - ln.lx) * 0.18; ln.ly += (ty - ln.ly) * 0.18; }
      });
      for (let it = 0; it < iterations; it++) {
        for (let i = 0; i < labelNodes.length; i++) {
          for (let j = i + 1; j < labelNodes.length; j++) {
            const a = labelNodes[i], b = labelNodes[j];
            let dx = b.lx - a.lx, dy = b.ly - a.ly;
            const overlapX = (a.hw + b.hw) - Math.abs(dx);
            const overlapY = (a.hh + b.hh) - Math.abs(dy);
            if (overlapX > 0 && overlapY > 0) {
              let dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 0.01) { dx = (i % 2 ? 1 : -1) * 0.6; dy = 0.6; dist = Math.SQRT2 * 0.6; }
              const overlap = Math.min(overlapX, overlapY);
              const k = (overlap / 2 + 0.6) / dist;
              const px = dx * k, py = dy * k;
              a.lx -= px; a.ly -= py;
              b.lx += px; b.ly += py;
            }
          }
          // push labels off of node name text blocks (the node text never moves)
          const a = labelNodes[i];
          for (let k2 = 0; k2 < nodes.length; k2++) {
            const nd = nodes[k2];
            if (!nd._nlBox) continue;
            const bx = nd.x, by = nd.y + nd._nlBox.cy;
            let dx = a.lx - bx, dy = a.ly - by;
            const overlapX = (a.hw + nd._nlBox.hw) - Math.abs(dx);
            const overlapY = (a.hh + nd._nlBox.hh) - Math.abs(dy);
            if (overlapX > 0 && overlapY > 0) {
              let dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 0.01) { dx = 0.6; dy = 0.6; dist = Math.SQRT2 * 0.6; }
              const overlap = Math.min(overlapX, overlapY);
              const k = (overlap + 1) / dist;
              a.lx += dx * k; a.ly += dy * k;
            }
          }
        }
      }
      labelNodes.forEach(ln => {
        const dx = ln.lx - ln.tx, dy = ln.ly - ln.ty;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const max = 48;
        if (dist > max) { const k = max / dist; ln.lx = ln.tx + dx * k; ln.ly = ln.ty + dy * k; }
      });
    }

    const edgeLabelHalo = g.append("g").selectAll("text")
      .data(labelNodes).join("text")
      .attr("class", "n-elabel")
      .attr("font-family", "'Century Gothic','Futura','Trebuchet MS',sans-serif")
      .attr("font-size", "8px").attr("font-weight", "bold")
      .attr("fill", "none").attr("stroke", "#ffffff").attr("stroke-width", 4)
      .attr("stroke-linejoin", "round")
      .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
      .attr("pointer-events", "none").text(d => d.link.displayLabel);

    const edgeLabel = g.append("g").selectAll("text")
      .data(labelNodes).join("text")
      .attr("class", "n-elabel")
      .attr("font-family", "'Century Gothic','Futura','Trebuchet MS',sans-serif")
      .attr("font-size", "8px").attr("font-weight", "bold")
      .attr("fill", "#122945")
      .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
      .attr("pointer-events", "none").text(d => d.link.displayLabel);

    const tooltip = el("n-detail-flyout");

    const node = g.append("g").selectAll("g").data(nodes).join("g")
      .attr("class", "n-node");

    node.append("circle")
      .attr("class", "n-main")
      .attr("r", d => nodeR(d))
      .attr("fill", d => catCfg[d.cat].fill)
      .attr("stroke", d => d.gamblingTie ? "#e50b0b" : (d.flagged ? "#f0b400" : catCfg[d.cat].stroke))
      .attr("stroke-width", d => (d.flagged || d.gamblingTie) ? 3 : catCfg[d.cat].sw);

    node.each(function(d) {
      appendIcon(d3.select(this), catCfg[d.cat].kind, nodeR(d), catCfg[d.cat].icon);
    });

    // Gambling-tie badge (only for nodes with a gamblingTie field) — clickable red card, top-right
    node.filter(d => !!d.gamblingTie).each(function(d) {
      const r = nodeR(d);
      const bx = r*0.68, by = -r*0.68;
      const badge = d3.select(this).append("g")
        .attr("class", "n-badge")
        .attr("transform", "translate(" + bx + "," + by + ")")
        .on("click", function(e) { e.stopPropagation(); cfg.onBadgeClick && cfg.onBadgeClick(d); });
      badge.append("rect").attr("x", -9).attr("y", -9).attr("width", 18).attr("height", 18)
        .attr("rx", 4).attr("fill", "#ffffff").attr("opacity", 0);
      badge.append("g").attr("transform", "rotate(-14)")
        .append("rect").attr("x", -6).attr("y", -8.5).attr("width", 12).attr("height", 17)
        .attr("rx", 2.2).attr("fill", "#e50b0b").attr("stroke", "#ffffff").attr("stroke-width", 1.3);
    });

    // Flagged badge (only for nodes with flagged=true) — informational yellow card, top-left
    node.filter(d => !!d.flagged).each(function(d) {
      const r = nodeR(d);
      const bx = -r*0.68, by = -r*0.68;
      const badge = d3.select(this).append("g")
        .attr("class", "n-flag-badge")
        .attr("transform", "translate(" + bx + "," + by + ")");
      badge.append("g").attr("transform", "rotate(-14)")
        .append("rect").attr("x", -6).attr("y", -8.5).attr("width", 12).attr("height", 17)
        .attr("rx", 2.2).attr("fill", "#f0b400").attr("stroke", "#ffffff").attr("stroke-width", 1.3);
    });

    node.each(function(d) {
      const r = nodeR(d);
      const fs = catCfg[d.cat].tier <= 1 ? 9 : 8;
      const maxCh = catCfg[d.cat].tier === 2 ? 22 : catCfg[d.cat].tier === 1 ? 20 : 18;
      const yBase = r + 12;
      const words = d.full.split(" ");
      const lines = [];
      let cur = "";
      words.forEach(w => {
        const test = cur ? cur + " " + w : w;
        if (test.length > maxCh) { if (cur) { lines.push(cur); cur = w; } else { cur = test; } }
        else cur = test;
      });
      if (cur) lines.push(cur);
      const shown = lines.slice(0, 3);
      const lineH = fs + 1.8;
      d._nlBox = {
        cy: yBase + (shown.length - 1) * lineH / 2,
        hh: shown.length * lineH / 2 + 2,
        hw: Math.max.apply(null, shown.map(l => l.length)) * fs * 0.32 + 3
      };

      shown.forEach((line,i) => {
        d3.select(this).append("text")
          .attr("font-family", "'Century Gothic','Futura','Trebuchet MS',sans-serif")
          .attr("font-size", fs+"px").attr("font-weight", "bold")
          .attr("fill", "#122945").attr("stroke", "#ffffff").attr("stroke-width", 3)
          .attr("stroke-linejoin", "round").attr("paint-order", "stroke")
          .attr("text-anchor", "middle").attr("pointer-events", "none")
          .attr("y", yBase + i*(fs+1.8)).attr("dy", "0.35em")
          .text(line);
      });
    });

    node
      .on("mouseenter", function(e,d) {
        d3.select(this).select("circle.n-main").classed("hovered", true)
          .attr("r", nodeR(d)+4);

        const connectedIds = {};
        connectedIds[d.id] = true;
        linkData.forEach(l => {
          if (l.source.id === d.id) connectedIds[l.target.id] = true;
          if (l.target.id === d.id) connectedIds[l.source.id] = true;
        });
        node.style("opacity", n => connectedIds[n.id] ? 1 : 0.12);
        link
          .style("stroke", l => isAnomalousLink(l) ? null : ((l.source.id === d.id || l.target.id === d.id) ? "#225b7b" : "#a0b9d0"))
          .style("stroke-width", l => (l.source.id === d.id || l.target.id === d.id) ? Math.max(baseLinkWidth(l), 2.5) + "px" : null)
          .style("opacity", l => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.08);
        [edgeLabelHalo, edgeLabel].forEach(sel => sel
          .filter(ln => ln.link.source.id === d.id || ln.link.target.id === d.id)
          .style("opacity", 1));

        let html = "<div class='tt-name'>" + escHtml(d.full) + "</div>";
        if (d.sub) html += "<div class='tt-sub'>" + escHtml(d.sub) + "</div>";
        html += "<div class='tt-cat' style='color:" + catCfg[d.cat].fill + "'>" + catCfg[d.cat].label + "</div>";
        if (d.value != null) html += "<div class='tt-value'>Estimated value: " + formatUSD(d.value) + "</div>";
        if (d.flagged) html += "<div class='tt-flag'>&#9888; " + escHtml(d.flagNote || "Flagged") + "</div>";
        if (d.gamblingTie) html += "<div class='tt-tie'>&#9670; Linked gambling holding — click the red badge to explore</div>";
        tooltip.innerHTML = html;
        tooltip.classList.add("visible");
      })
      .on("mouseleave", function(e,d) {
        d3.select(this).select("circle.n-main").classed("hovered", false)
          .attr("r", nodeR(d));
        node.style("opacity", null);
        link.style("stroke", null).style("stroke-width", null).style("opacity", null);
        [edgeLabelHalo, edgeLabel].forEach(sel => sel
          .filter(ln => ln.link.source.id === d.id || ln.link.target.id === d.id)
          .style("opacity", null));
        tooltip.classList.remove("visible");
      })
      .on("click", function(e, d) {
        cfg.onNodeClick && cfg.onNodeClick(d);
      });

    sim.on("tick", () => {
      link.attr("x1", d=>d.source.x).attr("y1", d=>d.source.y)
          .attr("x2", d=>d.target.x).attr("y2", d=>d.target.y);
      declutterLabels(4);
      [edgeLabelHalo, edgeLabel].forEach(sel => sel.attr("x", d => d.lx).attr("y", d => d.ly));
      node.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
    });

    let saved = null;
    sim.on("end", () => {
      if (!saved) {
        declutterLabels(60);
        saved = {};
        nodes.forEach(d => { saved[d.id] = {x:d.x, y:d.y}; });
        labelNodes.forEach(ln => { ln.savedLx = ln.lx; ln.savedLy = ln.ly; });
      }
    });

    el("n-reset").addEventListener("click", () => {
      clearHighlight();
      if (!saved) return;
      sim.stop();
      nodes.forEach(d => { d.fx = null; d.fy = null; });
      const t = d3.transition().duration(600).ease(d3.easeCubicInOut);
      svg.transition(t).call(zoomBehavior.transform, d3.zoomIdentity);
      node.transition(t).attr("transform", d => "translate(" + saved[d.id].x + "," + saved[d.id].y + ")");
      link.transition(t)
        .attr("x1", d=>saved[d.source.id].x).attr("y1", d=>saved[d.source.id].y)
        .attr("x2", d=>saved[d.target.id].x).attr("y2", d=>saved[d.target.id].y);
      [edgeLabelHalo, edgeLabel].forEach(sel => sel.transition(t)
        .attr("x", d => d.savedLx).attr("y", d => d.savedLy));
      setTimeout(() => {
        nodes.forEach(d => { d.x = saved[d.id].x; d.y = saved[d.id].y; });
        labelNodes.forEach(ln => { ln.lx = ln.savedLx; ln.ly = ln.savedLy; });
        sim.alphaDecay(1).alpha(0.0001).restart();
      }, 650);
    });

    // -- Search --------------------------------------------------------------
    el("n-search-icon-btn").addEventListener("click", () => {
      const box = el("n-search-box");
      box.classList.toggle("open");
      if (box.classList.contains("open")) el("n-search").focus();
      else searchClear();
    });
    el("n-search").addEventListener("input", e => searchInput(e.target.value));
    el("n-search").addEventListener("keydown", e => {
      if (e.key === "Escape") { searchClear(); el("n-search-box").classList.remove("open"); }
    });
    el("n-search-clear").addEventListener("click", searchClear);
    el("n-search-go").addEventListener("click", () => searchInput(el("n-search").value));

    function searchInput(val) {
      el("n-search-clear").classList.toggle("visible", val.length > 0);
      if (!val) { searchReset(); return; }
      const q = val.toLowerCase();
      node.classed("dimmed", d => d.full.toLowerCase().indexOf(q) === -1);
      link.classed("dimmed", true);
      node.each(function(d) {
        if (d.full.toLowerCase().indexOf(q) !== -1) {
          const s = d3.select(this);
          s.classed("flashing", false); void this.offsetWidth; s.classed("flashing", true);
        }
      });
    }
    function searchReset() {
      node.classed("dimmed", false); node.classed("flashing", false); link.classed("dimmed", false);
    }
    function searchClear() { el("n-search").value = ""; el("n-search-clear").classList.remove("visible"); searchReset(); }

    // -- Layout selector -------------------------------------------------------
    el("n-layout-btn").addEventListener("click", function() {
      el("n-layout-panel").classList.toggle("visible");
      this.querySelector(".layout-arrow").classList.toggle("open");
    });
    const layoutPanel = el("n-layout-panel");
    layoutPanel.querySelectorAll(".lo-row").forEach(row => {
      row.addEventListener("click", () => {
        layoutPanel.classList.remove("visible");
        el("n-layout-btn").querySelector(".layout-arrow").classList.remove("open");
        if (row.classList.contains("on")) return;
        layoutPanel.querySelectorAll(".lo-row").forEach(r => r.classList.remove("on"));
        row.classList.add("on");
        applyLayout(row.dataset.lo);
      });
    });
    applyLayout("tiered");

    // -- Legend bar — always-visible, hover a section to spotlight it --------
    function highlightByPredicate(pred) {
      node.classed("dimmed", n => !pred(n));
      node.select("circle.n-main").classed("hovered", n => pred(n));
      link.classed("dimmed", true);
    }
    function clearPredicateHighlight() {
      node.classed("dimmed", false);
      node.select("circle.n-main").classed("hovered", false);
      link.classed("dimmed", false);
    }

    const legendBar = el("n-legend-bar");
    Object.keys(catCfg).forEach(catKey => {
      const c = catCfg[catKey];
      const item = document.createElement("div");
      item.className = "lg-item";
      item.innerHTML =
        "<span class='lg-dot' style='background:" + c.fill + (catKey === "statesec" ? ";border:2px solid #225b7b" : "") + "'></span>" +
        "<span class='lg-label'>" + c.label + "</span>";
      item.addEventListener("mouseenter", () => highlightByPredicate(n => n.cat === catKey));
      item.addEventListener("mouseleave", clearPredicateHighlight);
      legendBar.appendChild(item);
    });

    if (nodes.some(n => n.flagged)) {
      const div = document.createElement("div"); div.className = "lg-divider";
      legendBar.appendChild(div);
      const item = document.createElement("div");
      item.className = "lg-item lg-note";
      item.innerHTML = "<span class='lg-card-yellow'></span><span class='lg-label'>Flagged for further review</span>";
      item.addEventListener("mouseenter", () => highlightByPredicate(n => !!n.flagged));
      item.addEventListener("mouseleave", clearPredicateHighlight);
      legendBar.appendChild(item);
    }
    if (nodes.some(n => n.gamblingTie)) {
      const item = document.createElement("div");
      item.className = "lg-item lg-note";
      item.innerHTML = "<span class='lg-card'></span><span class='lg-label'>Linked gambling holding — click to jump</span>";
      item.addEventListener("mouseenter", () => highlightByPredicate(n => !!n.gamblingTie));
      item.addEventListener("mouseleave", clearPredicateHighlight);
      legendBar.appendChild(item);
    }
    if (nodes.some(n => n.value != null)) {
      const item = document.createElement("div");
      item.className = "lg-item lg-note";
      item.innerHTML = "<span class='lg-size'></span><span class='lg-label'>Node size = estimated asset value</span>";
      legendBar.appendChild(item);
    }
    if (linkData.some(l => l.amount != null)) {
      const item = document.createElement("div");
      item.className = "lg-item lg-note";
      item.innerHTML = "<span class='lg-weight'></span><span class='lg-label'>Line thickness = bet size · red glow = large &amp; suspicious</span>";
      legendBar.appendChild(item);
    }

    // -- Filter toggles ---------------------------------------------------------
    const filterState = {};
    Object.keys(catCfg).forEach(k => filterState[k] = true);
    const filterPanel = el("n-filter-panel");
    Object.keys(catCfg).forEach(catKey => {
      const c = catCfg[catKey];
      const row = document.createElement("div");
      row.className = "f-row";
      row.innerHTML =
        "<div class='f-check on' data-fc='" + catKey + "'></div>" +
        "<div class='f-dot' style='background:" + c.fill + (catKey==="statesec" ? ";border:2px solid #225b7b" : "") + "'></div>" +
        c.label;
      row.addEventListener("click", () => filterClick(catKey));
      filterPanel.appendChild(row);
    });
    const fdiv = document.createElement("hr"); fdiv.className = "f-divider";
    filterPanel.appendChild(fdiv);
    const resetBtn = document.createElement("button");
    resetBtn.className = "n-filter-reset"; resetBtn.textContent = "Show All";
    resetBtn.addEventListener("click", filterReset);
    filterPanel.appendChild(resetBtn);

    el("n-filter-btn").addEventListener("click", function() {
      filterPanel.classList.toggle("visible");
      this.querySelector(".filter-arrow").classList.toggle("open");
    });

    function filterClick(cat) {
      filterState[cat] = !filterState[cat];
      const chk = filterPanel.querySelector("[data-fc='" + cat + "']");
      chk.classList.toggle("on", filterState[cat]);
      applyFilter();
    }
    function filterReset() {
      Object.keys(filterState).forEach(k => filterState[k] = true);
      filterPanel.querySelectorAll(".f-check").forEach(el2 => el2.classList.add("on"));
      applyFilter();
    }
    function applyFilter() {
      node.style("display", d => filterState[d.cat] ? null : "none");
      const showLink = l => (filterState[l.source.cat] && filterState[l.target.cat]) ? null : "none";
      link.style("display", showLink);
      [edgeLabelHalo, edgeLabel].forEach(sel => sel.style("display", showLink));
    }

    // -- Timeline — scrub through when each relationship/event occurred ------
    // Min/max/current day are shared across both tabs (see top-level wiring)
    // so switching tabs keeps the same point in time selected.
    const dayMs = 86400000;
    const toDay = s => Math.round(new Date(s + "T00:00:00Z").getTime() / dayMs);
    const fmtDay = day => new Date(day * dayMs).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

    const timelineRange = el("n-timeline-range");
    timelineRange.min = cfg.timelineMin;
    timelineRange.max = cfg.timelineMax;
    timelineRange.step = 1;
    el("n-timeline-end").textContent = fmtDay(cfg.timelineMax);

    function setTimelineDay(day) {
      timelineRange.value = day;
      el("n-timeline-date").textContent = fmtDay(day);
      link.classed("future", d => d.date && toDay(d.date) > day);
      [edgeLabelHalo, edgeLabel].forEach(sel => sel.classed("future", ln => ln.link.date && toDay(ln.link.date) > day));
    }
    timelineRange.addEventListener("input", () => cfg.onTimelineInput && cfg.onTimelineInput(+timelineRange.value));
    setTimelineDay(cfg.initialTimelineDay != null ? cfg.initialTimelineDay : cfg.timelineMax);

    // -- Help ------------------------------------------------------------------
    el("n-help-btn").addEventListener("click", () => el("n-help-panel").classList.toggle("visible"));

    // -- Cross-graph highlight API --------------------------------------------
    function flashNode(id) {
      const connectedIds = {};
      connectedIds[id] = true;
      linkData.forEach(l => {
        if (l.source.id === id) connectedIds[l.target.id] = true;
        if (l.target.id === id) connectedIds[l.source.id] = true;
      });
      node.classed("dimmed", n => !connectedIds[n.id]);
      node.classed("flashing", false);
      node.select("circle.n-main").classed("hovered", n => n.id === id);
      link.classed("dimmed", l => !(l.source.id === id || l.target.id === id));
      link.classed("highlighted", l => l.source.id === id || l.target.id === id)
        .style("stroke-width", l => (l.source.id === id || l.target.id === id) ? Math.max(baseLinkWidth(l), 2.5) + "px" : null);
      [edgeLabelHalo, edgeLabel].forEach(sel => sel.classed("shown", ln =>
        ln.link.source.id === id || ln.link.target.id === id));
    }
    function clearHighlight() {
      node.classed("dimmed", false);
      node.classed("flashing", false);
      node.select("circle.n-main").classed("hovered", false);
      link.classed("dimmed", false);
      link.classed("highlighted", false)
        .style("stroke-width", null);
      [edgeLabelHalo, edgeLabel].forEach(sel => sel.classed("shown", false));
    }

    return { flashNode, clearHighlight, setTimelineDay };
  }

  // ==========================================================================
  // Data model — nodes, links, and per-category styling live in data.json
  // (mock / fictional data). This file is the reusable rendering engine.
  // ==========================================================================
  function resolveTierX(cfgTierX, W) {
    const out = {};
    Object.keys(cfgTierX).forEach(k => out[k] = W * parseFloat(cfgTierX[k]));
    return out;
  }

  // ==========================================================================
  // Wiring: tabs + lazy init of graph B + crosslink handler
  // ==========================================================================
  let graphA = null, graphB = null;

  // Both tabs measure off wrap-a's box — wrap-b is still display:none at load
  // (its own rect would read 0), but both wraps share the same container width.
  function containerWidth() {
    const wrap = document.getElementById("wrap-a");
    return Math.max(wrap.getBoundingClientRect().width, 400) || 800;
  }

  // -- Shared timeline state — one clock across both tabs -------------------
  let sharedTimelineMin = 0, sharedTimelineMax = 0, sharedTimelineDay = 0;
  let timelinePlaying = false, timelineTimer = null;

  function onSharedTimelineInput(day) {
    sharedTimelineDay = Math.max(sharedTimelineMin, Math.min(sharedTimelineMax, day));
    if (graphA) graphA.setTimelineDay(sharedTimelineDay);
    if (graphB) graphB.setTimelineDay(sharedTimelineDay);
  }

  function setTimelinePlaying(playing) {
    if (!sharedTimelineMax) return; // data not loaded yet
    timelinePlaying = playing;
    document.querySelectorAll(".n-timeline-play").forEach(btn => {
      btn.textContent = playing ? "❙❙" : "▶";
      btn.title = playing ? "Pause" : "Play";
      btn.classList.toggle("playing", playing);
    });
    clearInterval(timelineTimer);
    timelineTimer = null;
    if (!playing) return;
    if (sharedTimelineDay >= sharedTimelineMax) sharedTimelineDay = sharedTimelineMin;
    const totalDays = sharedTimelineMax - sharedTimelineMin;
    const stepDays = Math.max(1, Math.round(totalDays / 250));
    timelineTimer = setInterval(() => {
      onSharedTimelineInput(sharedTimelineDay + stepDays);
      if (sharedTimelineDay >= sharedTimelineMax) setTimelinePlaying(false);
    }, 60);
  }

  document.querySelectorAll(".n-timeline-play").forEach(btn => {
    btn.addEventListener("click", () => setTimelinePlaying(!timelinePlaying));
  });

  function initTab1(data) {
    const W = containerWidth();
    graphA = initNetworkGraph("a", {
      catCfg: data.catCfg,
      nodes: data.nodes,
      linkDefs: data.linkDefs,
      tierX: resolveTierX(data.tierX, W),
      width: W,
      collidePad: data.collidePad,
      onBadgeClick: function(d) { goToGamblingTie(d.gamblingTie); },
      onNodeClick: function(d) { onEntityNodeClick(d); },
      timelineMin: sharedTimelineMin,
      timelineMax: sharedTimelineMax,
      initialTimelineDay: sharedTimelineDay,
      onTimelineInput: function(day) { onSharedTimelineInput(day); }
    });
  }

  function initTab2(data) {
    const W = containerWidth();
    graphB = initNetworkGraph("b", {
      catCfg: data.catCfg,
      nodes: data.nodes,
      linkDefs: data.linkDefs,
      tierX: resolveTierX(data.tierX, W),
      width: W,
      collidePad: data.collidePad,
      timelineMin: sharedTimelineMin,
      timelineMax: sharedTimelineMax,
      initialTimelineDay: sharedTimelineDay,
      onTimelineInput: function(day) { onSharedTimelineInput(day); }
    });
  }

  function showTab(which) {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === which));
    document.getElementById("tab1").classList.toggle("active", which === "tab1");
    document.getElementById("tab2").classList.toggle("active", which === "tab2");
  }

  function goToGamblingTie(tie) {
    showTab("tab2");
    graphB.flashNode(tie.targetId);
  }

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });

  // ==========================================================================
  // Cross-network path tracing — from any FIFA Entity Network node, walk to
  // the nearest gambling-tied entity, then onward in the Match & Betting
  // Network to the nearest flagged match. Renders as a clickable breadcrumb.
  // ==========================================================================
  function buildAdjacency(nodeList, linkDefs) {
    const byId = new Map(nodeList.map(n => [n.id, n]));
    const adj = new Map(nodeList.map(n => [n.id, []]));
    linkDefs.forEach(l => {
      const label = l.label || (l.tp === "sh" ? "shared interest" : l.tp === "cl" ? "client" : "linked to");
      if (adj.has(l.s)) adj.get(l.s).push({ id: l.t, label });
      if (adj.has(l.t)) adj.get(l.t).push({ id: l.s, label });
    });
    return { byId, adj };
  }

  function bfsPath(byId, adj, startId, matchFn, maxHops) {
    const startNode = byId.get(startId);
    if (startNode && matchFn(startNode)) return { id: startId, steps: [] };
    const visited = new Set([startId]);
    let queue = [{ id: startId, steps: [] }];
    let hops = 0;
    while (queue.length && hops < maxHops) {
      const next = [];
      for (const cur of queue) {
        for (const nb of (adj.get(cur.id) || [])) {
          if (visited.has(nb.id)) continue;
          visited.add(nb.id);
          const steps = cur.steps.concat([{ to: nb.id, label: nb.label }]);
          const node = byId.get(nb.id);
          if (node && matchFn(node)) return { id: nb.id, steps };
          next.push({ id: nb.id, steps });
        }
      }
      queue = next;
      hops++;
    }
    return null;
  }

  let chainGraphs = null; // { tab1: {byId, adj}, tab2: {byId, adj} }

  function traceChain(startId) {
    if (!chainGraphs) return null;
    const g1 = chainGraphs.tab1, g2 = chainGraphs.tab2;
    const toBridge = bfsPath(g1.byId, g1.adj, startId, n => !!n.gamblingTie, 6);
    if (!toBridge) return null;
    const bridgeNode = g1.byId.get(toBridge.id);
    const crossTargetId = bridgeNode.gamblingTie.targetId;
    const toMatch = bfsPath(g2.byId, g2.adj, crossTargetId, n => !!n.flagged, 4);
    return {
      tab1Seq: [{ id: startId, tab: "tab1" }].concat(toBridge.steps.map(s => ({ id: s.to, tab: "tab1", label: s.label }))),
      bridgeLabel: "linked gambling holding",
      tab2Seq: toMatch
        ? [{ id: crossTargetId, tab: "tab2" }].concat(toMatch.steps.map(s => ({ id: s.to, tab: "tab2", label: s.label })))
        : [{ id: crossTargetId, tab: "tab2" }]
    };
  }

  function stepLabelFor(step) {
    const g = step.tab === "tab1" ? chainGraphs.tab1 : chainGraphs.tab2;
    const node = g.byId.get(step.id);
    return node ? node.full : step.id;
  }

  function buildChainSteps(stepsEl, trace) {
    stepsEl.innerHTML = "";
    const allSteps = trace.tab1Seq.concat(trace.tab2Seq);
    allSteps.forEach((step, i) => {
      if (i > 0) {
        const prevInTab1 = i === trace.tab1Seq.length;
        const label = prevInTab1 ? trace.bridgeLabel : step.label;
        const arrow = document.createElement("div");
        arrow.className = "chain-arrow" + (prevInTab1 ? " chain-arrow-cross" : "");
        arrow.textContent = (label || "").toString().toUpperCase();
        stepsEl.appendChild(arrow);
      }
      const chip = document.createElement("button");
      chip.className = "chain-step";
      chip.textContent = stepLabelFor(step);
      chip.addEventListener("click", () => {
        showTab(step.tab);
        onSharedTimelineInput(sharedTimelineMax);
        const g = step.tab === "tab1" ? graphA : graphB;
        if (g) g.flashNode(step.id);
      });
      stepsEl.appendChild(chip);
    });
  }

  function renderChainTrace(trace) {
    ["a", "b"].forEach(suffix => {
      buildChainSteps(document.getElementById("chain-trace-steps-" + suffix), trace);
      document.getElementById("chain-trace-" + suffix).classList.remove("hidden");
    });
  }

  function hideChainTrace() {
    ["a", "b"].forEach(suffix => {
      document.getElementById("chain-trace-" + suffix).classList.add("hidden");
    });
  }

  ["a", "b"].forEach(suffix => {
    document.getElementById("chain-trace-close-" + suffix).addEventListener("click", hideChainTrace);
  });

  function onEntityNodeClick(d) {
    const trace = traceChain(d.id);
    if (trace) renderChainTrace(trace);
  }

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      chainGraphs = {
        tab1: buildAdjacency(data.tab1.nodes, data.tab1.linkDefs),
        tab2: buildAdjacency(data.tab2.nodes, data.tab2.linkDefs)
      };
      const dayMs = 86400000;
      const toDay = s => Math.round(new Date(s + "T00:00:00Z").getTime() / dayMs);
      const allDays = data.tab1.linkDefs.concat(data.tab2.linkDefs)
        .filter(l => l.date).map(l => toDay(l.date));
      sharedTimelineMin = Math.min(...allDays);
      sharedTimelineMax = Math.max(...allDays);
      sharedTimelineDay = sharedTimelineMax;
      initTab1(data.tab1);
      initTab2(data.tab2);
    })
    .catch(err => {
      console.error("Failed to load data.json — network graphs cannot render.", err);
    });

})();
