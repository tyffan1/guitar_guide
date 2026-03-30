import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const sections = [
  { id: "block-1", label: "01", tone: "sun" },
  { id: "block-2", label: "02", tone: "forest" },
  { id: "block-3", label: "03", tone: "night" },
  { id: "block-4", label: "04", tone: "sun" }
] as const;

const copy = {
  author: "\u0410\u0432\u0442\u043e\u0440 - \u0421\u0430\u0432\u0435\u043d\u043a\u043e\u0432 \u0421\u0435\u043c\u0451\u043d",
  heroTitle: "\u042d\u0442\u043e \u043c\u043e\u0439 \u043f\u0435\u0440\u0432\u044b\u0439 pet-\u043f\u0440\u043e\u0435\u043a\u0442",
  heroLead:
    "\u0412 \u044d\u0442\u043e\u043c \u043f\u0440\u043e\u0435\u043a\u0442\u0435 \u044f \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043b React \u0438 TypeScript \u0434\u043b\u044f \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u0438\u043d\u0442\u0435\u0440\u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0433\u043e \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430, \u0430 \u0442\u0430\u043a\u0436\u0435 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0443 Framer Motion \u0434\u043b\u044f \u0430\u043d\u0438\u043c\u0430\u0446\u0438\u0438 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u043e\u0432. \u0426\u0435\u043b\u044c\u044e \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \u0431\u044b\u043b\u043e \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u0440\u0438\u0432\u043b\u0435\u043a\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u0438 \u0444\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u0434\u043b\u044f \u0434\u0435\u043c\u043e\u043d\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u043c\u043e\u0438\u0445 \u043d\u0430\u0432\u044b\u043a\u043e\u0432 \u0432 \u0432\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435. \u0412 \u044d\u0442\u043e\u043c \u043f\u0440\u043e\u0435\u043a\u0442\u0435 \u044f \u0445\u043e\u0447\u0443 \u0440\u0430\u0441\u0441\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0430\u043c \u043e \u0433\u0438\u0442\u0430\u0440\u0430\u0445.",
  articleLabel: "\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435 \u0433\u0438\u0442\u0430\u0440\u0430",
  articleTitle:
    "\u0413\u0438\u0442\u0430\u0440\u0430 - \u043e\u0434\u0438\u043d \u0438\u0437 \u0441\u0430\u043c\u044b\u0445 \u0443\u0437\u043d\u0430\u0432\u0430\u0435\u043c\u044b\u0445 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u043e\u0432 \u0432 \u043c\u0438\u0440\u0435.",
  articleText1:
    "\u0413\u0438\u0442\u0430\u0440\u0430 - \u044d\u0442\u043e \u0441\u0442\u0440\u0443\u043d\u043d\u044b\u0439 \u0449\u0438\u043f\u043a\u043e\u0432\u044b\u0439 \u043c\u0443\u0437\u044b\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442, \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u043e\u043c \u0438\u0433\u0440\u0430\u044e\u0442 \u043f\u0430\u043b\u044c\u0446\u0430\u043c\u0438 \u0438\u043b\u0438 \u043c\u0435\u0434\u0438\u0430\u0442\u043e\u0440\u043e\u043c. \u041e\u043d\u0430 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u0430\u043a\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043a\u043e\u0439, \u043a\u043b\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043a\u043e\u0439 \u0438\u043b\u0438 \u044d\u043b\u0435\u043a\u0442\u0440\u0438\u0447\u0435\u0441\u043a\u043e\u0439, \u043d\u043e \u0432\u043e \u0432\u0441\u0435\u0445 \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u0430\u0445 \u043e\u0441\u0442\u0430\u0451\u0442\u0441\u044f \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u043e\u043c, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0441\u043e\u0435\u0434\u0438\u043d\u044f\u0435\u0442 \u043c\u0435\u043b\u043e\u0434\u0438\u044e, \u0440\u0438\u0442\u043c \u0438 \u0433\u0430\u0440\u043c\u043e\u043d\u0438\u044e \u0432 \u043e\u0434\u043d\u043e\u043c \u043a\u043e\u0440\u043f\u0443\u0441\u0435.",
  articleText2:
    "\u0415\u0451 \u0446\u0435\u043d\u044f\u0442 \u0437\u0430 \u0443\u043d\u0438\u0432\u0435\u0440\u0441\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c: \u0433\u0438\u0442\u0430\u0440\u0430 \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u0442 \u0438 \u0434\u043b\u044f \u043a\u0430\u043c\u0435\u0440\u043d\u043e\u0439 \u0438\u0433\u0440\u044b \u0434\u043e\u043c\u0430, \u0438 \u0434\u043b\u044f \u0431\u043e\u043b\u044c\u0448\u0438\u0445 \u0441\u0446\u0435\u043d, \u0438 \u0434\u043b\u044f \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u044f, \u0438 \u0434\u043b\u044f \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0439 \u0437\u0430\u043f\u0438\u0441\u0438. \u0418\u043c\u0435\u043d\u043d\u043e \u043f\u043e\u044d\u0442\u043e\u043c\u0443 \u043e\u043d\u0430 \u0441\u0442\u0430\u043b\u0430 \u043e\u0434\u043d\u0438\u043c \u0438\u0437 \u0441\u0430\u043c\u044b\u0445 \u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0445 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u043e\u0432 \u0432 \u0438\u0441\u0442\u043e\u0440\u0438\u0438 \u043c\u0443\u0437\u044b\u043a\u0438.",
  reasonsTitle: "\u041f\u043e\u0447\u0435\u043c\u0443 \u0433\u0438\u0442\u0430\u0440\u0430 \u0442\u0430\u043a \u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u0430",
  reasons: [
    "\u0435\u0451 \u0443\u0434\u043e\u0431\u043d\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u043a\u0430\u043a \u0441\u043e\u043b\u044c\u043d\u044b\u0439 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442;",
    "\u043e\u043d\u0430 \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u0442 \u0434\u043b\u044f \u0430\u043a\u043a\u043e\u043c\u043f\u0430\u043d\u0435\u043c\u0435\u043d\u0442\u0430 \u0438 \u043d\u0430\u043f\u0438\u0441\u0430\u043d\u0438\u044f \u043f\u0435\u0441\u0435\u043d;",
    "\u043d\u0430 \u043d\u0435\u0439 \u0438\u0433\u0440\u0430\u044e\u0442 \u0432 \u043a\u043b\u0430\u0441\u0441\u0438\u043a\u0435, \u0440\u043e\u043a\u0435, \u0434\u0436\u0430\u0437\u0435, \u0431\u043b\u044e\u0437\u0435 \u0438 \u043f\u043e\u043f-\u043c\u0443\u0437\u044b\u043a\u0435;",
    "\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u043c\u043d\u043e\u0433\u043e \u0444\u043e\u0440\u043c \u0438 \u0442\u0435\u0445\u043d\u0438\u043a \u0438\u0433\u0440\u044b \u043f\u043e\u0434 \u0440\u0430\u0437\u043d\u044b\u0439 \u0441\u0442\u0438\u043b\u044c."
  ],
  historyTitle: "\u041a\u0440\u0430\u0442\u043a\u0430\u044f \u0438\u0441\u0442\u043e\u0440\u0438\u044f \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044f",
  history: [
    {
      period: "\u0414\u0440\u0435\u0432\u043d\u0438\u0435 \u043a\u043e\u0440\u043d\u0438",
      text: "\u041f\u0440\u0435\u0434\u043a\u0430\u043c\u0438 \u0433\u0438\u0442\u0430\u0440\u044b \u0441\u0447\u0438\u0442\u0430\u044e\u0442 \u043b\u044e\u0442\u043d\u044e, \u0443\u0434 \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0449\u0438\u043f\u043a\u043e\u0432\u044b\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043e\u0432\u0430\u043b\u0438 \u043d\u0430 \u0411\u043b\u0438\u0436\u043d\u0435\u043c \u0412\u043e\u0441\u0442\u043e\u043a\u0435 \u0438 \u0432 \u0415\u0432\u0440\u043e\u043f\u0435 \u0437\u0430\u0434\u043e\u043b\u0433\u043e \u0434\u043e \u043f\u043e\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u0441\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e\u0433\u043e \u043a\u043e\u0440\u043f\u0443\u0441\u0430."
    },
    {
      period: "XVI-XVIII \u0432\u0435\u043a\u0430",
      text: "\u0412 \u0418\u0441\u043f\u0430\u043d\u0438\u0438 \u0438 \u0418\u0442\u0430\u043b\u0438\u0438 \u0441\u0444\u043e\u0440\u043c\u0438\u0440\u043e\u0432\u0430\u043b\u0438\u0441\u044c \u0440\u0430\u043d\u043d\u0438\u0435 \u0444\u043e\u0440\u043c\u044b \u0433\u0438\u0442\u0430\u0440\u044b \u0441 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u043c\u0438 \u0441\u0442\u0440\u0443\u043d\u0430\u043c\u0438 \u0438 \u0431\u043e\u043b\u0435\u0435 \u043a\u043e\u043c\u043f\u0430\u043a\u0442\u043d\u044b\u043c \u043a\u043e\u0440\u043f\u0443\u0441\u043e\u043c. \u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442 \u043f\u043e\u0441\u0442\u0435\u043f\u0435\u043d\u043d\u043e \u0441\u0442\u0430\u043b \u0447\u0430\u0441\u0442\u044c\u044e \u0431\u044b\u0442\u043e\u0432\u043e\u0439 \u0438 \u043f\u0440\u0438\u0434\u0432\u043e\u0440\u043d\u043e\u0439 \u043c\u0443\u0437\u044b\u043a\u0438."
    },
    {
      period: "XIX \u0432\u0435\u043a",
      text: "\u041c\u0430\u0441\u0442\u0435\u0440 \u0410\u043d\u0442\u043e\u043d\u0438\u043e \u0422\u043e\u0440\u0440\u0435\u0441 \u0441\u0438\u043b\u044c\u043d\u043e \u043f\u043e\u0432\u043b\u0438\u044f\u043b \u043d\u0430 \u0444\u043e\u0440\u043c\u0443 \u043a\u043b\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043a\u043e\u0439 \u0433\u0438\u0442\u0430\u0440\u044b: \u0443\u0432\u0435\u043b\u0438\u0447\u0438\u043b \u043a\u043e\u0440\u043f\u0443\u0441, \u0443\u0442\u043e\u0447\u043d\u0438\u043b \u043f\u0440\u043e\u043f\u043e\u0440\u0446\u0438\u0438 \u0438 \u0441\u0434\u0435\u043b\u0430\u043b \u0437\u0432\u0443\u0447\u0430\u043d\u0438\u0435 \u0431\u043e\u043b\u0435\u0435 \u0433\u043b\u0443\u0431\u043e\u043a\u0438\u043c \u0438 \u0443\u0441\u0442\u043e\u0439\u0447\u0438\u0432\u044b\u043c."
    },
    {
      period: "XX \u0432\u0435\u043a \u0438 \u0434\u0430\u043b\u044c\u0448\u0435",
      text: "\u041f\u043e\u044f\u0432\u0438\u043b\u0438\u0441\u044c \u0430\u043a\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0438 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u0433\u0438\u0442\u0430\u0440\u044b, \u0430 \u0432\u043c\u0435\u0441\u0442\u0435 \u0441 \u043d\u0438\u043c\u0438 \u043d\u043e\u0432\u044b\u0435 \u0436\u0430\u043d\u0440\u044b: \u0431\u043b\u044e\u0437, \u0440\u043e\u043a, \u0434\u0436\u0430\u0437, \u043c\u0435\u0442\u0430\u043b, \u043f\u043e\u043f \u0438 \u043e\u0433\u0440\u043e\u043c\u043d\u043e\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0433\u0438\u0431\u0440\u0438\u0434\u043d\u044b\u0445 \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0439."
    }
  ]
} as const;

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

    slide.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  };

  const revealSlide = (index: number, alignSection = false) => {
    if (alignSection) {
      sliderSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    setCurrentIndex(index);

    if (alignSection) {
      window.setTimeout(() => {
        scrollToIndex(index);
      }, 180);
      return;
    }

    requestAnimationFrame(() => {
      scrollToIndex(index);
    });
  };

  const paginate = (direction: number) => {
    setCurrentIndex((previous) => {
      const next = previous + direction;
      const clamped = Math.max(0, Math.min(next, sections.length - 1));
      requestAnimationFrame(() => {
        scrollToIndex(clamped);
      });
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
            {sections.map((section, index) => (
              <button key={section.id} type="button" onClick={() => revealSlide(index, true)}>
                {section.label}
              </button>
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
            {copy.author}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {copy.heroTitle}
          </motion.h1>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            {copy.heroLead}
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
                    revealSlide(index);
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
              <div className="stage-slider__spacer" aria-hidden="true" />
              {sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  ref={(element) => {
                    slideRefs.current[index] = element;
                  }}
                  className={`stage-slider__slide stage stage--${section.tone} ${
                    index === 0 ? "stage--article" : ""
                  }`}
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

                  {index === 0 ? (
                    <div className="stage__article">
                      <div className="stage__article-intro">
                        <span className="stage__label">{copy.articleLabel}</span>
                        <h2>{copy.articleTitle}</h2>
                        <p>{copy.articleText1}</p>
                        <p>{copy.articleText2}</p>
                      </div>

                      <div className="stage__article-grid">
                        <div className="stage__article-card">
                          <h3>{copy.reasonsTitle}</h3>
                          <ul>
                            {copy.reasons.map((reason) => (
                              <li key={reason}>{reason}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="stage__article-card">
                          <h3>{copy.historyTitle}</h3>
                          <div className="stage__timeline">
                            {copy.history.map((item) => (
                              <article key={item.period} className="stage__timeline-item">
                                <span>{item.period}</span>
                                <p>{item.text}</p>
                              </article>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="stage__empty" />
                  )}
                </motion.section>
              ))}
              <div className="stage-slider__spacer" aria-hidden="true" />
            </div>
          </div>
        </motion.section>
      </section>
    </>
  );
}
