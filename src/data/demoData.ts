// Demo data with cropped local images and extracted metadata
// Used as fallback when Firebase is not configured

import type { Series, Artwork, CvEntry, SiteSettings } from '@/types'

const WP = 'https://patrickbergsma.nl/wp-content/uploads'
const ART_CHINA = '/artworks/expanding-china-series'
const ART_NATURE = '/artworks/expanding-by-nature'

export const demoSettings: Omit<SiteSettings, 'updatedAt'> = {
  siteTitle: 'Patrick Bergsma',
  siteSubtitle: 'Visual Artist',
  contactEmail: 'info@patrickbergsma.nl',
  contactPhone: '',
  address: 'Heerhugowaard, The Netherlands',
  instagramUrl: 'https://www.instagram.com/patrickbergsma.nl/',
  galleryName: 'Galerie Franzis Engels',
  galleryUrl: 'https://www.franzisengels.nl/',
  birthYear: 1965,
  birthPlace: 'Purmerend',
  metaDescription: 'Patrick Bergsma — Visual Artist. Sculptural works exploring the beauty of decay, expanding nature and Chinese culture.',
  logoUrl: null,
  logoPath: null,
}

export const demoSeries: Omit<Series, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'series-china',
    title: 'Expanding China',
    slug: 'expanding-china-series',
    description: 'A series exploring Chinese culture through sculptural assemblages. Bergsma transforms found objects and porcelain fragments into elaborate compositions that bridge Eastern and Western aesthetics.',
    heroImageUrl: `${ART_CHINA}/landscape-kopie-8.jpg`,
    heroImagePath: '',
    order: 0,
    artworkCount: 53,
    isVisible: true,
  },
  {
    id: 'series-nature',
    title: 'Expanding by Nature',
    slug: 'expanding-by-nature',
    description: 'An ongoing exploration of natural forms and organic growth. Each work transforms found natural objects into new sculptural compositions that celebrate the beauty inherent in natural processes.',
    heroImageUrl: `${ART_NATURE}/landscape-kopie-57.jpg`,
    heroImagePath: '',
    order: 1,
    artworkCount: 14,
    isVisible: true,
  },
  {
    id: 'series-decay',
    title: 'Beautiful Decay',
    slug: 'beautiful-decay',
    description: 'Bergsma\'s signature series of assemblages from discarded and decaying objects. By elevating the overlooked and forgotten, these works reveal unexpected beauty in deterioration and the passage of time.',
    heroImageUrl: `${WP}/2021/05/Voorbeeld-Site-2.jpg`,
    heroImagePath: '',
    order: 2,
    artworkCount: 35,
    isVisible: true,
  },
]

// --- Expanding China artworks with metadata ---
interface ArtworkEntry {
  file: string       // local filename (without .jpg)
  title: string
  dimensions: string | null
  medium: string | null
  isDetail?: boolean  // detail/close-up shot (no text in original)
}

const chinaArtworks: ArtworkEntry[] = [
  // Chinese Dragon (main + detail)
  { file: 'expanding-china---chinese-dragon-2', title: 'Chinese Dragon', dimensions: '60 x 62 x 50 cm', medium: 'Old vase from Maastricht with handmade bonsai and mixed media' },
  { file: 'expanding-china---chinese-dragon-3', title: 'Chinese Dragon (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-3', title: 'Chinese Dragon', dimensions: '60 x 62 x 50 cm', medium: 'Old vase from Maastricht with handmade bonsai and mixed media' },
  // Resilient Satsuma
  { file: 'landscape-kopie-4', title: 'Resilient Satsuma', dimensions: '80 x 57 x 80 cm', medium: 'Old vase from Maastricht with handmade bonsai and mixed media' },
  { file: 'landscape-kopie-5', title: 'Resilient Satsuma (detail)', dimensions: null, medium: null, isDetail: true },
  // Dutch deadwood
  { file: 'landscape-kopie-6', title: 'Dutch deadwood', dimensions: '65 x 40 x 67 cm', medium: 'Old vase from Maastricht with handmade bonsai and mixed media' },
  // Blooming bonboniere
  { file: 'landscape-kopie-7', title: 'Blooming bonboniere', dimensions: '25 x 30 x 30 cm', medium: 'Old Makkums bonboniere with mixed media and handmade bonsai' },
  // Floral outburst
  { file: 'landscape-kopie-8', title: 'Floral outburst', dimensions: '33 x 33 x 35 cm', medium: 'Old Makkums bonboniere with mixed media and handmade bonsai' },
  // Detail shots
  { file: 'landscape-kopie-9', title: 'Floral outburst (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-10', title: 'Floral outburst (detail)', dimensions: null, medium: null, isDetail: true },
  // Rooted between shards
  { file: 'landscape-kopie-11', title: 'Rooted between shards', dimensions: '52 x 33 x 52 cm', medium: 'Old Gouds plateel plates with mixed media and handmade bonsai and flowers' },
  // Famille Rose Rebirth
  { file: 'landscape-kopie-12', title: 'Famille Rose Rebirth', dimensions: '55 x 52 x 56 cm', medium: 'Antique Famille rose vase with mixed media and handmade bonsai and flowers' },
  { file: 'landscape-kopie-13', title: 'Famille Rose Rebirth (detail)', dimensions: null, medium: null, isDetail: true },
  // Famille rose red blossom
  { file: 'landscape-kopie-14', title: 'Famille rose red blossom (Wallpiece)', dimensions: '45 x 45 x 55 cm', medium: 'Antique famille rose porcelain / Handmade moss and bonsai' },
  // Eclectic rock
  { file: 'landscape-kopie-15', title: 'Eclectic rock', dimensions: '90 x 65 x 60 cm', medium: 'Old vases from many different cultures with mixed media' },
  { file: 'landscape-kopie-16', title: 'Eclectic rock (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-17', title: 'Eclectic rock (detail)', dimensions: null, medium: null, isDetail: true },
  // Gouds geluk
  { file: 'landscape-kopie-18', title: 'Gouds geluk', dimensions: '29 x 24 x 17 cm', medium: 'Gouds plateel vase and mixed media' },
  // Springtime blues
  { file: 'landscape-kopie-19', title: 'Springtime blues', dimensions: '82 x 92 x 100 cm', medium: 'Old Delftblue vase with mixed media and handmade bonsai and flowers' },
  { file: 'landscape-kopie-20', title: 'Springtime blues (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-21', title: 'Springtime blues (detail)', dimensions: null, medium: null, isDetail: true },
  // Amsterdams bont
  { file: 'landscape-kopie-22', title: 'Amsterdams bont', dimensions: '47 x 41 x 42 cm', medium: 'Antique Amsterdams bont porcelain with mixed media and handmade bonsai' },
  { file: 'landscape-kopie-23', title: 'Amsterdams bont (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-24', title: 'Amsterdams bont (detail)', dimensions: null, medium: null, isDetail: true },
  // Japanese Quince power
  { file: 'landscape-kopie-25', title: 'Japanese Quince power', dimensions: '33 x 39 x 33 cm', medium: 'Antique Imari vase with handmade bonsai, flowers and mixed media' },
  { file: 'landscape-kopie-26', title: 'Japanese Quince power (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-27', title: 'Japanese Quince power (detail)', dimensions: null, medium: null, isDetail: true },
  // Rosenburg
  { file: 'landscape-kopie-28', title: 'Rosenburg', dimensions: '56 x 62 x 45 cm', medium: 'Antique Rosenburg plateel with mixed media and handmade bonsai' },
  { file: 'landscape-kopie-29', title: 'Rosenburg (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-30', title: 'Rosenburg (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-31', title: 'Rosenburg (detail)', dimensions: null, medium: null, isDetail: true },
  // Dutch mountain
  { file: 'landscape-kopie-32', title: 'Dutch mountain', dimensions: '70 x 65 x 46 cm', medium: 'Old Delftblue vases, mixed media and handmade bonsai' },
  { file: 'landscape-kopie-33', title: 'Dutch mountain (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-34', title: 'Dutch mountain (detail)', dimensions: null, medium: null, isDetail: true },
  // Twisted Branches
  { file: 'landscape-kopie-35', title: 'Twisted Branches', dimensions: '58 x 46 x 40 cm', medium: 'Old hand-painted French vase with handmade bonsai branches and flowers and mixed media' },
  { file: 'landscape-kopie-36', title: 'Twisted Branches (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-37', title: 'Twisted Branches (detail)', dimensions: null, medium: null, isDetail: true },
  // Satsuma
  { file: 'landscape-kopie-38', title: 'Satsuma', dimensions: '101 x 80 x 85 cm', medium: 'Antique Satsuma vase with handmade bonsai, bird (puttertje) and mixed media' },
  { file: 'landscape-kopie-39', title: 'Satsuma (detail)', dimensions: null, medium: null, isDetail: true },
  // Royal white pine
  { file: 'landscape-kopie-40', title: 'Royal white pine', dimensions: '75 x 75 x 55 cm', medium: 'Old hand-painted Delftblue vase with handmade bonsai and mixed media' },
  { file: 'landscape-kopie-41', title: 'Royal white pine (detail)', dimensions: null, medium: null, isDetail: true },
  // Abandoned vase
  { file: 'landscape-kopie-42', title: 'Abandoned vase', dimensions: '50 x 42 x 40 cm', medium: 'Old French imitation of Dutch 17th century vase, handmade bonsai and mixed media' },
  { file: 'landscape-kopie-43', title: 'Abandoned vase (detail)', dimensions: null, medium: null, isDetail: true },
  // Apple blossom blues
  { file: 'landscape-kopie-44', title: 'Apple blossom blues', dimensions: '52 x 61 x 35 cm', medium: 'Old hand-painted Delftblue vases with handmade bonsai and mixed media' },
  { file: 'landscape-kopie-45', title: 'Apple blossom blues (detail)', dimensions: null, medium: null, isDetail: true },
  // Sailor blues
  { file: 'landscape-kopie-46', title: 'Sailor blues', dimensions: '60 x 40 x 40 cm', medium: 'Old Delftblue vases, handmade bonsai and mixed media' },
  { file: 'landscape-kopie-47', title: 'Sailor blues (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-48', title: 'Sailor blues (detail)', dimensions: null, medium: null, isDetail: true },
  // Cracking tulip vase
  { file: 'landscape-kopie-49', title: 'Cracking tulip vase', dimensions: '70 x 50 x 45 cm', medium: '18th century knobbelvaas with handmade bonsai and mixed media' },
  { file: 'landscape-kopie-50', title: 'Cracking tulip vase (detail)', dimensions: null, medium: null, isDetail: true },
  // Wild roses
  { file: 'landscape-kopie-51', title: 'Wild roses', dimensions: '72 x 50 x 45 cm', medium: 'Qing dynasty famille rose vase with handmade bonsai, flowers and mixed media' },
  { file: 'landscape-kopie-52', title: 'Wild roses (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-53', title: 'Wild roses', dimensions: '72 x 50 x 45 cm', medium: 'Qing dynasty famille rose vase with handmade bonsai, flowers and mixed media' },
]

// --- Expanding by Nature artworks with metadata ---
const natureArtworks: ArtworkEntry[] = [
  { file: 'landscape-kopie-54', title: 'Wild roses', dimensions: '72 x 50 x 45 cm', medium: 'Qing dynasty famille rose vase with handmade bonsai, flowers and mixed media' },
  { file: 'landscape-kopie-55', title: 'Wild roses (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-56', title: 'Wild roses (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-57', title: 'Shifting spheres', dimensions: '90 x 70 x 95 cm', medium: 'Old globes with mixed media and handmade bonsai' },
  { file: 'landscape-kopie-58', title: 'Shifting spheres (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-59', title: 'Shifting spheres (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-60', title: 'Floating territories', dimensions: '30 x 340 x 30 cm', medium: 'Old globes with mixed media and handmade bonsai and flowers' },
  { file: 'landscape-kopie-61', title: 'Floating territories (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-62', title: 'Rooted globes', dimensions: '65 x 61 x 91 cm', medium: 'Old globes with mixed media and handmade bonsai and flowers' },
  { file: 'landscape-kopie-63', title: 'Rooted globes (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-64', title: 'Rooted globes (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-65', title: 'Spheres in bloom (detail)', dimensions: null, medium: null, isDetail: true },
  { file: 'landscape-kopie-66', title: 'Spheres in bloom', dimensions: '70 x 42 x 58 cm', medium: 'Old globe with mixed media and handmade bonsai' },
  { file: 'landscape-kopie-67', title: 'Spheres in bloom (detail)', dimensions: null, medium: null, isDetail: true },
]

// --- Beautiful Decay artworks (WordPress museum photos - no text overlay) ---
const decayEntries: { file: string; title: string }[] = [
  { file: '2-DSC4390_190308_Gorcums_Museum-Hakker-min', title: 'Gorcums Museum' },
  { file: '2-DSC4397_190308_Gorcums_Museum_dromen_van_bomen-min-scaled', title: 'Dromen van Bomen' },
  { file: '1-coda-voorkant-site-min-scaled', title: 'CODA Museum' },
  { file: 'afb030gr-min', title: 'Untitled' },
  { file: '2-Gorcums_Museum_dromen_van_bomen-min-scaled', title: 'Dromen van Bomen II' },
  { file: '2-Times-57-34-26-kopie-min-scaled', title: 'Times' },
  { file: '2-Times-3-kopie-min', title: 'Times III' },
  { file: '2-Times-5-kopie-min', title: 'Times V' },
  { file: '2-Times-min-scaled', title: 'Times (overview)' },
  { file: '2-Wederopbouw-50-35-25-2015-min', title: 'Wederopbouw' },
  { file: '2-Wederopbouw-detail-min', title: 'Wederopbouw (detail)' },
  { file: '3-Abandoned-car-wallpiece-min-scaled', title: 'Abandoned Car' },
  { file: 'grote-watertoren-2-min', title: 'Grote Watertoren II' },
  { file: 'grote-watertoren-3-min', title: 'Grote Watertoren III' },
  { file: 'grote-watertoren-4-min', title: 'Grote Watertoren IV' },
  { file: 'Junkyard-detail2-min-scaled', title: 'Junkyard (detail)' },
  { file: 'jJunkyard-back-min-scaled', title: 'Junkyard' },
  { file: 'jy3-min-scaled', title: 'Junkyard III' },
  { file: 'jy7-min-scaled', title: 'Junkyard VII' },
  { file: 'more-and-more-min', title: 'More and More' },
  { file: 'more-and-more-detail-min', title: 'More and More (detail)' },
  { file: 'More-stuff-4U-60-30-35-min-scaled', title: 'More Stuff 4U' },
  { file: 'ms4-min-scaled', title: 'More Stuff 4U (view)' },
  { file: 'More-stuff-4U-detail-min-scaled', title: 'More Stuff 4U (detail)' },
  { file: 'ms12-min-scaled', title: 'More Stuff 4U II' },
  { file: 'True-nature-zij-min-scaled', title: 'True Nature (side)' },
  { file: 'True-nature-min-scaled', title: 'True Nature' },
  { file: 'True-nature-detail-min-scaled', title: 'True Nature (detail)' },
  { file: 'true-nature-2-min', title: 'True Nature II' },
  { file: 'afb069gr-min', title: 'Assemblage I' },
  { file: 'afb068gr-min', title: 'Assemblage II' },
  { file: 'afb062gr-min', title: 'Assemblage III' },
  { file: 'afb063gr-min', title: 'Assemblage IV' },
  { file: 'afb015gr-16.15.07', title: 'Assemblage V' },
  { file: 'afb004gr-min-6', title: 'Assemblage VI' },
]

function makeArtwork(
  id: string,
  seriesId: string,
  seriesSlug: string,
  title: string,
  imageUrl: string,
  thumbnailUrl: string,
  order: number,
  dimensions: string | null = null,
  medium: string | null = null,
  isSelectedWork = false,
): Omit<Artwork, 'createdAt' | 'updatedAt'> {
  return {
    id,
    seriesId,
    seriesSlug,
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
    imageUrl,
    thumbnailUrl,
    imagePath: '',
    thumbnailPath: '',
    dimensions,
    medium,
    year: null,
    order,
    isVisible: true,
    isSelectedWork,
  }
}

// Selected works for homepage — diverse main artworks (no detail shots)
const chinaSelected = new Set([
  'landscape-kopie-8',   // Floral outburst
  'landscape-kopie-15',  // Eclectic rock
  'landscape-kopie-19',  // Springtime blues
  'landscape-kopie-38',  // Satsuma
])
const natureSelected = new Set([
  'landscape-kopie-57',  // Shifting spheres
  'landscape-kopie-62',  // Rooted globes
])

export const demoArtworks: Omit<Artwork, 'createdAt' | 'updatedAt'>[] = [
  // Expanding China — local cropped images
  ...chinaArtworks.map((entry, i) =>
    makeArtwork(
      `china-${i}`,
      'series-china',
      'expanding-china-series',
      entry.title,
      `${ART_CHINA}/${entry.file}.jpg`,
      `${ART_CHINA}/thumbs/${entry.file}.jpg`,
      i,
      entry.dimensions,
      entry.medium,
      chinaSelected.has(entry.file),
    )
  ),
  // Expanding by Nature — local cropped images
  ...natureArtworks.map((entry, i) =>
    makeArtwork(
      `nature-${i}`,
      'series-nature',
      'expanding-by-nature',
      entry.title,
      `${ART_NATURE}/${entry.file}.jpg`,
      `${ART_NATURE}/thumbs/${entry.file}.jpg`,
      i,
      entry.dimensions,
      entry.medium,
      natureSelected.has(entry.file),
    )
  ),
  // Beautiful Decay — WordPress museum photos (no local crop needed)
  ...decayEntries.map((entry, i) =>
    makeArtwork(
      `decay-${i}`,
      'series-decay',
      'beautiful-decay',
      entry.title,
      `${WP}/2021/06/${entry.file}.jpg`,
      `${WP}/2021/06/${entry.file}.jpg`,
      i,
      null,
      null,
      i < 2,
    )
  ),
]

export const demoCvEntries: Omit<CvEntry, 'createdAt' | 'updatedAt'>[] = [
  // Education
  { id: 'cv-edu-1', category: 'education', title: 'Royal Academy', subtitle: 'The Hague', year: '1992–1996', url: null, logoUrl: null, logoPath: null, order: 0 },

  // Awards
  { id: 'cv-award-1', category: 'award', title: '1st Prize Winsor and Newton', subtitle: null, year: null, url: null, logoUrl: null, logoPath: null, order: 0 },
  { id: 'cv-award-2', category: 'award', title: '2nd Prize Caran d\'Ache', subtitle: null, year: null, url: null, logoUrl: null, logoPath: null, order: 1 },
  { id: 'cv-award-3', category: 'award', title: '1st Prize "East meets West"', subtitle: 'Precious Magazine, Hong Kong', year: null, url: null, logoUrl: null, logoPath: null, order: 2 },
  { id: 'cv-award-4', category: 'award', title: 'Nomination Rabobank Cultuurprijs', subtitle: null, year: null, url: null, logoUrl: null, logoPath: null, order: 3 },

  // Solo Exhibitions
  { id: 'cv-solo-1', category: 'solo_exhibition', title: 'Resilience', subtitle: 'Galerie Franzis Engels, Amsterdam', year: null, url: null, logoUrl: null, logoPath: null, order: 0 },
  { id: 'cv-solo-2', category: 'solo_exhibition', title: 'The age of destruction', subtitle: 'Galerie Franzis Engels, Amsterdam', year: null, url: null, logoUrl: null, logoPath: null, order: 1 },
  { id: 'cv-solo-3', category: 'solo_exhibition', title: 'The beauty of decay', subtitle: 'Galerie Franzis Engels, Amsterdam', year: null, url: null, logoUrl: null, logoPath: null, order: 2 },
  { id: 'cv-solo-4', category: 'solo_exhibition', title: 'Expedition Nature', subtitle: 'CODA Museum, Apeldoorn', year: null, url: null, logoUrl: null, logoPath: null, order: 3 },
  { id: 'cv-solo-5', category: 'solo_exhibition', title: 'Solo exhibitions', subtitle: 'Van Loon Galleries, Vught', year: null, url: null, logoUrl: null, logoPath: null, order: 4 },

  // Group Exhibitions
  { id: 'cv-group-1', category: 'group_exhibition', title: 'Compleet van de kaart', subtitle: 'Kunstenplatform WARP, Sint-Niklaas, Belgium', year: null, url: null, logoUrl: null, logoPath: null, order: 0 },
  { id: 'cv-group-2', category: 'group_exhibition', title: 'Art Rotterdam', subtitle: 'Galerie Franzis Engels, Amsterdam', year: null, url: null, logoUrl: null, logoPath: null, order: 1 },
  { id: 'cv-group-3', category: 'group_exhibition', title: 'PAN Amsterdam', subtitle: 'Galerie Franzis Engels, Amsterdam', year: null, url: null, logoUrl: null, logoPath: null, order: 2 },
  { id: 'cv-group-4', category: 'group_exhibition', title: 'Fuga\'s en pimpelmezen', subtitle: 'Museumhuis Lucien de Gheus, Poperinge, Belgium', year: null, url: null, logoUrl: null, logoPath: null, order: 3 },
  { id: 'cv-group-5', category: 'group_exhibition', title: 'XXS — small worlds in art', subtitle: 'Gorcums Museum, Gorinchem', year: null, url: null, logoUrl: null, logoPath: null, order: 4 },
  { id: 'cv-group-6', category: 'group_exhibition', title: 'Bold', subtitle: 'MUGA, Heerenveen', year: null, url: null, logoUrl: null, logoPath: null, order: 5 },
  { id: 'cv-group-7', category: 'group_exhibition', title: 'Content craftmanship', subtitle: 'Duane Reed Gallery, St. Louis', year: null, url: null, logoUrl: null, logoPath: null, order: 6 },
  { id: 'cv-group-8', category: 'group_exhibition', title: 'Ceramics Triennale', subtitle: 'CODA Museum, Apeldoorn', year: null, url: null, logoUrl: null, logoPath: null, order: 7 },

  // Public Collections
  { id: 'cv-coll-1', category: 'public_collection', title: 'Stedelijk Museum De Prinsenhof', subtitle: 'Delft', year: null, url: null, logoUrl: null, logoPath: null, order: 0 },
  { id: 'cv-coll-2', category: 'public_collection', title: 'Stedelijk Museum', subtitle: 'Alkmaar', year: null, url: null, logoUrl: null, logoPath: null, order: 1 },
  { id: 'cv-coll-3', category: 'public_collection', title: 'Accenture', subtitle: 'Amsterdam', year: null, url: null, logoUrl: null, logoPath: null, order: 2 },
  { id: 'cv-coll-4', category: 'public_collection', title: 'KPMG', subtitle: 'Amstelveen', year: null, url: null, logoUrl: null, logoPath: null, order: 3 },
  { id: 'cv-coll-5', category: 'public_collection', title: 'ABN-AMRO', subtitle: null, year: null, url: null, logoUrl: null, logoPath: null, order: 4 },
  { id: 'cv-coll-6', category: 'public_collection', title: 'Deutsche Bank', subtitle: null, year: null, url: null, logoUrl: null, logoPath: null, order: 5 },
  { id: 'cv-coll-7', category: 'public_collection', title: 'Deloitte', subtitle: null, year: null, url: null, logoUrl: null, logoPath: null, order: 6 },
  { id: 'cv-coll-8', category: 'public_collection', title: 'The Drakes Collection', subtitle: 'Wassenaar', year: null, url: null, logoUrl: null, logoPath: null, order: 7 },
  { id: 'cv-coll-9', category: 'public_collection', title: 'Ministry of Foreign Affairs', subtitle: 'Kyiv', year: null, url: null, logoUrl: null, logoPath: null, order: 8 },

  // Media
  { id: 'cv-media-1', category: 'media', title: 'This is Colossal', subtitle: null, year: null, url: 'https://www.thisiscolossal.com/', logoUrl: `${WP}/2024/08/COLOSSAL-1.png`, logoPath: null, order: 0 },
  { id: 'cv-media-2', category: 'media', title: 'Hyperallergic', subtitle: null, year: null, url: 'https://hyperallergic.com/', logoUrl: `${WP}/2024/08/HYPERALLERGIC.png`, logoPath: null, order: 1 },
  { id: 'cv-media-3', category: 'media', title: 'My Modern Met', subtitle: null, year: null, url: 'https://mymodernmet.com/', logoUrl: `${WP}/2024/08/MY-MODERN-MET.png`, logoPath: null, order: 2 },
  { id: 'cv-media-4', category: 'media', title: 'Designboom', subtitle: null, year: null, url: 'https://www.designboom.com/', logoUrl: `${WP}/2024/08/DESIGNBOOM.png`, logoPath: null, order: 3 },
  { id: 'cv-media-5', category: 'media', title: 'Art Sheep', subtitle: null, year: null, url: null, logoUrl: `${WP}/2024/08/ART-SHEEP.png`, logoPath: null, order: 4 },
  { id: 'cv-media-6', category: 'media', title: 'Hi-Fructose', subtitle: null, year: null, url: 'https://hifructose.com/', logoUrl: `${WP}/2024/08/HI-FRUCTOSE-1.png`, logoPath: null, order: 5 },
  { id: 'cv-media-7', category: 'media', title: 'IRK Magazine', subtitle: null, year: null, url: null, logoUrl: `${WP}/2025/12/IRK-MAGAZINE-1-scaled.png`, logoPath: null, order: 6 },
]
