const fs = require('fs');

const unsplashForests = [
  "https://images.unsplash.com/photo-1441974231531-d6222b60ce6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516026672322-bc525ce1464c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518182170546-076616fd4aa0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1472393365824-de5fb14db0b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501170750519-216503b8ccbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1561570776856-11b439c2c62c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const unsplashWildlife = [
  "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1615598686121-789d7fa9c9c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1582002824332-9a3b8fc7c3fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
