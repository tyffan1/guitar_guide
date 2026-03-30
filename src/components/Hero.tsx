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
  ],
  anatomyLabel: "Строение гитары",
  anatomyTitle: "Из каких частей состоит гитара",
  anatomyLead:
    "У большинства акустических и классических гитар базовая конструкция похожа: корпус усиливает звук, гриф помогает зажимать ноты, а струны создают само звучание.",
  anatomyParts: [
    {
      title: "Головка грифа",
      text: "На ней расположены колки, которыми натягивают и настраивают струны."
    },
    {
      title: "Гриф и лады",
      text: "Гриф делится на лады. Когда струна прижимается к ладу, меняется высота звука."
    },
    {
      title: "Верхний и нижний порожки",
      text: "Они задают высоту струн над грифом и помогают удерживать правильную длину звучащей части."
    },
    {
      title: "Корпус",
      text: "Верхняя дека, обечайка и нижняя дека формируют резонатор, который делает звук громче и объёмнее."
    },
    {
      title: "Резонаторное отверстие",
      text: "Через него выходит часть звуковых волн, а сам корпус начинает сильнее резонировать."
    },
    {
      title: "Подставка",
      text: "Удерживает струны на корпусе и передаёт их вибрацию на верхнюю деку."
    }
  ],
  anatomyFlow: [
    "Струна начинает вибрировать после щипка.",
    "Подставка передаёт колебания на верхнюю деку.",
    "Корпус усиливает резонанс и делает звук насыщеннее."
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
                  ) : index === 1 ? (
                    <div className="stage__anatomy">
                      <div className="stage__anatomy-intro">
                        <span className="stage__label">{copy.anatomyLabel}</span>
                        <h2>{copy.anatomyTitle}</h2>
                        <p>{copy.anatomyLead}</p>
                      </div>

                      <div className="stage__anatomy-grid">
                        <div className="stage__diagram-card">
                          <div className="guitar-diagram" aria-hidden="true">
                            <svg className="guitar-diagram__svg" viewBox="0 0 420 760" role="presentation">
                              <defs>
                                <linearGradient id="diagramHead" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#b6703d" />
                                  <stop offset="100%" stopColor="#88512c" />
                                </linearGradient>
                                <linearGradient id="diagramNeck" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#875331" />
                                  <stop offset="100%" stopColor="#684025" />
                                </linearGradient>
                                <radialGradient id="diagramBody" cx="50%" cy="28%" r="78%">
                                  <stop offset="0%" stopColor="#ffdca3" />
                                  <stop offset="56%" stopColor="#f2bf7c" />
                                  <stop offset="100%" stopColor="#ca8349" />
                                </radialGradient>
                                <radialGradient id="diagramRosette" cx="50%" cy="50%" r="50%">
                                  <stop offset="0%" stopColor="#f8e8cf" />
                                  <stop offset="100%" stopColor="#d8ab75" />
                                </radialGradient>
                              </defs>

                              <rect x="118" y="30" width="104" height="102" rx="28" fill="url(#diagramHead)" />
                              <rect x="140" y="50" width="26" height="62" rx="13" fill="#5b3622" />
                              <rect x="174" y="50" width="26" height="62" rx="13" fill="#5b3622" />
                              <circle cx="132" cy="60" r="5" fill="#f1e6da" />
                              <circle cx="132" cy="80" r="5" fill="#f1e6da" />
                              <circle cx="132" cy="100" r="5" fill="#f1e6da" />
                              <circle cx="208" cy="60" r="5" fill="#f1e6da" />
                              <circle cx="208" cy="80" r="5" fill="#f1e6da" />
                              <circle cx="208" cy="100" r="5" fill="#f1e6da" />

                              <rect x="151" y="118" width="38" height="244" rx="4" fill="url(#diagramNeck)" />
                              <path
                                d="M137 320C137 298 151 282 170 282C189 282 203 298 203 320V430H137V320Z"
                                fill="#d7ad79"
                                opacity="0.38"
                              />
                              <rect x="144" y="140" width="52" height="294" rx="18" fill="#6f4328" opacity="0.2" />
                              {[
                                166, 192, 218, 244, 270, 296, 322
                              ].map((y) => (
                                <rect key={y} x="151" y={y} width="38" height="3" rx="1.5" fill="#ebdcc8" opacity="0.92" />
                              ))}

                              <path
                                d="M170 286C123 286 84 317 84 366C84 403 103 433 131 447C78 470 46 520 46 592C46 689 101 742 170 742C239 742 294 689 294 592C294 520 262 470 209 447C237 433 256 403 256 366C256 317 217 286 170 286Z"
                                fill="url(#diagramBody)"
                              />
                              <path
                                d="M170 312C132 312 103 338 103 379C103 410 119 434 142 446C98 464 71 506 71 566C71 646 115 695 170 695C225 695 269 646 269 566C269 506 242 464 198 446C221 434 237 410 237 379C237 338 208 312 170 312Z"
                                fill="none"
                                stroke="#f7ddb0"
                                strokeWidth="4"
                                opacity="0.6"
                              />

                              <path
                                d="M151 120H189V438C189 448 181 456 170 456C159 456 151 448 151 438V120Z"
                                fill="url(#diagramNeck)"
                              />
                              <path d="M145 282H195V430C195 446 184 458 170 458C156 458 145 446 145 430V282Z" fill="#d6ab76" opacity="0.34" />
                              {[166, 192, 218, 244, 270, 296, 322, 348].map((y) => (
                                <rect key={`body-fret-${y}`} x="151" y={y} width="38" height="3" rx="1.5" fill="#ebdcc8" opacity="0.92" />
                              ))}

                              <circle cx="170" cy="542" r="42" fill="#171313" />
                              <circle cx="170" cy="542" r="58" fill="none" stroke="url(#diagramRosette)" strokeWidth="16" />
                              <circle cx="170" cy="542" r="73" fill="none" stroke="#efcd98" strokeWidth="4" opacity="0.44" />

                              <rect x="131" y="633" width="78" height="14" rx="7" fill="#f9e9d6" />
                              <rect x="110" y="648" width="120" height="38" rx="18" fill="#4d2d1b" />

                              {["156", "162", "168", "174", "180", "186"].map((x) => (
                                <rect
                                  key={x}
                                  x={x}
                                  y="54"
                                  width="2.2"
                                  height="594"
                                  rx="1.1"
                                  fill="#fbf3e9"
                                  opacity="0.95"
                                />
                              ))}
                            </svg>

                            <div className="guitar-diagram__callout guitar-diagram__callout--head">
                              <span>1</span>
                              Головка и колки
                            </div>
                            <div className="guitar-diagram__callout guitar-diagram__callout--neck">
                              <span>2</span>
                              Гриф и лады
                            </div>
                            <div className="guitar-diagram__callout guitar-diagram__callout--body">
                              <span>3</span>
                              Корпус
                            </div>
                            <div className="guitar-diagram__callout guitar-diagram__callout--hole">
                              <span>4</span>
                              Резонаторное отверстие
                            </div>
                            <div className="guitar-diagram__callout guitar-diagram__callout--bridge">
                              <span>5</span>
                              Подставка и струны
                            </div>
                          </div>
                        </div>

                        <div className="stage__anatomy-side">
                          <div className="stage__article-card">
                            <h3>Основные части</h3>
                            <div className="anatomy-list">
                              {copy.anatomyParts.map((part) => (
                                <article key={part.title} className="anatomy-list__item">
                                  <h4>{part.title}</h4>
                                  <p>{part.text}</p>
                                </article>
                              ))}
                            </div>
                          </div>

                          <div className="stage__article-card stage__flow-card">
                            <h3>Как рождается звук</h3>
                            <div className="sound-flow" aria-hidden="true">
                              <div className="sound-flow__string" />
                              <div className="sound-flow__wave sound-flow__wave--one" />
                              <div className="sound-flow__wave sound-flow__wave--two" />
                              <div className="sound-flow__wave sound-flow__wave--three" />
                            </div>
                            <ol className="sound-flow__steps">
                              {copy.anatomyFlow.map((step) => (
                                <li key={step}>{step}</li>
                              ))}
                            </ol>
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
