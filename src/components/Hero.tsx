import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const sections = [
  { id: "block-1", label: "01", tone: "sun" },
  { id: "block-2", label: "02", tone: "forest" },
  { id: "block-3", label: "03", tone: "night" }
] as const;

export function Hero() {
  const { scrollY } = useScroll();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const sliderSectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const { scrollYProgress: sliderProgress } = useScroll({
    target: sliderSectionRef,
    offset: ["start end", "end start"]
  });
  const introY = useTransform(heroProgress, [0, 1], [0, 220]);
  const introScale = useTransform(heroProgress, [0, 0.65], [1, 0.9]);
  const introOpacity = useTransform(heroProgress, [0, 0.55], [1, 0.08]);
  const sliderY = useTransform(sliderProgress, [0, 1], [160, -90]);
  const sliderOpacity = useTransform(sliderProgress, [0, 0.16, 0.38], [0, 0.9, 1]);

  const scrollToIndex = (index: number) => {
    const viewport = viewportRef.current;
    const slide = slideRefs.current[index];

    if (!viewport || !slide) {
      return;
    }

    const targetLeft =
      slide.offsetLeft - (viewport.clientWidth - slide.clientWidth) / 2;

    viewport.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  };

  const paginate = (direction: number) => {
    setCurrentIndex((previous) => {
      const next = previous + direction;

      const clamped = Math.max(0, Math.min(next, sections.length - 1));
      scrollToIndex(clamped);
      return clamped;
    });
  };

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (current < 64) {
      setIsHeaderVisible(true);
      return;
    }

    if (current > previous) {
      setIsHeaderVisible(false);
      return;
    }

    if (current < previous) {
      setIsHeaderVisible(true);
    }
  });

  return (
    <>
      <motion.header
        className="site-header"
        initial={false}
        animate={isHeaderVisible ? "visible" : "hidden"}
        variants={{
          visible: {
            y: 0,
            opacity: 1
          },
          hidden: {
            y: -120,
            opacity: 0
          }
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <div className="site-header__inner">
          <a className="site-header__brand" href="#top">
            Guitar Guide
          </a>

          <nav className="site-header__nav" aria-label="Sections">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </motion.header>

      <section ref={heroRef} className="hero" id="top">
        <motion.div
          ref={introRef}
          className="hero__panel"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            y: introY,
            scale: introScale,
            opacity: introOpacity
          }}
        >
          <motion.span
            className="hero__eyebrow"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Автор - Савенков Семён
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            Это мой первый pet-проект
          </motion.h1>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            В этом проекте я использовал React и TypeScript для создания интерактивного интерфейса, а также библиотеку Framer Motion для анимации элементов. Целью проекта было создать привлекательный и функциональный интерфейс для демонстрации моих навыков в веб-разработке. в этом проекте я вам хочу рассказать о гитарах
          </motion.p>
        </motion.div>

        <motion.section
          ref={sliderSectionRef}
          className="stage-slider"
          initial={{ opacity: 0, y: 46 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            y: sliderY,
            opacity: sliderOpacity
          }}
        >
          <div className="stage-slider__topbar">
            <div className="stage-slider__dots" aria-label="Slider navigation">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  className={currentIndex === index ? "is-active" : undefined}
                  type="button"
                  aria-label={`Go to slide ${section.label}`}
                  onClick={() => {
                    scrollToIndex(index);
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>

            <div className="stage-slider__controls" aria-label="Slider controls">
              <button
                type="button"
                onClick={() => paginate(-1)}
                disabled={currentIndex === 0}
                aria-label="Previous slide"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                disabled={currentIndex === sections.length - 1}
                aria-label="Next slide"
              >
                Next
              </button>
            </div>
          </div>

          <div
            ref={viewportRef}
            className="stage-slider__viewport"
            onScroll={(event) => {
              const viewport = event.currentTarget;

              if (slideRefs.current.length === 0) {
                return;
              }

              const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
              let closestIndex = 0;
              let closestDistance = Number.POSITIVE_INFINITY;

              slideRefs.current.forEach((slide, index) => {
                if (!slide) {
                  return;
                }

                const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
                const distance = Math.abs(slideCenter - viewportCenter);

                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestIndex = index;
                }
              });

              setCurrentIndex(closestIndex);
            }}
          >
            <div className="stage-slider__track">
              {sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  ref={(element) => {
                    slideRefs.current[index] = element;
                  }}
                  className={`stage-slider__slide stage stage--${section.tone}`}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  animate={{
                    scale: currentIndex === index ? 1 : 0.82,
                    opacity: currentIndex === index ? 1 : 0.38,
                    y: currentIndex === index ? 0 : 24,
                    filter: currentIndex === index ? "blur(0px)" : "blur(3px)"
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <div className="stage__meta">
                    <span className="stage__number">{section.label}</span>
                  </div>
                  <div className="stage__empty" />
                </motion.section>
              ))}
            </div>
          </div>
        </motion.section>
      </section>
    </>
  );
}
