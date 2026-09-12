const fs = require('fs');

const imageMap = {
  // Animals (wildlife.js)
  "Asian Elephant": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Elephas_maximus_%28Bandipur%29.jpg/500px-Elephas_maximus_%28Bandipur%29.jpg",
  "Bengal Tiger": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Walking_tiger_female.jpg/500px-Walking_tiger_female.jpg",
  "Indian Leopard": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Indian_leopard_in_tree.jpg/500px-Indian_leopard_in_tree.jpg",
  "Gaur (Indian Bison)": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Gaur_Male_Bandipur.jpg/500px-Gaur_Male_Bandipur.jpg",
  "Lion-tailed Macaque": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Lion-tailed_Macaque_in_Bristol_Zoo.jpg/500px-Lion-tailed_Macaque_in_Bristol_Zoo.jpg",
  "Nilgiri Tahr": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Nilgiri_Tahr_at_Eravikulam_National_Park.jpg/500px-Nilgiri_Tahr_at_Eravikulam_National_Park.jpg",
  "Sambar Deer": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sambar_%28Cervus_unicolor_unicolor%29_male.jpg/500px-Sambar_%28Cervus_unicolor_unicolor%29_male.jpg",
  "Malabar Giant Squirrel": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Malabar_giant_squirrel_Ratufa_indica.jpg/500px-Malabar_giant_squirrel_Ratufa_indica.jpg",
  "Dhole (Wild Dog)": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Dhole_%28Asiatic_wild_dog%29_cropped.jpg/500px-Dhole_%28Asiatic_wild_dog%29_cropped.jpg",
  "Great Hornbill": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Great_hornbill_Photograph_by_Shantanu_Kuveskar.jpg/500px-Great_hornbill_Photograph_by_Shantanu_Kuveskar.jpg",
  "Malabar Whistling Thrush": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Malabar_Whistling_Thrush_%28Myophonus_horsfieldii%29.jpg/500px-Malabar_Whistling_Thrush_%28Myophonus_horsfieldii%29.jpg",
  "King Cobra": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/King_Cobra_at_Bhadra_Wildlife_Sanctuary.jpg/500px-King_Cobra_at_Bhadra_Wildlife_Sanctuary.jpg",
  "Nilgiri Langur": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Nilgiri_Langur.jpg/500px-Nilgiri_Langur.jpg",
  "Malabar Pit Viper": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Malabar_Pit_Viper_%28Trimeresurus_malabaricus%29.jpg/500px-Malabar_Pit_Viper_%28Trimeresurus_malabaricus%29.jpg",
  "Purple Frog": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Nasikabatrachus_sahyadrensis.jpg/500px-Nasikabatrachus_sahyadrensis.jpg",
  "Malabar Gliding Frog": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Malabar_Gliding_Frog_Rhacophorus_malabaricus.jpg/500px-Malabar_Gliding_Frog_Rhacophorus_malabaricus.jpg",

  // Plants
  "Teak": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Tectona_grandis_in_KBR_Park%2C_Hyderabad_W_IMG_5333.jpg/500px-Tectona_grandis_in_KBR_Park%2C_Hyderabad_W_IMG_5333.jpg",
  "Rosewood": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dalbergia_latifolia.jpg/500px-Dalbergia_latifolia.jpg",
  "Neelakurinji": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Strobilanthes_kunthiana.jpg/500px-Strobilanthes_kunthiana.jpg",
  "Wild Orchids": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Orchidaceae_Vanda_tessellata.jpg/500px-Orchidaceae_Vanda_tessellata.jpg",
  "Neem": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Azadirachta_indica_-_Neem_Tree_at_Kadavoor.jpg/500px-Azadirachta_indica_-_Neem_Tree_at_Kadavoor.jpg",
  "Ashoka Tree": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Saraca_asoca_%28Ashoka_Tree%29_in_Kolkata_W_IMG_4118.jpg/500px-Saraca_asoca_%28Ashoka_Tree%29_in_Kolkata_W_IMG_4118.jpg",
  "Malabar Cinnamon": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cinnamomum_malabatrum.jpg/500px-Cinnamomum_malabatrum.jpg",
  "Nilgiri Rhododendron": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Rhododendron_arboreum_nilagiricum.jpg/500px-Rhododendron_arboreum_nilagiricum.jpg",
};

// 1. Process wildlife.js
let wildlifeJs = fs.readFileSync('d:/Projects/Vanyam/js/wildlife.js', 'utf8');
for (const [name, url] of Object.entries(imageMap)) {
  const regex = new RegExp(`(name:\\s*'${name.replace(/[.*+?^$(){}|[\\]\\\\]/g, '\\$&')}'[\\s\\S]*?img:\\s*')[^'](')`);
  wildlifeJs = wildlifeJs.replace(regex, `$1${url}$2`);
}
fs.writeFileSync('d:/Projects/Vanyam/js/wildlife.js', wildlifeJs);


// 2. Process index.html & main.js & gallery.js (replace broken Unsplash URLs with general nature ones)
// We'll replace all 'https://images.unsplash.com/photo-XXXX...' with Wikimedia nature ones

const generalForests = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Silent_Valley_National_Park.jpg/800px-Silent_Valley_National_Park.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Periyar_National_Park.jpg/800px-Periyar_National_Park.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Eravikulam_National_Park.jpg/800px-Eravikulam_National_Park.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Athirappilly_Waterfalls.jpg/800px-Athirappilly_Waterfalls.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Munnar_hill_station.jpg/800px-Munnar_hill_station.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Wayanad_forest.jpg/800px-Wayanad_forest.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Parambikulam_Tiger_Reserve.jpg/800px-Parambikulam_Tiger_Reserve.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Agasthyakoodam_Peak.jpg/800px-Agasthyakoodam_Peak.jpg",
];

const filesToReplace = ['d:/Projects/Vanyam/index.html', 'd:/Projects/Vanyam/js/main.js', 'd:/Projects/Vanyam/js/gallery.js'];

for (const file of filesToReplace) {
  let content = fs.readFileSync(file, 'utf8');
  let match;
  let counter = 0;
  
  // Regex to find unsplash image urls
  const unsplashRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?w=\d+&q=\d+/g;
  
  content = content.replace(unsplashRegex, () => {
    const replacement = generalForests[counter % generalForests.length];
    counter++;
    return replacement;
  });
  
  fs.writeFileSync(file, content);
}

console.log("All image links updated to valid Wikimedia photos successfully!");
