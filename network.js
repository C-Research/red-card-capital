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
    const linkData = linkDefs.map(l => ({ source:l.s, target:l.t, type:l.tp, label:l.label||null }));

    const W = cfg.width || Math.max(wrap.getBoundingClientRect().width, wrap.clientWidth, wrap.offsetWidth, 400) || 800;
    const H = 620;
    const svg = d3.select(el("network-svg")).attr("viewBox", "0 0 " + W + " " + H);
    const g = svg.append("g");

    svg.call(
      d3.zoom()
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
        .on("zoom", function(e) { g.attr("transform", e.transform); })
    );

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
      .force("collide", d3.forceCollide(d => catCfg[d.cat].r + cfg.collidePad));

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
      .attr("class", d => "n-link" + (d.type === "sh" ? " sh-link" : ""));

    // -- Edge labels — decluttered each tick so nearby labels push apart -----
    const labelNodes = linkData.filter(l => l.label).map(l => {
      const ext = labelHalfExtents(l.label);
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
      .attr("pointer-events", "none").text(d => d.link.label);

    const edgeLabel = g.append("g").selectAll("text")
      .data(labelNodes).join("text")
      .attr("class", "n-elabel")
      .attr("font-family", "'Century Gothic','Futura','Trebuchet MS',sans-serif")
      .attr("font-size", "8px").attr("font-weight", "bold")
      .attr("fill", "#122945")
      .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
      .attr("pointer-events", "none").text(d => d.link.label);

    const tooltip = el("n-tooltip");

    const node = g.append("g").selectAll("g").data(nodes).join("g")
      .attr("class", "n-node")
      .call(d3.drag()
        .on("start", (e,d) => { if (!e.active) sim.alphaTarget(0.05).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag",  (e,d) => { d.fx = e.x; d.fy = e.y; })
        .on("end",   (e,d) => { if (!e.active) sim.alphaTarget(0); })
      );

    node.append("circle")
      .attr("class", "n-main")
      .attr("r", d => catCfg[d.cat].r)
      .attr("fill", d => catCfg[d.cat].fill)
      .attr("stroke", d => d.flagged ? "#e50b0b" : catCfg[d.cat].stroke)
      .attr("stroke-width", d => d.flagged ? 3 : catCfg[d.cat].sw);

    node.each(function(d) {
      appendIcon(d3.select(this), catCfg[d.cat].kind, catCfg[d.cat].r, catCfg[d.cat].icon);
    });

    // Gambling-tie badge (only for nodes with a gamblingTie field)
    node.filter(d => !!d.gamblingTie).each(function(d) {
      const r = catCfg[d.cat].r;
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

    node.each(function(d) {
      const r = catCfg[d.cat].r;
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
          .attr("r", catCfg[d.cat].r+4);

        const connectedIds = {};
        connectedIds[d.id] = true;
        linkData.forEach(l => {
          if (l.source.id === d.id) connectedIds[l.target.id] = true;
          if (l.target.id === d.id) connectedIds[l.source.id] = true;
        });
        node.style("opacity", n => connectedIds[n.id] ? 1 : 0.12);
        link
          .style("stroke", l => (l.source.id === d.id || l.target.id === d.id) ? "#225b7b" : "#a0b9d0")
          .style("stroke-width", l => (l.source.id === d.id || l.target.id === d.id) ? "2.5px" : "1px")
          .style("opacity", l => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.08);
        [edgeLabelHalo, edgeLabel].forEach(sel => sel
          .filter(ln => ln.link.source.id === d.id || ln.link.target.id === d.id)
          .style("opacity", 1));

        let html = "<div class='tt-name'>" + escHtml(d.full) + "</div>";
        if (d.sub) html += "<div class='tt-sub'>" + escHtml(d.sub) + "</div>";
        html += "<div class='tt-cat' style='color:" + catCfg[d.cat].fill + "'>" + catCfg[d.cat].label + "</div>";
        if (d.flagged) html += "<div class='tt-flag'>&#9888; " + escHtml(d.flagNote || "Flagged") + "</div>";
        if (d.gamblingTie) html += "<div class='tt-tie'>&#9670; Linked gambling holding — click the red badge to explore</div>";
        tooltip.innerHTML = html;
        tooltip.style.opacity = 1;
      })
      .on("mousemove", function(e) {
        const r = wrap.getBoundingClientRect();
        let x = e.clientX - r.left + 14, y = e.clientY - r.top - 10;
        if (x + 270 > r.width) x -= 280;
        tooltip.style.left = x + "px"; tooltip.style.top = y + "px";
      })
      .on("mouseleave", function(e,d) {
        d3.select(this).select("circle.n-main").classed("hovered", false)
          .attr("r", catCfg[d.cat].r);
        node.style("opacity", null);
        link.style("stroke", null).style("stroke-width", null).style("opacity", null);
        [edgeLabelHalo, edgeLabel].forEach(sel => sel
          .filter(ln => ln.link.source.id === d.id || ln.link.target.id === d.id)
          .style("opacity", null));
        tooltip.style.opacity = 0;
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

    // -- Legend / Filter toggles ----------------------------------------------
    el("n-legend-btn").addEventListener("click", function() {
      el("n-legend-panel").classList.toggle("visible");
      this.querySelector(".leg-arrow").classList.toggle("open");
    });

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
      link.classed("highlighted", l => l.source.id === id || l.target.id === id);
      [edgeLabelHalo, edgeLabel].forEach(sel => sel.classed("shown", ln =>
        ln.link.source.id === id || ln.link.target.id === id));
    }
    function clearHighlight() {
      node.classed("dimmed", false);
      node.classed("flashing", false);
      node.select("circle.n-main").classed("hovered", false);
      link.classed("dimmed", false);
      link.classed("highlighted", false);
      [edgeLabelHalo, edgeLabel].forEach(sel => sel.classed("shown", false));
    }

    return { flashNode, clearHighlight };
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

  function initTab1(data) {
    const W = containerWidth();
    graphA = initNetworkGraph("a", {
      catCfg: data.catCfg,
      nodes: data.nodes,
      linkDefs: data.linkDefs,
      tierX: resolveTierX(data.tierX, W),
      width: W,
      collidePad: data.collidePad,
      onBadgeClick: function(d) { goToGamblingTie(d.gamblingTie); }
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
      collidePad: data.collidePad
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

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      initTab1(data.tab1);
      initTab2(data.tab2);
    })
    .catch(err => {
      console.error("Failed to load data.json — network graphs cannot render.", err);
    });

})();
