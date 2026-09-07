import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('\n').map((line, lineIndex) => (
      <span className="scroll-reveal-line" key={`${line}-${lineIndex}`}>
        {line.split(/(\s+)/).map((word, wordIndex) => {
          if (/^\s+$/.test(word)) return word;
          return <span className="scroll-reveal-word" key={`${word}-${wordIndex}`}>{word}</span>;
        })}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const scroller = scrollContainerRef?.current || window;
    const words = el.querySelectorAll('.scroll-reveal-word');
    const lines = el.querySelectorAll('.scroll-reveal-line');
    const animations = [];

    animations.push(gsap.fromTo(el, {
      transformOrigin: '0% 50%',
      rotate: baseRotation,
    }, {
      ease: 'none',
      rotate: 0,
      scrollTrigger: { trigger: el, scroller, start: 'top bottom', end: rotationEnd, scrub: true },
    }));

    animations.push(gsap.fromTo(words, {
      opacity: baseOpacity,
      willChange: 'opacity',
    }, {
      ease: 'none',
      opacity: 1,
      stagger: 0.05,
      scrollTrigger: { trigger: el, scroller, start: 'top bottom-=20%', end: wordAnimationEnd, scrub: true },
    }));

    if (enableBlur) {
      lines.forEach(line => {
        animations.push(gsap.fromTo(line, {
          filter: `blur(${blurStrength}px)`,
          willChange: 'filter',
        }, {
          ease: 'none',
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: line,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true,
          },
        }));
      });
    }

    return () => animations.forEach(animation => {
      animation.scrollTrigger?.kill();
      animation.kill();
    });
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollReveal;
