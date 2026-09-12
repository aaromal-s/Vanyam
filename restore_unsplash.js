const fs = require('fs');

const unsplashForests = [
  "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const unsplashWildlife = [
  "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1615598686121-789d7fa9c9c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1564750975191-0ed807751c6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1574870111867-089730e5a72b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

// 1. Process index.html & main.js & gallery.js
const filesToReplace = ['d:/Projects/Vanyam/index.html', 'd:/Projects/Vanyam/js/main.js', 'd:/Projects/Vanyam/js/gallery.js'];

for (const file of filesToReplace) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const wikiRegex = /https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[^"]+/g;
    let counter = 0;
    
    content = content.replace(wikiRegex, () => {
      const replacement = unsplashForests[counter % unsplashForests.length];
      counter++;
      return replacement;
    });
    
    fs.writeFileSync(file, content);
    console.log(`Updated images in ${file}`);
  }
}

// 2. Process wildlife.js
const wildlifeFile = 'd:/Projects/Vanyam/js/wildlife.js';
if (fs.existsSync(wildlifeFile)) {
  let content = fs.readFileSync(wildlifeFile, 'utf8');
  const wikiRegex = /https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[^']+/g;
  let counter = 0;
  
  content = content.replace(wikiRegex, () => {
    const replacement = unsplashWildlife[counter % unsplashWildlife.length];
    counter++;
    return replacement;
  });
  
  fs.writeFileSync(wildlifeFile, content);
  console.log(`Updated images in ${wildlifeFile}`);
}

console.log("All Wikipedia images replaced with robust Unsplash URLs!");
