/* ============================================
   VANYAM — Gallery
   Image grid, category filtering, lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== GALLERY DATA ==========

  const galleryData = [
    { src: 'https://images.unsplash.com/photo-1441974231531-d6222b60ce6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Sunlight filtering through canopy', category: 'landscape' },
    { src: 'https://images.unsplash.com/photo-1516026672322-bc525ce1464c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Morning mist in the valleys', category: 'landscape' },
    { src: 'https://images.unsplash.com/photo-1472393365824-de5fb14db0b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Monsoon streams', category: 'landscape' },
    { src: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Wild Elephant Herd', category: 'wildlife' },
    { src: 'https://images.unsplash.com/photo-1582002824332-9a3b8fc7c3fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Macaw', category: 'wildlife' },
    { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Mountain Peaks', category: 'landscape' }
  ];

  const galleryGrid = document.getElementById('galleryGrid');
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter .filter-btn');

  function renderGallery(filter = 'all') {
    if (!galleryGrid) return;
    
    const filtered = filter === 'all' 
      ? galleryData 
      : galleryData.filter(img => img.category === filter);
      
    galleryGrid.innerHTML = filtered.map((img, i) => `
      <div class="gallery-item" data-gallery-index="${i}" role="button" tabindex="0" aria-label="${img.caption}">
        <img src="${img.src}" alt="${img.caption}" loading="lazy">
        <div class="gallery-item-overlay">
          <p>${img.caption}</p>
        </div>
      </div>
    `).join('');

    // Store filtered list for lightbox
    galleryGrid.dataset.filtered = JSON.stringify(filtered);
  }

  // Filter
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderGallery(btn.dataset.filter);
    });
  });

  // Lightbox on click
  galleryGrid?.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;

    const filtered = JSON.parse(galleryGrid.dataset.filtered || '[]');
    const index = parseInt(item.dataset.galleryIndex);
    const images = filtered.map(img => ({ src: img.src, caption: img.caption }));

    window.openLightbox(images, index);
  });

  // Keyboard support
  galleryGrid?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.target.click();
    }
  });

  // Initial render
  renderGallery();
});
