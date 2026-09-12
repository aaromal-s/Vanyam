/* ============================================
   VANYAM — Interactive SVG Map
   Exact Kerala outline fetched dynamically
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== MAP REGION DATA (Mapped to 1429x2500 scale) ==========

  const mapRegions = [
    {
      id: 'silent-valley',
      name: 'Silent Valley National Park',
      district: 'Palakkad',
      ecosystem: 'Tropical Evergreen Rainforest',
      wildlife: 'Lion-tailed Macaque, Nilgiri Langur, Malabar Giant Squirrel',
      characteristics: 'One of the last undisturbed tropical evergreen forests in India.',
      cx: 820, cy: 920
    },
    {
      id: 'periyar',
      name: 'Periyar Tiger Reserve',
      district: 'Idukki & Pathanamthitta',
      ecosystem: 'Tropical Evergreen & Deciduous Forests',
      wildlife: 'Tiger, Asian Elephant, Gaur, Sambar, Nilgiri Langur',
      characteristics: 'Centred around the 26 sq km Periyar Lake. One of India\'s most popular tiger reserves.',
      cx: 1100, cy: 1720
    },
    {
      id: 'eravikulam',
      name: 'Eravikulam National Park',
      district: 'Idukki',
      ecosystem: 'Shola Forests & Montane Grasslands',
      wildlife: 'Nilgiri Tahr, Nilgiri Marten, Atlas Moth',
      characteristics: 'Contains Anamudi (2,695 m), the highest peak in South India.',
      cx: 1020, cy: 1400
    },
    {
      id: 'wayanad',
      name: 'Wayanad Wildlife Sanctuary',
      district: 'Wayanad',
      ecosystem: 'Moist Deciduous Forest',
      wildlife: 'Asian Elephant, Tiger, Dhole, Indian Bison',
      characteristics: 'Part of the Nilgiri Biosphere Reserve. Vital elephant corridor.',
      cx: 680, cy: 460
    },
    {
      id: 'parambikulam',
      name: 'Parambikulam Tiger Reserve',
      district: 'Palakkad',
      ecosystem: 'Tropical Evergreen & Deciduous Forests',
      wildlife: 'Tiger, Leopard, Nilgiri Tahr, Lion-tailed Macaque',
      characteristics: 'Home to the Kannimara Teak — one of the oldest living teak trees.',
      cx: 880, cy: 1220
    },
    {
      id: 'neyyar',
      name: 'Neyyar Wildlife Sanctuary',
      district: 'Thiruvananthapuram',
      ecosystem: 'Tropical Evergreen Forest',
      wildlife: 'Asian Elephant, Nilgiri Tahr, Lion-tailed Macaque',
      characteristics: 'Located in the Agasthyamalai Biosphere Reserve near the southern tip.',
      cx: 1120, cy: 2360
    },
    {
      id: 'aralam',
      name: 'Aralam Wildlife Sanctuary',
      district: 'Kannur',
      ecosystem: 'Tropical Evergreen & Semi-Evergreen',
      wildlife: 'Asian Elephant, Sambar, Malabar Giant Squirrel',
      characteristics: 'The northernmost wildlife sanctuary in Kerala.',
      cx: 520, cy: 350
    },
    {
      id: 'shendurney',
      name: 'Shendurney Wildlife Sanctuary',
      district: 'Kollam',
      ecosystem: 'Tropical Evergreen Forest',
      wildlife: 'Asian Elephant, Tiger, Leopard, Slender Loris',
      characteristics: 'Named after the Shendurney River. Dense forest with medicinal plants.',
      cx: 1080, cy: 2150
    },
    {
      id: 'peechi-vazhani',
      name: 'Peechi–Vazhani Wildlife Sanctuary',
      district: 'Thrissur',
      ecosystem: 'Tropical Evergreen & Deciduous Forests',
      wildlife: 'Elephant, Leopard, Sambar, Bonnet Macaque',
      characteristics: 'Surrounds the Peechi and Vazhani dams. Important water catchment area.',
      cx: 680, cy: 1100
    }
  ];

  const mapWrapper = document.getElementById('keralaMap');
  if (!mapWrapper) return;

  // ========== FETCH AND INJECT SVG ==========
  fetch('assets/kerala_map.svg')
    .then(response => response.text())
    .then(svgText => {
      // Create a temporary container to parse the SVG
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = svgText;
      const fetchedSvg = tempDiv.querySelector('svg');
      
      if (!fetchedSvg) {
        console.error('Could not find SVG element in fetched file.');
        return;
      }

      // Configure the exact map SVG
      fetchedSvg.setAttribute('viewBox', '0 0 1429 2500');
      fetchedSvg.setAttribute('width', '100%');
      fetchedSvg.setAttribute('height', '100%');
      fetchedSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      fetchedSvg.style.maxHeight = '800px';
      // Disable default tooltip titles from SVG paths
      fetchedSvg.querySelectorAll('title').forEach(t => t.remove());

      // Clean up styles to match our theme
      const isNight = document.body.classList.contains('forest-night');
      const fillColor = isNight ? '#162418' : '#e8f5e9';
      const strokeColor = isNight ? '#4fba6f' : '#2d7a3f';

      fetchedSvg.querySelectorAll('path').forEach(path => {
        path.removeAttribute('style');
        path.setAttribute('fill', fillColor);
        path.setAttribute('stroke', strokeColor);
        path.setAttribute('stroke-width', '4');
        path.classList.add('kerala-district');
      });

      // Add our interactive markers
      const svgNS = 'http://www.w3.org/2000/svg';
      
      mapRegions.forEach(region => {
        const group = document.createElementNS(svgNS, 'g');
        group.classList.add('map-region');
        group.setAttribute('data-region', region.id);
        group.setAttribute('role', 'button');
        group.setAttribute('tabindex', '0');
        group.setAttribute('aria-label', region.name);
        group.style.cursor = 'pointer';

        // Outer glow circle
        const glow = document.createElementNS(svgNS, 'circle');
        glow.setAttribute('cx', region.cx);
        glow.setAttribute('cy', region.cy);
        glow.setAttribute('r', '30');
        glow.setAttribute('fill', 'rgba(45, 122, 63, 0.25)');
        glow.setAttribute('stroke', 'none');
        group.appendChild(glow);

        // Main circle
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', region.cx);
        circle.setAttribute('cy', region.cy);
        circle.setAttribute('r', '15');
        circle.setAttribute('fill', strokeColor); // Match theme
        circle.setAttribute('stroke', '#fff');
        circle.setAttribute('stroke-width', '4');
        group.appendChild(circle);

        // Inner dot
        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('cx', region.cx);
        dot.setAttribute('cy', region.cy);
        dot.setAttribute('r', '5');
        dot.setAttribute('fill', '#fff');
        group.appendChild(dot);

        // Label
        const text = document.createElementNS(svgNS, 'text');
        const labelX = region.cx < 700 ? region.cx - 20 : region.cx + 40;
        text.setAttribute('x', labelX);
        text.setAttribute('y', region.cy + 10);
        text.setAttribute('font-size', '24');
        text.setAttribute('fill', isNight ? '#8aab82' : '#1a5c2a');
        text.setAttribute('font-family', 'Inter, sans-serif');
        text.setAttribute('font-weight', '600');
        if (region.cx < 700) text.setAttribute('text-anchor', 'end');
        text.textContent = region.name.replace(/ National Park| Wildlife Sanctuary| Tiger Reserve/g, '');
        group.appendChild(text);

        fetchedSvg.appendChild(group);
      });

      // Clear wrapper and append the finalized exact SVG
      mapWrapper.innerHTML = '';
      mapWrapper.appendChild(fetchedSvg);

      setupMapInteractions(fetchedSvg, mapRegions);
      setupNightModeObserver(fetchedSvg);
    })
    .catch(err => console.error("Error loading SVG map:", err));

  // ========== MAP INTERACTION ==========
  function setupMapInteractions(svg, regions) {
    const mapInfoDefault = document.querySelector('.map-info-default');
    const mapInfoContent = document.getElementById('mapInfoContent');
    let activeRegion = null;

    svg.addEventListener('click', (e) => {
      const regionGroup = e.target.closest('.map-region');
      if (!regionGroup) return;

      const regionId = regionGroup.dataset.region;
      const region = regions.find(r => r.id === regionId);
      if (!region) return;

      // Highlight
      svg.querySelectorAll('.map-region').forEach(r => r.classList.remove('active'));
      regionGroup.classList.add('active');
      activeRegion = region;

      // Update info panel
      if (mapInfoDefault) mapInfoDefault.style.display = 'none';
      if (mapInfoContent) mapInfoContent.style.display = '';
      document.getElementById('mapLocationName').textContent = region.name;
      document.getElementById('mapDistrict').textContent = region.district;
      document.getElementById('mapEcosystem').textContent = region.ecosystem;
      document.getElementById('mapWildlife').textContent = region.wildlife;
      document.getElementById('mapCharacteristics').textContent = region.characteristics;
    });

    // Keyboard support
    svg.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.target.click();
      }
    });

    // Explore button
    document.getElementById('mapExploreBtn')?.addEventListener('click', () => {
      if (!activeRegion) return;
      window.openModal(`
        <h2>${activeRegion.name}</h2>
        <div class="modal-detail"><span class="modal-detail-label">District</span><span class="modal-detail-value">${activeRegion.district}</span></div>
        <div class="modal-detail"><span class="modal-detail-label">Ecosystem</span><span class="modal-detail-value">${activeRegion.ecosystem}</span></div>
        <div class="modal-detail"><span class="modal-detail-label">Key Wildlife</span><span class="modal-detail-value">${activeRegion.wildlife}</span></div>
        <div class="modal-detail"><span class="modal-detail-label">Characteristics</span><span class="modal-detail-value">${activeRegion.characteristics}</span></div>
      `);
    });
  }

  // ========== NIGHT MODE MAP COLORS ==========
  function setupNightModeObserver(svg) {
    const observer = new MutationObserver(() => {
      const isNight = document.body.classList.contains('forest-night');
      const fillColor = isNight ? '#162418' : '#e8f5e9';
      const strokeColor = isNight ? '#4fba6f' : '#2d7a3f';

      svg.querySelectorAll('path.kerala-district').forEach(p => {
        p.setAttribute('fill', fillColor);
        p.setAttribute('stroke', strokeColor);
      });

      svg.querySelectorAll('.map-region circle:nth-child(2)').forEach(c => {
        c.setAttribute('fill', strokeColor);
      });
      
      svg.querySelectorAll('.map-region text').forEach(t => {
        t.setAttribute('fill', isNight ? '#8aab82' : '#1a5c2a');
      });
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

});
