/* ============================================
   VANYAM — Main JavaScript
   Core interactions, navigation, modals,
   night mode, audio, and utilities
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ========== NAVIGATION ==========

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;

    // Back to top visibility
    updateBackToTop();

    // Parallax hero
    updateParallax();
  });

  // Mobile hamburger toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 100;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  });


  // ========== SEARCH ==========

  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const globalSearch = document.getElementById('globalSearch');
  const searchResults = document.getElementById('searchResults');

  // Searchable content index
  const searchIndex = [
    { title: 'Forests of Kerala', section: '#forests', desc: 'Tropical evergreen, deciduous, shola and montane forests' },
    { title: 'Wildlife Explorer', section: '#wildlife', desc: 'Asian Elephant, Tiger, Leopard, Great Hornbill and more' },
    { title: 'National Parks', section: '#parks', desc: 'Silent Valley, Eravikulam, Periyar Tiger Reserve' },
    { title: 'Ecosystems & Rivers', section: '#ecosystems', desc: 'Periyar, Pamba, Bharathapuzha — forest to river connections' },
    { title: 'Conservation', section: '#conservation', desc: 'Protected areas, wildlife corridors, community participation' },
    { title: 'Photo Gallery', section: '#gallery', desc: 'Images of Kerala forests, wildlife, birds and landscapes' },
    { title: 'Forest Quiz', section: '#quiz', desc: 'Test your knowledge of Kerala forests and wildlife' },
    { title: 'Monsoon Experience', section: '#monsoon', desc: 'Interactive rain animation and monsoon information' },
    { title: 'Forest Sounds', section: '#sounds', desc: 'Listen to rainforest, birds, rivers and monsoon rain' },
    { title: 'Forest Threats', section: '#threats', desc: 'Deforestation, climate change, invasive species' },
    { title: 'Plants & Flora', section: '#plants', desc: 'Trees, flowers, medicinal and endemic plants' },
    { title: 'Interactive Map', section: '#forest-map', desc: 'Explore Kerala\'s protected forest regions' },
    { title: 'Glossary', section: '#glossary', desc: 'Key terms: biodiversity, ecosystem, habitat, endemic' },
    { title: 'Ecosystem Comparison', section: '#comparison', desc: 'Compare forest types side by side' },
  ];

  searchToggle.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchOverlay.setAttribute('aria-hidden', 'false');
    globalSearch.focus();
  });

  searchClose.addEventListener('click', closeSearch);

  function closeSearch() {
    searchOverlay.classList.remove('active');
    searchOverlay.setAttribute('aria-hidden', 'true');
    globalSearch.value = '';
    searchResults.innerHTML = '';
  }

  globalSearch.addEventListener('input', debounce((e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchResults.innerHTML = '';
      return;
    }
    const results = searchIndex.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query)
    );
    searchResults.innerHTML = results.length
      ? results.map(r => `
        <div class="search-result-item" data-section="${r.section}">
          <h4>${r.title}</h4>
          <p>${r.desc}</p>
        </div>
      `).join('')
      : '<div class="search-result-item"><p>No results found. Try different keywords.</p></div>';
  }, 200));

  searchResults.addEventListener('click', (e) => {
    const item = e.target.closest('.search-result-item');
    if (item && item.dataset.section) {
      closeSearch();
      document.querySelector(item.dataset.section)?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Close search on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeModal();
      closeLightbox();
    }
  });


  // ========== PARALLAX HERO ==========

  function updateParallax() {
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
      }
    }
  }


  // ========== BACK TO TOP ==========

  const backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
    if (window.pageYOffset > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ========== SCROLL REVEAL ==========

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    revealObserver.observe(el);
  });


  // ========== COUNTER ANIMATION ==========

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach(counter => {
          animateCounter(counter);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) counterObserver.observe(statsSection);

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }


  // ========== FOREST NIGHT MODE ==========

  const nightModeToggle = document.getElementById('nightModeToggle');

  // Check session storage
  if (sessionStorage.getItem('forestNight') === 'true') {
    document.body.classList.add('forest-night');
    createFireflies();
  }

  nightModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('forest-night');
    const isNight = document.body.classList.contains('forest-night');
    sessionStorage.setItem('forestNight', isNight);

    if (isNight) {
      createFireflies();
    } else {
      removeFireflies();
    }
  });


  // ========== FIREFLIES ==========

  const firefliesContainer = document.getElementById('firefliesContainer');

  function createFireflies() {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    removeFireflies();
    const count = 20;
    for (let i = 0; i < count; i++) {
      const firefly = document.createElement('div');
      firefly.classList.add('firefly');
      firefly.style.left = Math.random() * 100 + '%';
      firefly.style.top = Math.random() * 100 + '%';
      firefly.style.setProperty('--fx', (Math.random() * 100 - 50) + 'px');
      firefly.style.setProperty('--fy', (Math.random() * 60 - 30) + 'px');
      firefly.style.setProperty('--fx2', (Math.random() * 80 - 40) + 'px');
      firefly.style.setProperty('--fy2', (Math.random() * 80 - 40) + 'px');
      firefly.style.animationDuration = (3 + Math.random() * 4) + 's';
      firefly.style.animationDelay = (Math.random() * 5) + 's';
      firefliesContainer.appendChild(firefly);
    }
  }

  function removeFireflies() {
    firefliesContainer.innerHTML = '';
  }


  // ========== MONSOON RAIN ANIMATION ==========

  const monsoonToggle = document.getElementById('monsoonToggle');
  const rainContainer = document.getElementById('rainContainer');
  const clouds = document.getElementById('clouds');
  let isRaining = false;

  monsoonToggle.addEventListener('click', () => {
    isRaining = !isRaining;
    if (isRaining) {
      startRain();
      monsoonToggle.textContent = '☀️ STOP MONSOON';
    } else {
      stopRain();
      monsoonToggle.textContent = '<span class="material-symbols-rounded">rainy</span> EXPERIENCE MONSOON';
    }
  });

  function startRain() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Create rain drops
    for (let i = 0; i < 80; i++) {
      const drop = document.createElement('div');
      drop.classList.add('rain-drop');
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      drop.style.height = (15 + Math.random() * 15) + 'px';
      rainContainer.appendChild(drop);
    }

    // Create clouds
    for (let i = 0; i < 5; i++) {
      const cloud = document.createElement('div');
      cloud.classList.add('cloud');
      cloud.style.width = (100 + Math.random() * 200) + 'px';
      cloud.style.height = (40 + Math.random() * 60) + 'px';
      cloud.style.top = (Math.random() * 30) + '%';
      cloud.style.animationDuration = (15 + Math.random() * 20) + 's';
      cloud.style.animationDelay = (-Math.random() * 15) + 's';
      clouds.appendChild(cloud);
    }

    // Create leaves
    for (let i = 0; i < 5; i++) {
      const leaf = document.createElement('div');
      leaf.classList.add('leaf');
      leaf.textContent = '<span class="material-symbols-rounded">energy_savings_leaf</span>';
      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.animationDuration = (5 + Math.random() * 5) + 's';
      leaf.style.animationDelay = Math.random() * 5 + 's';
      rainContainer.appendChild(leaf);
    }
  }

  function stopRain() {
    rainContainer.innerHTML = '';
    clouds.innerHTML = '';
  }


  // ========== AUDIO PLAYER ==========

  const audioPlayBtn = document.getElementById('audioPlayBtn');
  const audioProgress = document.getElementById('audioProgress');
  const audioProgressBar = document.getElementById('audioProgressBar');
  const audioCurrentTrack = document.getElementById('audioCurrentTrack');
  const volumeSlider = document.getElementById('volumeSlider');
  const audioTrackBtns = document.querySelectorAll('.audio-track-btn');

  const audioTracks = {
    rainforest: { name: 'Rainforest', file: 'assets/audio/rainforest.mp3' },
    birds: { name: 'Birds', file: 'assets/audio/birds.mp3' },
    river: { name: 'Flowing River', file: 'assets/audio/river.mp3' },
    monsoon: { name: 'Monsoon Rain', file: 'assets/audio/monsoon.mp3' }
  };

  let currentTrack = 'rainforest';
  let audio = new Audio();
  let isPlaying = false;

  audioTrackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      audioTrackBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTrack = btn.dataset.track;
      audioCurrentTrack.textContent = audioTracks[currentTrack].name;

      if (isPlaying) {
        audio.src = audioTracks[currentTrack].file;
        audio.play().catch(() => {});
      }
    });
  });

  audioPlayBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      audioPlayBtn.classList.remove('playing');
      audioPlayBtn.querySelector('.play-icon').textContent = '<span class="material-symbols-rounded">play_arrow</span>';
    } else {
      audio.src = audioTracks[currentTrack].file;
      audio.volume = volumeSlider.value / 100;
      audio.play().catch(() => {
        // Audio file not available — show graceful message
        audioCurrentTrack.textContent = audioTracks[currentTrack].name + ' (file not found)';
      });
      isPlaying = true;
      audioPlayBtn.classList.add('playing');
      audioPlayBtn.querySelector('.play-icon').textContent = '⏸';
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      audioProgress.style.width = pct + '%';
    }
  });

  audio.addEventListener('ended', () => {
    isPlaying = false;
    audioPlayBtn.classList.remove('playing');
    audioPlayBtn.querySelector('.play-icon').textContent = '<span class="material-symbols-rounded">play_arrow</span>';
    audioProgress.style.width = '0%';
  });

  audioProgressBar.addEventListener('click', (e) => {
    if (audio.duration) {
      const rect = audioProgressBar.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * audio.duration;
    }
  });

  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
  });


  // ========== MODAL SYSTEM ==========

  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalClose');

  function openModal(content) {
    modalBody.innerHTML = content;
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus trap
    modalCloseBtn.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Make openModal available globally for other scripts
  window.openModal = openModal;
  window.closeModal = closeModal;


  // ========== FOREST TYPE MODALS ==========

  const forestModals = {
    'forest-evergreen': `
      <img class="modal-img" src="https://images.unsplash.com/photo-1441974231531-d6222b60ce6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tropical Evergreen Forest">
      <h2>Tropical Evergreen Forest</h2>
      <div class="modal-detail"><span class="modal-detail-label">Rainfall</span><span class="modal-detail-value">Over 2,500 mm annually</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Elevation</span><span class="modal-detail-value">Up to 1,500 metres</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Canopy Height</span><span class="modal-detail-value">40–60 metres</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Key Trees</span><span class="modal-detail-value">Dipterocarpus, Mesua, Palaquium, Hopea</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Wildlife</span><span class="modal-detail-value">Lion-tailed Macaque, Malabar Giant Squirrel, Great Hornbill, King Cobra</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Locations</span><span class="modal-detail-value">Silent Valley, Agasthyamalai, parts of Periyar</span></div>
      <div class="modal-fact"><strong><span class="material-symbols-rounded">eco</span> Did you know?</strong>Kerala's tropical evergreen forests are among the oldest rainforests in the world, with some species lineages dating back over 50 million years.</div>
    `,
    'forest-deciduous': `
      <img class="modal-img" src="https://images.unsplash.com/photo-1516026672322-bc525ce1464c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Moist Deciduous Forest">
      <h2>Moist Deciduous Forest</h2>
      <div class="modal-detail"><span class="modal-detail-label">Rainfall</span><span class="modal-detail-value">1,500–2,500 mm annually</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Elevation</span><span class="modal-detail-value">500–1,200 metres</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Characteristics</span><span class="modal-detail-value">Many trees shed leaves during dry season, creating a more open canopy</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Key Trees</span><span class="modal-detail-value">Teak (Tectona grandis), Rosewood (Dalbergia latifolia), Bamboo</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Wildlife</span><span class="modal-detail-value">Asian Elephant, Gaur, Sambar Deer, Dhole</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Locations</span><span class="modal-detail-value">Parambikulam, Wayanad, parts of Periyar</span></div>
      <div class="modal-fact"><strong><span class="material-symbols-rounded">eco</span> Did you know?</strong>Kerala's teak plantations — originally established during British colonial rule — are now some of the most valuable timber forests in India.</div>
    `,
    'forest-shola': `
      <img class="modal-img" src="https://images.unsplash.com/photo-1518182170546-076616fd4aa0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Shola Forest">
      <h2>Shola Forest</h2>
      <div class="modal-detail"><span class="modal-detail-label">Elevation</span><span class="modal-detail-value">Above 1,500 metres</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Characteristics</span><span class="modal-detail-value">Stunted, dense evergreen forests found in sheltered valleys between grassland hilltops</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Climate</span><span class="modal-detail-value">Cool, moist, with frequent mist and cloud cover</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Key Trees</span><span class="modal-detail-value">Rhododendron, Michelia, Syzygium — many endemic species</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Wildlife</span><span class="modal-detail-value">Nilgiri Tahr, Nilgiri Marten, many endemic birds and amphibians</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Locations</span><span class="modal-detail-value">Eravikulam, Munnar, Anamudi area</span></div>
      <div class="modal-fact"><strong><span class="material-symbols-rounded">eco</span> Did you know?</strong>Shola forests are critical water catchments — their root systems and mossy soil can absorb and store enormous quantities of rainfall, slowly releasing it as streams throughout the year.</div>
    `,
    'forest-montane': `
      <img class="modal-img" src="https://images.unsplash.com/photo-1472393365824-de5fb14db0b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Montane Grasslands">
      <h2>Montane Grasslands</h2>
      <div class="modal-detail"><span class="modal-detail-label">Elevation</span><span class="modal-detail-value">Above 2,000 metres</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Characteristics</span><span class="modal-detail-value">Rolling grassy slopes interspersed with shola forest patches in valleys</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Climate</span><span class="modal-detail-value">Cool temperatures (5–20°C), high winds, frequent frost at the highest elevations</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Vegetation</span><span class="modal-detail-value">Hardy grasses, herbs, orchids and other low-growing plants</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Wildlife</span><span class="modal-detail-value">Nilgiri Tahr (flagship species), Nilgiri Pipit, several endemic butterflies</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Locations</span><span class="modal-detail-value">Eravikulam National Park, Top Station, Anamudi summit region</span></div>
      <div class="modal-fact"><strong><span class="material-symbols-rounded">eco</span> Did you know?</strong>Anamudi (2,695 m) in Kerala's montane grasslands is the highest peak in South India. The grasslands around it are home to the largest population of the endangered Nilgiri Tahr.</div>
    `,
    'forest-riparian': `
      <img class="modal-img" src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Riparian and Bamboo Forest">
      <h2>Bamboo & Riparian Ecosystems</h2>
      <div class="modal-detail"><span class="modal-detail-label">Location</span><span class="modal-detail-value">Along rivers, streams and forest edges</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Characteristics</span><span class="modal-detail-value">Dense bamboo thickets and streamside vegetation forming green corridors</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Key Species</span><span class="modal-detail-value">Bamboo (Bambusa, Ochlandra), Pandanus, various ferns and mosses</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Wildlife</span><span class="modal-detail-value">Otters, kingfishers, freshwater fish, frogs, crabs, dragonflies</span></div>
      <div class="modal-detail"><span class="modal-detail-label">Ecological Role</span><span class="modal-detail-value">Prevent soil erosion, filter water, connect forest fragments as wildlife corridors</span></div>
      <div class="modal-fact"><strong><span class="material-symbols-rounded">eco</span> Did you know?</strong>Bamboo can grow up to 30 cm per day, making it one of the fastest-growing plants on Earth. Kerala's bamboo forests provide food for elephants, material for tribal communities and habitat for many species.</div>
    `
  };

  // Event delegation for forest modals
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-modal]');
    if (btn) {
      const key = btn.dataset.modal;
      if (forestModals[key]) openModal(forestModals[key]);
      else if (threatModals[key]) openModal(threatModals[key]);
    }
  });


  // ========== THREAT MODALS ==========

  const threatModals = {
    'threat-fire': `
      <h2><span class="material-symbols-rounded">local_fire_department</span> Forest Fires</h2>
      <p>Forest fires in Kerala are most common during the dry summer months (February–May). While some fires occur naturally, the majority are caused by human activities including slash-and-burn agriculture, discarded cigarettes and deliberate burning.</p>
      <h3>Impact</h3>
      <p>Fires destroy undergrowth, kill young trees and saplings, drive wildlife away and degrade soil quality. Repeated fires can prevent forest regeneration and convert forest into grassland or scrub.</p>
      <h3>What's Being Done</h3>
      <p>The Kerala Forest Department maintains fire lines (cleared strips that block fire spread), fire watchtowers and community fire brigades. Early warning systems and rapid response teams are deployed during fire season.</p>
    `,
    'threat-deforestation': `
      <h2><span class="material-symbols-rounded">park</span> Deforestation</h2>
      <p>Although Kerala has stronger forest protection laws than many Indian states, deforestation continues through encroachment, illegal logging and conversion of forest land to plantations (tea, coffee, rubber, cardamom).</p>
      <h3>Impact</h3>
      <p>Loss of forest cover reduces biodiversity, disrupts water cycles, increases landslide risk and fragments wildlife habitat. Downstream communities face water shortages and increased flooding.</p>
      <h3>Scale</h3>
      <p>Kerala's forest cover has declined significantly since independence, though recent decades have seen some stabilisation due to stronger enforcement and public awareness.</p>
    `,
    'threat-fragmentation': `
      <h2><span class="material-symbols-rounded">construction</span> Habitat Fragmentation</h2>
      <p>Roads, railways, settlements, dams and plantations break up continuous forest into isolated patches. Wildlife populations in small fragments face genetic inbreeding, resource shortage and increased vulnerability.</p>
      <h3>Impact</h3>
      <p>Large animals like elephants need vast territories and connected corridors to move between feeding areas, breeding grounds and seasonal habitats. Fragmentation forces them into human-settled areas, causing conflict.</p>
    `,
    'threat-climate': `
      <h2><span class="material-symbols-rounded">thermostat</span> Climate Change</h2>
      <p>Climate models predict that the Western Ghats will experience rising temperatures, shifting monsoon patterns and more extreme weather events. Kerala has already experienced unprecedented flooding (2018, 2019) linked to unusual rainfall patterns.</p>
      <h3>Impact</h3>
      <p>Shola forests and montane grasslands are particularly vulnerable — temperature increases could push these ecosystems uphill, shrinking available habitat. Changed rainfall patterns affect forest regeneration and river flows.</p>
    `,
    'threat-invasive': `
      <h2><span class="material-symbols-rounded">grass</span> Invasive Species</h2>
      <p>Non-native plants like Senna spectabilis, Mikania micrantha (mile-a-minute weed), Lantana camara and Prosopis spread aggressively in disturbed forest areas, displacing native vegetation.</p>
      <h3>Impact</h3>
      <p>Invasive plants alter soil chemistry, reduce light for native seedlings, change fire patterns and reduce food availability for herbivores. In some areas, invasive species have completely replaced the native understory.</p>
    `,
    'threat-hwc': `
      <h2><span class="material-symbols-rounded">pets</span> Human–Wildlife Conflict</h2>
      <p>As human settlements expand into forest fringes, encounters between people and wild animals increase. Elephants raid crops, leopards take livestock and wild boar damage farms. These conflicts can result in injury or death on both sides.</p>
      <h3>Impact</h3>
      <p>Conflict leads to retaliatory killing of wildlife, negative attitudes toward conservation and economic losses for farming communities. Finding a balance between human needs and wildlife protection is one of Kerala's most pressing conservation challenges.</p>
    `,
    'threat-pollution': `
      <h2><span class="material-symbols-rounded">delete</span> Pollution</h2>
      <p>Plastic waste from tourism and settlement, chemical runoff from tea and rubber plantations, and untreated sewage from forest-fringe towns contaminate forest streams and rivers.</p>
      <h3>Impact</h3>
      <p>Pollution harms aquatic ecosystems, poisons wildlife and degrades water quality downstream. Even remote forest areas now show evidence of microplastic contamination.</p>
    `
  };


  // ========== NATIONAL PARKS ==========

  const parksData = [
    {
      name: 'Silent Valley National Park',
      location: 'Palakkad District',
      ecosystem: 'Tropical Evergreen Rainforest',
      species: ['Lion-tailed Macaque', 'Nilgiri Langur', 'Malabar Giant Squirrel'],
      desc: 'One of the last remaining tracts of virgin tropical evergreen forest in India. Saved from a hydroelectric project by a historic environmental campaign in the 1980s.',
      img: 'https://images.unsplash.com/photo-1501170750519-216503b8ccbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Periyar Tiger Reserve',
      location: 'Idukki District',
      ecosystem: 'Tropical Evergreen & Deciduous Forests',
      species: ['Tiger', 'Asian Elephant', 'Gaur'],
      desc: 'One of the most famous tiger reserves in India, centered around the massive Periyar Lake.',
      img: 'https://images.unsplash.com/photo-1441974231531-d6222b60ce6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Eravikulam National Park',
      location: 'Idukki District',
      ecosystem: 'Montane Shola-Grassland',
      species: ['Nilgiri Tahr', 'Nilgiri Marten', 'Atlas Moth'],
      desc: 'Home to the largest wild population of the endangered Nilgiri Tahr and the spectacular Neelakurinji flowers that bloom once every 12 years.',
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Wayanad Wildlife Sanctuary',
      location: 'Wayanad District',
      ecosystem: 'Moist Deciduous Forest',
      species: ['Asian Elephant', 'Tiger', 'Sloth Bear'],
      desc: 'Part of the Nilgiri Biosphere Reserve, this sanctuary is a vital corridor for elephant movement across state borders.',
      img: 'https://images.unsplash.com/photo-1472393365824-de5fb14db0b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const grid = document.getElementById('parksGrid');
  if (grid) {
    grid.innerHTML = parksData.map((park, i) => `
      <div class="park-card scroll-reveal">
        <div class="park-card-img">
          <img src="${park.img}" alt="${park.name}" loading="lazy">
        </div>
        <div class="park-card-body">
          <h3>${park.name}</h3>
          <div class="park-card-location">📍 ${park.location}</div>
          <p>${park.desc}</p>
          <div class="park-card-tags">
            ${park.species.slice(0, 3).map(s => `<span class="tag">${s}</span>`).join('')}
          </div>
          <button class="park-explore-btn" data-park="${i}">EXPLORE →</button>
        </div>
      </div>
    `).join('');

    // Observe new elements
    grid.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

    // Park explore buttons
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.park-explore-btn');
      if (btn) {
        const park = parksData[btn.dataset.park];
        openModal(`
          <img class="modal-img" src="${park.img}" alt="${park.name}">
          <h2>${park.name}</h2>
          <div class="modal-detail"><span class="modal-detail-label">Location</span><span class="modal-detail-value">${park.location}</span></div>
          <div class="modal-detail"><span class="modal-detail-label">Ecosystem</span><span class="modal-detail-value">${park.ecosystem}</span></div>
          <div class="modal-detail"><span class="modal-detail-label">Key Species</span><span class="modal-detail-value">${park.species.join(', ')}</span></div>
          <p>${park.desc}</p>
        `);
      }
    });
  }

  renderParks();


  // ========== DID YOU KNOW? FACTS ==========

  const facts = [
    'Silent Valley National Park in Kerala is one of the last remaining patches of virgin tropical evergreen forest in India. It was saved from a hydroelectric project in the 1980s thanks to one of India\'s earliest environmental campaigns.',
    'The Western Ghats — Kerala\'s mountain backbone — is older than the Himalayas. This ancient mountain range is one of the world\'s eight hottest biodiversity hotspots.',
    'Kerala is home to approximately 5,000 species of flowering plants, of which about 1,600 are endemic to the Western Ghats region.',
    'The Nilgiri Tahr, found only in the Western Ghats, lives at elevations above 1,200 metres. The largest population — around 800 individuals — lives in Eravikulam National Park, Kerala.',
    'Kerala\'s 44 rivers all originate in the forests of the Western Ghats. Without these forests, the state would face severe water shortages.',
    'The Lion-tailed Macaque is one of the world\'s most endangered primates. Fewer than 4,000 remain in the wild, primarily in Kerala\'s rainforests.',
    'Parambikulam Tiger Reserve contains the Kannimara Teak tree, believed to be one of the oldest and largest living teak trees in the world, estimated to be over 400 years old.',
    'The Malabar Giant Squirrel, India\'s state animal of Maharashtra, creates multiple dreys (nests) across its territory and can leap up to 6 metres between trees.',
    'Kerala receives rainfall from two monsoons — the southwest monsoon (June–September) and the northeast monsoon (October–November), making it one of India\'s wettest states.',
    'The Western Ghats contain more than 7,400 species of flowering plants, 1,814 species of non-flowering plants, 139 mammal species, 508 bird species and 179 amphibian species.',
    'Periyar Tiger Reserve is one of the few places in India where you can see wild elephants by the water, as herds regularly come to the lake shore to drink and bathe.',
    'The Neelakurinji (Strobilanthes kunthiana) flower blooms once every 12 years, carpeting the hills of Munnar in a spectacular purple display. The next bloom is expected in 2030.',
    'Wayanad Wildlife Sanctuary is part of the Nilgiri Biosphere Reserve — the largest contiguous protected forest in southern India, spanning Kerala, Karnataka and Tamil Nadu.'
  ];

  const factText = document.getElementById('factText');
  const factBtn = document.getElementById('factBtn');
  let currentFactIndex = 0;

  factBtn.addEventListener('click', () => {
    currentFactIndex = (currentFactIndex + 1) % facts.length;
    factText.style.opacity = '0';
    setTimeout(() => {
      factText.textContent = facts[currentFactIndex];
      factText.style.opacity = '1';
    }, 200);
  });

  factText.style.transition = 'opacity 0.3s ease';


  // ========== HOW CAN YOU HELP — ROLE SELECTOR ==========

  const roleData = {
    student: {
      title: 'How Students Can Help',
      actions: [
        'Learn about local ecosystems and share knowledge with peers',
        'Participate in nature clubs and tree-planting events',
        'Reduce paper waste and recycle materials',
        'Create awareness about forest conservation through projects',
        'Volunteer at local nature reserves during vacations',
        'Document local biodiversity using citizen science apps like iNaturalist',
        'Organise or join clean-up drives near forests and rivers'
      ]
    },
    tourist: {
      title: 'How Tourists Can Help',
      actions: [
        'Do not litter — carry all waste out of forest areas',
        'Stay on designated trails to avoid disturbing habitats',
        'Maintain a safe distance from wildlife — never feed or approach animals',
        'Avoid using flash photography near animals',
        'Follow all park regulations and instructions from forest guides',
        'Choose eco-certified tour operators and accommodation',
        'Support local communities by buying local products responsibly'
      ]
    },
    photographer: {
      title: 'How Photographers Can Help',
      actions: [
        'Never bait or disturb wildlife for a photograph',
        'Use your images to raise awareness about forest conservation',
        'Share GPS-free images to protect sensitive species locations',
        'Follow ethical wildlife photography guidelines',
        'Collaborate with conservation organizations to document biodiversity',
        'Participate in bio-documentation efforts and photo surveys',
        'Avoid using drones in protected areas without permission'
      ]
    },
    'nature-lover': {
      title: 'How Nature Lovers Can Help',
      actions: [
        'Support conservation organizations working in the Western Ghats',
        'Reduce your carbon footprint to help fight climate change',
        'Plant native species in your garden and community spaces',
        'Advocate for stronger forest protection policies',
        'Report illegal activities like poaching or encroachment to authorities',
        'Educate friends and family about the importance of forests',
        'Reduce single-use plastic consumption'
      ]
    }
  };

  const roleBtns = document.querySelectorAll('.role-btn');
  const roleContent = document.getElementById('roleContent');

  if (roleContent) {
    roleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        roleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const role = roleData[btn.dataset.role];
        if (role) {
          roleContent.innerHTML = `
            <div class="role-actions">
              <h3>${role.title}</h3>
              <ul>
                ${role.actions.map(a => `<li>${a}</li>`).join('')}
              </ul>
            </div>
          `;
        }
      });
    });
  }


  // ========== GLOSSARY ==========

  const glossaryData = [
    { term: 'Biodiversity', definition: 'The variety of all living organisms in a particular area or ecosystem, including diversity within species, between species and between ecosystems. Kerala\'s Western Ghats are one of the world\'s top biodiversity hotspots.' },
    { term: 'Ecosystem', definition: 'A community of living organisms (plants, animals, microbes) interacting with each other and their physical environment (soil, water, air, climate) as an integrated system.' },
    { term: 'Habitat', definition: 'The natural environment or place where a particular species lives and finds food, shelter, water and mates needed for survival and reproduction.' },
    { term: 'Endemic', definition: 'A species that is found naturally only in a specific geographical area and nowhere else in the world. The Western Ghats have high rates of endemism.' },
    { term: 'Canopy', definition: 'The uppermost layer of leaves and branches in a forest, formed by the crowns of the tallest trees. In tropical evergreen forests, the canopy can be 40–60 metres above the ground.' },
    { term: 'Evergreen Forest', definition: 'A forest in which the majority of trees retain their leaves throughout the year. Tropical evergreen forests receive continuous high rainfall and support extraordinary biodiversity.' },
    { term: 'Shola', definition: 'A unique type of stunted, high-altitude evergreen forest found in the upper reaches of the Western Ghats, typically in sheltered valleys between grassy hilltops. The word comes from the Tamil "solai" meaning grove.' },
    { term: 'Wildlife Corridor', definition: 'A strip of natural habitat connecting two or more larger areas of similar habitat, allowing wildlife — especially large mammals like elephants — to move between them safely.' },
    { term: 'Conservation', definition: 'The protection, preservation, management and restoration of natural environments and wildlife populations to prevent species extinction and ecosystem degradation.' },
    { term: 'Western Ghats', definition: 'A mountain range running parallel to India\'s western coast for approximately 1,600 km. Recognised as a UNESCO World Heritage Site, the Western Ghats are one of the world\'s eight hottest biodiversity hotspots.' },
    { term: 'Deciduous Forest', definition: 'A forest in which many trees shed their leaves seasonally, typically during the dry season in tropical regions. Moist deciduous forests in Kerala host valuable species like teak and rosewood.' },
    { term: 'Keystone Species', definition: 'A species that has a disproportionately large effect on its ecosystem relative to its numbers. The Asian Elephant is a keystone species in Kerala\'s forests, shaping habitat through its feeding and movement.' }
  ];

  function renderGlossary() {
    const list = document.getElementById('glossaryList');
    if (!list) return;
    list.innerHTML = glossaryData.map(item => `
      <div class="glossary-item" data-term="${item.term.toLowerCase()}">
        <div class="glossary-term" tabindex="0" role="button" aria-expanded="false">${item.term}</div>
        <div class="glossary-definition">
          <div class="glossary-definition-inner">${item.definition}</div>
        </div>
      </div>
    `).join('');
  }

  renderGlossary();

  // Glossary toggle
  document.getElementById('glossaryList')?.addEventListener('click', (e) => {
    const term = e.target.closest('.glossary-term');
    if (term) {
      const item = term.parentElement;
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.glossary-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.glossary-term').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        term.setAttribute('aria-expanded', 'true');
      }
    }
  });

  // Glossary keyboard
  document.getElementById('glossaryList')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.target.click();
    }
  });

  // Glossary search
  const glossarySearch = document.getElementById('glossarySearch');
  glossarySearch?.addEventListener('input', debounce((e) => {
    const query = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.glossary-item').forEach(item => {
      const show = !query || item.dataset.term.includes(query);
      item.style.display = show ? '' : 'none';
    });
  }, 200));


  // ========== ECOSYSTEM COMPARISON ==========

  const ecosystemData = {
    evergreen: {
      name: 'Tropical Evergreen Forest',
      type: 'Tropical Wet Evergreen',
      climate: 'Hot and humid, 25–30°C',
      rainfall: '> 2,500 mm/year',
      elevation: 'Up to 1,500 m',
      wildlife: 'Lion-tailed Macaque, Great Hornbill, King Cobra',
      vegetation: 'Multi-layered canopy, 40–60 m tall trees, dense undergrowth',
      importance: 'Highest biodiversity, carbon storage, water catchment'
    },
    deciduous: {
      name: 'Moist Deciduous Forest',
      type: 'Tropical Moist Deciduous',
      climate: 'Warm with dry season, 22–32°C',
      rainfall: '1,500–2,500 mm/year',
      elevation: '500–1,200 m',
      wildlife: 'Asian Elephant, Gaur, Sambar, Dhole',
      vegetation: 'Teak, Rosewood, Bamboo; trees shed leaves in dry season',
      importance: 'Timber, wildlife habitat, soil conservation'
    },
    shola: {
      name: 'Shola Forest',
      type: 'Tropical Montane Stunted Evergreen',
      climate: 'Cool and moist, 5–20°C',
      rainfall: '2,000–5,000 mm/year',
      elevation: 'Above 1,500 m',
      wildlife: 'Nilgiri Tahr, Nilgiri Marten, endemic birds',
      vegetation: 'Stunted trees (10–15 m), dense canopy, mossy undergrowth',
      importance: 'Water catchment, high endemism, climate regulation'
    },
    montane: {
      name: 'Montane Grasslands',
      type: 'Tropical Montane Grassland',
      climate: 'Cool, windy, occasional frost, 5–20°C',
      rainfall: '2,000–3,000 mm/year',
      elevation: 'Above 2,000 m',
      wildlife: 'Nilgiri Tahr, Nilgiri Pipit, endemic butterflies',
      vegetation: 'Hardy grasses, herbs, orchids; no tree canopy',
      importance: 'Endemic species habitat, water source, scenic landscape'
    },
    riparian: {
      name: 'Riparian / Bamboo Forest',
      type: 'Riparian and Bamboo-dominated',
      climate: 'Variable, follows river course',
      rainfall: 'Variable',
      elevation: 'All elevations along streams',
      wildlife: 'Otters, kingfishers, freshwater fish, frogs',
      vegetation: 'Bamboo, Pandanus, ferns, mosses',
      importance: 'Erosion control, wildlife corridors, water filtration'
    }
  };

  const compareLeft = document.getElementById('compareLeft');
  const compareRight = document.getElementById('compareRight');
  const comparisonTable = document.getElementById('comparisonTable');

  function updateComparison() {
    const leftKey = compareLeft.value;
    const rightKey = compareRight.value;

    if (!leftKey || !rightKey) {
      comparisonTable.style.display = 'none';
      return;
    }

    const left = ecosystemData[leftKey];
    const right = ecosystemData[rightKey];

    document.getElementById('compLeftHeader').textContent = left.name;
    document.getElementById('compRightHeader').textContent = right.name;

    const features = ['type', 'climate', 'rainfall', 'elevation', 'wildlife', 'vegetation', 'importance'];
    const labels = {
      type: 'Forest Type', climate: 'Climate', rainfall: 'Annual Rainfall',
      elevation: 'Elevation', wildlife: 'Key Wildlife', vegetation: 'Vegetation',
      importance: 'Ecological Importance'
    };

    document.getElementById('comparisonBody').innerHTML = features.map(f => `
      <tr>
        <td>${labels[f]}</td>
        <td>${left[f]}</td>
        <td>${right[f]}</td>
      </tr>
    `).join('');

    comparisonTable.style.display = '';
  }

  compareLeft?.addEventListener('change', updateComparison);
  compareRight?.addEventListener('change', updateComparison);


  // ========== BUILD YOUR FOREST ==========

  const buildScene = document.getElementById('buildScene');
  const buildResult = document.getElementById('buildResult');
  const buildScore = document.getElementById('buildScore');
  const buildReset = document.getElementById('buildReset');
  const buildBtns = document.querySelectorAll('.build-btn');

  const buildElements = { tree: 0, flower: 0, elephant: 0, bird: 0, butterfly: 0, river: 0 };
  const buildEmojis = { tree: '<span class="material-symbols-rounded">park</span>', flower: '<span class="material-symbols-rounded">local_florist</span>', elephant: '<span class="material-symbols-rounded">pets</span>', bird: '<span class="material-symbols-rounded">flutter_dash</span>', butterfly: '<span class="material-symbols-rounded">emoji_nature</span>', river: '<span class="material-symbols-rounded">water_drop</span>' };

  buildBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.element;
      buildElements[type]++;

      const el = document.createElement('div');
      el.classList.add('build-element');
      el.textContent = buildEmojis[type];

      // Random position within scene
      const sceneRect = buildScene.getBoundingClientRect();
      const x = 10 + Math.random() * 80; // % from left
      const y = type === 'bird' || type === 'butterfly'
        ? 5 + Math.random() * 35 // sky area
        : 45 + Math.random() * 45; // ground area

      if (type === 'river') {
        el.style.left = '5%';
        el.style.bottom = '10%';
        el.style.fontSize = '1.5rem';
        el.textContent = '〰️<span class="material-symbols-rounded">water_drop</span>〰️';
      } else {
        el.style.left = x + '%';
        el.style.top = y + '%';
      }

      buildScene.appendChild(el);
      updateBuildScore();
    });
  });

  function updateBuildScore() {
    const typesUsed = Object.values(buildElements).filter(v => v > 0).length;
    const totalElements = Object.values(buildElements).reduce((a, b) => a + b, 0);
    const score = Math.min(10, typesUsed * 2 + Math.min(4, Math.floor(totalElements / 3)));

    buildResult.style.display = '';
    buildScore.textContent = `Biodiversity Score: ${score}/10`;

    if (score >= 8) {
      buildScore.style.color = '#27ae60';
    } else if (score >= 5) {
      buildScore.style.color = '#f39c12';
    } else {
      buildScore.style.color = '#e74c3c';
    }
  }

  buildReset?.addEventListener('click', () => {
    Object.keys(buildElements).forEach(k => buildElements[k] = 0);
    // Remove all build elements but keep ground
    buildScene.querySelectorAll('.build-element').forEach(el => el.remove());
    buildResult.style.display = 'none';
  });


  // ========== RESPONSIBILITY TEST ==========

  const respQuestions = [
    {
      question: 'You see plastic waste on a forest trail. What do you do?',
      options: [
        { text: 'Pick it up and carry it out of the forest', score: 3 },
        { text: 'Leave it — someone else will clean it up', score: 0 },
        { text: 'Take a photo and post about it on social media', score: 1 },
        { text: 'Kick it to the side of the trail', score: 0 }
      ]
    },
    {
      question: 'You encounter a wild elephant while on a forest trek. What do you do?',
      options: [
        { text: 'Back away slowly and quietly to a safe distance', score: 3 },
        { text: 'Take out your phone for a selfie', score: 0 },
        { text: 'Try to feed it to get a closer look', score: 0 },
        { text: 'Shout and throw stones to scare it away', score: 0 }
      ]
    },
    {
      question: 'You hear loud music playing near a wildlife sanctuary. What\'s your response?',
      options: [
        { text: 'Politely ask the group to lower the volume as it disturbs wildlife', score: 3 },
        { text: 'Join in — it makes the trip more fun', score: 0 },
        { text: 'Ignore it — it\'s not your problem', score: 0 },
        { text: 'Report it to the forest ranger', score: 2 }
      ]
    },
    {
      question: 'You are visiting a protected forest area. What should you NOT do?',
      options: [
        { text: 'Stay on marked trails', score: 0 },
        { text: 'Collect rare plants or insects as souvenirs', score: 3 },
        { text: 'Follow the guide\'s instructions', score: 0 },
        { text: 'Carry a reusable water bottle', score: 0 }
      ]
    },
    {
      question: 'You notice someone setting a fire in a dry forest area. What do you do?',
      options: [
        { text: 'Alert forest officials or call the fire helpline immediately', score: 3 },
        { text: 'Ignore it and walk away', score: 0 },
        { text: 'Record a video for social media', score: 0 },
        { text: 'Try to put it out yourself without telling anyone', score: 1 }
      ]
    }
  ];

  let respCurrentQ = 0;
  let respScore = 0;
  const respQuestion = document.getElementById('respQuestion');
  const respOptions = document.getElementById('respOptions');
  const respProgress = document.getElementById('respProgress');
  const respResult = document.getElementById('respResult');
  const respQuiz = document.getElementById('responsibilityQuiz');
  const respRestartBtn = document.getElementById('respRestartBtn');

  function renderRespQuestion() {
    if (respCurrentQ >= respQuestions.length) {
      showRespResult();
      return;
    }

    const q = respQuestions[respCurrentQ];
    respQuestion.textContent = q.question;
    respOptions.innerHTML = q.options.map((o, i) => `
      <button class="resp-option" data-index="${i}">${o.text}</button>
    `).join('');
    respProgress.textContent = `Question ${respCurrentQ + 1} of ${respQuestions.length}`;
  }

  respOptions?.addEventListener('click', (e) => {
    const opt = e.target.closest('.resp-option');
    if (!opt) return;

    const q = respQuestions[respCurrentQ];
    const score = q.options[opt.dataset.index].score;
    respScore += score;

    opt.classList.add('selected');
    setTimeout(() => {
      respCurrentQ++;
      renderRespQuestion();
    }, 500);
  });

  function showRespResult() {
    respQuiz.style.display = 'none';
    respResult.style.display = '';

    const maxScore = respQuestions.length * 3;
    const pct = Math.round((respScore / maxScore) * 100);
    document.getElementById('respScoreValue').textContent = pct;

    let message = '';
    if (pct >= 80) message = 'Excellent! You are a responsible and thoughtful forest visitor. Kerala\'s forests are safer with people like you.';
    else if (pct >= 50) message = 'Good awareness! You understand some key principles but there\'s room to learn more about responsible forest behaviour.';
    else message = 'You might want to learn more about responsible forest behaviour before your next visit. Small actions make a big difference!';

    document.getElementById('respResultMessage').textContent = message;
  }

  respRestartBtn?.addEventListener('click', () => {
    respCurrentQ = 0;
    respScore = 0;
    respQuiz.style.display = '';
    respResult.style.display = 'none';
    renderRespQuestion();
  });

  renderRespQuestion();


  // ========== LIGHTBOX (used by gallery.js) ==========

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let lightboxImages = [];
  let lightboxIndex = 0;

  window.openLightbox = function(images, index) {
    lightboxImages = images;
    lightboxIndex = index;
    showLightboxImage();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showLightboxImage() {
    const img = lightboxImages[lightboxIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.caption;
    lightboxCaption.textContent = img.caption;
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightboxPrev.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    showLightboxImage();
  });

  lightboxNext.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    showLightboxImage();
  });

  // Keyboard nav for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });

  window.closeLightbox = closeLightbox;


  // ========== UTILITY: DEBOUNCE ==========

  function debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ========== PLEDGE MODAL ==========
  const pledgeForm = document.getElementById('pledgeForm');
  const pledgeModal = document.getElementById('pledgeModal');
  const closePledgeModal = document.getElementById('closePledgeModal');
  const certName = document.getElementById('certName');
  const pledgeNameInput = document.getElementById('pledgeName');

  if (pledgeForm) {
    pledgeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = pledgeNameInput.value.trim();
      
      if (name) {
        certName.textContent = name;
        pledgeModal.classList.add('active');
        pledgeModal.setAttribute('aria-hidden', 'false');
      }
    });
  }

  const closePledgeModalFunc = () => {
    pledgeModal.classList.remove('active');
    pledgeModal.setAttribute('aria-hidden', 'true');
    pledgeForm.reset();
  };

  if (closePledgeModal) {
    closePledgeModal.addEventListener('click', closePledgeModalFunc);
  }

  // Close on outside click
  window.addEventListener('click', (e) => {
    if (e.target === pledgeModal) {
      closePledgeModalFunc();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pledgeModal.classList.contains('active')) {
      closePledgeModalFunc();
    }
  });
  
  const downloadBtn = document.getElementById('downloadCertBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      alert("Downloading your high-resolution certificate...");
    });
  }

});
