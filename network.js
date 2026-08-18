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

    const W = Math.max(wrap.getBoundingClientRect().width, wrap.clientWidth, wrap.offsetWidth, 400) || 800;
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

    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(linkData).id(d => d.id)
        .distance(d => d.type === "sh" ? 120 : d.type === "sup" ? 108 : 128)
        .strength(0.17))
      .force("charge", d3.forceManyBody().strength(d =>
        catCfg[d.cat].tier === 2 ? -900 :
        catCfg[d.cat].tier === 1 ? -560 : -240))
      .force("center", d3.forceCenter(W/2, H/2).strength(0.01))
      .force("collide", d3.forceCollide(d => catCfg[d.cat].r + cfg.collidePad))
      .force("y", d3.forceY(d => H * tierY[catCfg[d.cat].tier]).strength(0.28))
      .force("x", d3.forceX(d => tierX[d.cat]).strength(d =>
        (d.cat === "defense" || d.cat === "statesec") ? 0.40 :
        d.cat === "customer" ? 0.30 : 0.02
      ));

    const link = g.append("g").selectAll("line").data(linkData).join("line")
      .attr("class", d => "n-link" + (d.type === "sh" ? " sh-link" : ""));

    const edgeLabelHalo = g.append("g").selectAll("text")
      .data(linkData.filter(l => l.label)).join("text")
      .attr("font-family", "'Century Gothic','Futura','Trebuchet MS',sans-serif")
      .attr("font-size", "8px").attr("font-weight", "bold")
      .attr("fill", "none").attr("stroke", "#ffffff").attr("stroke-width", 4)
      .attr("stroke-linejoin", "round")
      .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
      .attr("pointer-events", "none").text(d => d.label);

    const edgeLabel = g.append("g").selectAll("text")
      .data(linkData.filter(l => l.label)).join("text")
      .attr("font-family", "'Century Gothic','Futura','Trebuchet MS',sans-serif")
      .attr("font-size", "8px").attr("font-weight", "bold")
      .attr("fill", "#122945")
      .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
      .attr("pointer-events", "none").text(d => d.label);

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
        .attr("rx", 4).attr("fill", "#e50b0b").attr("stroke", "#ffffff").attr("stroke-width", 1.5);
      badge.append("circle").attr("cx", -4).attr("cy", -3).attr("r", 1.6).attr("fill", "#ffffff");
      badge.append("circle").attr("cx", 4).attr("cy", 3).attr("r", 1.6).attr("fill", "#ffffff");
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

      lines.slice(0,3).forEach((line,i) => {
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
        node.style("opacity", 1);
        link.style("stroke", null).style("stroke-width", null).style("opacity", null);
        tooltip.style.opacity = 0;
      });

    sim.on("tick", () => {
      link.attr("x1", d=>d.source.x).attr("y1", d=>d.source.y)
          .attr("x2", d=>d.target.x).attr("y2", d=>d.target.y);
      [edgeLabelHalo, edgeLabel].forEach(sel => sel
        .attr("x", d=>(d.source.x+d.target.x)/2)
        .attr("y", d=>(d.source.y+d.target.y)/2));
      node.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
    });

    let saved = null;
    sim.on("end", () => {
      if (!saved) { saved = {}; nodes.forEach(d => { saved[d.id] = {x:d.x, y:d.y}; }); }
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
        .attr("x", d=>(saved[d.source.id].x+saved[d.target.id].x)/2)
        .attr("y", d=>(saved[d.source.id].y+saved[d.target.id].y)/2));
      setTimeout(() => {
        nodes.forEach(d => { d.x = saved[d.id].x; d.y = saved[d.id].y; });
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
    function searchReset() { node.classed("dimmed", false); node.classed("flashing", false); link.classed("dimmed", false); }
    function searchClear() { el("n-search").value = ""; el("n-search-clear").classList.remove("visible"); searchReset(); }

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
      node.classed("dimmed", n => n.id !== id);
      link.classed("dimmed", true);
      node.each(function(n) {
        if (n.id === id) {
          const s = d3.select(this);
          s.classed("flashing", false); void this.offsetWidth; s.classed("flashing", true);
        }
      });
    }
    function clearHighlight() { node.classed("dimmed", false); node.classed("flashing", false); link.classed("dimmed", false); }

    return { flashNode, clearHighlight };
  }

  // ==========================================================================
  // TAB 1 — FIFA Entity Network (mock / fictional data)
  // ==========================================================================
  const tab1CatCfg = {
    ubo:      { fill:"#122945", icon:"#ffffff", stroke:"#ffffff", sw:1.5, r:18, tier:0, kind:"person", label:"FIFA Leadership / Officials (PEP)" },
    corp:     { fill:"#043d5d", icon:"#ffffff", stroke:"#ffffff", sw:2,   r:25, tier:1, kind:"org",    label:"Sponsors &amp; Vendors" },
    hub:      { fill:"#f75151", icon:"#ffffff", stroke:"#ffffff", sw:2.5, r:30, tier:2, kind:"org",    label:"FIFA (Governing Body)" },
    defense:  { fill:"#a0b9d0", icon:"#ffffff", stroke:"#ffffff", sw:1.5, r:16, tier:3, kind:"person", label:"Players" },
    statesec: { fill:"#a0b9d0", icon:"#ffffff", stroke:"#225b7b", sw:2,   r:18, tier:3, kind:"org",    label:"State-Linked Sponsors / Foreign Gov&rsquo;t Funding" },
    customer: { fill:"#3bbc97", icon:"#ffffff", stroke:"#ffffff", sw:1.5, r:16, tier:4, kind:"asset",  label:"Assets &amp; Shell Entities" },
  };

  const tab1Nodes = [
    { id:"hub", cat:"hub", full:"FIFA", sub:"International Governing Body" },

    { id:"u01", cat:"ubo", full:"Marcus Oyelaran", sub:"Confederation Vice President", flagged:true, flagNote:"Under active ethics investigation", gamblingTie:{ targetId:"bm_vantage", targetLabel:"Vantage Blue Betting Ltd" } },
    { id:"u02", cat:"ubo", full:"Henrik Dalgaard", sub:"Regional Federation Treasurer", flagged:true, flagNote:"Under active ethics investigation", gamblingTie:{ targetId:"syn_solvana", targetLabel:"Solvana Consortium" } },
    { id:"u03", cat:"ubo", full:"Amara Voss", sub:"FIFA Executive Committee Member", flagged:true, flagNote:"Flagged for undisclosed consulting income" },
    { id:"u04", cat:"ubo", full:"Tomasz Kwiatkowski", sub:"Deputy Secretary General" },
    { id:"u05", cat:"ubo", full:"Priya Ramchandani", sub:"Competitions Director" },
    { id:"u06", cat:"ubo", full:"Diego Farrow-Lund", sub:"Regional Federation President", flagged:true, flagNote:"Flagged for undisclosed asset holdings" },
    { id:"u07", cat:"ubo", full:"Sana Belhadj", sub:"Ethics Committee Liaison" },
    { id:"u08", cat:"ubo", full:"Colm Whitfield", sub:"Media Rights Committee Chair", gamblingTie:{ targetId:"bm_ridgeline", targetLabel:"Ridgeline Sports Exchange" } },

    { id:"c01", cat:"corp", full:"Solstice Sportswear Group", sub:"Kit &amp; Apparel Sponsor" },
    { id:"c02", cat:"corp", full:"Meridian Broadcast Partners", sub:"Broadcast Rights Vendor" },
    { id:"c03", cat:"corp", full:"Halcyon Hospitality Group", sub:"Hospitality Vendor" },
    { id:"c04", cat:"corp", full:"Ferrovia Construction Consortium", sub:"Stadium Construction Vendor" },
    { id:"c05", cat:"corp", full:"BlueArc Data Systems", sub:"Ticketing &amp; Technology Vendor" },
    { id:"c06", cat:"corp", full:"Solvana Consulting Group", sub:"Strategic Consulting Vendor" },

    { id:"p01", cat:"defense", full:"Adrian Kessel", sub:"Player" },
    { id:"p02", cat:"defense", full:"Yusuf Tanaka-Braun", sub:"Player" },
    { id:"p03", cat:"defense", full:"Nikolai Osei", sub:"Player" },
    { id:"p04", cat:"defense", full:"Mateo Lindqvist", sub:"Player" },
    { id:"p05", cat:"defense", full:"Faisal Renner", sub:"Player" },
    { id:"p06", cat:"defense", full:"Kenji Alba-Marsh", sub:"Player" },
    { id:"p07", cat:"defense", full:"Rurik Somsak", sub:"Player" },
    { id:"p08", cat:"defense", full:"Elian Vogt", sub:"Player" },

    { id:"s01", cat:"statesec", full:"Northbridge Sovereign Development Fund", sub:"State-Linked Investment Fund" },
    { id:"s02", cat:"statesec", full:"Ashford State Investment Authority", sub:"State-Linked Investment Fund" },
    { id:"s03", cat:"statesec", full:"Velenport National Development Bank", sub:"State-Linked Development Bank" },
    { id:"s04", cat:"statesec", full:"Correntine Ministry of Sport Trust Fund", sub:"State-Linked Trust Fund" },
    { id:"s05", cat:"statesec", full:"Drayle Public Investment Office", sub:"State-Linked Investment Office" },
    { id:"s06", cat:"statesec", full:"Marrow State Holding Corporation", sub:"State-Linked Holding Company" },

    { id:"a01", cat:"customer", full:"Cascade Holdings Ltd", sub:"Shell entity — beneficial owner: M. Oyelaran" },
    { id:"a02", cat:"customer", full:"Meridian Sports Holdings Ltd", sub:"Shell entity — beneficial owners: H. Dalgaard, A. Voss" },
    { id:"a03", cat:"customer", full:"Sunreach Property Trust", sub:"Real estate — beneficial owner: A. Voss" },
    { id:"a04", cat:"customer", full:"Azure Fjord Yacht Charter LLC", sub:"Asset — beneficial owner: D. Farrow-Lund" },
    { id:"a05", cat:"customer", full:"Palisade Family Office", sub:"Asset manager — beneficial owner: M. Oyelaran" },
    { id:"a06", cat:"customer", full:"Northgate Trading SA", sub:"Shell entity — beneficial owner: D. Farrow-Lund" },
    { id:"a07", cat:"customer", full:"Whitfield Family Trust", sub:"Trust — beneficial owner: C. Whitfield; holds equity in Ridgeline Sports Exchange" },
    { id:"a08", cat:"customer", full:"Solvana Capital Partners", sub:"Shell entity — beneficial owner: H. Dalgaard; holds equity in Solvana Consortium" },
  ];

  const tab1LinkDefs = [
    {s:"hub", t:"u01", tp:"sup"}, {s:"hub", t:"u02", tp:"sup"}, {s:"hub", t:"u03", tp:"sup"},
    {s:"hub", t:"u04", tp:"sup"}, {s:"hub", t:"u05", tp:"sup"}, {s:"hub", t:"u06", tp:"sup"},
    {s:"hub", t:"u07", tp:"sup"}, {s:"hub", t:"u08", tp:"sup"},

    {s:"hub", t:"c01", tp:"sup", label:"SPONSORSHIP DEAL"},
    {s:"hub", t:"c02", tp:"sup", label:"BROADCAST RIGHTS DEAL"},
    {s:"hub", t:"c03", tp:"sup", label:"HOSPITALITY CONTRACT"},
    {s:"hub", t:"c04", tp:"sup", label:"CONSTRUCTION CONTRACT"},
    {s:"hub", t:"c05", tp:"sup", label:"TECH SERVICES CONTRACT"},
    {s:"hub", t:"c06", tp:"sup", label:"CONSULTING CONTRACT"},

    {s:"u01", t:"a01", tp:"sh", label:"BENEFICIAL OWNER"},
    {s:"u01", t:"a05", tp:"sh"},
    {s:"u02", t:"a02", tp:"sh"},
    {s:"u02", t:"a08", tp:"sh", label:"BENEFICIAL OWNER"},
    {s:"u03", t:"a02", tp:"sh"},
    {s:"u03", t:"a03", tp:"sh"},
    {s:"u06", t:"a04", tp:"sh"},
    {s:"u06", t:"a06", tp:"sh"},
    {s:"u08", t:"a07", tp:"sh", label:"BENEFICIAL OWNER"},

    {s:"s01", t:"c01", tp:"sh", label:"FOREIGN FUNDING CHANNEL"},
    {s:"s02", t:"c02", tp:"sh", label:"FOREIGN FUNDING CHANNEL"},
    {s:"s03", t:"c04", tp:"sh", label:"FOREIGN FUNDING CHANNEL"},
    {s:"s04", t:"c03", tp:"sh", label:"FOREIGN FUNDING CHANNEL"},
    {s:"s05", t:"c05", tp:"sh", label:"FOREIGN FUNDING CHANNEL"},
    {s:"s06", t:"a03", tp:"sh", label:"ALLEGED INFLATED PURCHASE"},

    {s:"u03", t:"c02", tp:"sh", label:"UNDISCLOSED CONSULTING FEE"},
    {s:"u01", t:"c04", tp:"sh", label:"AWARDED CONTRACT"},

    {s:"c01", t:"p01", tp:"cl"}, {s:"c01", t:"p02", tp:"cl"},
    {s:"c02", t:"p03", tp:"cl"}, {s:"c02", t:"p04", tp:"cl"},
    {s:"c03", t:"p05", tp:"cl"}, {s:"c05", t:"p06", tp:"cl"},
    {s:"c01", t:"p07", tp:"cl"}, {s:"c04", t:"p08", tp:"cl"},
  ];

  const tab1TierX = { ubo:"0.50", corp:"0.50", hub:"0.50", defense:"0.12", statesec:"0.18", customer:"0.82" };

  // ==========================================================================
  // TAB 2 — Match & Betting Network (mock / fictional data)
  // ==========================================================================
  const tab2CatCfg = {
    ubo:      { fill:"#122945", icon:"#ffffff", stroke:"#ffffff", sw:1.5, r:15, tier:0, kind:"person", label:"Referees" },
    corp:     { fill:"#043d5d", icon:"#ffffff", stroke:"#ffffff", sw:2,   r:20, tier:1, kind:"org",    label:"Suspected Fixing Syndicates" },
    hub:      { fill:"#f75151", icon:"#ffffff", stroke:"#ffffff", sw:2,   r:22, tier:2, kind:"ball",   label:"Matches" },
    defense:  { fill:"#a0b9d0", icon:"#ffffff", stroke:"#ffffff", sw:1.5, r:15, tier:3, kind:"org",    label:"Licensed Bookmakers" },
    statesec: { fill:"#a0b9d0", icon:"#ffffff", stroke:"#225b7b", sw:2,   r:15, tier:3, kind:"org",    label:"Offshore / Unregulated Bookmakers" },
    customer: { fill:"#3bbc97", icon:"#ffffff", stroke:"#ffffff", sw:1.5, r:13, tier:4, kind:"person", label:"Players" },
  };

  const tab2Nodes = [
    { id:"m01", cat:"hub", full:"Kestrelia vs Meridia", sub:"Group C · Matchday 2", flagged:true, flagNote:"Anomalous odds movement flagged" },
    { id:"m02", cat:"hub", full:"Aurelia vs Vantoria", sub:"Group C · Matchday 3", flagged:true, flagNote:"Anomalous odds movement flagged" },
    { id:"m03", cat:"hub", full:"Norlund vs Cassaway", sub:"Group A · Matchday 1" },
    { id:"m04", cat:"hub", full:"Iberrin vs Solmara", sub:"Group A · Matchday 2", flagged:true, flagNote:"Anomalous odds movement flagged" },
    { id:"m05", cat:"hub", full:"Thornfield vs Rivenna", sub:"Group B · Matchday 1" },
    { id:"m06", cat:"hub", full:"Casterbridge vs Kestrelia", sub:"Group C · Matchday 4", flagged:true, flagNote:"Anomalous odds movement flagged" },
    { id:"m07", cat:"hub", full:"Meridia vs Aurelia", sub:"Group C · Matchday 5 (Decider)", flagged:true, flagNote:"Anomalous odds movement flagged" },
    { id:"m08", cat:"hub", full:"Vantoria vs Norlund", sub:"Group A · Matchday 3" },
    { id:"m09", cat:"hub", full:"Cassaway vs Iberrin", sub:"Group A · Matchday 4" },
    { id:"m10", cat:"hub", full:"Solmara vs Thornfield", sub:"Group B · Matchday 2" },

    { id:"r01", cat:"ubo", full:"Oskar Lindmann", sub:"Referee", flagged:true, flagNote:"Irregular officiating pattern across flagged matches" },
    { id:"r02", cat:"ubo", full:"Ingrid Faber", sub:"Referee" },
    { id:"r03", cat:"ubo", full:"Tobias Renfrew", sub:"Referee", flagged:true, flagNote:"Irregular officiating pattern across flagged matches" },
    { id:"r04", cat:"ubo", full:"Camille Duarte", sub:"Referee" },
    { id:"r05", cat:"ubo", full:"Halvor Eiken", sub:"Referee" },
    { id:"r06", cat:"ubo", full:"Priya Nandakumar", sub:"Referee" },
    { id:"r07", cat:"ubo", full:"Emeka Solano", sub:"Referee" },
    { id:"r08", cat:"ubo", full:"Bjornar Kass", sub:"VAR Official", flagged:true, flagNote:"Irregular officiating pattern across flagged matches" },

    { id:"syn_solvana", cat:"corp", full:"Solvana Consortium", sub:"Suspected Fixing Syndicate" },
    { id:"syn02", cat:"corp", full:"Redline Advisory Group", sub:"Suspected Fixing Syndicate" },
    { id:"syn03", cat:"corp", full:"Compass Point Partners", sub:"Suspected Fixing Syndicate" },
    { id:"syn04", cat:"corp", full:"Tidewater Consulting", sub:"Suspected Fixing Syndicate" },

    { id:"bm_ridgeline", cat:"defense", full:"Ridgeline Sports Exchange", sub:"Licensed Bookmaker" },
    { id:"bm02", cat:"defense", full:"Northgate Odds Ltd", sub:"Licensed Bookmaker" },
    { id:"bm03", cat:"defense", full:"Fairway Betting Co", sub:"Licensed Bookmaker" },
    { id:"bm04", cat:"defense", full:"Steadfast Wagering Group", sub:"Licensed Bookmaker" },
    { id:"bm05", cat:"defense", full:"Crestline Sportsbook", sub:"Licensed Bookmaker" },
    { id:"bm06", cat:"defense", full:"Anchor Point Betting", sub:"Licensed Bookmaker" },

    { id:"bm_vantage", cat:"statesec", full:"Vantage Blue Betting Ltd", sub:"Offshore Bookmaker", flagged:true, flagNote:"Linked to suspected coordination" },
    { id:"bm08", cat:"statesec", full:"Silverreach Wagering International", sub:"Offshore Bookmaker" },
    { id:"bm09", cat:"statesec", full:"Duskline Exchange", sub:"Offshore Bookmaker" },
    { id:"bm10", cat:"statesec", full:"Farhaven Bet Network", sub:"Offshore Bookmaker" },
    { id:"bm11", cat:"statesec", full:"Obscura Markets Ltd", sub:"Offshore Bookmaker" },
    { id:"bm12", cat:"statesec", full:"Tallowick Sports Trading", sub:"Offshore Bookmaker" },

    { id:"pl01", cat:"customer", full:"Jonah Reyes", sub:"Player" },
    { id:"pl02", cat:"customer", full:"Marek Stensrud", sub:"Player" },
    { id:"pl03", cat:"customer", full:"Idris Okafor-Lund", sub:"Player" },
    { id:"pl04", cat:"customer", full:"Théo Vasseur", sub:"Player" },
    { id:"pl05", cat:"customer", full:"Aksel Thorvald", sub:"Player" },
    { id:"pl06", cat:"customer", full:"Rui Castellan", sub:"Player" },
    { id:"pl07", cat:"customer", full:"Björn Halvorsen", sub:"Player" },
    { id:"pl08", cat:"customer", full:"Malik Farsi", sub:"Player" },
  ];

  const tab2LinkDefs = [
    {s:"r01", t:"m01", tp:"sup"}, {s:"r01", t:"m02", tp:"sup"}, {s:"r01", t:"m07", tp:"sup"},
    {s:"r02", t:"m03", tp:"sup"}, {s:"r03", t:"m04", tp:"sup"}, {s:"r03", t:"m06", tp:"sup"},
    {s:"r04", t:"m08", tp:"sup"}, {s:"r05", t:"m10", tp:"sup"}, {s:"r06", t:"m05", tp:"sup"},
    {s:"r07", t:"m09", tp:"sup"},
    {s:"r08", t:"m02", tp:"sup", label:"VAR OFFICIAL"},
    {s:"r08", t:"m07", tp:"sup", label:"VAR OFFICIAL"},

    {s:"pl01", t:"m01", tp:"cl"}, {s:"pl01", t:"m02", tp:"cl"}, {s:"pl01", t:"m07", tp:"cl"},
    {s:"pl02", t:"m01", tp:"cl"}, {s:"pl02", t:"m06", tp:"cl"},
    {s:"pl03", t:"m03", tp:"cl"}, {s:"pl03", t:"m08", tp:"cl"},
    {s:"pl04", t:"m04", tp:"cl"}, {s:"pl04", t:"m09", tp:"cl"},
    {s:"pl05", t:"m05", tp:"cl"}, {s:"pl05", t:"m10", tp:"cl"},
    {s:"pl06", t:"m02", tp:"cl"}, {s:"pl06", t:"m07", tp:"cl"},
    {s:"pl07", t:"m03", tp:"cl"}, {s:"pl07", t:"m06", tp:"cl"},
    {s:"pl08", t:"m08", tp:"cl"}, {s:"pl08", t:"m09", tp:"cl"}, {s:"pl08", t:"m10", tp:"cl"},

    {s:"bm_ridgeline", t:"m03", tp:"sup"}, {s:"bm_ridgeline", t:"m05", tp:"sup"},
    {s:"bm_ridgeline", t:"m08", tp:"sup"}, {s:"bm_ridgeline", t:"m09", tp:"sup"}, {s:"bm_ridgeline", t:"m10", tp:"sup"},
    {s:"bm02", t:"m01", tp:"sup"}, {s:"bm02", t:"m03", tp:"sup"}, {s:"bm02", t:"m06", tp:"sup"},
    {s:"bm03", t:"m04", tp:"sup"}, {s:"bm03", t:"m08", tp:"sup"}, {s:"bm03", t:"m10", tp:"sup"},
    {s:"bm04", t:"m05", tp:"sup"}, {s:"bm04", t:"m09", tp:"sup"},
    {s:"bm05", t:"m02", tp:"sup"}, {s:"bm05", t:"m07", tp:"sup"},
    {s:"bm06", t:"m06", tp:"sup"}, {s:"bm06", t:"m10", tp:"sup"},

    {s:"bm_vantage", t:"m01", tp:"sh", label:"ANOMALOUS ODDS SHIFT"},
    {s:"bm_vantage", t:"m02", tp:"sh", label:"ANOMALOUS ODDS SHIFT"},
    {s:"bm_vantage", t:"m07", tp:"sh", label:"ANOMALOUS ODDS SHIFT"},
    {s:"bm08", t:"m04", tp:"sh", label:"ANOMALOUS ODDS SHIFT"},
    {s:"bm09", t:"m06", tp:"sh", label:"ANOMALOUS ODDS SHIFT"},
    {s:"bm10", t:"m02", tp:"sup"},
    {s:"bm11", t:"m07", tp:"sup"},
    {s:"bm12", t:"m04", tp:"sup"},

    {s:"syn_solvana", t:"bm_vantage", tp:"sh", label:"SUSPECTED COORDINATION"},
    {s:"syn_solvana", t:"m02", tp:"sh", label:"SUSPECTED FIX"},
    {s:"syn_solvana", t:"m04", tp:"sh", label:"SUSPECTED FIX"},
    {s:"syn02", t:"bm09", tp:"sh", label:"SUSPECTED COORDINATION"},
    {s:"syn03", t:"bm08", tp:"sh", label:"SUSPECTED COORDINATION"},
    {s:"syn04", t:"m06", tp:"sh", label:"SUSPECTED FIX"},

    {s:"syn_solvana", t:"r01", tp:"sh", label:"SUSPECTED PAYMENT"},
    {s:"syn_solvana", t:"r08", tp:"sh", label:"SUSPECTED PAYMENT"},
    {s:"syn04", t:"r03", tp:"sh", label:"SUSPECTED PAYMENT"},
  ];

  const tab2TierX = { ubo:"0.50", corp:"0.50", hub:"0.50", defense:"0.12", statesec:"0.18", customer:"0.82" };

  function resolveTierX(cfgTierX, W) {
    const out = {};
    Object.keys(cfgTierX).forEach(k => out[k] = W * parseFloat(cfgTierX[k]));
    return out;
  }

  // ==========================================================================
  // Wiring: tabs + lazy init of graph B + crosslink handler
  // ==========================================================================
  let graphA = null, graphB = null;

  function initTab1() {
    const wrap = document.getElementById("wrap-a");
    const W = Math.max(wrap.getBoundingClientRect().width, 400) || 800;
    graphA = initNetworkGraph("a", {
      catCfg: tab1CatCfg,
      nodes: tab1Nodes,
      linkDefs: tab1LinkDefs,
      tierX: resolveTierX(tab1TierX, W),
      collidePad: 30,
      onBadgeClick: function(d) { goToGamblingTie(d.gamblingTie); }
    });
  }

  function initTab2() {
    const wrap = document.getElementById("wrap-b");
    const W = Math.max(wrap.getBoundingClientRect().width, 400) || 800;
    graphB = initNetworkGraph("b", {
      catCfg: tab2CatCfg,
      nodes: tab2Nodes,
      linkDefs: tab2LinkDefs,
      tierX: resolveTierX(tab2TierX, W),
      collidePad: 26
    });
  }

  function showTab(which) {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === which));
    document.getElementById("tab1").classList.toggle("active", which === "tab1");
    document.getElementById("tab2").classList.toggle("active", which === "tab2");
    if (which === "tab2" && !graphB) {
      // allow layout to settle now that the panel is visible before measuring width
      requestAnimationFrame(initTab2);
    }
  }

  function goToGamblingTie(tie) {
    showTab("tab2");
    const settle = graphB ? 50 : 350; // longer delay if graph B needs to init first
    setTimeout(function() {
      if (!graphB) { requestAnimationFrame(initTab2); setTimeout(() => graphB && graphB.flashNode(tie.targetId), 300); }
      else graphB.flashNode(tie.targetId);
    }, settle);
  }

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });

  initTab1();

})();
