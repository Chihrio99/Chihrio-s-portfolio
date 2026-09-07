# 徐千寻 · 动态个人作品集

视觉交互设计师徐千寻（Chihiro）的个人作品集网站，使用 React、TypeScript 与 Vite 构建。

## 环境要求

- macOS
- Node.js 22 或更高版本
- pnpm 11（项目已固定版本）

## 本地运行与预览

```bash
corepack enable
pnpm install
pnpm run dev
```

`pnpm install` 会自动从 `assets.tar.gz` 还原网站图片，不需要手动解压素材包。

访问 `http://127.0.0.1:5173/`。

## 构建

```bash
pnpm build
pnpm preview
```

## 发布到 GitHub

建议先解压本项目压缩包，再使用 GitHub Desktop 创建并发布仓库。不要把压缩包本身作为一个文件上传到仓库；应上传解压后的项目目录。

仓库不需要包含 `node_modules`、`dist`、`public`、`tmp` 或 `.git`。全部网页素材已合并到 `assets.tar.gz`，其他电脑克隆仓库后运行 `pnpm install` 即可同时恢复依赖和素材。

## 主要文件

- `src/App.tsx`：页面结构、双语文案、项目数据与主要交互流程
- `src/styles.css`：全站视觉、响应式布局与动效参数
- `src/CardNav.tsx`：吸顶导航与四张菜单卡片
- `src/Prism/`：首页 WebGL 光影背景
- `src/ScrollStack/`：四个作品的滚动堆叠效果
- `src/ScrollReveal/`：精选项目标题的逐行滚动模糊揭示
- `src/BlurText/`：顶部标签出现动画
- `src/BorderGlow/`：能力卡片边缘光效

这个轻量发布包已移除临时文件、迁移记录、历史未启用组件和本机部署配置，保留当前网站运行与后续修改所需内容。
