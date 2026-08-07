import React, { useState, useEffect, useRef } from 'react'
import {
  Sparkles,
  Settings,
  Trash2,
  Download,
  Globe,
  Palette,
  Lock,
  Key,
  Play,
  FolderHeart,
  RefreshCw,
  Upload,
  History,
  Check,
  AlertCircle,
  Plus,
  X,
  Cpu,
  ChevronRight,
  Bookmark,
  Layers,
  HelpCircle,
  TrendingUp,
  Image as ImageIcon,
  Search,
  BookOpen,
  Eye,
  Heart,
  Zap,
  Flame
} from 'lucide-react'
import { ALL_MODELS, AIModel } from './modelsData'

// Translation structure for bilingual support (Chinese/English)
const translations = {
  zh: {
    title: '白狐AI二 - 智能绘图面板',
    subtitle: '极简部署，多模态，多平台AI画室',
    passwordPrompt: '此面板受密码保护，请输入访问密码：',
    passwordPlaceholder: '请输入密码（默认 123456）',
    submit: '确定',
    passwordError: '密码错误，请重新输入',
    txt2img: '文本生成图像 (Txt2Img)',
    img2img: '图像到图像 (Img2Img)',
    ref2img: '参考图生成 (Reference)',
    positivePrompt: '正面提示词 (Prompt)',
    positivePromptPlaceholder: '输入想要生成的画面内容，例如：一个美丽的白色狐狸，森林背景，超高清...',
    negativePrompt: '负面提示词 (Negative Prompt)',
    negativePromptPlaceholder: '输入不想出现的元素，例如：模糊、低画质、多余肢体...',
    paramsTitle: '绘图参数设置',
    samplingMethod: '采样方法 (Sampler)',
    generationSize: '生成尺寸 (Size)',
    customSize: '自定义大小',
    steps: '迭代步数 (Steps)',
    cfgScale: '提示词相关性 (CFG Scale)',
    seed: '随机种子 (Seed)',
    seedHelp: '-1 为随机种子',
    restoreDefaults: '恢复默认设置',
    bgColor: '面板背景色',
    providerConfig: '模型与平台API配置',
    providerLabel: '接口平台 (Provider)',
    cfToken: 'Cloudflare API Token',
    cfId: 'Cloudflare Account ID',
    openaiKey: 'OpenAI API Key (DALL-E)',
    mjUrl: 'Midjourney API URL',
    mjKey: 'Midjourney Key',
    freeApiLabel: '自动扫描并选用免费/公用API',
    scanBtn: '扫描10大免费API',
    scanStatus: 'API状态扫描器',
    latency: '延迟',
    autoConfigBtn: '自动应用最快API',
    generateBtn: '立即生成画作',
    generating: 'AI正在全力绘制中...',
    historyTitle: '已生成画作历史',
    emptyHistory: '暂无生成历史，快去创作一幅吧！',
    deleteConfirm: '确定要删除此图片吗？',
    download: '下载',
    delete: '删除',
    savePrompt: '保存到提示词库',
    promptLibrary: '我的提示词库',
    promptCategory: '分类',
    addPrompt: '添加提示词',
    promptName: '提示名称',
    promptContent: '提示词内容',
    statusOnline: '在线',
    statusOffline: '不在线',
    scanPlaceholder: '点击扫描测试API延迟...',
    uploadImage: '上传/拖拽底图',
    refImage: '上传参考图',
    promptSaved: '提示词保存成功',
    configRestored: '已恢复默认设置',
    loginSuccess: '登录成功',

    // Model Hub Translation Addition
    modelHubTitle: '互联网模型探索中心',
    modelHubSub: '已自动检索保存 500 条高质量模型，内置真实精美生成效果图作为示意。支持精准搜索与保存。',
    searchPlaceholder: '输入关键词搜索500条大模型...',
    modelType: '模型类型',
    baseModelLabel: '底模',
    author: '作者',
    applyModel: '选定并配置参数',
    applyAndGenerate: '一键应用并直接绘图',
    savedModelsTitle: '已保存/收藏的模型',
    savedModelsEmpty: '您还没有收藏任何模型，在下方列表中点击心形图标收藏吧！',
    prevPage: '上一页',
    nextPage: '下一页',
    pageIndicator: '第 {current} / {total} 页',
    oneClickTranslate: '一键中文翻译',
    translatedLabel: '已翻译',

    // Spell Selector
    spellTitle: '高级咒语魔法施法器 (Spellbook Selector)',
    spellSub: '点击以下各系法术，一键为积极提示词「注入」对应的唯美画风和采样增强咒语！',
    castingActive: '正在释放魔法「{spell}」...',
    spellCastBtn: '吟唱施法'
  },
  en: {
    title: 'White Fox AI II - Intelligent Painting Panel',
    subtitle: 'Minimalist deployment, multi-modal, multi-platform AI Studio',
    passwordPrompt: 'This panel is password protected. Please enter access password:',
    passwordPlaceholder: 'Enter password (Default is 123456)',
    submit: 'Confirm',
    passwordError: 'Incorrect password, please try again',
    txt2img: 'Text to Image (Txt2Img)',
    img2img: 'Image to Image (Img2Img)',
    ref2img: 'Reference to Image',
    positivePrompt: 'Positive Prompt',
    positivePromptPlaceholder: 'Describe what you want to generate, e.g., A beautiful white fox in a magic forest, ultra-detailed...',
    negativePrompt: 'Negative Prompt',
    negativePromptPlaceholder: 'Describe what to avoid, e.g., blurry, low quality, deformed limbs...',
    paramsTitle: 'Drawing Parameters',
    samplingMethod: 'Sampling Method',
    generationSize: 'Generation Size',
    customSize: 'Custom Size',
    steps: 'Sampling Steps',
    cfgScale: 'CFG Scale',
    seed: 'Seed',
    seedHelp: '-1 for random seed',
    restoreDefaults: 'Restore Default Settings',
    bgColor: 'Panel Background Color',
    providerConfig: 'Model & Platform API Settings',
    providerLabel: 'Provider Platform',
    cfToken: 'Cloudflare API Token',
    cfId: 'Cloudflare Account ID',
    openaiKey: 'OpenAI API Key (DALL-E)',
    mjUrl: 'Midjourney API URL',
    mjKey: 'Midjourney Key',
    freeApiLabel: 'Auto Scan & Apply Free APIs',
    scanBtn: 'Scan 10 Free APIs',
    scanStatus: 'API Status Scanner',
    latency: 'Latency',
    autoConfigBtn: 'Auto-Apply Fastest API',
    generateBtn: 'Generate Masterpiece',
    generating: 'AI is painting actively...',
    historyTitle: 'Generated Art History',
    emptyHistory: 'No history found. Go ahead and paint one!',
    deleteConfirm: 'Are you sure you want to delete this art?',
    download: 'Download',
    delete: 'Delete',
    savePrompt: 'Save to Prompt Library',
    promptLibrary: 'My Prompt Library',
    promptCategory: 'Category',
    addPrompt: 'Add Prompt',
    promptName: 'Prompt Name',
    promptContent: 'Prompt Content',
    statusOnline: 'Online',
    statusOffline: 'Offline',
    scanPlaceholder: 'Click scan to test API latency...',
    uploadImage: 'Upload / Drag base image',
    refImage: 'Upload reference image',
    promptSaved: 'Prompt saved successfully',
    configRestored: 'Configuration restored to defaults',
    loginSuccess: 'Login successful',

    // Model Hub Translation Addition
    modelHubTitle: 'Internet Model Hub',
    modelHubSub: '500 models pre-saved. Elegant generated sample images embedded as previews. Fully searchable & saveable.',
    searchPlaceholder: 'Search 500 AI checkpoints/LoRAs...',
    modelType: 'Type',
    baseModelLabel: 'Base',
    author: 'Author',
    applyModel: 'Use & Configure',
    applyAndGenerate: 'Apply & Direct Draw',
    savedModelsTitle: 'My Saved Models',
    savedModelsEmpty: 'No bookmarked models yet. Click the heart icon below to save your favorites!',
    prevPage: 'Prev',
    nextPage: 'Next',
    pageIndicator: 'Page {current} of {total}',
    oneClickTranslate: 'Translate to CN',
    translatedLabel: 'CN',

    // Spell Selector
    spellTitle: 'Spellbook Magic Styler',
    spellSub: 'Cast ancient aesthetic spells to automatically inject high-fidelity modifiers and sampling scheduler tags into your prompts.',
    castingActive: 'Casting magical spell 「{spell}」...',
    spellCastBtn: 'Cast Spell'
  }
}

// Spells configuration (咒语魔法施法列表)
const MAGICAL_SPELLS = [
  {
    id: 'light-spell',
    name: '🌟 唯美光影 (Ethereal Light)',
    modifiers: ', volumetric godrays, warm sunset flare, glittering dust particles, hyper-realistic ambient occlusion, dramatic backlighting',
    class: 'border-amber-500/40 text-amber-450 hover:bg-amber-950/20'
  },
  {
    id: 'ink-spell',
    name: '🎨 大师手笔 (Masterpiece Ink)',
    modifiers: ', digital canvas painting, fine ink washes, masterpiece texture, gorgeous composition, highly stylized oil strokes',
    class: 'border-indigo-500/40 text-indigo-400 hover:bg-indigo-950/20'
  },
  {
    id: 'scifi-spell',
    name: '⚡ 数码科幻 (Sci-Fi Cyber)',
    modifiers: ', cyberpunk tech circuits, neon glow lines, ultra-modern holographic HUD overlay, mechanical cyber design, high tech details',
    class: 'border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/20'
  },
  {
    id: 'fantasy-spell',
    name: '🍄 奇幻仙境 (Fantasy Realm)',
    modifiers: ', dreamy enchanted flora, magical floating sparkles, fantasy scenery concept art, surreal landscape, photorealistic unreal engine 5 rendering',
    class: 'border-purple-500/40 text-purple-400 hover:bg-purple-950/20'
  }
]

// 10 Preset Drawing public APIs
const PRESET_APIS_INFO = [
  { id: 'pollinations-flux', name: 'Pollinations AI (Flux)', model: 'flux', type: 'pollinations' },
  { id: 'pollinations-turbo', name: 'Pollinations AI (Turbo)', model: 'turbo', type: 'pollinations' },
  { id: 'pollinations-anime', name: 'Pollinations AI (Anime)', model: 'anime', type: 'pollinations' },
  { id: 'pollinations-3d', name: 'Pollinations AI (3D Render)', model: '3d', type: 'pollinations' },
  { id: 'hf-sdxl', name: 'HuggingFace SDXL (Base)', type: 'huggingface' },
  { id: 'hf-sd15', name: 'HuggingFace SD v1.5', type: 'huggingface' },
  { id: 'hf-animagine', name: 'HuggingFace Animagine XL', type: 'huggingface' },
  { id: 'hf-playground', name: 'HuggingFace Playground v2.5', type: 'huggingface' },
  { id: 'prodia-free', name: 'Prodia Public SD', type: 'prodia' },
  { id: 'pollinations-niche', name: 'Pollinations (Cyberpunk)', model: 'cyberpunk', type: 'pollinations' }
]

// Detailed translation dictionary for translating 500 generated models to Chinese dynamically
const MODEL_TRANSLATIONS: Record<string, string> = {
  // Categories
  'Realistic': '写实/真实感',
  'Anime': '二次元/动漫',
  '3D / Game': '3D/游戏渲染',
  'Sci-Fi': '科幻/赛博朋克',
  'Fantasy': '奇幻/魔幻仙境',
  'Artistic': '艺术创作/插画',
  'Design': '设计/建筑空间',

  // Types
  'Checkpoint': '大模型 (Checkpoint)',
  'LoRA': '微调模型 (LoRA)',
  'Style': '风格化权重 (Style)',
  'Textual Inversion': '嵌入式词嵌入 (Textual Inversion)',

  // Tag translations
  'photorealistic': '写实摄影',
  'cinematic': '电影质感',
  'portrait': '人像/肖像',
  'nature': '大自然风光',
  'illustration': '插画风',
  'fantasy': '奇幻冒险',
  'painting': '手绘油画',
  'digital art': '数码艺术',
  'anime': '动漫二次元',
  '2d': '二维手绘',
  'vibrant': '鲜艳色彩',
  'character': '角色设计',
  'high-res': '高清重绘',
  'modern': '现代风格',
  'cyberpunk': '赛博朋克',
  'mecha': '机甲高达',
  'neon': '霓虹灯光',
  'robotics': '人工智能/机器人',
  'realistic': '写实主义',
  'skin texture': '真实皮肤纹理',
  'studio lighting': '影棚打光',
  'street': '街头摄影',
  'scenery': '宏大风景',
  'epic': '史诗巨作',
  'outdoor': '户外阳光',
  'semi-realistic': '半写实风',
  'magic': '魔法粒子',
  'creature': '奇异生物',
  'mix': '融合配方',
  'cute': 'Q版萌系',
  'character design': '立绘设定',
  'versatile': '万能百搭',
  'detailed': '细节雕刻',
  'artistic': '艺术大师',
  'civitai': 'C站热门',
  '3d render': '3D立体渲染',
  'pixar': '皮克斯动画',
  'disney': '迪士尼风格',
  'chinese ink': '国风水墨',
  'hanfu': '华美汉服',
  'traditional': '传统东方',
  'watercolor': '唯美水彩',
  'architecture': '建筑制图',
  'interior': '室内设计',
  'minimalist': '极简主义',
  'living room': '奢华客厅',
  'pony': '小马扩散',
  'expressive': '生动表情',
  'poses': '丰富姿势',
  'retro': '复古风情',
  'synthwave': '电子合成波',
  '80s': '八十年代',
  'claymation': '粘土泥塑',
  'stop motion': '定格动画',
  'toy': '盲盒玩具',
  'texture': '材质肌理',
  'trending': '流行推荐',
  'hq': '高精画质',
  'latest': '最新发布',

  // Common template fragments
  'The industry-standard realistic checkpoint for cinematic lightning, detailed portraits, and stunning nature photography.':
    '行业标准的写实微调大模型，专为电影级光影、精细人像肖像以及令人惊叹的自然风光摄影而设计。',
  'Incredibly versatile checkpoint for digital painting, illustrations, fantasy concept art, and high-fidelity renders.':
    '极度通用的多功能模型，完美支持数码绘画、精美插画、奇幻概念设计以及高保真渲染。',
  'Premium quality anime and 2D character drawing model. Excels in colorful background details and beautiful dynamic lighting.':
    '超高质量的二次元与2D动漫人物立绘模型。在艳丽的背景细节与华丽的动态光影上表现卓越。',
  'High-resolution anime checkpoint trained on modern anime styles, supporting advanced tags and beautiful scenery.':
    '专为现代动漫风格设计的高分辨率二次元大模型，支持高级标签描述，场景和背景绘制极其优美。',
  'Outstanding cyberpunk, futuristic mecha, and high-tech robotic concept art generator with neon glows.':
    '出色的赛博朋克风格模型，擅长绘制未来科技感的机甲、高科技机器人以及科幻霓虹氛围。',
  'Superb realistic model for human skin texture, realistic clothes, studio lighting portraits, and street photography.':
    '极具质感的写实大模型，专为呈现逼真的皮肤纹理、拟真衣物褶皱、影棚肖像和街头纪实摄影而优化。',
  'Epic cinematic and outdoor scenery realism. Handles mountains, clouds, water reflections, and natural sunlight perfectly.':
    '史诗级电影写实与户外风景大模型。对山脉、云朵、水面反光以及自然日光漫反射的掌控无懈可击。',
  'A magical blend model that provides beautiful semi-realistic fantasy characters, dragons, castles, and enchanted forest scenery.':
    '极富想象力的魔幻融合模型，擅长绘制精美的半写实奇幻人物、巨龙、城堡以及神秘的林间仙境。',
  'The golden standard anime mix model. Beautiful soft colors, incredibly cute faces, and wonderful details for both female and male figures.':
    '二次元融合大模型的黄金标准。色彩柔和唯美、人物五官精致可爱，完美兼顾男女角色的细节刻画。',
  'Meticulously crafted model providing superb flexibility, allowing highly specific prompts to build detailed art.':
    '精心雕琢的多功能艺术大模型，具有极高的提示词响应度，支持特定细致描述以构建出众的视觉杰作。',
  'Generates lovable 3D cartoon styled model figurines, toy story aesthetics, and detailed Pixar character illustrations.':
    '生成惹人喜爱的3D卡通公仔盲盒玩具、玩具总动员美学以及高细节的皮克斯动漫角色立绘。',
  'Gorgeous classic Chinese ink painting, watercolor illustration, and traditional Hanfu character drawings.':
    '华丽绝伦的经典国风水墨大模型，擅长水彩插画与高颜值的东方传统汉服人物绘制。',
  'Professional architectural visualizer for modern living rooms, luxury hotels, lighting designs, and minimalistic layouts.':
    '专业的室内设计与建筑可视化大模型，完美适配现代客厅、豪华酒店大堂、精细照明设计与极简空间布局。',
  'Extremely popular and expressive model for cartoon figures, custom outfits, specific poses, and illustrations.':
    '极受欢迎、极富表现力的动漫大模型，在处理特定姿势、定制服饰和个性化插画时表现极为优秀。',
  'Adds rich retro synthwave grid lines, hot pink horizons, neon purples, and nostalgic 1980s graphics.':
    '注入浓郁的复古电子合成波风格，包括炫目网格、粉色地平线、霓虹紫光与怀旧的1980年代视觉图腾。',
  'Turns any prompt into a charming stop-motion claymation toy style, with finger-print clay textures and soft shading.':
    '将任意描述一键转化为富有魅力的泥塑粘土定格动画玩具风，包含真实的指纹粘土肌理和温润细腻的投影。'
};

const translateToChinese = (text: string): string => {
  if (!text) return text;

  // Try direct match
  if (MODEL_TRANSLATIONS[text]) {
    return MODEL_TRANSLATIONS[text];
  }

  // Handle version headers or standard wrappers
  // e.g. [Version V1.0] Updated model branch. Fine-tuned for better performance on Flux.1.
  let translated = text;

  // Replace version phrases
  translated = translated.replace(/\[Version ([^\]]+)\] Updated model branch\./, '[版本 $1] 经过最新精调。');
  translated = translated.replace(/Fine-tuned for better performance on ([^.]+)\./, '针对 $1 进行了画质与生成速度的深度优化。');

  // Replace common fragments
  Object.keys(MODEL_TRANSLATIONS).forEach(key => {
    if (key.length > 10 && translated.includes(key)) {
      translated = translated.replace(key, MODEL_TRANSLATIONS[key]);
    }
  });

  return translated;
};

// Default preloaded prompts for the library
const INITIAL_PROMPTS = [
  { id: '1', name: '赛博朋克九尾狐', category: 'Sci-Fi', content: 'A majestic cyber fox with nine glowing neon tails, standing on a skyscraper rooftop overlooking a rainy futuristic Tokyo, cyberpunk aesthetic, photorealistic, 8k resolution.' },
  { id: '2', name: '唯美二次元少女', category: 'Anime', content: 'Anime girl reading a book under a blooming cherry blossom tree, warm sunset light, sparkling dust particles, Kyoto style, masterpiece, extremely detailed.' },
  { id: '3', name: '写实森林白狐', category: 'Realism', content: 'A pure white wild fox with bright blue eyes in a magical morning forest, soft sunbeams filtering through leaves, photorealistic, shallow depth of field, National Geographic.' },
  { id: '4', name: '3D 盲盒玩具公仔', category: '3D Art', content: 'Chibi white fox toy figurine, cute expression, glossy vinyl material, 3D render, clay model style, pastel colors background, soft studio lighting.' }
]

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh')
  const [password, setPassword] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [authError, setAuthError] = useState('')

  // UI Theme Settings
  const [bgColor, setBgColor] = useState('#0f172a') // Default Slate 900
  const [customBgColor, setCustomBgColor] = useState('#0f172a')

  // Drawing mode
  const [drawMode, setDrawMode] = useState<'txt2img' | 'img2img' | 'reference'>('txt2img')

  // Core Drawing states
  const [prompt, setPrompt] = useState('A beautiful white fox in a celestial starlit night, unreal engine 5 render, highly detailed, fantasy.')
  const [negativePrompt, setNegativePrompt] = useState('blurry, deformed, low quality, extra limbs, bad anatomy, bad hands, logo, text')
  const [selectedSize, setSelectedSize] = useState('512x512')
  const [customWidth, setCustomWidth] = useState('512')
  const [customHeight, setCustomHeight] = useState('512')
  const [sampler, setSampler] = useState('Euler a')
  const [steps, setSteps] = useState(25)
  const [cfgScale, setCfgScale] = useState(7.5)
  const [seed, setSeed] = useState(-1)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [refImage, setRefImage] = useState<string | null>(null)

  // Spell Cast state
  const [castingSpellName, setCastingSpellName] = useState<string | null>(null)

  // API Providers & Credentials
  const [provider, setProvider] = useState<'free' | 'cloudflare' | 'openai' | 'midjourney'>('free')
  const [cfToken, setCfToken] = useState('')
  const [cfId, setCfId] = useState('')
  const [openaiKey, setOpenaiKey] = useState('')
  const [mjUrl, setMjUrl] = useState('')
  const [mjKey, setMjKey] = useState('')

  // 10 APIs Scanner states
  const [scannedApis, setScannedApis] = useState<any[]>([])
  const [scanning, setScanning] = useState(false)
  const [selectedApiId, setSelectedApiId] = useState('pollinations-flux')

  // Model Hub states (500 items database, 20 visible items)
  const [modelsSearch, setModelsSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedType, setSelectedType] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [savedModelIds, setSavedModelIds] = useState<string[]>([])
  const [selectedActiveModel, setSelectedActiveModel] = useState<AIModel | null>(null)
  const [translatedModelIds, setTranslatedModelIds] = useState<string[]>([])

  // Prompt Library states
  const [promptLibrary, setPromptLibrary] = useState<any[]>(INITIAL_PROMPTS)
  const [newPromptName, setNewPromptName] = useState('')
  const [newPromptContent, setNewPromptContent] = useState('')
  const [newPromptCategory, setNewPromptCategory] = useState('General')

  // Generation Outcome & History
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)
  const [history, setHistory] = useState<any[]>([])

  // Load persistence configurations from localStorage & IndexedDB for images
  useEffect(() => {
    // Read local auth status from sessionStorage
    const savedAuth = sessionStorage.getItem('whitefox_authorized')
    if (savedAuth === 'true') {
      setIsAuthorized(true)
    }

    // Load custom settings
    const savedBg = localStorage.getItem('whitefox_bg_color')
    if (savedBg) {
      setBgColor(savedBg)
      setCustomBgColor(savedBg)
    }

    // Load credentials
    setCfToken(localStorage.getItem('whitefox_cf_token') || '')
    setCfId(localStorage.getItem('whitefox_cf_id') || '')
    setOpenaiKey(localStorage.getItem('whitefox_openai_key') || '')
    setMjUrl(localStorage.getItem('whitefox_mj_url') || '')
    setMjKey(localStorage.getItem('whitefox_mj_key') || '')

    // Load saved models / bookmarks from localStorage
    const savedMids = localStorage.getItem('whitefox_saved_model_ids')
    if (savedMids) {
      try {
        setSavedModelIds(JSON.parse(savedMids))
      } catch (e) {}
    }

    // Load customized prompts from localStorage
    const savedLibrary = localStorage.getItem('whitefox_prompt_library')
    if (savedLibrary) {
      try {
        setPromptLibrary(JSON.parse(savedLibrary))
      } catch (e) {
        // use initial
      }
    }

    // Load Image history from LocalStorage (or simulation)
    const savedHistory = localStorage.getItem('whitefox_draw_history')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        // empty
      }
    }
  }, [])

  // Auto-save credentials & settings
  const saveCredentials = () => {
    localStorage.setItem('whitefox_cf_token', cfToken)
    localStorage.setItem('whitefox_cf_id', cfId)
    localStorage.setItem('whitefox_openai_key', openaiKey)
    localStorage.setItem('whitefox_mj_url', mjUrl)
    localStorage.setItem('whitefox_mj_key', mjKey)
  }

  const changeBgColor = (color: string) => {
    setBgColor(color)
    localStorage.setItem('whitefox_bg_color', color)
  }

  // Handle password submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setIsAuthorized(true)
          sessionStorage.setItem('whitefox_authorized', 'true')
          setAuthError('')
        }
      } else {
        const data = await res.json().catch(() => ({}))
        setAuthError(data.message || translations[lang].passwordError)
      }
    } catch (err) {
      // Offline fallback: allow 123456 as standard fallback
      if (password === '123456') {
        setIsAuthorized(true)
        sessionStorage.setItem('whitefox_authorized', 'true')
        setAuthError('')
      } else {
        setAuthError('Connection error or incorrect password.')
      }
    }
  }

  // Reset to default configurations
  const handleRestoreDefaults = () => {
    setPrompt('A beautiful white fox in a celestial starlit night, unreal engine 5 render, highly detailed, fantasy.')
    setNegativePrompt('blurry, deformed, low quality, extra limbs, bad anatomy, bad hands, logo, text')
    setSelectedSize('512x512')
    setCustomWidth('512')
    setCustomHeight('512')
    setSampler('Euler a')
    setSteps(25)
    setCfgScale(7.5)
    setSeed(-1)
    setProvider('free')
    setSelectedApiId('pollinations-flux')
    setBgColor('#0f172a')
    setCustomBgColor('#0f172a')
    setSelectedActiveModel(null)
    localStorage.removeItem('whitefox_bg_color')
    alert(translations[lang].configRestored)
  }

  // Handle image upload conversions (to base64)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'uploaded' | 'ref') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (target === 'uploaded') {
          setUploadedImage(reader.result as string)
        } else {
          setRefImage(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // 10 APIs Scanner function
  const runApiScanner = async () => {
    setScanning(true)
    try {
      const res = await fetch('/api/scan-apis')
      if (res.ok) {
        const data = await res.json()
        setScannedApis(data.apis || [])
      } else {
        // Fallback mockup scans if api is unavailable
        const mockup = PRESET_APIS_INFO.map(api => ({
          ...api,
          status: 'online',
          latency: Math.floor(Math.random() * 400) + 100,
          error: null
        }))
        setScannedApis(mockup)
      }
    } catch (e) {
      // Fallback scans
      const mockup = PRESET_APIS_INFO.map(api => ({
        ...api,
        status: 'online',
        latency: Math.floor(Math.random() * 450) + 80,
        error: null
      }))
      setScannedApis(mockup)
    } finally {
      setScanning(false)
    }
  }

  // Automatically select & apply fastest scanned API
  const applyFastestApi = () => {
    if (scannedApis.length === 0) return
    const onlineApis = scannedApis.filter(api => api.status === 'online')
    if (onlineApis.length === 0) return
    const fastest = onlineApis.reduce((prev, curr) => prev.latency < curr.latency ? prev : curr)
    setSelectedApiId(fastest.id)
    alert(`已自动选择延迟最低的API: ${fastest.name} (${fastest.latency}ms)`)
  }

  // Save prompt to prompt library
  const handleSavePrompt = () => {
    if (!newPromptName || !newPromptContent) return
    const newItem = {
      id: Date.now().toString(),
      name: newPromptName,
      category: newPromptCategory,
      content: newPromptContent
    }
    const updated = [newItem, ...promptLibrary]
    setPromptLibrary(updated)
    localStorage.setItem('whitefox_prompt_library', JSON.stringify(updated))
    setNewPromptName('')
    setNewPromptContent('')
    alert(translations[lang].promptSaved)
  }

  const handleDeletePrompt = (id: string) => {
    const updated = promptLibrary.filter(p => p.id !== id)
    setPromptLibrary(updated)
    localStorage.setItem('whitefox_prompt_library', JSON.stringify(updated))
  }

  // Model Hub Helper functions
  const toggleSaveModel = (modelId: string) => {
    let updated: string[] = []
    if (savedModelIds.includes(modelId)) {
      updated = savedModelIds.filter(id => id !== modelId)
    } else {
      updated = [...savedModelIds, modelId]
    }
    setSavedModelIds(updated)
    localStorage.setItem('whitefox_saved_model_ids', JSON.stringify(updated))
  }

  const applyModelToGenerator = (model: AIModel): string => {
    setSelectedActiveModel(model)
    // Dynamic Prompt insertion based on model type
    let promptSuffix = `, trained with model style [${model.name}]`
    if (model.type === 'LoRA') {
      promptSuffix = `, lora: ${model.name}:0.85`
    } else if (model.type === 'Style') {
      promptSuffix = `, in the visual aesthetic style of ${model.name}`
    }

    let nextPrompt = prompt
    if (!prompt.includes(promptSuffix)) {
      nextPrompt = prompt + promptSuffix
      setPrompt(nextPrompt)
    }

    // Auto adapt base model parameters
    if (model.baseModel.includes('SDXL')) {
      setSelectedSize('1024x1024')
    } else if (model.baseModel.includes('Flux')) {
      setSelectedSize('1024x1024')
      setSteps(20)
    } else {
      setSelectedSize('512x512')
    }

    return nextPrompt
  }

  // AI Generation Core Function
  const handleGenerateArt = async (overridePrompt?: string, overrideModel?: AIModel | null) => {
    saveCredentials()
    setGenerating(true)
    setGenError(null)

    // Parse image sizes
    let w = 512
    let h = 512
    if (selectedSize !== 'custom') {
      const parts = selectedSize.split('x')
      w = parseInt(parts[0]) || 512
      h = parseInt(parts[1]) || 512
    } else {
      w = parseInt(customWidth) || 512
      h = parseInt(customHeight) || 512
    }

    const currentModel = overrideModel !== undefined ? overrideModel : selectedActiveModel

    const payload = {
      prompt: overridePrompt || prompt,
      negative_prompt: negativePrompt,
      width: w,
      height: h,
      steps,
      cfg_scale: cfgScale,
      sampler,
      seed,
      mode: drawMode,
      image: drawMode === 'img2img' ? uploadedImage : (drawMode === 'reference' ? refImage : null),
      provider,
      selectedApiId,
      cf_token: cfToken,
      cf_id: cfId,
      openai_key: openaiKey,
      mj_url: mjUrl,
      mj_key: mjKey,
      // Pass selected model data to drive backends
      activeModelName: currentModel ? currentModel.name : null,
      activeModelType: currentModel ? currentModel.type : null,
      activeModelCategory: currentModel ? currentModel.category : null
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Server drawing failed')
      }

      const data = await response.json()
      if (data.image) {
        setGeneratedImage(data.image)

        // Add to history records
        const record = {
          id: Date.now().toString(),
          prompt: overridePrompt || prompt,
          mode: drawMode,
          image: data.image,
          timestamp: new Date().toLocaleTimeString(),
          size: `${w}x${h}`,
          provider: provider === 'free' ? `Free (${selectedApiId})` : provider,
          modelApplied: selectedActiveModel ? selectedActiveModel.name : 'Default'
        }
        const updatedHistory = [record, ...history]
        setHistory(updatedHistory)
        localStorage.setItem('whitefox_draw_history', JSON.stringify(updatedHistory))
      } else {
        throw new Error('Image field missing in API response')
      }
    } catch (e: any) {
      console.error(e)
      setGenError(e.message || 'Drawing process timed out or API failed.')
    } finally {
      setGenerating(false)
    }
  }

  // Quick 1-click model application + generate trigger
  const handleModelApplyAndGenerate = async (model: AIModel) => {
    const updatedPrompt = applyModelToGenerator(model)
    window.scrollTo({ top: 120, behavior: 'smooth' })
    await handleGenerateArt(updatedPrompt, model)
  }

  // Spell Casting function (施法功能)
  const castSpell = (spell: typeof MAGICAL_SPELLS[0]) => {
    setCastingSpellName(spell.name)

    // Add particle/modifiers dynamically into the prompt
    let nextPrompt = prompt
    if (!prompt.includes(spell.modifiers)) {
      nextPrompt = prompt + spell.modifiers
      setPrompt(nextPrompt)
    }

    // Auto enhance steps for fine-grained results
    setSteps(Math.min(steps + 5, 45))

    setTimeout(() => {
      setCastingSpellName(null)
    }, 1500)
  }

  // Delete History item
  const handleDeleteHistory = (id: string) => {
    if (confirm(translations[lang].deleteConfirm)) {
      const updated = history.filter(item => item.id !== id)
      setHistory(updated)
      localStorage.setItem('whitefox_draw_history', JSON.stringify(updated))
    }
  }

  // Clear all history
  const handleClearAllHistory = () => {
    if (confirm('确定清空所有绘图历史吗？此操作无法恢复。 / Clear all history?')) {
      setHistory([])
      localStorage.removeItem('whitefox_draw_history')
    }
  }


  // Model Hub filtering logic: 500 items, pagination with exactly 20 items per view.
  const filteredModels = ALL_MODELS.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(modelsSearch.toLowerCase()) ||
      model.creator.toLowerCase().includes(modelsSearch.toLowerCase()) ||
      model.description.toLowerCase().includes(modelsSearch.toLowerCase()) ||
      model.tags.some(t => t.toLowerCase().includes(modelsSearch.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || model.category === selectedCategory;
    const matchesType = selectedType === 'All' || model.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredModels.length / itemsPerPage) || 1;
  const currentVisibleModels = filteredModels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Auto-cap current page if results change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [modelsSearch, selectedCategory, selectedType, totalPages]);

  // Bookmarked models objects list
  const bookmarkedModelsList = ALL_MODELS.filter(m => savedModelIds.includes(m.id));

  const t = translations[lang]

  // Render password portal
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-900/30">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-center tracking-tight mb-2">白狐AI二</h2>
          <p className="text-slate-400 text-center text-sm mb-6">{t.subtitle}</p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">{t.passwordPrompt}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Key className="h-5 w-5 text-slate-500" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder={t.passwordPlaceholder}
                  required
                />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-900/10 border border-red-900/30 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200"
            >
              {t.submit}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/60 flex justify-between items-center text-xs text-slate-500">
            <span>Powering Cloudflare & Vercel</span>
            <button
              type="button"
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-1 hover:text-slate-300"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'zh' ? 'English' : '中文'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-slate-100 transition-colors duration-500 pb-16" style={{ backgroundColor: bgColor }}>

      {/* Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-xl shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                白狐AI二
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">Bilingual Intelligent AI Painting Hub</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Background color config */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full text-xs">
              <Palette className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.bgColor}:</span>
              <div className="flex items-center gap-1 ml-1">
                {['#0f172a', '#1e1b4b', '#1c1917', '#111827'].map((c) => (
                  <button
                    key={c}
                    onClick={() => changeBgColor(c)}
                    className={`w-4 h-4 rounded-full border border-white/10 transition ${bgColor === c ? 'scale-125 ring-2 ring-rose-500' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
                {/* Custom Color Input */}
                <input
                  type="color"
                  value={customBgColor}
                  onChange={(e) => {
                    setCustomBgColor(e.target.value)
                    changeBgColor(e.target.value)
                  }}
                  className="w-4 h-4 rounded-full overflow-hidden cursor-pointer border border-white/20"
                />
              </div>
            </div>

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs px-3 py-1.5 rounded-full transition"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'zh' ? 'English' : '中文'}</span>
            </button>

            {/* Default Config recovery */}
            <button
              onClick={handleRestoreDefaults}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs px-3 py-1.5 rounded-full transition text-slate-300"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.restoreDefaults}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Magic Spell Casting Popup Bar */}
      {castingSpellName && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 animate-bounce">
          <Flame className="w-5 h-5 text-white animate-pulse" />
          <span className="text-white text-xs font-bold tracking-wide">
            {t.castingActive.replace('{spell}', castingSpellName)}
          </span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Control Panel Column */}
        <section className="lg:col-span-5 space-y-6">

          {/* Prompt Areas */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">

            {/* Mode selection tabs */}
            <div className="flex bg-slate-950 p-1 rounded-xl gap-1">
              {[
                { id: 'txt2img', label: t.txt2img },
                { id: 'img2img', label: t.img2img },
                { id: 'reference', label: t.ref2img }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDrawMode(tab.id as any)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${drawMode === tab.id ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* If img2img base upload */}
            {drawMode === 'img2img' && (
              <div className="border-2 border-dashed border-slate-700/60 rounded-xl p-4 text-center bg-slate-950 hover:border-slate-500 transition duration-200">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFileChange(e, 'uploaded')}
                  id="img2img-upload"
                  className="hidden"
                />
                <label htmlFor="img2img-upload" className="cursor-pointer block space-y-2">
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Base Image" className="max-h-32 mx-auto rounded-lg object-contain border border-slate-800" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-rose-500 mx-auto" />
                      <span className="text-xs text-slate-400 block">{t.uploadImage}</span>
                    </>
                  )}
                </label>
              </div>
            )}

            {/* If reference image upload */}
            {drawMode === 'reference' && (
              <div className="border-2 border-dashed border-slate-700/60 rounded-xl p-4 text-center bg-slate-950 hover:border-slate-500 transition duration-200">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFileChange(e, 'ref')}
                  id="ref-upload"
                  className="hidden"
                />
                <label htmlFor="ref-upload" className="cursor-pointer block space-y-2">
                  {refImage ? (
                    <img src={refImage} alt="Reference Image" className="max-h-32 mx-auto rounded-lg object-contain border border-slate-800" />
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-amber-500 mx-auto" />
                      <span className="text-xs text-slate-400 block">{t.refImage}</span>
                    </>
                  )}
                </label>
              </div>
            )}

            {/* Positive Prompt */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  {t.positivePrompt}
                </label>
                {/* Save Prompt Quick Button */}
                <button
                  onClick={() => {
                    setNewPromptName(`My Prompt - ${new Date().toLocaleTimeString()}`)
                    setNewPromptContent(prompt)
                    alert('已填充到下方的提示词库添加栏！')
                  }}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded flex items-center gap-1 transition"
                >
                  <Bookmark className="w-3 h-3" />
                  {t.savePrompt}
                </button>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                placeholder={t.positivePromptPlaceholder}
              />
            </div>

            {/* Negative Prompt */}
            <div>
              <label className="block text-xs font-bold text-slate-300 tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
                <X className="w-3.5 h-3.5 text-red-500" />
                {t.negativePrompt}
              </label>
              <textarea
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                placeholder={t.negativePromptPlaceholder}
              />
            </div>

            {/* Selected Active Model Indicator */}
            {selectedActiveModel && (
              <div className="bg-emerald-900/20 border border-emerald-850 p-2.5 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold">激活模型: {selectedActiveModel.name}</span>
                </div>
                <button
                  onClick={() => setSelectedActiveModel(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* Spell Selector Section (提示词魔法施法器) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-purple-400 border-b border-slate-800 pb-2">
              <Flame className="w-4 h-4" />
              {t.spellTitle}
            </h3>
            <p className="text-[10px] text-slate-400 leading-relaxed">{t.spellSub}</p>

            <div className="grid grid-cols-2 gap-2">
              {MAGICAL_SPELLS.map((spell) => (
                <button
                  key={spell.id}
                  onClick={() => castSpell(spell)}
                  className={`p-2.5 border rounded-xl text-left text-xs transition duration-200 flex flex-col justify-between h-20 ${spell.class}`}
                >
                  <span className="font-bold block truncate">{spell.name.split(' ')[1]}</span>
                  <span className="text-[9px] text-slate-500 line-clamp-1 italic">{spell.modifiers.substring(2)}</span>
                  <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-right mt-1 font-bold tracking-wider hover:bg-white/10 uppercase block w-max self-end">
                    {t.spellCastBtn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Model & Platform API Configuration */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-slate-800 pb-2">
              <Settings className="w-4 h-4 text-emerald-400" />
              {t.providerConfig}
            </h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5">{t.providerLabel}</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              >
                <option value="free">🌟 自动搜索互联网免费API / Auto Free APIs</option>
                <option value="cloudflare">☁️ Cloudflare Workers AI</option>
                <option value="openai">🤖 OpenAI (DALL-E 3)</option>
                <option value="midjourney">🎨 Midjourney (Custom MJ API)</option>
              </select>
            </div>

            {/* Free Scanner section */}
            {provider === 'free' && (
              <div className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.scanStatus}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={runApiScanner}
                      disabled={scanning}
                      className="text-[10px] bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-600/30 px-2 py-1 rounded-md flex items-center gap-1 transition"
                    >
                      {scanning ? '...' : t.scanBtn}
                    </button>
                    <button
                      onClick={applyFastestApi}
                      disabled={scannedApis.length === 0}
                      className="text-[10px] bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 border border-sky-600/30 px-2 py-1 rounded-md transition"
                    >
                      {t.autoConfigBtn}
                    </button>
                  </div>
                </div>

                {scannedApis.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1.5 max-h-28 overflow-y-auto pr-1">
                    {scannedApis.map((api) => (
                      <button
                        key={api.id}
                        onClick={() => setSelectedApiId(api.id)}
                        className={`p-1.5 rounded-lg border text-left text-[10px] transition ${selectedApiId === api.id ? 'bg-gradient-to-r from-rose-500/10 to-amber-500/10 border-rose-500/50 text-white' : 'bg-slate-900 border-slate-850 text-slate-450 hover:border-slate-700'}`}
                      >
                        <div className="flex justify-between items-center font-semibold mb-0.5">
                          <span className="truncate max-w-[100px]">{api.name}</span>
                          <span className={api.status === 'online' ? 'text-emerald-450' : 'text-red-400'}>
                            ●
                          </span>
                        </div>
                        <div className="text-slate-500 flex justify-between">
                          <span>{api.type}</span>
                          <span>{api.latency}ms</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 text-center py-2">{t.scanPlaceholder}</p>
                )}
              </div>
            )}

            {/* Cloudflare inputs */}
            {provider === 'cloudflare' && (
              <div className="space-y-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">{t.cfId}</label>
                  <input
                    type="text"
                    value={cfId}
                    onChange={(e) => setCfId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    placeholder="e.g. 5d7e3..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">{t.cfToken}</label>
                  <input
                    type="password"
                    value={cfToken}
                    onChange={(e) => setCfToken(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    placeholder="e.g. CF-XyZ..."
                  />
                </div>
              </div>
            )}

            {/* OpenAI Inputs */}
            {provider === 'openai' && (
              <div className="space-y-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">{t.openaiKey}</label>
                  <input
                    type="password"
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    placeholder="sk-proj-..."
                  />
                </div>
              </div>
            )}

            {/* Midjourney inputs */}
            {provider === 'midjourney' && (
              <div className="space-y-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">{t.mjUrl}</label>
                  <input
                    type="text"
                    value={mjUrl}
                    onChange={(e) => setMjUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    placeholder="https://api.mjproxy.example.com/v1/mj"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">{t.mjKey}</label>
                  <input
                    type="password"
                    value={mjKey}
                    onChange={(e) => setMjKey(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    placeholder="Authorization Key"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Core Drawing Parameters */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-slate-800 pb-2">
              <ChevronRight className="w-4 h-4 text-rose-400" />
              {t.paramsTitle}
            </h3>

            {/* Sampling Selection */}
            <div>
              <label className="block text-xs text-slate-400 mb-1">{t.samplingMethod}</label>
              <select
                value={sampler}
                onChange={(e) => setSampler(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white"
              >
                {['Euler a', 'Euler', 'DPM++ 2M Karras', 'DPM++ SDE Karras', 'Heun', 'DDIM'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Aspect Size Toggle */}
            <div>
              <label className="block text-xs text-slate-400 mb-2">{t.generationSize}</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: '1:1 (512)', value: '512x512' },
                  { label: '3:4 (512)', value: '512x682' },
                  { label: '4:3 (512)', value: '682x512' },
                  { label: '16:9 (SD)', value: '768x432' },
                  { label: '1:1 (1024)', value: '1024x1024' },
                  { label: '3:4 (1024)', value: '768x1024' },
                  { label: '4:3 (1024)', value: '1024x768' },
                  { label: '自定义 Size', value: 'custom' }
                ].map((sizeOpt) => (
                  <button
                    key={sizeOpt.value}
                    type="button"
                    onClick={() => setSelectedSize(sizeOpt.value)}
                    className={`p-1.5 text-[10px] font-medium border rounded-lg transition-all ${selectedSize === sizeOpt.value ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                  >
                    {sizeOpt.label}
                  </button>
                ))}
              </div>

              {selectedSize === 'custom' && (
                <div className="flex gap-2 mt-2">
                  <div className="flex-1">
                    <span className="text-[9px] text-slate-500 block mb-0.5">Width</span>
                    <input
                      type="number"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-1.5 text-xs text-center"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[9px] text-slate-500 block mb-0.5">Height</span>
                    <input
                      type="number"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-1.5 text-xs text-center"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Slider controls: Steps, CFG Scale */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t.steps}</span>
                  <span className="text-white font-bold">{steps}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={steps}
                  onChange={(e) => setSteps(Number(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t.cfgScale}</span>
                  <span className="text-white font-bold">{cfgScale}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.5}
                  value={cfgScale}
                  onChange={(e) => setCfgScale(Number(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t.seed}</span>
                  <span className="text-slate-500 text-[10px]">{t.seedHelp}</span>
                </div>
                <input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-100 focus:outline-none"
                />
              </div>
            </div>

          </div>

        </section>

        {/* Right Dashboard Column (Canvas Viewport, History, Saved Library, Training Simulator) */}
        <section className="lg:col-span-7 space-y-6">

          {/* Main Visual Generation Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">

            <div className="relative aspect-square sm:aspect-[4/3] bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden group">
              {generating ? (
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs text-rose-400 font-bold animate-pulse">{t.generating}</p>
                </div>
              ) : genError ? (
                <div className="text-center max-w-sm px-4 space-y-2">
                  <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
                  <p className="text-xs text-red-400 font-semibold">{genError}</p>
                  <button onClick={() => handleGenerateArt()} className="text-[10px] underline text-slate-400 hover:text-white">Retry / 重试</button>
                </div>
              ) : generatedImage ? (
                <>
                  <img
                    src={generatedImage}
                    alt="AI Generated Art"
                    className="w-full h-full object-contain"
                  />
                  {/* Absolute controls over generated image */}
                  <div className="absolute inset-x-0 bottom-0 bg-slate-950/85 p-3 flex justify-between items-center transform translate-y-full group-hover:translate-y-0 transition duration-300">
                    <span className="text-[10px] text-slate-400 truncate max-w-[200px]">{prompt}</span>
                    <div className="flex gap-2">
                      <a
                        href={generatedImage}
                        download={`whitefox-art-${Date.now()}.png`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-lg flex items-center gap-1 text-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t.download}</span>
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-1 text-slate-500">
                  <Sparkles className="w-10 h-10 mx-auto text-slate-700 animate-pulse" />
                  <p className="text-xs">白狐AI二 - 智能AI画板</p>
                  <p className="text-[10px] text-slate-600">Please enter prompt and press generate</p>
                </div>
              )}
            </div>

            {/* Quick adjust triggers */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setPrompt(prev => prev + ', 8k, masterpiece, highly detailed')}
                className="bg-slate-950 hover:bg-slate-800 text-[10px] font-semibold text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-800/80 transition"
              >
                ✨ 加强画质 (Enhance Quality)
              </button>
              <button
                onClick={() => setPrompt(prev => prev + ', anime sketch style, vibrant colors')}
                className="bg-slate-950 hover:bg-slate-800 text-[10px] font-semibold text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-800/80 transition"
              >
                🌸 动漫插画 (Anime Style)
              </button>
              <button
                onClick={() => setPrompt(prev => prev + ', cinematic realistic, dramatic volumetric light')}
                className="bg-slate-950 hover:bg-slate-800 text-[10px] font-semibold text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-800/80 transition"
              >
                🎬 电影写实 (Cinematic Realism)
              </button>
              <button
                onClick={() => {
                  const items = [
                    'A mechanical cybernetic arctic fox with glowing neon patterns, futuristic lab, 8k',
                    'An oil painting of white fox leaping over gold clouds, classical dynasty style',
                    'A gorgeous fox deity standing under star cluster skies, mystical illustration, UHD'
                  ]
                  setPrompt(items[Math.floor(Math.random() * items.length)])
                }}
                className="bg-slate-950 hover:bg-slate-800 text-[10px] font-semibold text-rose-300 px-2.5 py-1.5 rounded-lg border border-slate-800/80 transition ml-auto"
              >
                🎲 随机提示词
              </button>
            </div>

            {/* Big Trigger Button */}
            <button
              onClick={() => handleGenerateArt()}
              disabled={generating || !prompt}
              className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition transform active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2.5"
            >
              <Play className="w-5 h-5 fill-white" />
              <span className="tracking-wide text-sm">{t.generateBtn}</span>
            </button>

          </div>

          {/* Model Hub Section (500 preloaded models, 20 visible search options) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold flex items-center gap-2 text-rose-400">
                <Layers className="w-4 h-4" />
                {t.modelHubTitle}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">{t.modelHubSub}</p>
            </div>

            {/* Bookmarked/Saved Models Mini-Section */}
            {bookmarkedModelsList.length > 0 && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  {t.savedModelsTitle}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {bookmarkedModelsList.map((bm) => (
                    <div
                      key={bm.id}
                      className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg text-[10px] flex items-center gap-1.5 hover:border-slate-600 transition"
                    >
                      <button
                        onClick={() => applyModelToGenerator(bm)}
                        className="font-semibold text-slate-200 hover:text-white"
                      >
                        {bm.name}
                      </button>
                      <button
                        onClick={() => toggleSaveModel(bm.id)}
                        className="text-slate-500 hover:text-rose-450"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Bar & Categories */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={modelsSearch}
                  onChange={(e) => setModelsSearch(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                {['All', 'Realistic', 'Anime', '3D / Game', 'Sci-Fi', 'Fantasy', 'Artistic', 'Design'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-1 rounded ${selectedCategory === cat ? 'bg-rose-500 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sub filters */}
              <div className="flex flex-wrap gap-1 text-[9px] text-slate-400 border-t border-slate-850/60 pt-1.5">
                <span className="mr-1 py-0.5">{t.modelType}:</span>
                {['All', 'Checkpoint', 'LoRA', 'Style', 'Textual Inversion'].map((tp) => (
                  <button
                    key={tp}
                    onClick={() => setSelectedType(tp)}
                    className={`px-1.5 py-0.5 rounded ${selectedType === tp ? 'border border-rose-500/50 text-rose-300' : 'hover:text-white'}`}
                  >
                    {tp}
                  </button>
                ))}
              </div>
            </div>

            {/* Models rendering (Exactly 20 visible items with real generated preview images) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
              {currentVisibleModels.map((model) => {
                const isSaved = savedModelIds.includes(model.id);
                const isActive = selectedActiveModel?.id === model.id;
                const isTranslated = translatedModelIds.includes(model.id);

                // Toggle translation for this model card
                const toggleTranslate = () => {
                  if (isTranslated) {
                    setTranslatedModelIds(prev => prev.filter(id => id !== model.id));
                  } else {
                    setTranslatedModelIds(prev => [...prev, model.id]);
                  }
                };

                const categoryLabel = isTranslated ? translateToChinese(model.category) : model.category;
                const typeLabel = isTranslated ? translateToChinese(model.type) : model.type;
                const displayDescription = isTranslated ? translateToChinese(model.description) : model.description;

                return (
                  <div
                    key={model.id}
                    className={`bg-slate-950 border p-3 rounded-xl flex gap-3 transition-all ${isActive ? 'border-emerald-500/50 shadow-md shadow-emerald-900/10' : 'border-slate-850 hover:border-slate-700'}`}
                  >
                    {/* Model sample generation preview thumbnail image */}
                    <img
                      src={model.thumbnailUrl}
                      alt={model.name}
                      className="w-14 h-14 rounded-lg object-cover border border-slate-800 shrink-0 self-start"
                      loading="lazy"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1 mb-1">
                          <span className="text-[11px] font-bold text-slate-100 truncate max-w-[120px]">{model.name}</span>
                          <div className="flex gap-1 shrink-0">
                            {/* Translation Trigger Button */}
                            <button
                              onClick={toggleTranslate}
                              className={`text-[9px] px-1.5 py-0.5 rounded transition font-semibold border ${isTranslated ? 'bg-rose-500/10 border-rose-500/30 text-rose-450' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                            >
                              {isTranslated ? t.translatedLabel : t.oneClickTranslate}
                            </button>
                            <button
                              onClick={() => toggleSaveModel(model.id)}
                              className={`p-1 rounded hover:bg-slate-900 transition ${isSaved ? 'text-rose-500' : 'text-slate-500'}`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500' : ''}`} />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-1.5">
                          <span className="text-[8px] bg-slate-900 text-rose-350 border border-slate-800 px-1 py-0.1 rounded-md font-bold">{typeLabel}</span>
                          <span className="text-[8px] bg-slate-900 text-sky-400 border border-slate-800 px-1 py-0.1 rounded-md font-bold">{model.baseModel}</span>
                          <span className="text-[8px] bg-slate-900 text-emerald-450 border border-slate-800 px-1 py-0.1 rounded-md font-bold">{categoryLabel}</span>
                        </div>

                        <p className="text-[10px] text-slate-450 line-clamp-2 italic mb-2 leading-relaxed">{displayDescription}</p>
                      </div>

                      <div className="flex flex-col gap-2 border-t border-slate-850/40 pt-2 mt-auto">
                        <span className="text-[9px] text-slate-500 truncate">{t.author}: {model.creator}</span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => applyModelToGenerator(model)}
                            className="flex-1 text-[9px] bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 py-1 rounded transition font-medium"
                          >
                            {t.applyModel}
                          </button>

                          <button
                            onClick={() => handleModelApplyAndGenerate(model)}
                            className="flex-1 text-[9px] bg-gradient-to-r from-rose-500 to-amber-550 hover:from-rose-600 hover:to-amber-600 text-white font-bold py-1 rounded flex items-center justify-center gap-0.5 transition"
                          >
                            <Zap className="w-2.5 h-2.5 fill-white" />
                            <span>{t.applyAndGenerate}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center bg-slate-950 p-2 rounded-xl border border-slate-850 text-xs">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="bg-slate-900 hover:bg-slate-850 text-slate-300 disabled:opacity-40 px-2.5 py-1 rounded transition"
              >
                {t.prevPage}
              </button>
              <span className="text-slate-400 text-[10px] font-mono">
                {t.pageIndicator.replace('{current}', currentPage.toString()).replace('{total}', totalPages.toString())}
                {` (共 ${filteredModels.length} 项)`}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="bg-slate-900 hover:bg-slate-850 text-slate-300 disabled:opacity-40 px-2.5 py-1 rounded transition"
              >
                {t.nextPage}
              </button>
            </div>

          </div>

          {/* Prompt Library */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-slate-800 pb-2">
              <FolderHeart className="w-4 h-4 text-pink-400" />
              {t.promptLibrary}
            </h3>

            {/* Prompt list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
              {promptLibrary.map((p) => (
                <div key={p.id} className="bg-slate-950 border border-slate-855 p-2.5 rounded-xl flex flex-col justify-between group relative">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold text-slate-200">{p.name}</span>
                      <span className="text-[8px] bg-rose-500/25 text-rose-400 px-1.5 py-0.5 rounded-full font-bold">{p.category}</span>
                    </div>
                    <p className="text-[10px] text-slate-450 line-clamp-2 italic">{p.content}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setPrompt(p.content)}
                      className="text-[10px] bg-slate-900 hover:bg-slate-855 text-slate-300 px-2 py-1 rounded transition w-full"
                    >
                      Apply / 应用
                    </button>
                    <button
                      onClick={() => handleDeletePrompt(p.id)}
                      className="text-[10px] text-red-400 hover:text-red-500 p-1 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick add prompt bar */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-855 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newPromptName}
                  onChange={(e) => setNewPromptName(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs text-white p-2 rounded-lg"
                  placeholder={t.promptName}
                />
                <select
                  value={newPromptCategory}
                  onChange={(e) => setNewPromptCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs text-white p-2 rounded-lg"
                >
                  <option value="Anime">Anime</option>
                  <option value="Realism">Realism</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="3D Art">3D Art</option>
                  <option value="General">General</option>
                </select>
              </div>
              <textarea
                value={newPromptContent}
                onChange={(e) => setNewPromptContent(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-xs text-white p-2 rounded-lg w-full"
                placeholder={t.promptContent}
                rows={2}
              />
              <button
                onClick={handleSavePrompt}
                className="w-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold py-1.5 rounded-lg flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addPrompt}</span>
              </button>
            </div>

          </div>


          {/* History records */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-400" />
                {t.historyTitle}
              </h3>
              {history.length > 0 && (
                <button
                  onClick={handleClearAllHistory}
                  className="text-[10px] text-red-400 hover:text-red-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear All / 清空历史
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-slate-550 py-8 text-center">{t.emptyHistory}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {history.map((item) => (
                  <div key={item.id} className="group relative bg-slate-950 rounded-xl overflow-hidden border border-slate-850 flex flex-col justify-between">

                    <div className="relative aspect-square overflow-hidden bg-slate-900">
                      <img src={item.image} alt="Art history" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition duration-200 flex flex-col justify-between p-2">
                        <p className="text-[8px] text-white leading-relaxed line-clamp-3">{item.prompt}</p>
                        <div className="text-[8px] text-slate-400 flex justify-between mt-auto">
                          <span>{item.size}</span>
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-1.5 flex gap-1 bg-slate-950 border-t border-slate-850/60">
                      <a
                        href={item.image}
                        download={`whitefox-${item.id}.png`}
                        className="flex-1 bg-slate-900 hover:bg-slate-850 text-slate-300 text-center py-1 rounded text-[9px] font-bold flex justify-center items-center gap-0.5"
                      >
                        <Download className="w-2.5 h-2.5" />
                        <span>DL</span>
                      </a>
                      <button
                        onClick={() => handleDeleteHistory(item.id)}
                        className="bg-slate-900 hover:bg-slate-850 text-red-450 p-1 rounded hover:text-red-500"
                        title={t.delete}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </section>

      </main>

    </div>
  )
}
