(function() {
    // 1. VERİ & ÖLÇEKLENDİRME (1 Parçacık = 40 Öğrenci)
    const PARTICLES_PER_UNIT = 40; 
    
    const rawData = [
      { year: "2024-25", total: 11217, Vocational: 2360, Bachelor: 8287, Master: 495, PhD: 75, VE: 1193, VK: 1167, BE: 3817, BK: 4470, ME: 300, MK: 195, PE: 48, PK: 27 },
      { year: "2023-24", total: 11655, Vocational: 2455, Bachelor: 8613, Master: 509, PhD: 78, VE: 1232, VK: 1223, BE: 3917, BK: 4696, ME: 205, MK: 304, PE: 30, PK: 48 },
      { year: "2022-23", total: 10603, Vocational: 2115, Bachelor: 7839, Master: 567, PhD: 82, VE: 1085, VK: 1030, BE: 3702, BK: 4137, ME: 234, MK: 333, PE: 29, PK: 53 },
      { year: "2021-22", total: 10038, Vocational: 1966, Bachelor: 7410, Master: 574, PhD: 88, VE: 939, VK: 1027, BE: 3554, BK: 3856, ME: 373, MK: 201, PE: 34, PK: 54 },
      { year: "2020-21", total: 9965, Vocational: 1844, Bachelor: 7449, Master: 584, PhD: 88, VE: 944, VK: 900, BE: 3654, BK: 3795, ME: 206, MK: 378, PE: 38, PK: 50 },
      { year: "2019-20", total: 9441, Vocational: 1734, Bachelor: 7157, Master: 475, PhD: 75, VE: 896, VK: 838, BE: 3558, BK: 3599, ME: 294, MK: 181, PE: 41, PK: 34 },
      { year: "2018-19", total: 9322, Vocational: 1603, Bachelor: 7043, Master: 598, PhD: 78, VE: 877, VK: 726, BE: 3483, BK: 3560, ME: 328, MK: 270, PE: 36, PK: 42 },
      { year: "2017-18", total: 9774, Vocational: 1663, Bachelor: 7245, Master: 794, PhD: 72, VE: 740, VK: 923, BE: 3602, BK: 3643, ME: 498, MK: 296, PE: 37, PK: 35 },
      { year: "2016-17", total: 9962, Vocational: 1693, Bachelor: 7202, Master: 998, PhD: 69, VE: 754, VK: 939, BE: 3619, BK: 3583, ME: 661, MK: 337, PE: 39, PK: 30 },
      { year: "2015-16", total: 10193, Vocational: 1306, Bachelor: 7869, Master: 937, PhD: 81, VE: 619, VK: 687, BE: 3827, BK: 4042, ME: 559, MK: 378, PE: 42, PK: 39 },
      { year: "2014-15", total: 7605, Vocational: 774, Bachelor: 6116, Master: 652, PhD: 63, VE: 386, VK: 388, BE: 3022, BK: 3094, ME: 370, MK: 282, PE: 28, PK: 35 },
      { year: "2013-14", total: 6824, Vocational: 700, Bachelor: 5512, Master: 549, PhD: 63, VE: 353, VK: 347, BE: 2755, BK: 2757, ME: 286, MK: 263, PE: 28, PK: 35 },
      { year: "2012-13", total: 6578, Vocational: 288, Bachelor: 5926, Master: 317, PhD: 47, VE: 165, VK: 123, BE: 2962, BK: 2964, ME: 161, MK: 156, PE: 26, PK: 21 },
      { year: "2011-12", total: 6485, Vocational: 166, Bachelor: 6049, Master: 235, PhD: 35, VE: 108, VK: 58, BE: 3022, BK: 3027, ME: 116, MK: 119, PE: 16, PK: 19 },
      { year: "2010-11", total: 6198, Vocational: 101, Bachelor: 5872, Master: 193, PhD: 32, VE: 66, VK: 35, BE: 2919, BK: 2953, ME: 98, MK: 95, PE: 15, PK: 17 },
      { year: "2009-10", total: 6107, Vocational: 113, Bachelor: 5810, Master: 157, PhD: 27, VE: 65, VK: 48, BE: 2826, BK: 2984, ME: 78, MK: 79, PE: 10, PK: 17 },
      { year: "2008-09", total: 5984, Vocational: 147, Bachelor: 5635, Master: 182, PhD: 20, VE: 67, VK: 80, BE: 2738, BK: 2897, ME: 99, MK: 83, PE: 5, PK: 15 },
      { year: "2007-08", total: 5499, Vocational: 329, Bachelor: 4947, Master: 208, PhD: 15, VE: 139, VK: 190, BE: 2448, BK: 2499, ME: 112, MK: 96, PE: 3, PK: 12 },
      { year: "2006-07", total: 5016, Vocational: 612, Bachelor: 4143, Master: 244, PhD: 17, VE: 253, VK: 359, BE: 2133, BK: 2010, ME: 119, MK: 125, PE: 12, PK: 5 },
      { year: "2005-06", total: 4615, Vocational: 897, Bachelor: 3483, Master: 223, PhD: 12, VE: 381, VK: 516, BE: 1806, BK: 1677, ME: 116, MK: 107, PE: 9, PK: 3 },
      { year: "2004-05", total: 3512, Vocational: 983, Bachelor: 2318, Master: 205, PhD: 6, VE: 405, VK: 578, BE: 1209, BK: 1109, ME: 121, MK: 84, PE: 4, PK: 2 },
      { year: "2003-04", total: 2484, Vocational: 1028, Bachelor: 1308, Master: 148, PhD: 0, VE: 354, VK: 674, BE: 715, BK: 593, ME: 93, MK: 55, PE: 0, PK: 0 },
      { year: "2002-03", total: 1280, Vocational: 580, Bachelor: 650, Master: 50, PhD: 0, VE: 172, VK: 408, BE: 348, BK: 302, ME: 31, MK: 19, PE: 0, PK: 0 },
      { year: "2001-02", total: 288, Vocational: 0, Bachelor: 288, Master: 0, PhD: 0, VE: 0, VK: 0, BE: 146, BK: 142, ME: 0, MK: 0, PE: 0, PK: 0 }
    ].reverse(); 
  
    const width = 1920, height = 1080; 
    const cx = (width / 2) + 400; 
    
    // GÜNCELLEME 1: Y ekseni merkezi (cy) görsel denge için 80 piksel aşağı alındı
    const cy = (height / 2) + 80; 
    
    const levels = ["Bachelor", "Master", "Vocational", "PhD"]; 
    
    const palette = {
      "PhD": "#6DD4A6",        
      "Master": "#7A83D1",     
      "Vocational": "#F59E2F", 
      "Bachelor": "#9D1D59"    
    };
    const textColors = { 
      dark: "#363636",   
      light: "#898989",  
      bg: "#F8F3E9",     
      accent: "#CDBE9F"  
    };
  
    const fontDisplay = "'Jost', sans-serif";
    const fontBody = "'Source Sans 3', sans-serif";
  
    const quadrants = {
        "Bachelor":   { x: width * 0.30, y: height * 0.32, title: "LİSANS" },
        "Master":     { x: width * 0.70, y: height * 0.32, title: "YÜKSEK LİSANS" },
        "Vocational": { x: width * 0.30, y: height * 0.72, title: "ÖN LİSANS" },
        "PhD":        { x: width * 0.70, y: height * 0.72, title: "DOKTORA" }
    };
  
    const numYears = rawData.length;
    const turns = 2.2; 
    const radiusScale = d3.scaleLinear().domain([0, numYears - 1]).range([120, 420]); 
    const angleScale = d3.scaleLinear().domain([0, numYears - 1]).range([0, Math.PI * 2 * turns]);
    const c_idle = 3.5; 
  
    const yearNodes = rawData.map((d, i) => {
        const r = radiusScale(i);
        const theta = angleScale(i) - (Math.PI / 2); 
        
        let totalParticles = 0;
        levels.forEach(lvl => {
            let prefix = lvl[0];
            totalParticles += Math.ceil((d[`${prefix}E`] || 0) / PARTICLES_PER_UNIT);
            totalParticles += Math.ceil((d[`${prefix}K`] || 0) / PARTICLES_PER_UNIT);
        });
        
        const clusterRadius = c_idle * Math.sqrt(totalParticles);
  
        return {
            ...d, index: i,
            yearX: cx + r * Math.cos(theta),
            yearY: cy + r * Math.sin(theta),
            theta: theta, 
            clusterRadius: clusterRadius
        };
    });
  
    let allParticles = [];
    const r_idle = 3;     
    const r_clicked = 6;  
  
    yearNodes.forEach((yearData) => {
        let yearParticles = [];
        levels.forEach(level => {
            let prefix = level[0];
            let mCount = Math.ceil((yearData[`${prefix}E`] || 0) / PARTICLES_PER_UNIT);
            let fCount = Math.ceil((yearData[`${prefix}K`] || 0) / PARTICLES_PER_UNIT);
            
            for(let i=0; i<mCount; i++) yearParticles.push({ id: `${yearData.year}-${level}-M-${i}`, year: yearData.year, level: level, gender: 'Male', color: d3.color(palette[level]).darker(0.5) });
            for(let i=0; i<fCount; i++) yearParticles.push({ id: `${yearData.year}-${level}-F-${i}`, year: yearData.year, level: level, gender: 'Female', color: d3.color(palette[level]).brighter(0.3) });
        });
  
        yearParticles.sort((a,b) => a.level.localeCompare(b.level)); 
        yearParticles.forEach((p, index) => {
            const a = index * 137.5 * (Math.PI / 180);
            const r = c_idle * Math.sqrt(index);
            p.idleX = yearData.yearX + r * Math.cos(a);
            p.idleY = yearData.yearY + r * Math.sin(a);
        });
  
        levels.forEach(level => {
            const levelParticles = yearParticles.filter(p => p.level === level);
            levelParticles.sort((a,b) => a.gender.localeCompare(b.gender)); 
            levelParticles.forEach((p, index) => {
                const a = index * 137.5 * (Math.PI / 180);
                const r = 5.5 * Math.sqrt(index);
                p.clickedX = quadrants[level].x + r * Math.cos(a);
                p.clickedY = quadrants[level].y + r * Math.sin(a) - 30; 
            });
        });
  
        allParticles.push(...yearParticles);
    });
  
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", "100%").attr("height", "auto")
        .style("background", textColors.bg)
        .style("font-family", fontBody);
  
    svg.append("defs").append("style").text(`
      @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700;800;900&family=Source+Sans+3:wght@400;600;700&display=swap');
    `);
  
    const bgRect = svg.append("rect")
        .attr("width", width).attr("height", height)
        .attr("fill", "transparent")
        .on("click", resetView);
  
    const mainTitleGroup = svg.append("g")
        .attr("class", "main-title")
        .attr("transform", `translate(120, ${cy - 160})`) // Başlığı da biraz yukarı çektik denge için
        .style("pointer-events", "none");
  
    mainTitleGroup.append("text")
        .text("AKADEMİK")
        .attr("text-anchor", "start")
        .attr("fill", textColors.dark)
        .style("font-family", fontDisplay)
        .attr("font-size", "72px")
        .attr("font-weight", "900")
        .attr("letter-spacing", "2px");
  
    mainTitleGroup.append("text")
        .text("SEVİYELER")
        .attr("y", 75)
        .attr("text-anchor", "start")
        .attr("fill", textColors.dark)
        .style("font-family", fontDisplay)
        .attr("font-size", "72px")
        .attr("font-weight", "900")
        .attr("letter-spacing", "2px");
  
    mainTitleGroup.append("text")
        .text("2001 - 2025 Yılları Arası Eğitim Seviyesi Dağılımı")
        .attr("y", 130)
        .attr("text-anchor", "start")
        .attr("fill", textColors.light)
        .style("font-family", fontBody)
        .attr("font-size", "22px")
        .attr("font-weight", "600")
        .attr("letter-spacing", "1px");
  
    const lineGen = d3.line().x(d => d.yearX).y(d => d.yearY).curve(d3.curveCatmullRom.alpha(0.5));
    const spiralPath = svg.append("path").datum(yearNodes).attr("d", lineGen)
        .attr("fill", "none").attr("stroke", textColors.accent)
        .attr("stroke-width", 3).attr("stroke-dasharray", "6 8")
        .style("pointer-events", "none");
  
    const particles = svg.append("g").attr("class", "particles")
        .selectAll("circle").data(allParticles).join("circle")
        .attr("cx", d => d.idleX).attr("cy", d => d.idleY).attr("r", r_idle)
        .attr("fill", d => d.color).attr("opacity", 0.95) 
        .style("pointer-events", "none");
  
    const labels = svg.append("g").attr("class", "year-labels")
        .selectAll("text").data(yearNodes).join("text")
        .attr("x", d => d.yearX + Math.cos(d.theta) * (d.clusterRadius + 18))
        .attr("y", d => d.yearY + Math.sin(d.theta) * (d.clusterRadius + 18))
        .attr("text-anchor", d => {
            if (Math.abs(Math.cos(d.theta)) < 0.15) return "middle";
            return Math.cos(d.theta) > 0 ? "start" : "end";
        })
        .attr("dominant-baseline", "middle")
        .text(d => d.year)
        .attr("fill", textColors.dark)
        .style("font-family", fontDisplay)
        .attr("font-size", "28px")
        .attr("font-weight", "800") 
        .style("opacity", 0) 
        .style("pointer-events", "none");
  
    const topDateText = svg.append("text")
        .attr("x", 120).attr("y", 160) 
        .attr("fill", textColors.dark).attr("opacity", 0)
        .style("font-family", fontDisplay)
        .attr("font-size", "100px").attr("font-weight", "900").attr("letter-spacing", "-2px")
        .style("pointer-events", "none");
  
    const hudGroup = svg.append("g").attr("class", "hud-group").style("opacity", 0).style("pointer-events", "none");
    const hudData = {};
  
    levels.forEach(lvl => {
        const g = hudGroup.append("g").attr("transform", `translate(${quadrants[lvl].x}, ${quadrants[lvl].y + 90})`);
        
        g.append("text").text(quadrants[lvl].title)
            .attr("text-anchor", "middle").attr("fill", palette[lvl])
            .style("font-family", fontDisplay)
            .attr("font-size", "20px").attr("font-weight", "800").attr("letter-spacing", "2px");
            
        const totalText = g.append("text").attr("y", 45) 
            .attr("text-anchor", "middle").attr("fill", textColors.dark)
            .style("font-family", fontBody) 
            .attr("font-size", "32px") 
            .attr("font-weight", "700"); 
            
        const detailText = g.append("text").attr("y", 80) 
            .attr("text-anchor", "middle").attr("fill", textColors.light)
            .style("font-family", fontBody)
            .attr("font-size", "18px").attr("font-weight", "600");
  
        hudData[lvl] = { total: totalText, detail: detailText };
    });
  
    let activeState = "IDLE"; 
    let activeFilter = null; 
  
    const legend = svg.append("g").attr("transform", `translate(120, ${height - 240})`); // Buton aralıkları arttığı için başlangıcı biraz yukarı çektim
    const legendSpacing = 48; // GÜNCELLEME 2: Butonların arası açıldı
  
    levels.forEach((lvl, i) => {
        const cRGB = d3.rgb(palette[lvl]); 
        const softBgColor = `rgba(${cRGB.r}, ${cRGB.g}, ${cRGB.b}, 0.12)`; // %12 saydamlık
  
        const g = legend.append("g")
            .attr("transform", `translate(0, ${i * legendSpacing})`)
            .style("cursor", "pointer")
            .on("click", (e) => toggleFilter(lvl))
            .on("mouseenter", function() {
                if (activeState === "IDLE" && activeFilter !== lvl) {
                    d3.select(this).select("text").attr("fill", palette[lvl]);
                    // Hover anında kapsül arka planı belirir
                    d3.select(this).select(".legend-bg").attr("fill", softBgColor);
                    d3.select(this).transition().duration(200).attr("transform", `translate(8, ${i * legendSpacing})`); 
                }
            })
            .on("mouseleave", function() {
                if (activeState === "IDLE") {
                    d3.select(this).select("text").attr("fill", activeFilter === lvl ? palette[lvl] : textColors.dark);
                    // Seçili değilse arka plan şeffaf olur
                    d3.select(this).select(".legend-bg").attr("fill", activeFilter === lvl ? softBgColor : "transparent");
                    d3.select(this).transition().duration(200).attr("transform", `translate(0, ${i * legendSpacing})`); 
                }
            });
  
        // GÜNCELLEME 3: Saydam Kapsül (Pill) Arka Plan
        g.append("rect")
         .attr("class", "legend-bg")
         .attr("x", -12).attr("y", -16)
         .attr("width", 180).attr("height", 32)
         .attr("rx", 16) // Tam yuvarlak köşeler
         .attr("fill", "transparent")
         .style("transition", "fill 0.3s ease");
  
        g.append("circle").attr("r", 8).attr("fill", palette[lvl]);
        
        g.append("text").attr("class", `legend-text-${lvl}`)
         .attr("x", 20).attr("y", 5).text(quadrants[lvl].title)
         .attr("fill", textColors.dark)
         .style("font-family", fontDisplay)
         .attr("font-size", "16px").attr("font-weight", "800")
         .style("pointer-events", "none"); // Yazının hover'ı bölmesini engeller
    });
  
    function toggleFilter(lvl) {
        if (activeState === "DETAIL") return;
  
        if (activeFilter === lvl) {
            activeFilter = null;
            particles.transition().duration(400)
                .attr("opacity", 0.95)
                .attr("r", r_idle);
  
            levels.forEach((l, idx) => {
                const item = legend.select(`g:nth-child(${idx + 1})`);
                item.select("text").attr("fill", textColors.dark);
                item.select(".legend-bg").attr("fill", "transparent");
            });
        } else {
            activeFilter = lvl;
            particles.transition().duration(400)
                .attr("opacity", d => d.level === lvl ? 1 : 0.05)
                .attr("r", d => d.level === lvl ? r_idle * 1.5 : r_idle);
  
            levels.forEach((l, idx) => {
                const isActive = l === lvl;
                const item = legend.select(`g:nth-child(${idx + 1})`);
                const lRGB = d3.rgb(palette[l]);
                
                item.select("text").attr("fill", isActive ? palette[l] : textColors.light);
                item.select(".legend-bg").attr("fill", isActive ? `rgba(${lRGB.r}, ${lRGB.g}, ${lRGB.b}, 0.12)` : "transparent");
            });
        }
    }
  
    const spiralHitAreas = svg.append("g").attr("class", "hit-areas")
        .selectAll("circle").data(yearNodes).join("circle")
        .attr("cx", d => d.yearX).attr("cy", d => d.yearY).attr("r", 50) 
        .attr("fill", "transparent").style("cursor", "pointer")
        .on("mouseenter", (e, d) => hoverIn(d))
        .on("mouseleave", (e, d) => hoverOut(d))
        .on("click", (e, d) => { e.stopPropagation(); activateYear(d); });
  
    function hoverIn(d) {
        if (activeState === "DETAIL") return;
        labels.filter(l => l.year === d.year).transition().duration(200).style("opacity", 1);
        
        particles.filter(p => p.year === d.year)
            .transition().duration(200)
            .attr("r", r_idle * 1.8)
            .attr("opacity", p => activeFilter ? (p.level === activeFilter ? 1 : 0.05) : 1);
        
        labels.filter(l => l.year !== d.year).transition().duration(200).style("opacity", 0);
        
        particles.filter(p => p.year !== d.year)
            .transition().duration(200)
            .attr("opacity", activeFilter ? 0.02 : 0.1); 
            
        spiralPath.transition().duration(200).style("opacity", 0.2); 
        mainTitleGroup.transition().duration(200).style("opacity", 0.1); 
    }
    
    function hoverOut(d) {
        if (activeState === "DETAIL") return;
        labels.transition().duration(200).style("opacity", 0);
        
        particles.transition().duration(200)
            .attr("r", p => activeFilter && p.level === activeFilter ? r_idle * 1.5 : r_idle)
            .attr("opacity", p => activeFilter ? (p.level === activeFilter ? 1 : 0.05) : 0.95);
  
        spiralPath.transition().duration(200).style("opacity", 1);
        mainTitleGroup.transition().duration(200).style("opacity", 1); 
    }
  
    function activateYear(d) {
        activeState = "DETAIL";
        activeFilter = null; 
  
        spiralHitAreas.style("pointer-events", "none");
  
        spiralPath.transition().duration(400).style("opacity", 0);
        labels.transition().duration(300).style("opacity", 0);
        mainTitleGroup.transition().duration(300).style("opacity", 0); 
        legend.transition().duration(300).style("opacity", 0); 
        
        particles.filter(p => p.year !== d.year).transition().duration(400).attr("r", 1).attr("opacity", 0.05);
  
        particles.filter(p => p.year === d.year)
            .transition().duration(800).ease(d3.easeCubicInOut)
            .attr("cx", p => p.clickedX)
            .attr("cy", p => p.clickedY)
            .attr("r", r_clicked)
            .attr("opacity", 1);
  
        levels.forEach((lvl, idx) => {
            const prefix = lvl[0];
            let ratio = 0;
            if(d.total > 0) ratio = (((d[lvl] || 0) / d.total) * 100).toFixed(1);
            
            hudData[lvl].total.text(`${(d[lvl] || 0).toLocaleString('tr-TR')} Öğrenci (%${ratio})`);
            hudData[lvl].detail.text(`E: ${(d[`${prefix}E`] || 0).toLocaleString('tr-TR')}  |  K: ${(d[`${prefix}K`] || 0).toLocaleString('tr-TR')}`);
            
            const item = legend.select(`g:nth-child(${idx + 1})`);
            item.select("text").attr("fill", textColors.dark);
            item.select(".legend-bg").attr("fill", "transparent");
            item.attr("transform", `translate(0, ${idx * legendSpacing})`);
        });
        hudGroup.transition().delay(400).duration(400).style("opacity", 1);
  
        topDateText.text(d.year).transition().duration(600).attr("opacity", 1);
    }
  
    function resetView() {
        if (activeState !== "DETAIL") return;
        activeState = "IDLE";
  
        hudGroup.transition().duration(300).style("opacity", 0);
        topDateText.transition().duration(300).attr("opacity", 0);
  
        particles.transition().duration(800).ease(d3.easeCubicInOut)
            .attr("cx", p => p.idleX)
            .attr("cy", p => p.idleY)
            .attr("r", r_idle)
            .attr("opacity", 0.95);
  
        spiralPath.transition().delay(400).duration(600).style("opacity", 1);
        mainTitleGroup.transition().delay(400).duration(600).style("opacity", 1); 
        legend.transition().delay(400).duration(600).style("opacity", 1); 
        
        labels.transition().delay(400).duration(600).style("opacity", 0);
  
        setTimeout(() => {
            spiralHitAreas.style("pointer-events", "all");
        }, 800);
    }
  
    // Çıkan SVG elementini id'si 'chart-container' olan html div'ine ekliyoruz.
    document.getElementById("chart-container").appendChild(svg.node());
  })();
