export interface AIModel {
  id: string;
  name: string;
  creator: string;
  baseModel: string;
  type: 'Checkpoint' | 'LoRA' | 'Textual Inversion' | 'Style';
  category: 'Realistic' | 'Anime' | '3D / Game' | 'Sci-Fi' | 'Fantasy' | 'Artistic' | 'Design';
  description: string;
  tags: string[];
  url: string;
  thumbnailUrl: string; // Real generated content image URL to represent model preview
}

// Beautiful stable generated/AI-style Unsplash preview images for each category
const CATEGORY_IMAGES: Record<string, string> = {
  'Realistic': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80', // High-fidelity portrait
  'Anime': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=120&h=120&q=80', // Anime/illustrated vibrant character
  '3D / Game': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80', // 3D render clay style
  'Sci-Fi': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=120&h=120&q=80', // Cyberpunk neon glow robotics
  'Fantasy': 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=120&h=120&q=80', // Dreamy mystical castle
  'Artistic': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=120&h=120&q=80', // Masterpiece fine oil painting
  'Design': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=120&h=120&q=80'  // Minimalist high-end interior architecture
};

const MODEL_FAMILIES = [
  {
    name: 'Juggernaut XL',
    creator: 'KandooAi',
    baseModel: 'SDXL 1.0',
    type: 'Checkpoint',
    category: 'Realistic',
    description: 'The industry-standard realistic checkpoint for cinematic lightning, detailed portraits, and stunning nature photography.',
    tags: ['photorealistic', 'cinematic', 'portrait', 'nature'],
    url: 'https://civitai.com/models/133005'
  },
  {
    name: 'DreamShaper',
    creator: 'Lykon',
    baseModel: 'SD 1.5 / SDXL',
    type: 'Checkpoint',
    category: 'Artistic',
    description: 'Incredibly versatile checkpoint for digital painting, illustrations, fantasy concept art, and high-fidelity renders.',
    tags: ['illustration', 'fantasy', 'painting', 'digital art'],
    url: 'https://civitai.com/models/4384'
  },
  {
    name: 'Counterfeit-V3.0',
    creator: 'rq1t1',
    baseModel: 'SD 1.5',
    type: 'Checkpoint',
    category: 'Anime',
    description: 'Premium quality anime and 2D character drawing model. Excels in colorful background details and beautiful dynamic lighting.',
    tags: ['anime', '2d', 'vibrant', 'character'],
    url: 'https://civitai.com/models/4468'
  },
  {
    name: 'Animagine XL',
    creator: 'CagliostroLab',
    baseModel: 'SDXL 1.0',
    type: 'Checkpoint',
    category: 'Anime',
    description: 'High-resolution anime checkpoint trained on modern anime styles, supporting advanced tags and beautiful scenery.',
    tags: ['anime', 'high-res', 'modern', 'illustration'],
    url: 'https://civitai.com/models/260267'
  },
  {
    name: 'GhostMix',
    creator: 'GhostInTheShell',
    baseModel: 'SD 1.5',
    type: 'Checkpoint',
    category: 'Sci-Fi',
    description: 'Outstanding cyberpunk, futuristic mecha, and high-tech robotic concept art generator with neon glows.',
    tags: ['cyberpunk', 'mecha', 'neon', 'robotics'],
    url: 'https://civitai.com/models/36520'
  },
  {
    name: 'CyberRealistic',
    creator: 'Cyberdelia',
    baseModel: 'SD 1.5',
    type: 'Checkpoint',
    category: 'Realistic',
    description: 'Superb realistic model for human skin texture, realistic clothes, studio lighting portraits, and street photography.',
    tags: ['realistic', 'skin texture', 'studio lighting', 'street'],
    url: 'https://civitai.com/models/15003'
  },
  {
    name: 'EpicRealism',
    creator: 'Eisbach',
    baseModel: 'SD 1.5',
    type: 'Checkpoint',
    category: 'Realistic',
    description: 'Epic cinematic and outdoor scenery realism. Handles mountains, clouds, water reflections, and natural sunlight perfectly.',
    tags: ['scenery', 'epic', 'outdoor', 'realistic'],
    url: 'https://civitai.com/models/25610'
  },
  {
    name: 'RevAnimated',
    creator: 'Slayerius',
    baseModel: 'SD 1.5',
    type: 'Checkpoint',
    category: 'Fantasy',
    description: 'A magical blend model that provides beautiful semi-realistic fantasy characters, dragons, castles, and enchanted forest scenery.',
    tags: ['fantasy', 'semi-realistic', 'magic', 'creature'],
    url: 'https://civitai.com/models/7371'
  },
  {
    name: 'MeinaMix',
    creator: 'Meina',
    baseModel: 'SD 1.5',
    type: 'Checkpoint',
    category: 'Anime',
    description: 'The golden standard anime mix model. Beautiful soft colors, incredibly cute faces, and wonderful details for both female and male figures.',
    tags: ['anime', 'mix', 'cute', 'character design'],
    url: 'https://civitai.com/models/7240'
  },
  {
    name: 'Deliberate',
    creator: 'Xpression',
    baseModel: 'SD 1.5',
    type: 'Checkpoint',
    category: 'Artistic',
    description: 'Meticulously crafted model providing superb flexibility, allowing highly specific prompts to build detailed art.',
    tags: ['versatile', 'detailed', 'artistic', 'civitai'],
    url: 'https://civitai.com/models/4823'
  },
  {
    name: '3D Disney Pixar Style',
    creator: 'Duskfall',
    baseModel: 'SD 1.5',
    type: 'Checkpoint',
    category: '3D / Game',
    description: 'Generates lovable 3D cartoon styled model figurines, toy story aesthetics, and detailed Pixar character illustrations.',
    tags: ['3d render', 'pixar', 'cute', 'disney'],
    url: 'https://civitai.com/models/46522'
  },
  {
    name: 'GuoFeng (国风) Chinese Style',
    creator: 'Guofeng',
    baseModel: 'SD 1.5',
    type: 'Checkpoint',
    category: 'Artistic',
    description: 'Gorgeous classic Chinese ink painting, watercolor illustration, and traditional Hanfu character drawings.',
    tags: ['chinese ink', 'hanfu', 'traditional', 'watercolor'],
    url: 'https://civitai.com/models/10415'
  },
  {
    name: 'ArchViz Interior Design',
    creator: 'ArchDesign',
    baseModel: 'SDXL 1.0',
    type: 'Checkpoint',
    category: 'Design',
    description: 'Professional architectural visualizer for modern living rooms, luxury hotels, lighting designs, and minimalistic layouts.',
    tags: ['architecture', 'interior', 'minimalist', 'living room'],
    url: 'https://civitai.com/models/52300'
  },
  {
    name: 'Pony Diffusion V6',
    creator: 'Astralite',
    baseModel: 'SDXL (Pony)',
    type: 'Checkpoint',
    category: 'Anime',
    description: 'Extremely popular and expressive model for cartoon figures, custom outfits, specific poses, and illustrations.',
    tags: ['pony', 'expressive', 'poses', 'anime'],
    url: 'https://civitai.com/models/257749'
  },
  {
    name: 'Synthwave Neon Style LoRA',
    creator: 'RetroVibe',
    baseModel: 'SD 1.5',
    type: 'LoRA',
    category: 'Sci-Fi',
    description: 'Adds rich retro synthwave grid lines, hot pink horizons, neon purples, and nostalgic 1980s graphics.',
    tags: ['retro', 'synthwave', 'neon', '80s'],
    url: 'https://civitai.com/models/2410'
  },
  {
    name: 'Clay Animation Style',
    creator: 'ClayMaster',
    baseModel: 'SDXL 1.0',
    type: 'Style',
    category: '3D / Game',
    description: 'Turns any prompt into a charming stop-motion claymation toy style, with finger-print clay textures and soft shading.',
    tags: ['claymation', 'stop motion', 'toy', 'texture'],
    url: 'https://civitai.com/models/12095'
  }
];

export const generate500Models = (): AIModel[] => {
  const models: AIModel[] = [];

  for (let i = 0; i < 500; i++) {
    const template = MODEL_FAMILIES[i % MODEL_FAMILIES.length];
    const versionNum = (Math.floor(i / MODEL_FAMILIES.length) + 1).toFixed(1);
    const subVersions = ['V', 'v', 'v', 'Beta', 'Plus', 'Lightning', 'Hyper', 'Turbo', 'v1.0-RC', 'XL-v'];
    const suffix = subVersions[i % subVersions.length] + versionNum;

    const modelId = `model-${i + 1}`;
    const name = `${template.name} ${suffix}`;
    const creator = `${template.creator}_${(i * 17) % 100}`;
    const baseModel = i % 5 === 0 ? 'Flux.1' : (i % 3 === 0 ? 'SDXL 1.0' : 'SD 1.5');

    let type: AIModel['type'] = template.type;
    if (i % 10 === 7) type = 'LoRA';
    if (i % 12 === 11) type = 'Style';
    if (i % 15 === 14) type = 'Textual Inversion';

    const combinedTags = [...template.tags, `v${versionNum}`, baseModel.toLowerCase(), type.toLowerCase()];
    if (i % 2 === 0) combinedTags.push('trending');
    if (i % 3 === 0) combinedTags.push('hq');
    if (i % 5 === 0) combinedTags.push('latest');

    const cat = template.category as AIModel['category'];
    const thumbnailUrl = CATEGORY_IMAGES[cat] || CATEGORY_IMAGES['Realistic'];

    models.push({
      id: modelId,
      name,
      creator,
      baseModel,
      type,
      category: cat,
      description: `[Version ${suffix}] Updated model branch. ${template.description} Fine-tuned for better performance on ${baseModel}.`,
      tags: Array.from(new Set(combinedTags)),
      url: template.url,
      thumbnailUrl
    });
  }

  return models;
};

// Singleton list of exactly 500 models
export const ALL_MODELS: AIModel[] = generate500Models();
