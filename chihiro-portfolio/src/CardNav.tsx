import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import BorderGlow from "./BorderGlow/BorderGlow";

type CardNavItem = {
  index: string;
  label: string;
  description: string;
  href: string;
};

type CardNavProps = {
  items: CardNavItem[];
  active: boolean;
  onNavigate?: (href: string) => void;
};

export default function CardNav({ items, active, onNavigate }: CardNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { height: 64, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 46, opacity: 0 });

    const timeline = gsap.timeline({ paused: true });
    timeline.to(nav, { height: 278, duration: .45, ease: "power3.out" });
    timeline.to(cardsRef.current, {
      y: 0,
      opacity: 1,
      duration: .4,
      ease: "power3.out",
      stagger: .07,
    }, "-=.16");
    timelineRef.current = timeline;

    return () => {
      timeline.kill();
      timelineRef.current = null;
    };
  }, [items]);

  useLayoutEffect(() => {
    if (active) return;
    setIsExpanded(false);
    const timeline = timelineRef.current;
    if (timeline) {
      timeline.pause(0);
      gsap.set(cardsRef.current, { y: 46, opacity: 0 });
    }
    if (navRef.current) gsap.set(navRef.current, { height: 64 });
  }, [active]);

  const toggleMenu = () => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (isExpanded) {
      setIsExpanded(false);
      timeline.timeScale(1.7).reverse();
    } else {
      setIsExpanded(true);
      timeline.timeScale(1).play(0);
    }
  };

  const closeMenu = () => {
    setIsExpanded(false);
    timelineRef.current?.timeScale(1.7).reverse();
  };

  useEffect(() => {
    if (!isExpanded) return;

    const handleOutsidePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || navRef.current?.contains(target)) return;
      closeMenu();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isExpanded]);

  return <div className="card-nav-container">
    <nav ref={navRef} className={`card-nav ${isExpanded ? "open" : ""}`}>
      <div className="card-nav-top">
        <a className="card-nav-logo" href="#home" aria-label="Back to home" onClick={closeMenu}>CX</a>
        <a className="card-nav-title" href="#home" onClick={closeMenu}>chihiro&apos;s portfolio</a>
        <button
          type="button"
          className={`card-nav-toggle ${isExpanded ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label={isExpanded ? "Close menu" : "Open menu"}
          aria-expanded={isExpanded}
        >
          <span /><span />
        </button>
      </div>
      <div className="card-nav-content" aria-hidden={!isExpanded}>
        {items.map((item, index) => <div
          className="card-nav-card-shell"
          key={item.href}
          ref={(element) => { cardsRef.current[index] = element; }}
        >
          <BorderGlow
            className="card-nav-glow"
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#120F17"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
          >
            <a
              className="card-nav-card"
              href={item.href}
              onClick={(event) => {
                closeMenu();
                if (!onNavigate) return;
                event.preventDefault();
                onNavigate(item.href);
              }}
            >
              <span>{item.index}</span>
              <div><strong>{item.label}</strong><p>{item.description}</p></div>
              <i>↗</i>
            </a>
          </BorderGlow>
        </div>)}
      </div>
    </nav>
  </div>;
}
