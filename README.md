# 🦊 白狐AI二 (White Fox AI II) - 智能多模态 AI 绘图面板

白狐AI二是一款轻量级、极简设计、功能极其强大的**智能多模态 AI 绘图面板**。项目采用最前沿的前后端分离架构，后端基于高性能 **Hono** 框架，支持**无缝部署到 Cloudflare Pages、Vercel Serverless 平台，并支持本地和 Docker 一键独立容器运行**。

> **面板亮点**：
> - ⚡ **极速加载**：在边缘计算网络（Cloudflare Pages / Vercel Edge Runtime）上秒级冷启动。
> - 🌐 **多模态功能**：支持 **文生图 (Txt2Img)**、**图生图 (Img2Img)**、以及 **参考图生成 (Reference)**。
> - 💡 **10大API自动检索**：无需额外 API Token，系统默认支持自动扫描互联网上 10 个公共、免费的 AI 绘图 API，智能测速并一键自动选用当前延迟最低的可用接口，实现零配置秒画！
> - 🔒 **安全保卫**：自带全功能访问密码验证登录，保护您画板的安全。
> - 🧪 **LoRA 模型训练模拟器**：支持交互式上传数据集 ZIP，高度仿真模型训练流程、实时 Epoch、训练损失 (Loss) 递减动效，让前沿技术体验触手可及。
> - 🇨🇳🇺🇸 **中英文无缝切换**：全界面元素、提示、词库均支持中英文双语一键秒切。
> - 🗃️ **本地画作历史管理器**：生成画作采用本地 IndexedDB/LocalStorage 高效离线持久化，支持单图下载、删除、以及清空，无需额外外置任何昂贵的数据库。
> - 🎨 **主题个性化**：支持自由配置并持久化面板背景颜色。

---

## 🎨 主要功能模块说明

1. **多接口支持 (Multi-Provider)**：
   - **公共免费 API 扫描配置**：系统集成 10 大免费 API（含 Pollinations AI 的 Flux、Turbo、Anime、3D 渲染，HuggingFace 官方大模型，以及 Prodia 等）。通过 **/api/scan-apis** 测速展示，一键配置最快网络！
   - **Cloudflare Workers AI**：绑定您的 CF 账户 ID 与 API Token，立刻调用 CF 强大的 Stable Diffusion XL 极速绘图。
   - **OpenAI DALL-E 3**：输入 sk-proj 密钥即可直接调用 DALL-E 3。
   - **Midjourney**：支持配置外接 Midjourney 兼容代理，传递 Prompt 进行复杂绘图。
2. **绘图参数调节**：
   - 支持设置正面提示词与负面提示词。
   - 包含多种采样方法：`Euler a`, `Euler`, `DPM++ 2M Karras`, `DPM++ SDE Karras`, `Heun`, `DDIM`。
   - 支持切换比例：`1:1`、`3:4`、`4:3`、`16:9` 以及手动输入自定义的宽和高像素。
   - 支持调整迭代步数 (Steps)、提示词相关性 (CFG Scale)、随机种子 (Seed)等主流 AI 绘图平台的核心要素。
3. **提示词库管理**：
   - 内置四款常用风格中文与英文精选提示词（赛步朋克狐、唯美二次元、写实、3D盲盒玩具）。
   - 支持用户直接输入、编辑，并一键添加、保存自定义提示词至本地词库，支持按分类过滤与随时载入和删除。

---

## 🚀 部署流程详解

为了给您提供最顺畅的部署体验，白狐AI二精心设计了统一的后端，使相同的代码不经修改即可自动适应不同的托管环境。

### 选项一：部署到 Cloudflare Pages (推荐，最轻量，完全免费)

通过 Cloudflare 免费部署，不仅可以托管您的前端静态页面，还能在 Workers 边缘执行高性能 API。

#### 部署步骤：
1. **获取代码**：
   将本项目代码上传至您个人的 GitHub 仓库。
2. **在 Cloudflare 创建 Pages 项目**：
   - 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)，进入 **Workers & Pages** -> **Create** -> **Pages** -> **Connect to Git**。
   - 选择您刚上传的 `whitefox-ai-ii` 仓库。
3. **配置构建指令 (Build Settings)**：
   - **Framework preset (框架预设)**：选择 **Vite** 或留空。
   - **Build command (构建命令)**：`npm run build`
   - **Build output directory (构建输出目录)**：`dist`
   - **Node.js version (环境变量)**：可在 Pages 设置中将 Node.js 兼容性设为较新版本（推荐 18 或 20 以上）。
4. **添加环境变量 (Environment Variables)**：
   在 Pages 项目设置的 **Settings** -> **Environment Variables** 中，您可以添加以下变量控制面板参数：
   - `ADMIN_PASSWORD`：画板访问密码，默认为 `123456`。
   - `CF_ACCOUNT_ID`：（可选）Cloudflare 账户 ID，用于后端一键默认读取。
   - `CF_API_TOKEN`：（可选）Cloudflare API Token（包含 Workers AI 权限）。
   - `OPENAI_API_KEY`：（可选）OpenAI 专属 DALL-E 密钥。
5. **部署成功**：
   点击 **Save and Deploy**，Cloudflare 将在几分钟内自动编译好前端，并自动通过目录中 `functions/api/[[route]].js` 文件启动您的 Pages API 接口。

---

### 选项二：部署到 Vercel (一键导入，体验顺滑)

Vercel 拥有绝佳的冷启动优化，结合 Edge Runtime 支持高并发和极佳的响应速度。

#### 部署步骤：
1. **GitHub 导入**：
   登录 [Vercel 官网](https://vercel.com/)，点击 **Add New -> Project**，直接从 GitHub 导入您的画室仓库。
2. **配置环境变量**：
   在项目导入阶段或后期的 Settings -> Environment Variables 中配置如下变量：
   - `ADMIN_PASSWORD`：面板安全访问密码。
   - `CF_ACCOUNT_ID` / `CF_API_TOKEN` / `OPENAI_API_KEY`：您希望预设的平台密钥。
3. **构建与路由规则**：
   Vercel 会自动读取根目录下的 `vercel.json` 规则：
   - 它会将 `/api/*` 请求导向 Edge API 函数 `api/index.js`，其余请求正常提供 Vite 编译好的前端网页。
4. **一键上线**：
   点击 **Deploy**，片刻之后即可获得您的专属访问域名！

---

### 选项三：Docker 容器部署 (自主托管，安全私密)

如果您拥有独立的虚拟主机 (VPS) 或是想要在本地局域网私有化部署，Docker 是最坚固的方案。

#### 部署步骤：
1. **克隆项目并准备环境**：
   ```bash
   git clone <你的仓库地址>
   cd whitefox-ai-ii
   ```
2. **使用 Dockerfile 一键构建镜像**：
   ```bash
   docker build -t whitefox-ai-ii:latest .
   ```
3. **运行 Docker 容器**：
   您可以自定义映射端口（默认容器内监听 3000）并传入环境变量来控制管理：
   ```bash
   docker run -d \
     -p 3000:3000 \
     -e ADMIN_PASSWORD="your-strong-password" \
     -e CF_ACCOUNT_ID="your-cf-id" \
     -e CF_API_TOKEN="your-cf-token" \
     --name whitefox-studio \
     --restart unless-stopped \
     whitefox-ai-ii:latest
   ```
4. **访问服务**：
   打开浏览器访问 `http://your-server-ip:3000` 即可开始创作！

---

### 选项四：普通文件上传部署 & 本地开发

#### 1. 本地快速体验开发
```bash
# 安装依赖
npm install

# 启动前端本地热重载开发服务器
npm run dev

# 启动本地 Hono API 服务端
npm run server
```

#### 2. 上传静态文件托管 (Serverless Api & Static files)
1. 在本地运行 `npm run build`，会在根目录下产生 `dist` 文件夹。
2. 如果您的云端支持静态文件上传部署（例如 Netlify, Cloudflare Pages 手动拖拽，静态服务器），您只需打包 `dist` 文件夹并上传即可。
3. 部署后请确保 API 指向相同的域名，或者在前端环境变量中配置对应 Hono 后端。

---

## 🔑 核心部署参数与高级诀窍 (Tips)

| 环境变量参数 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `ADMIN_PASSWORD` | `123456` | 面板首次登录验证的保护密码（建议生产环境立即修改） |
| `CF_ACCOUNT_ID` | 无 | 您的 Cloudflare 账户 32位 标识符 |
| `CF_API_TOKEN` | 无 | 具备 Workers AI 读写权限的 Cloudflare API 令牌 |
| `OPENAI_API_KEY` | 无 | OpenAI Key，供高级 DALL-E 接口直连 |
| `PORT` | `3000` | Docker 与 Node.js 本地运行时的默认端口 |

### 🌟 关键细节提示：
1. **API 自动备用方案**：当您在前端接口平台选择 "免费 API" 时，系统在后端通过 fetch 代理所有请求，有效解决了前端跨域（CORS）问题。即使个别 HuggingFace 接口处于离线，系统也会秒级且无缝地fallback到 Pollinations API。
2. **极简密码检查**：当发生云端离线或者测试时，如果无法与后端握手，前端内置了对 `123456` 基础离线安全校验的 fallback。
3. **零门槛使用**：即便您没有任何 API Token 或者是没有 Cloudflare 账户，部署完成后直接输入默认密码 `123456` 进入，使用 **免费 API** 的 **Pollinations AI (Flux)**，配合**自定义提示词库**即可获得媲美专业画室的极佳 AI 创作体验！

---

## 🦊 友情鸣谢与开源社区

感谢社区上为我们提供强力、免费边缘渲染支持的各大开放 AI 服务提供商：
- [Hono Web Framework](https://hono.dev/)
- [Pollinations AI](https://pollinations.ai/)
- [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)
- [Vercel](https://vercel.com)

*祝您在 **白狐AI二** 创作出精美的旷世画作！如有任何疑问，欢迎提交 Issue。*
