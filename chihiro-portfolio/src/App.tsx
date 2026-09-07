import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import AccordionGallery from "./AccordionGallery";
import BlurText from "./BlurText/BlurText";
import CardNav from "./CardNav";
import DriftWall from "./DriftWall";
import InfiniteSpiral from "./InfiniteSpiral";
import Prism from "./Prism/Prism";
import ScrollReveal from "./ScrollReveal/ScrollReveal";
import ScrollStack, { ScrollStackItem } from "./ScrollStack/ScrollStack";
import ShinyText from "./ShinyText";
import ShinySweepText from "./ShinySweepText/ShinyText";
import nioWallItems from "./nioWallItems.json";

type Language = "zh" | "en";

const content = {
  zh: {
    nav: ["作品", "经历", "能力", "联系"],
    eyebrow: "视觉交互设计师 · 中国江苏",
    heroOwner: "徐千寻 / CHIHIRO XU 的",
    heroTitle: "作品集",
    intro: "视觉系统 + AI 工作流 · 3 年设计经验 · 以用户为中心 · 以业务为驱动",
    available: "开放合作",
    contactCta: "联系我",
    scroll: "向下探索",
    workKicker: "精选项目 · 2024—2026",
    workTitle: "用视觉\n建立秩序规则，\n用交互\n传递感受体验。",
    workIntro: "从产品体验到品牌视觉，我关注每一次触达是否清晰、克制且令人记住。",
    view: "查看项目",
    projects: [
      ["澳洲司机等级\n全链路升级", "参与产品分析、交互设计、开发评审与项目落地全流程，完成 20+ 个关键视觉页面产出。"],
      ["NIO Power\n品牌视觉落地", "为线上线下触点建立统一视觉语言，覆盖官网、专题页、社交媒体与动态内容。"],
      ["掌上公交app\n体验升级", "聚焦运营项目设计，覆盖用户研究、信息框架与设计体系，并完成运营视觉及 IP 形象制作。"],
      ["今天你发疯了吗\nH5落地", "五天完成的互动叙事 H5，从概念与文案到高保真及动效落地，获得 1000+ 次曝光。"],
    ],
    aboutKicker: "关于我 · 视觉与逻辑的交界",
    aboutTitle: "让复杂变清晰，\n让视觉有温度。",
    aboutText: "数字媒体艺术专业背景，专注 UI、品牌视觉与动态内容。我相信好的设计并不喧哗，它用精准的结构、恰当的情绪和细腻的反馈，自然地引导人与信息相遇。",
    stats: [["50+", "页面优化"], ["1000+", "项目曝光"], ["04", "能力方向"]],
    expKicker: "经历 · 2024—2026",
    expTitle: "在真实业务中，\n持续打磨判断力。",
    experiences: [
      ["滴滴出行科技有限公司", "国际部门 · UI 设计师", "海外营销组件、用户旅程、活动视觉与 AIGC 工作流。", "2026.05—07"],
      ["NIO 蔚来能源", "视觉设计师", "品牌视觉、设计规范、线上线下物料及视频动效。", "2025.09—11"],
      ["福州大学 / 211", "数字媒体艺术专业", "界面设计、三维制作、数字音视频与交互基础。", "EDUCATION"],
    ],
    abilityKicker: "核心能力 · 04",
    abilityTitle: "从洞察到落地，\n保持完整的设计视角。",
    abilities: [["界面与体验", "清晰的信息架构、核心流程与高保真界面。"], ["视觉与品牌", "一致的品牌表达、视觉系统与传播物料。"], ["动效与叙事", "用节奏、反馈与动态内容强化信息感受。"], ["协作与交付", "在产品、研发和运营之间推动方案准确落地。"]],
    contactKicker: "联系 · 开放新的可能",
    contactTitle: "一起创造\n值得记住的体验。",
    contactText: "如果你有一个想法、一份合适的机会，或只是想聊聊设计，欢迎联系我。",
    mail: "发送邮件",
  },
  en: {
    nav: ["Work", "Experience", "Expertise", "Contact"],
    eyebrow: "Visual Interaction Designer · Jiangsu, China",
    heroOwner: "CHIHIRO XU’S",
    heroTitle: "PORTFOLIO",
    intro: "VISUAL SYSTEMS + AI WORKFLOWS · 3 YEARS OF DESIGN EXPERIENCE · USER-CENTERED · BUSINESS-DRIVEN",
    available: "Available for work",
    contactCta: "Contact me",
    scroll: "Scroll to explore",
    workKicker: "Selected work · 2024—2026",
    workTitle: "Building order with visuals.\nCreating feeling through interaction.",
    workIntro: "From product experience to brand expression, I design every touchpoint to feel clear, refined and memorable.",
    view: "View project",
    projects: [
      ["Australia Driver Tier Upgrade", "Contributed across product analysis, interaction design, development review and final delivery, producing 20+ key visual screens."],
      ["NIO Power Visual System", "A unified visual language for digital and physical touchpoints, including web, campaigns, social media and motion."],
      ["Transit Operations & IP Design", "An operations-focused design project spanning user research, information architecture and the design system, including campaign visuals and IP character development."],
      ["Are You Losing It Today?", "An interactive H5 story completed in five days, from concept and copy to high-fidelity design and motion, reaching 1,000+ views."],
    ],
    aboutKicker: "About · Where visual meets logic",
    aboutTitle: "Making complexity clear.\nMaking visuals feel human.",
    aboutText: "With a background in Digital Media Art, I focus on UI, brand visuals and motion. I believe good design does not need to shout. It guides people naturally with precise structure, appropriate emotion and thoughtful feedback.",
    stats: [["50+", "Screens refined"], ["1000+", "Project views"], ["04", "Design strengths"]],
    expKicker: "Experience · 2024—2026",
    expTitle: "Sharpening design judgment\nthrough real business challenges.",
    experiences: [
      ["DiDi Global", "UI Designer · International Team", "Global campaign components, user journeys, visual design and AIGC workflows.", "2026.05—07"],
      ["NIO Power", "Visual Designer", "Brand visuals, design guidelines, digital campaigns and motion content.", "2025.09—11"],
      ["Fuzhou University / 211", "Digital Media Art", "Interface design, 3D production, digital video and interaction fundamentals.", "EDUCATION"],
    ],
    abilityKicker: "Expertise · 04",
    abilityTitle: "A complete design perspective,\nfrom insight to delivery.",
    abilities: [["UX & Interface", "Clear information architecture, core journeys and high-fidelity interfaces."], ["Visual & Brand", "Consistent brand expression, visual systems and campaign assets."], ["Motion & Story", "Using rhythm, feedback and motion to make information felt."], ["Collaboration", "Driving accurate delivery across product, engineering and operations."]],
    contactKicker: "Contact · Open to possibilities",
    contactTitle: "Let’s create something\nworth remembering.",
    contactText: "Have an idea, an opportunity, or simply want to talk about design? I would love to hear from you.",
    mail: "Send an email",
  },
};

function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let width = 0, height = 0, frame = 0, px = .64, py = .38;
    let visible = true, scrolling = false, scrollTimer = 0, lastPaint = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      width = canvas.clientWidth; height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = width * ratio; canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const pointer = (e: PointerEvent) => { px = e.clientX / innerWidth; py = e.clientY / innerHeight; };
    const glow = (x: number, y: number, radius: number, color: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, color); g.addColorStop(.45, color.replace(/([\d.]+)\)$/, (_, a) => `${Number(a) * .28})`)); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, width, height);
    };
    const draw = (time = 0) => {
      if (!visible || scrolling) { frame = 0; return; }
      if (!reduced && time - lastPaint < 32) { frame = requestAnimationFrame(draw); return; }
      lastPaint = time;
      const t = reduced ? 0 : time * .00018;
      const base = ctx.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "#090b0d"); base.addColorStop(.52, "#111519"); base.addColorStop(1, "#050607");
      ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = base; ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";
      glow(width * (.2 + Math.sin(t) * .05), height * .68, Math.max(width, height) * .58, "rgba(91,112,124,.34)");
      glow(width * (.78 + Math.cos(t * .7) * .06), height * (.26 + Math.sin(t) * .06), Math.max(width, height) * .46, "rgba(178,190,198,.22)");
      glow(width * px, height * py, Math.max(width, height) * .22, "rgba(235,242,245,.13)");
      ctx.globalCompositeOperation = "source-over";
      const vignette = ctx.createRadialGradient(width * .5, height * .48, height * .08, width * .5, height * .48, Math.max(width, height) * .68);
      vignette.addColorStop(0, "rgba(0,0,0,0)"); vignette.addColorStop(1, "rgba(0,0,0,.72)"); ctx.fillStyle = vignette; ctx.fillRect(0, 0, width, height);
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    const resume = () => { if (!frame && visible && !scrolling && !reduced) frame = requestAnimationFrame(draw); };
    const onScroll = () => {
      scrolling = true;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => { scrolling = false; resume(); }, 120);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) resume();
      else if (frame) { cancelAnimationFrame(frame); frame = 0; }
    });
    resize(); draw(); observer.observe(canvas); addEventListener("resize", resize); addEventListener("scroll", onScroll, { passive: true }); addEventListener("pointermove", pointer, { passive: true });
    return () => { cancelAnimationFrame(frame); window.clearTimeout(scrollTimer); observer.disconnect(); removeEventListener("resize", resize); removeEventListener("scroll", onScroll); removeEventListener("pointermove", pointer); };
  }, []);
  return <canvas ref={canvasRef} className="aurora-canvas" aria-hidden="true" />;
}

function ProjectVisual({ type, language }: { type: number; language: Language }) {
  const isChinese = language === "zh";
  return <div className={`project-visual visual-${type}`}>
    <div className="visual-grid" />
    {type === 0 && <><div className="route-line" /><div className="device"><small>09:41</small><b>{isChinese ? "去哪里？" : "Where to?"}</b><span>{isChinese ? "搜索公交 / 地点" : "Search transit / places"}</span><i /></div></>}
    {type === 1 && <><div className="power-orb">N</div><div className="power-copy">{isChinese ? <>多场景<br />视觉设计</> : <>MULTI-SCENE<br />VISUAL DESIGN</>}</div></>}
    {type === 2 && <><div className="h5-copy">{isChinese ? <>今天你<br />发疯了吗？</> : <>ARE YOU<br />LOSING IT<br />TODAY?</>}</div><div className="h5-disc">1000+<small>{isChinese ? "浏览量" : "VIEWS"}</small></div></>}
    {type === 3 && <div className="driver-tier">
      <div className="driver-tier-top"><span>{isChinese ? "滴滴司机 · 澳洲" : "DIDI DRIVER · AU"}</span><span>{isChinese ? "等级体验 / 2026" : "LEVEL EXPERIENCE / 2026"}</span></div>
      <div className="driver-tier-card">
        <small>{isChinese ? "当前等级" : "CURRENT TIER"}</small><strong>04</strong><b>{isChinese ? "铂金" : "PLATINUM"}</b>
        <div className="driver-tier-progress"><i /><i /><i /><i /></div>
      </div>
      <div className="driver-tier-process">
        <span><i>01</i>{isChinese ? "产品分析" : "PRODUCT ANALYSIS"}</span><span><i>02</i>{isChinese ? "交互设计" : "INTERACTION DESIGN"}</span>
        <span><i>03</i>{isChinese ? "开发评审" : "DEV REVIEW"}</span><span><i>04</i>{isChinese ? "项目交付" : "DELIVERY"}</span>
      </div>
      <div className="driver-tier-output"><strong>20+</strong><small>{isChinese ? "关键视觉页面" : "KEY VISUAL SCREENS"}</small></div>
    </div>}
  </div>;
}

function NavLabel({ text, visible }: { text: string; visible: boolean }) {
  return visible
    ? <BlurText text={text} delay={10} animateBy="words" direction="top" className="nav-blur-text" />
    : <span className="nav-label-static">{text}</span>;
}

const didiSpiralSources = [
  ["/assets/didi-spiral/level-gold.webp", "Gold tier requirements and benefits"],
  ["/assets/didi-spiral/sidebar-00.webp", "Driver app sidebar tier entry"],
  ["/assets/didi-spiral/support-detail.webp", "Premium support benefit detail"],
  ["/assets/didi-spiral/fuel-01.webp", "Fuel card benefit tier one"],
  ["/assets/didi-spiral/sidebar-01.webp", "Driver app sidebar tier entry one"],
  ["/assets/didi-spiral/benefit-available.webp", "Benefit detail during available hours"],
  ["/assets/didi-spiral/fuel-02.webp", "Fuel card benefit tier two"],
  ["/assets/didi-spiral/sidebar-02.webp", "Driver app sidebar tier entry two"],
  ["/assets/didi-spiral/benefit-unavailable.webp", "Benefit detail outside available hours"],
  ["/assets/didi-spiral/fuel-03.webp", "Fuel card benefit tier three"],
  ["/assets/didi-spiral/sidebar-03.webp", "Driver app sidebar tier entry three"],
  ["/assets/didi-spiral/fuel-04.webp", "Fuel card benefit tier four"],
  ["/assets/didi-spiral/sidebar-04.webp", "Driver app sidebar tier entry four"],
] as const;

const busProjectImages = [
  { src: "/assets/bus-project/41.jpg", width: 5760, height: 26772, label: "01" },
  { src: "/assets/bus-project/42.webp", width: 5760, height: 3240, label: "02" },
  { src: "/assets/bus-project/43.webp", width: 5760, height: 6480, label: "03" },
  { src: "/assets/bus-project/44.webp", width: 5760, height: 3240, label: "04" },
  { src: "/assets/bus-project/45.webp", width: 5760, height: 3240, label: "05" },
  { src: "/assets/bus-project/46.webp", width: 5760, height: 3240, label: "06" },
] as const;

function NioProjectPage({
  language,
  onBack,
  onToggleLanguage,
}: {
  language: Language;
  onBack: () => void;
  onToggleLanguage: () => void;
}) {
  const items = nioWallItems.map((item, index) => ({
    ...item,
    title: language === "zh" ? `NIO Power 视觉物料 ${index + 1}` : item.title,
  }));

  return <main className="nio-project-page">
    <header className="case-study-nav">
      <button type="button" className="case-study-back" onClick={onBack}>
        <i>←</i><span>{language === "zh" ? "返回作品集" : "Back to portfolio"}</span>
      </button>
      <span className="case-study-brand" aria-label="Chihiro Xu">CX</span>
      <button type="button" className="case-study-language" onClick={onToggleLanguage}>
        {language === "zh" ? "EN" : "中"}
      </button>
    </header>

    <section className="nio-project-hero" aria-labelledby="nio-project-title">
      <div className="nio-project-heading">
        <span>BRAND / MOTION · 2025</span>
        <h1 id="nio-project-title">NIO Power<br />{language === "zh" ? "品牌视觉落地" : "Visual System"}</h1>
        <p>{language === "zh"
          ? "从数字端到线下空间，为不同触点建立统一、克制且可持续延展的品牌视觉语言。"
          : "A consistent and extensible visual language across digital products, campaigns and physical spaces."}</p>
      </div>

      <div className="nio-wall-shell">
        <DriftWall
          items={items}
          columns={5}
          tileWidth={200}
          tileHeight={132}
          gap={18}
          tilt={16}
          turn={-14}
          perspective={1200}
          depth={120}
          speed={42}
          direction="up"
          variance={0.45}
          parallax={0.6}
          lift={64}
          fade={0.6}
          dim={0.55}
          overlayColor="#060010"
          groupByNativeSize
          preserveNativeAspect
          pauseOnHover
          className="nio-drift-wall"
        />
        <span className="nio-wall-count">001—109</span>
        <span className="nio-wall-hint">{language === "zh" ? "同尺寸分列 · 自动滚动" : "Grouped by size · Auto scrolling"}</span>
      </div>
    </section>
  </main>;
}

function DidiProjectPage({
  language,
  onBack,
  onToggleLanguage,
}: {
  language: Language;
  onBack: () => void;
  onToggleLanguage: () => void;
}) {
  const images = didiSpiralSources.map(([src, alt], index) => ({
    src,
    alt: language === "zh" ? `澳洲司机等级体验设计页面 ${index + 1}` : alt,
  }));

  return <main className="didi-project-page">
    <header className="case-study-nav">
      <button type="button" className="case-study-back" onClick={onBack}>
        <i>←</i><span>{language === "zh" ? "返回作品集" : "Back to portfolio"}</span>
      </button>
      <span className="case-study-brand" aria-label="Chihiro Xu">CX</span>
      <button type="button" className="case-study-language" onClick={onToggleLanguage}>
        {language === "zh" ? "EN" : "中"}
      </button>
    </header>

    <section className="didi-project-hero" aria-labelledby="didi-project-title">
      <div className="didi-project-heading">
        <span>GLOBAL / UX · 2026</span>
        <h1 id="didi-project-title">{language === "zh" ? <>澳洲司机等级<br />全链路升级</> : <>Australia Driver Tier<br />Experience Upgrade</>}</h1>
        <p>{language === "zh"
          ? "从等级入口、成长路径到权益详情，构建统一且可扩展的司机等级体验。"
          : "A unified and scalable driver tier experience, spanning discovery, progression and benefit details."}</p>
      </div>

      <div className="didi-project-showcase">
        <div className="didi-project-summary">
          <span>{language === "zh" ? "项目范围" : "Project scope"}</span>
          <p>{language === "zh"
            ? "覆盖产品分析、交互设计、开发评审与项目落地全流程，围绕等级认知、进度反馈和权益使用完成关键体验升级。"
            : "End-to-end work across product analysis, interaction design, development review and delivery, improving tier awareness, progress feedback and benefit access."}</p>
          <div className="didi-project-metrics">
            <div><strong>20+</strong><span>{language === "zh" ? "关键页面" : "Key screens"}</span></div>
            <div><strong>04</strong><span>{language === "zh" ? "等级阶段" : "Tier phases"}</span></div>
          </div>
        </div>

        <div className="didi-spiral-shell">
          <InfiniteSpiral
            items={images}
            animationMode="all"
            speed={0.55}
            radius={270}
            cardWidth={210}
            cardHeight={455}
            verticalSpacing={150}
            perspective={1200}
            cardRadius={18}
            centerScale={1.08}
            edgeBlur={4}
            cardsPerTurn={7}
            pauseOnHover
            imageFit="contain"
            className="didi-infinite-spiral"
          />
          <span className="didi-spiral-index">01—13</span>
          <span className="didi-spiral-hint">{language === "zh" ? "拖动 · 滚动 · 自动播放" : "Drag · Scroll · Auto play"}</span>
        </div>
      </div>
    </section>
  </main>;
}

function BusProjectPage({
  language,
  onBack,
  onToggleLanguage,
}: {
  language: Language;
  onBack: () => void;
  onToggleLanguage: () => void;
}) {
  return <main className="bus-project-page">
    <header className="case-study-nav">
      <button type="button" className="case-study-back" onClick={onBack}>
        <i>←</i><span>{language === "zh" ? "返回作品集" : "Back to portfolio"}</span>
      </button>
      <span className="case-study-brand" aria-label="Chihiro Xu">CX</span>
      <button type="button" className="case-study-language" onClick={onToggleLanguage}>
        {language === "zh" ? "EN" : "中"}
      </button>
    </header>

    <section className="bus-project-hero" aria-labelledby="bus-project-title">
      <div className="bus-project-heading">
        <span>UX / IP · 2025</span>
        <h1 id="bus-project-title">{language === "zh" ? <>掌上公交 App<br />体验升级</> : <>Transit App<br />Experience Upgrade</>}</h1>
        <p>{language === "zh"
          ? "从 IP 形象、运营小游戏到产品边界拓展，完整呈现体验设计与视觉落地过程。"
          : "A complete experience design story spanning IP development, an operations game and product expansion."}</p>
      </div>

      <div className="bus-project-sequence" aria-label={language === "zh" ? "掌上公交项目图片，按顺序排列" : "Transit project images in sequence"}>
        {busProjectImages.map((image, index) => <figure key={image.src}>
          <img
            src={image.src}
            alt={language === "zh" ? `掌上公交 App 体验升级项目页面 ${image.label}` : `Transit app experience project page ${image.label}`}
            width={image.width}
            height={image.height}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </figure>)}
      </div>
    </section>
  </main>;
}

function CrazyProjectPage({
  language,
  onBack,
  onToggleLanguage,
}: {
  language: Language;
  onBack: () => void;
  onToggleLanguage: () => void;
}) {
  const labels = language === "zh"
    ? ["息事宁人型", "老实巴交型", "佛系玩家型", "毁灭性型"]
    : ["Peacekeeper", "Straight Shooter", "Zen Player", "Full Chaos"];
  const items = labels.map((label, index) => ({
    image: `/assets/crazy-gallery/share-0${index + 1}.png`,
    label,
    link: "#crazy-project",
    alt: language === "zh" ? `今天你发疯了吗分享页面 ${index + 1}` : `Are You Losing It Today result ${index + 1}`,
  }));

  return <main className="crazy-project-page">
    <header className="case-study-nav">
      <button type="button" className="case-study-back" onClick={onBack}>
        <i>←</i><span>{language === "zh" ? "返回作品集" : "Back to portfolio"}</span>
      </button>
      <span className="case-study-brand" aria-label="Chihiro Xu">CX</span>
      <button type="button" className="case-study-language" onClick={onToggleLanguage}>
        {language === "zh" ? "EN" : "中"}
      </button>
    </header>

    <section className="crazy-project-hero" aria-labelledby="crazy-project-title">
      <div className="crazy-project-heading">
        <span>H5 / INTERACTION · 2024</span>
        <h1 id="crazy-project-title">{language === "zh" ? <>今天你<br />发疯了吗？</> : <>Are you<br />losing it today?</>}</h1>
        <p>{language === "zh"
          ? "把情绪测试转化为一组可分享的视觉人格。将鼠标移到不同卡片上，查看四种发疯状态。"
          : "A shareable visual personality system built from an interactive mood test. Hover across the cards to explore four states of chaos."}</p>
      </div>

      <div className="crazy-gallery-shell">
        <AccordionGallery
          items={items}
          defaultIndex={2}
          expandRatio={0.52}
          trigger="hover"
          height={680}
          gap={12}
          radius={18}
          overlayColor="#07090a"
          className="crazy-gallery"
        />
      </div>

      <div className="crazy-project-footnote">
        <span>01—04</span>
        <span>{language === "zh" ? "悬停展开 · 方向键切换" : "Hover to expand · Use arrow keys"}</span>
        <span>CHIHIRO XU</span>
      </div>
    </section>
  </main>;
}

export default function App() {
  const [language, setLanguage] = useState<Language>("zh");
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [copiedContact, setCopiedContact] = useState<"phone" | "email" | null>(null);
  const [caseStudyOpen, setCaseStudyOpen] = useState(() => window.location.hash === "#crazy-project");
  const [didiCaseStudyOpen, setDidiCaseStudyOpen] = useState(() => window.location.hash === "#didi-project");
  const [nioCaseStudyOpen, setNioCaseStudyOpen] = useState(() => window.location.hash === "#nio-project");
  const [busCaseStudyOpen, setBusCaseStudyOpen] = useState(() => window.location.hash === "#bus-project");
  const contactCloseRef = useRef<HTMLButtonElement>(null);
  const copyFeedbackTimerRef = useRef<number | null>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const transitionInFlightRef = useRef(false);
  const t = content[language];

  useEffect(() => {
    let frame = 0;
    let wasScrolled: boolean | null = null;
    const update = () => {
      frame = 0;
      const progress = Math.min(Math.max(window.scrollY / 600, 0), 1);
      document.documentElement.style.setProperty("--hero-dim", String(1 - progress));
      document.documentElement.style.setProperty("--hero-scale", String(1 - progress * .035));
      const nextScrolled = window.scrollY > 600;
      if (nextScrolled !== wasScrolled) {
        wasScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
    };
    const scheduleUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); addEventListener("scroll", scheduleUpdate, { passive: true }); addEventListener("resize", scheduleUpdate);
    return () => { if (frame) cancelAnimationFrame(frame); removeEventListener("scroll", scheduleUpdate); removeEventListener("resize", scheduleUpdate); };
  }, []);

  useEffect(() => () => {
    transitionTimelineRef.current?.kill();
    transitionTimelineRef.current = null;
    transitionInFlightRef.current = false;
    if (copyFeedbackTimerRef.current) window.clearTimeout(copyFeedbackTimerRef.current);
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    contactCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [contactOpen]);

  useEffect(() => {
    const syncCaseStudy = () => {
      setCaseStudyOpen(window.location.hash === "#crazy-project");
      setDidiCaseStudyOpen(window.location.hash === "#didi-project");
      setNioCaseStudyOpen(window.location.hash === "#nio-project");
      setBusCaseStudyOpen(window.location.hash === "#bus-project");
    };
    window.addEventListener("hashchange", syncCaseStudy);
    return () => window.removeEventListener("hashchange", syncCaseStudy);
  }, []);

  const jumpToSection = (href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const headerOffset = href === "#home" ? 0 : 82;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo(0, Math.max(0, targetTop));
    window.history.pushState(null, "", href);
    requestAnimationFrame(() => { root.style.scrollBehavior = previousScrollBehavior; });
  };

  const buildTargetPreview = (target: HTMLElement, slats: HTMLElement[]) => {
    const targetBackground = getComputedStyle(target).background;
    const navSource = document.querySelector<HTMLElement>(".card-nav");
    const stripWidth = 100 / slats.length;

    slats.forEach((slat, index) => {
      slat.replaceChildren();

      const scene = document.createElement("div");
      scene.className = "page-transition-scene";
      scene.style.left = `${-index * stripWidth}vw`;
      scene.style.background = targetBackground;

      if (navSource) {
        const navFrame = document.createElement("div");
        navFrame.className = "page-transition-preview-nav";
        const navClone = navSource.cloneNode(true) as HTMLElement;
        navClone.classList.remove("open");
        navClone.style.height = "64px";
        navClone.querySelector(".card-nav-toggle")?.classList.remove("open");
        navFrame.append(navClone);
        scene.append(navFrame);
      }

      const targetClone = target.cloneNode(true) as HTMLElement;
      targetClone.removeAttribute("id");
      targetClone.querySelectorAll("[id]").forEach(element => element.removeAttribute("id"));
      targetClone.classList.add("page-transition-target");
      targetClone.setAttribute("aria-hidden", "true");
      scene.append(targetClone);
      slat.append(scene);
    });
  };

  const navigateWithBlinds = (href: string) => {
    const overlay = transitionRef.current;
    if (!overlay || transitionInFlightRef.current) return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      jumpToSection(href);
      return;
    }

    const slats = Array.from(overlay.querySelectorAll<HTMLElement>(".page-transition-slat"));
    if (!slats.length) {
      jumpToSection(href);
      return;
    }

    transitionInFlightRef.current = true;
    transitionTimelineRef.current?.kill();
    buildTargetPreview(target, slats);
    gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" });
    gsap.set(slats, { clipPath: "inset(0% 0% 100% 0%)" });

    transitionTimelineRef.current = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
        slats.forEach(slat => slat.replaceChildren());
        transitionInFlightRef.current = false;
        transitionTimelineRef.current = null;
      },
    })
      .to(slats, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: .44,
        ease: "power3.inOut",
        stagger: { each: .038, from: "start" },
      })
      .add(() => jumpToSection(href))
      .to(slats, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: .48,
        ease: "power3.inOut",
        stagger: { each: .038, from: "end" },
      }, "+=.06");
  };

  const handleSectionLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setNavOpen(false);
    navigateWithBlinds(href);
  };

  const copyContactValue = async (kind: "phone" | "email", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = value;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.append(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    setCopiedContact(kind);
    if (copyFeedbackTimerRef.current) window.clearTimeout(copyFeedbackTimerRef.current);
    copyFeedbackTimerRef.current = window.setTimeout(() => {
      setCopiedContact(current => current === kind ? null : current);
    }, 1800);
  };

  const openCrazyProject = () => {
    window.history.pushState(null, "", "#crazy-project");
    setDidiCaseStudyOpen(false);
    setNioCaseStudyOpen(false);
    setBusCaseStudyOpen(false);
    setCaseStudyOpen(true);
    window.scrollTo(0, 0);
  };

  const closeCrazyProject = () => {
    window.history.pushState(null, "", "#work");
    setCaseStudyOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => jumpToSection("#work")));
  };

  const openDidiProject = () => {
    window.history.pushState(null, "", "#didi-project");
    setCaseStudyOpen(false);
    setNioCaseStudyOpen(false);
    setBusCaseStudyOpen(false);
    setDidiCaseStudyOpen(true);
    window.scrollTo(0, 0);
  };

  const closeDidiProject = () => {
    window.history.pushState(null, "", "#work");
    setDidiCaseStudyOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => jumpToSection("#work")));
  };

  const openNioProject = () => {
    window.history.pushState(null, "", "#nio-project");
    setCaseStudyOpen(false);
    setDidiCaseStudyOpen(false);
    setBusCaseStudyOpen(false);
    setNioCaseStudyOpen(true);
    window.scrollTo(0, 0);
  };

  const closeNioProject = () => {
    window.history.pushState(null, "", "#work");
    setNioCaseStudyOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => jumpToSection("#work")));
  };

  const openBusProject = () => {
    window.history.pushState(null, "", "#bus-project");
    setCaseStudyOpen(false);
    setDidiCaseStudyOpen(false);
    setNioCaseStudyOpen(false);
    setBusCaseStudyOpen(true);
    window.scrollTo(0, 0);
  };

  const closeBusProject = () => {
    window.history.pushState(null, "", "#work");
    setBusCaseStudyOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => jumpToSection("#work")));
  };

  const cardNavItems = [
    { index: "01", label: t.nav[0], description: language === "zh" ? "精选项目与设计案例" : "Selected projects and case studies", href: "#work" },
    { index: "02", label: t.nav[1], description: language === "zh" ? "实习与教育经历" : "Experience and education", href: "#experience" },
    { index: "03", label: t.nav[2], description: language === "zh" ? "核心能力与设计方法" : "Core strengths and design approach", href: "#expertise" },
    { index: "04", label: t.nav[3], description: language === "zh" ? "合作机会与联系方式" : "Opportunities and contact", href: "#contact" },
  ];

  if (busCaseStudyOpen) {
    return <BusProjectPage
      language={language}
      onBack={closeBusProject}
      onToggleLanguage={() => setLanguage(current => current === "zh" ? "en" : "zh")}
    />;
  }

  if (nioCaseStudyOpen) {
    return <NioProjectPage
      language={language}
      onBack={closeNioProject}
      onToggleLanguage={() => setLanguage(current => current === "zh" ? "en" : "zh")}
    />;
  }

  if (didiCaseStudyOpen) {
    return <DidiProjectPage
      language={language}
      onBack={closeDidiProject}
      onToggleLanguage={() => setLanguage(current => current === "zh" ? "en" : "zh")}
    />;
  }

  if (caseStudyOpen) {
    return <CrazyProjectPage
      language={language}
      onBack={closeCrazyProject}
      onToggleLanguage={() => setLanguage(current => current === "zh" ? "en" : "zh")}
    />;
  }

  return <main className={`page ${scrolled ? "is-scrolled" : ""} ${navOpen ? "is-nav-open" : ""}`}>
    {contactOpen && <div
      className="contact-modal-backdrop"
      onMouseDown={(event) => { if (event.target === event.currentTarget) setContactOpen(false); }}
    >
      <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <button ref={contactCloseRef} className="contact-modal-close" onClick={() => setContactOpen(false)} aria-label={language === "zh" ? "关闭联系弹窗" : "Close contact dialog"}><span /><span /></button>
        <div className="contact-modal-copy">
          <span>CONTACT · CHIHIRO XU</span>
          <h2 id="contact-modal-title">{language === "zh" ? "保持联系，\n聊聊设计。" : "Let’s connect\nand talk design."}</h2>
          <div className="contact-modal-details">
            <div className="contact-modal-detail">
              <div className="contact-modal-value"><small>{language === "zh" ? "电话" : "PHONE"}</small><strong>199 5134 2256</strong></div>
              <div className="contact-modal-actions" aria-live="polite">
                <button type="button" onClick={() => void copyContactValue("phone", "199 5134 2256")}>
                  {copiedContact === "phone" ? (language === "zh" ? "已复制" : "Copied") : (language === "zh" ? "复制号码" : "Copy number")}
                </button>
              </div>
            </div>
            <div className="contact-modal-detail">
              <div className="contact-modal-value"><small>{language === "zh" ? "QQ 邮箱" : "QQ EMAIL"}</small><strong>3245937262@qq.com</strong></div>
              <div className="contact-modal-actions" aria-live="polite">
                <a href="https://mail.qq.com/" target="_blank" rel="noreferrer noopener">{language === "zh" ? "打开邮箱 ↗" : "Open mail ↗"}</a>
                <button type="button" onClick={() => void copyContactValue("email", "3245937262@qq.com")}>
                  {copiedContact === "email" ? (language === "zh" ? "已复制" : "Copied") : (language === "zh" ? "复制邮箱" : "Copy email")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-modal-qr">
          <img
            className="wechat-qr"
            src="/assets/wechat-qr.webp"
            alt={language === "zh" ? "徐千寻的微信二维码" : "Chihiro Xu’s WeChat QR code"}
          />
          <strong>{language === "zh" ? "微信联系" : "WECHAT"}</strong>
          <p>{language === "zh" ? "扫描二维码添加微信" : "Scan to add me on WeChat"}</p>
        </div>
      </section>
    </div>}
    <div ref={transitionRef} className="page-transition" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => <span className="page-transition-slat" key={index} />)}
    </div>
    <header className="floating-nav">
      <div
        className="nav-capsule"
        onMouseLeave={() => setNavOpen(false)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setNavOpen(false);
        }}
      >
        <span className="nav-title" aria-hidden="true">chihiro&apos;s portfolio</span>
        <nav className="nav-wing nav-wing-left" aria-label="Primary navigation">
          <a href="#work" onClick={(event) => handleSectionLink(event, "#work")}><span className="nav-index">01</span><NavLabel text={t.nav[0]} visible={navOpen} /></a>
          <a href="#experience" onClick={(event) => handleSectionLink(event, "#experience")}><span className="nav-index">02</span><NavLabel text={t.nav[1]} visible={navOpen} /></a>
        </nav>
        <a
          className="nav-monogram"
          href="#home"
          aria-label="Back to home"
          onMouseEnter={() => setNavOpen(true)}
          onFocus={() => setNavOpen(true)}
        >CX</a>
        <nav className="nav-wing nav-wing-right" aria-label="Secondary navigation">
          <a href="#expertise" onClick={(event) => handleSectionLink(event, "#expertise")}><span className="nav-index">03</span><NavLabel text={t.nav[2]} visible={navOpen} /></a>
          <a href="#contact" onClick={(event) => handleSectionLink(event, "#contact")}><span className="nav-index">04</span><NavLabel text={t.nav[3]} visible={navOpen} /></a>
        </nav>
      </div>
    </header>
    <CardNav items={cardNavItems} active={scrolled} onNavigate={navigateWithBlinds} />
    <div className="language-dock trail-safe">
      <div className="language-switch" aria-label="Language switch">
        <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中</button>
        <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
      </div>
      <button
        className="language-orb"
        onClick={() => setLanguage(current => current === "zh" ? "en" : "zh")}
        aria-label={language === "zh" ? "Switch to English" : "切换至中文"}
      >{language === "zh" ? "EN" : "中"}</button>
    </div>
    <section className="hero-stage" id="home">
      <div className="hero-surface">
        <AuroraBackground />
        <div className="hero-prism">
          <Prism
            animationType="hover"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={1.5}
            hueShift={0}
            colorFrequency={1}
            noise={0}
            glow={1}
            suspendWhenOffscreen
          />
        </div>
        <div className="light-arc arc-one" /><div className="light-arc arc-two" />
        <div className="hero-copy">
          <span className="hero-eyebrow">{t.eyebrow}</span>
          <span className="hero-owner">{t.heroOwner}</span>
          <h1><ShinyText text={t.heroTitle} color="#FFFFFF" /></h1>
          <p>
            <ShinySweepText
              text={t.intro}
              disabled={scrolled}
              speed={2.5}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="right"
              yoyo
              pauseOnHover
            />
          </p>
        </div>
        <button className="hero-contact-trigger" onClick={() => setContactOpen(true)}>{t.contactCta}<i>↗</i></button>
        <div className="hero-meta"><span>PORTFOLIO / 2026</span></div>
        <div className="language-wrap trail-safe"><a href="#work">{t.scroll}<span>↓</span></a></div>
      </div>
    </section>

    <div className="content-shell">
      <div className="drawer-handle" aria-hidden="true" />
      <section className="work-section section-pad" id="work">
        <div className="section-head">
          <span>{t.workKicker}</span>
          <ScrollReveal
            key={language}
            baseOpacity={0}
            enableBlur
            baseRotation={0}
            blurStrength={10}
            wordAnimationEnd="center center"
            containerClassName="work-scroll-reveal"
            textClassName="work-scroll-reveal-text"
          >
            {t.workTitle}
          </ScrollReveal>
          <p>{t.workIntro}</p>
        </div>
        <ScrollStack
          className="project-scroll-stack"
          itemDistance={72}
          itemScale={0.035}
          itemStackDistance={24}
          stackPosition="14%"
          scaleEndPosition="5%"
          baseScale={0.86}
          rotationAmount={0}
          blurAmount={0}
          useWindowScroll
        >
          {t.projects.map((project, i) => <ScrollStackItem itemClassName="project-stack-item" key={i}>
            <article className="project-card">
              <ProjectVisual type={[3, 1, 0, 2][i]} language={language} />
              <div className="project-info"><div><span>0{i + 1}</span><span>{["GLOBAL / UX", "BRAND / MOTION", "UX / IP", "H5 / INTERACTION"][i]}</span><span>{["2026", "2025", "2025", "2024"][i]}</span></div><h3>{project[0]}</h3><p>{project[1]}</p><button type="button" onClick={i === 0 ? openDidiProject : i === 1 ? openNioProject : i === 2 ? openBusProject : i === 3 ? openCrazyProject : undefined}>{t.view}<i>↗</i></button></div>
            </article>
          </ScrollStackItem>)}
        </ScrollStack>
      </section>

      <section className="about-section section-pad">
        <div className="about-photo about-profile-frame"><img className="about-profile-card" src="/assets/about-chihiro-card.webp" alt={language === "zh" ? "徐千寻个人介绍" : "Introduction to Chihiro Xu"} /></div>
        <div className="about-copy"><span>{t.aboutKicker}</span><h2>{t.aboutTitle.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h2><p>{t.aboutText}</p><div className="stats">{t.stats.map(stat => <div key={stat[1]}><strong>{stat[0]}</strong><span>{stat[1]}</span></div>)}</div></div>
      </section>

      <section className="experience-section section-pad" id="experience">
        <div className="section-head compact"><span>{t.expKicker}</span><h2>{t.expTitle.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h2></div>
        <div className="experience-list">{t.experiences.map((exp, i) => <article key={exp[0]}><span>0{i + 1}</span><div><small>{exp[3]}</small><h3>{exp[0]}</h3><b>{exp[1]}</b></div><p>{exp[2]}</p><i>↗</i></article>)}</div>
      </section>

      <section className="expertise-section section-pad" id="expertise">
        <div className="section-head compact"><span>{t.abilityKicker}</span><h2>{t.abilityTitle.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h2></div>
        <div className="expertise-grid">{t.abilities.map((ability, i) => <article key={ability[0]}><span>0{i + 1}</span><div className="ability-icon">{["⌁", "◐", "≈", "◎"][i]}</div><h3>{ability[0]}</h3><p>{ability[1]}</p></article>)}</div>
      </section>

      <footer className="contact-section section-pad" id="contact">
        <div className="contact-glow" /><span>{t.contactKicker}</span><h2>{t.contactTitle.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h2><p>{t.contactText}</p>
        <button type="button" className="contact-button" onClick={() => setContactOpen(true)}>{t.contactCta}<i>↗</i></button>
        <div className="footer-line"><span>CHIHIRO XU © 2026</span><a href="tel:19951342256">+86 199 5134 2256</a><a href="mailto:3245937262@qq.com">3245937262@qq.com</a><a href="#home">BACK TO TOP ↑</a></div>
      </footer>
    </div>
  </main>;
}
