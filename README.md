# 🌿 Vanyam

**Explore the Wild Heart of Kerala**

A professional, modern, visually immersive and fully responsive educational website about the forests, wildlife, ecosystems and natural heritage of Kerala, India.

---

## Features

- 🌲 **30+ interactive sections** covering forests, wildlife, plants, parks, ecosystems and conservation
- 🗺️ **Interactive SVG map** of Kerala's protected forest regions
- 🐘 **Wildlife Explorer** with search, filtering and detailed species modals
- 🌺 **Plant Explorer** with category filtering
- 🏞️ **National Parks** with explore modals
- 🌧️ **Monsoon Experience** with CSS rain/cloud/fog animation
- 🎵 **Forest Sounds** audio player (add your own audio files)
- 🌙 **Forest Night Mode** with fireflies and dark theme
- 📸 **Photo Gallery** with category filtering and fullscreen lightbox
- 🧠 **Quiz** with 12 questions and scoring tiers
- 🐾 **Footprint Mini Game** — identify animals by their tracks
- 🌳 **Build Your Forest** — interactive biodiversity builder
- 📊 **Ecosystem Comparison** tool
- 📖 **Searchable Glossary** of ecological terms
- 🌿 **Random Facts** about Kerala's forests
- 🧭 **Forest Journey** — scroll-based storytelling
- ♿ **Accessible** with semantic HTML, ARIA labels, keyboard navigation
- 📱 **Fully responsive** — desktop, tablet, mobile
- 🎨 **Premium design** with forest colour palette, glassmorphism, smooth animations

---

## Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript** — No frameworks or libraries
- **Google Fonts** — Inter & Outfit (loaded via CDN)
- **Unsplash** — Placeholder images (replace with your own)

---

## Project Structure

```
kerala-forest/
├── index.html              # Main single-page website
├── css/
│   ├── style.css           # Design system + component styles
│   ├── responsive.css      # Breakpoints and mobile layouts
│   └── animations.css      # Keyframes, scroll reveals, reduced-motion
├── js/
│   ├── main.js             # Core interactions, nav, modals, audio, night mode
│   ├── wildlife.js         # Wildlife & plant data, cards, filtering
│   ├── map.js              # Interactive SVG Kerala map
│   ├── gallery.js          # Photo gallery with lightbox
│   └── quiz.js             # Quiz engine and footprint game
├── pages/
│   ├── forests.html        # Redirect stub → index.html#forests
│   ├── wildlife.html       # Redirect stub → index.html#wildlife
│   ├── parks.html          # Redirect stub → index.html#parks
│   ├── ecosystems.html     # Redirect stub → index.html#ecosystems
│   └── conservation.html   # Redirect stub → index.html#conservation
├── assets/
│   ├── images/             # Add your own images here
│   ├── icons/              # Custom icons (optional)
│   └── audio/              # Add audio files here
│       ├── rainforest.mp3
│       ├── birds.mp3
│       ├── river.mp3
│       └── monsoon.mp3
└── README.md
```

---

## Getting Started

1. **Clone or download** this project
2. **Open `index.html`** in any modern browser (Chrome, Firefox, Edge, Safari)
3. No build step, no server, no dependencies to install

### Optional: Adding Audio

Place audio files in `assets/audio/`:
- `rainforest.mp3` — Rainforest ambience
- `birds.mp3` — Bird calls
- `river.mp3` — Flowing river sounds
- `monsoon.mp3` — Monsoon rain sounds

### Optional: Replacing Images

Replace Unsplash URLs in the JavaScript data arrays with paths to your own images in `assets/images/`.

---

## Customisation

### Colours

Edit CSS custom properties in `css/style.css`:

```css
:root {
  --color-primary: #1a5c2a;
  --color-primary-dark: #0e3b18;
  --color-cream: #faf7f2;
  /* ... */
}
```

### Adding Wildlife / Plants

Add new entries to the `wildlifeData` or `plantData` arrays in `js/wildlife.js`.

### Adding Quiz Questions

Add new question objects to the `quizQuestions` array in `js/quiz.js`.

### Adding Map Regions

Add new region objects to the `mapRegions` array in `js/map.js`.

---

## Browser Support

- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+

---

## Accessibility

- Semantic HTML5 elements
- Proper heading hierarchy (single `<h1>`)
- Alt text for all images
- ARIA labels and roles
- Keyboard-accessible interactions
- Visible focus states
- `prefers-reduced-motion` support

---

## Sources & References

Factual information is based on publicly available data from:

- Kerala Forest & Wildlife Department
- Wildlife Institute of India
- IUCN Red List
- UNESCO World Heritage Centre
- Ministry of Environment, Forest and Climate Change (MoEFCC), Government of India

**Disclaimer**: This website is an educational project and is not an official government website.

---

## License

Educational project. © 2026 Vanyam.
