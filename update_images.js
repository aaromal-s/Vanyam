const fs = require('fs');
const https = require('https');

// Promisified HTTP GET
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Vanyam-Education-App/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function getWikiImage(query) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=500&redirects=1`;
    const data = await fetchJson(url);
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== '-1' && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
  } catch (err) {
    console.error("Error fetching for", query, err.message);
  }
  return null; // fallback
}

async function processWildlife() {
  const filePath = 'd:/Projects/Vanyam/js/wildlife.js';
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract all names to fetch
  const nameRegex = /name:\s*'([^']+)'/g;
  let match;
  const animals = [];
  while ((match = nameRegex.exec(content)) !== null) {
    animals.push(match[1]);
  }

  console.log(`Found ${animals.length} species. Fetching images...`);

  for (const name of animals) {
    // Some names have parentheses, e.g., 'Gaur (Indian Bison)'. Use the part before it.
    let searchQuery = name.split(' (')[0];
    if (searchQuery === 'Malabar Whistling Thrush') searchQuery = 'Malabar whistling thrush';

    const imgUrl = await getWikiImage(searchQuery);
    if (imgUrl) {
      // Find the specific block for this animal and replace its image
      // We look for name: 'NAME', ... img: 'OLD_URL'
      const blockRegex = new RegExp(`(name:\\s*'${name.replace(/[.*+?^$\/{}()|[\\]\\\\]/g, '\\$&')}'[\\s\\S]*?img:\\s*')([^']+)(')`);
      content = content.replace(blockRegex, `$1${imgUrl}$3`);
      console.log(`Updated ${name} -> ${imgUrl}`);
    } else {
      console.log(`No image found for ${name}`);
    }
  }

  fs.writeFileSync(filePath, content);
  console.log("Wildlife updated!");
}

processWildlife();
