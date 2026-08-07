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
  thumbnailSvg: string; // inline SVG thumbnail/schematic diagram to save traffic
}

// Generate category-specific lightweight schematic diagram SVG icons to represent model thumbnails
const CATEGORY_SVGS: Record<string, string> = {
  'Realistic': `<svg viewBox="0 0 100 100" class="w-full h-full bg-slate-950 p-2 text-rose-500 fill-none stroke-current stroke-2"><circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="10"/><path d="M20 20 L40 20 M80 20 L80 40 M20 80 L20 60"/></svg>`,
  'Anime': `<svg viewBox="0 0 100 100" class="w-full h-full bg-slate-950 p-2 text-purple-400 fill-none stroke-current stroke-2"><path d="M50 15 L60 40 L85 45 L65 65 L70 90 L50 75 L30 90 L35 65 L15 45 L40 40 Z"/><circle cx="50" cy="50" r="5" class="fill-current"/></svg>`,
  '3D / Game': `<svg viewBox="0 0 100 100" class="w-full h-full bg-slate-950 p-2 text-sky-400 fill-none stroke-current stroke-2"><path d="M50 15 L85 35 L85 75 L50 95 L15 75 L15 35 Z M50 15 L50 95 M15 35 L50 55 L85 35"/></svg>`,
  'Sci-Fi': `<svg viewBox="0 0 100 100" class="w-full h-full bg-slate-950 p-2 text-emerald-450 fill-none stroke-current stroke-2"><path d="M20 50 H80 M50 20 V80 M35 35 L65 65 M35 65 L65 35"/><circle cx="50" cy="50" r="15" class="fill-slate-950"/></svg>`,
  'Fantasy': `<svg viewBox="0 0 100 100" class="w-full h-full bg-slate-950 p-2 text-amber-400 fill-none stroke-current stroke-2"><path d="M50 10 L80 35 L50 60 L20 35 Z M50 60 V90 M30 80 H70"/></svg>`,
  'Artistic': `<svg viewBox="0 0 100 100" class="w-full h-full bg-slate-950 p-2 text-indigo-400 fill-none stroke-current stroke-2"><path d="M25 75 C40 45, 60 45, 75 25 M30 65 L45 80"/><circle cx="75" cy="25" r="8" class="fill-current"/></svg>`,
  'Design': `<svg viewBox="0 0 100 100" class="w-full h-full bg-slate-950 p-2 text-teal-400 fill-none stroke-current stroke-2"><rect x="20" y="20" width="60" height="60" rx="5"/><path d="M35 50 H65 M50 35 V65"/></svg>`
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
    const thumbnailSvg = CATEGORY_SVGS[cat] || CATEGORY_SVGS['Realistic'];

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
      thumbnailSvg
    });
  }

  return models;
};

// Singleton list of exactly 500 models
export const ALL_MODELS: AIModel[] = generate500Models();
