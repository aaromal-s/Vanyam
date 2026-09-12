const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Brand Name replacements
  content = content.replace(/VANYAM/g, 'VANYAM');
  content = content.replace(/Vanyam/g, 'Vanyam');
  content = content.replace(/© 2026 Vanyam/g, '© 2026 Vanyam');

  // Emojis to Material Symbols replacements
  const emojiMap = {
    '<span class="material-symbols-rounded">eco</span>': '<span class="material-symbols-rounded">eco</span>',
    '<span class="material-symbols-rounded">search</span>': '<span class="material-symbols-rounded">search</span>',
    '<span class="material-symbols-rounded">dark_mode</span>': '<span class="material-symbols-rounded">dark_mode</span>',
    '<span class="material-symbols-rounded">forest</span>': '<span class="material-symbols-rounded">forest</span>',
    '<span class="material-symbols-rounded">shield</span>': '<span class="material-symbols-rounded">shield</span>',
    '<span class="material-symbols-rounded">pets</span>': '<span class="material-symbols-rounded">pets</span>',
    '<span class="material-symbols-rounded">bug_report</span>': '<span class="material-symbols-rounded">bug_report</span>',
    '<span class="material-symbols-rounded">rainy</span>': '<span class="material-symbols-rounded">rainy</span>',
    '<span class="material-symbols-rounded">rainy</span>': '<span class="material-symbols-rounded">rainy</span>',
    '<span class="material-symbols-rounded">landscape</span>': '<span class="material-symbols-rounded">landscape</span>',
    '<span class="material-symbols-rounded">landscape</span>': '<span class="material-symbols-rounded">landscape</span>',
    '<span class="material-symbols-rounded">park</span>': '<span class="material-symbols-rounded">park</span>',
    '<span class="material-symbols-rounded">water_drop</span>': '<span class="material-symbols-rounded">water_drop</span>',
    '<span class="material-symbols-rounded">map</span>': '<span class="material-symbols-rounded">map</span>',
    '<span class="material-symbols-rounded">terrain</span>': '<span class="material-symbols-rounded">terrain</span>',
    '<span class="material-symbols-rounded">agriculture</span>': '<span class="material-symbols-rounded">agriculture</span>',
    '<span class="material-symbols-rounded">flutter_dash</span>': '<span class="material-symbols-rounded">flutter_dash</span>',
    '<span class="material-symbols-rounded">play_arrow</span>': '<span class="material-symbols-rounded">play_arrow</span>',
    '<span class="material-symbols-rounded">volume_up</span>': '<span class="material-symbols-rounded">volume_up</span>',
    '<span class="material-symbols-rounded">local_fire_department</span>': '<span class="material-symbols-rounded">local_fire_department</span>',
    '<span class="material-symbols-rounded">construction</span>': '<span class="material-symbols-rounded">construction</span>',
    '<span class="material-symbols-rounded">thermostat</span>': '<span class="material-symbols-rounded">thermostat</span>',
    '<span class="material-symbols-rounded">grass</span>': '<span class="material-symbols-rounded">grass</span>',
    '<span class="material-symbols-rounded">delete</span>': '<span class="material-symbols-rounded">delete</span>',
    '<span class="material-symbols-rounded">pets</span>': '<span class="material-symbols-rounded">pets</span>',
    '<span class="material-symbols-rounded">link</span>': '<span class="material-symbols-rounded">link</span>',
    '<span class="material-symbols-rounded">group</span>': '<span class="material-symbols-rounded">group</span>',
    '<span class="material-symbols-rounded">backpack</span>': '<span class="material-symbols-rounded">backpack</span>',
    '<span class="material-symbols-rounded">science</span>': '<span class="material-symbols-rounded">science</span>',
    '<span class="material-symbols-rounded">photo_camera</span>': '<span class="material-symbols-rounded">photo_camera</span>',
    '<span class="material-symbols-rounded">public</span>': '<span class="material-symbols-rounded">public</span>',
    '<span class="material-symbols-rounded">close</span>': '<span class="material-symbols-rounded">close</span>',
    '<span class="material-symbols-rounded">pets</span>': '<span class="material-symbols-rounded">pets</span>',
    '<span class="material-symbols-rounded">footprint</span>': '<span class="material-symbols-rounded">footprint</span>',
    '<span class="material-symbols-rounded">local_florist</span>': '<span class="material-symbols-rounded">local_florist</span>',
    '<span class="material-symbols-rounded">emoji_nature</span>': '<span class="material-symbols-rounded">emoji_nature</span>',
    '〰️<span class="material-symbols-rounded">water_drop</span>〰️': '<span class="material-symbols-rounded">water</span>',
    '<span class="material-symbols-rounded">energy_savings_leaf</span>': '<span class="material-symbols-rounded">energy_savings_leaf</span>',
    '<span class="material-symbols-rounded">chevron_left</span>': '<span class="material-symbols-rounded">chevron_left</span>',
    '<span class="material-symbols-rounded">chevron_right</span>': '<span class="material-symbols-rounded">chevron_right</span>'
  };

  if (filePath.endsWith('.html') || filePath.endsWith('.js')) {
    for (const [emoji, icon] of Object.entries(emojiMap)) {
      content = content.split(emoji).join(icon);
    }
  }

  fs.writeFileSync(filePath, content);
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'assets' && file !== '.git' && file !== '.gemini' && file !== 'node_modules') {
        walk(fullPath);
      }
    } else {
      if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.md')) {
        replaceInFile(fullPath);
      }
    }
  }
}

walk(__dirname);
console.log('Replacements completed successfully.');
