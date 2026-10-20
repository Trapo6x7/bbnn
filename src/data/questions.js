import mobileFacePositions from './mobileFacePositions.json';

// Le dossier de chaque photo définit la réponse, sans analyse de son contenu.
export const options = [
  { id: 'bb', label: 'BlackBlock' },
  { id: 'nn', label: 'NéoNazi' },
];

const images = import.meta.glob('/assets/{bb,nn}/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', {
  eager: true,
  query: '?url',
  import: 'default',
});

// Ajouter ici les cadrages particuliers, avec le chemin exact de la photo.
// x et y sont des pourcentages ; zoom définit le grossissement (2.5 par défaut).
const facePositions = {
  "/assets/bb/1200x680.jpg": {
    "x": 52,
    "y": 34,
    "zoom": 7.5
  },
  "/assets/bb/1299421-1-2000-individus-cagoules-en-tete-du-cortege-du-defile-du-1er-mai-a-paris.jpg": {
    "x": 45,
    "y": 21,
    "zoom": 7.4
  },
  "/assets/bb/2023-04-06t141623z_1964074628_rc2290ac9lup_rtrmadp_3_france-pensions-protests-taille1200_6452300291bb3_0.jpg": {
    "x": 45,
    "y": 21,
    "zoom": 4.8
  },
  "/assets/bb/641d7465f1b29_img-20230323-163303.jpg": {
    "x": 53,
    "y": 28,
    "zoom": 5.3
  },
  "/assets/bb/SYL3625.jpg": {
    "x": 50,
    "y": 44,
    "zoom": 6.3
  },
  "/assets/bb/les-black-blocs-ont-tres-rapidement-pris-la-tete-du-cortege-photo-progres-norbert-grisay-1683090154.jpg": {
    "x": 53,
    "y": 36,
    "zoom": 9.2
  },
  "/assets/bb/phpzWKcdJ.jpg": {
    "x": 92,
    "y": 30,
    "zoom": 5
  },
  "/assets/bb/s-infiltrant-au-sein-des-manifestations-les-black-blocs-sont-souvent-constitues-de-petits-groupes-tres-mobiles-et-habilles-de-noir-photo-alain-jocard-afp-1606761842.jpg": {
    "x": 40,
    "y": 37,
    "zoom": 8.1
  },
  "/assets/bb/sc_dsc_8232.jpg": {
    "x": 54,
    "y": 28,
    "zoom": 6.2
  },
  "/assets/bb/shutterstock_92849005.jpg": {
    "x": 52,
    "y": 3,
    "zoom": 7
  },
  "/assets/nn/1135964.webp": {
    "x": 54,
    "y": 39,
    "zoom": 8.5
  },
  "/assets/nn/2048 (1).webp": {
    "x": 15,
    "y": 58,
    "zoom": 12
  },
  "/assets/nn/2048.webp": {
    "x": 49,
    "y": 47,
    "zoom": 10.9
  },
  "/assets/nn/65759ec858e7c2aa048b4652.webp": {
    "x": 59,
    "y": 45,
    "zoom": 3.8
  },
  "/assets/nn/IMG-20231202-WA0009-730x462.jpg": {
    "x": 39,
    "y": 23,
    "zoom": 5.6
  },
  "/assets/nn/Manifestation-hommage-Jeanne-Arc-Nationalistes-Autonomes-groupe-dultradroite-Paris-9-avril-2010_0.webp": {
    "x": 43,
    "y": 30,
    "zoom": 7
  },
  "/assets/nn/Un-manifestant-present-lors-du-comite-du-9-mai-a-Paris-le-6-mai-2023-1632336.webp": {
    "x": 35,
    "y": 46,
    "zoom": 4.2
  },
  "/assets/nn/masked-neo-nazis-march-ohio-capital-open-display.jpg": {
    "x": 9,
    "y": 38,
    "zoom": 6.1
  },
  "/assets/nn/phpew38rD_1.jpg": {
    "x": 46,
    "y": 24,
    "zoom": 4.3
  },
  "/assets/nn/zoom-la-rune-dodal-symbole-recupere-par-les-nazis-a-la-marche-anti-pma-58957-003636-fffcc0-0@1x.jpg": {
    "x": 50,
    "y": 8,
    "zoom": 5
  }
};

export const questions = Object.entries(images).map(([path, image]) => {
  const category = path.split('/')[2];
  const label = options.find(option => option.id === category).label;
  return {
    id: path,
    image,
    alt: `Photo de la catégorie ${label}`,
    face: facePositions[path] ?? { x: 50, y: 30 },
    mobileFace: mobileFacePositions[path],
    answer: category,
    explanation: `Cette photo appartient à la catégorie ${label}.`,
  };
});
