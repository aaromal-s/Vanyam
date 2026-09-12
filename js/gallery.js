/* ============================================
   VANYAM — Gallery
   Image grid, category filtering, lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== GALLERY DATA ==========

  const galleryData = [
    { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Sunlight filtering through canopy', category: 'landscape' },
    { src: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Morning mist in the valleys', category: 'landscape' },
    { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Monsoon streams', category: 'landscape' },
    { src: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Wild Elephant Herd', category: 'wildlife' },
    { src: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Macaw', category: 'wildlife' },
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
