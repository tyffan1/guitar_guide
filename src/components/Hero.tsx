import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const sections = [
  { id: "block-1", label: "01", tone: "sun" },
  { id: "block-2", label: "02", tone: "forest" },
  { id: "block-3", label: "03", tone: "night" },
  { id: "block-4", label: "04", tone: "sun" }
] as const;

const guitarHistory = [
  {
    period: "Р”СЂРµРІРЅРёРµ РєРѕСЂРЅРё",
    text: "РџСЂРµРґРєР°РјРё РіРёС‚Р°СЂС‹ СЃС‡РёС‚Р°СЋС‚ Р»СЋС‚РЅСЋ, СѓРґ Рё РґСЂСѓРіРёРµ С‰РёРїРєРѕРІС‹Рµ РёРЅСЃС‚СЂСѓРјРµРЅС‚С‹, РєРѕС‚РѕСЂС‹Рµ СЃСѓС‰РµСЃС‚РІРѕРІР°Р»Рё РЅР° Р‘Р»РёР¶РЅРµРј Р’РѕСЃС‚РѕРєРµ Рё РІ Р•РІСЂРѕРїРµ Р·Р°РґРѕР»РіРѕ РґРѕ РїРѕСЏРІР»РµРЅРёСЏ СЃРѕРІСЂРµРјРµРЅРЅРѕРіРѕ РєРѕСЂРїСѓСЃР°."
  },
  {
    period: "XVI-XVIII РІРµРєР°",
    text: "Р’ РСЃРїР°РЅРёРё Рё РС‚Р°Р»РёРё СЃС„РѕСЂРјРёСЂРѕРІР°Р»РёСЃСЊ СЂР°РЅРЅРёРµ С„РѕСЂРјС‹ РіРёС‚Р°СЂС‹ СЃ РЅРµСЃРєРѕР»СЊРєРёРјРё СЃС‚СЂСѓРЅР°РјРё Рё Р±РѕР»РµРµ РєРѕРјРїР°РєС‚РЅС‹Рј РєРѕСЂРїСѓСЃРѕРј. РРЅСЃС‚СЂСѓРјРµРЅС‚ РїРѕСЃС‚РµРїРµРЅРЅРѕ СЃС‚Р°Р» С‡Р°СЃС‚СЊСЋ Р±С‹С‚РѕРІРѕР№ Рё РїСЂРёРґРІРѕСЂРЅРѕР№ РјСѓР·С‹РєРё."
  },
  {
    period: "XIX РІРµРє",
    text: "РњР°СЃС‚РµСЂ РђРЅС‚РѕРЅРёРѕ РўРѕСЂСЂРµСЃ СЃРёР»СЊРЅРѕ РїРѕРІР»РёСЏР» РЅР° С„РѕСЂРјСѓ РєР»Р°СЃСЃРёС‡РµСЃРєРѕР№ РіРёС‚Р°СЂС‹: СѓРІРµР»РёС‡РёР» РєРѕСЂРїСѓСЃ, СѓС‚РѕС‡РЅРёР» РїСЂРѕРїРѕСЂС†РёРё Рё СЃРґРµР»Р°Р» Р·РІСѓС‡Р°РЅРёРµ Р±РѕР»РµРµ РіР»СѓР±РѕРєРёРј Рё СѓСЃС‚РѕР№С‡РёРІС‹Рј."
  },
  {
    period: "XX РІРµРє Рё РґР°Р»СЊС€Рµ",
    text: "РџРѕСЏРІРёР»РёСЃСЊ Р°РєСѓСЃС‚РёС‡РµСЃРєРёРµ Рё СЌР»РµРєС‚СЂРѕРіРёС‚Р°СЂС‹, Р° РІРјРµСЃС‚Рµ СЃ РЅРёРјРё РЅРѕРІС‹Рµ Р¶Р°РЅСЂС‹: Р±Р»СЋР·, СЂРѕРє, РґР¶Р°Р·, РјРµС‚Р°Р», РїРѕРї Рё РѕРіСЂРѕРјРЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РіРёР±СЂРёРґРЅС‹С… РЅР°РїСЂР°РІР»РµРЅРёР№."
  }
] as const;
const firstGuitarChecklist = [
  "??????? ??????, ??????? ?????? ????????? ? ????? ? ?? ??????.",
  "??? ?????? ????? ???????? ?????? ???????, ????? ?????? ??????? ????????.",
  "???????, ????? ???? ??? ??????, ? ???? ?? ??????????.",
  "????? ????????? ????? ? ????????? ????? ??????????.",
  "????? ?????????? ?? 15?20 ????? ?????? ????, ??? ?????, ?? ???????."
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
            РђРІС‚РѕСЂ - РЎР°РІРµРЅРєРѕРІ РЎРµРјС‘РЅ
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            Р­С‚Рѕ РјРѕР№ РїРµСЂРІС‹Р№ pet-РїСЂРѕРµРєС‚
          </motion.h1>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Р’ СЌС‚РѕРј РїСЂРѕРµРєС‚Рµ СЏ РёСЃРїРѕР»СЊР·РѕРІР°Р» React Рё TypeScript РґР»СЏ СЃРѕР·РґР°РЅРёСЏ РёРЅС‚РµСЂР°РєС‚РёРІРЅРѕРіРѕ РёРЅС‚РµСЂС„РµР№СЃР°, Р° С‚Р°РєР¶Рµ Р±РёР±Р»РёРѕС‚РµРєСѓ Framer Motion РґР»СЏ Р°РЅРёРјР°С†РёРё СЌР»РµРјРµРЅС‚РѕРІ. Р¦РµР»СЊСЋ РїСЂРѕРµРєС‚Р° Р±С‹Р»Рѕ СЃРѕР·РґР°С‚СЊ РїСЂРёРІР»РµРєР°С‚РµР»СЊРЅС‹Р№ Рё С„СѓРЅРєС†РёРѕРЅР°Р»СЊРЅС‹Р№ РёРЅС‚РµСЂС„РµР№СЃ РґР»СЏ РґРµРјРѕРЅСЃС‚СЂР°С†РёРё РјРѕРёС… РЅР°РІС‹РєРѕРІ РІ РІРµР±-СЂР°Р·СЂР°Р±РѕС‚РєРµ. РІ СЌС‚РѕРј РїСЂРѕРµРєС‚Рµ СЏ РІР°Рј С…РѕС‡Сѓ СЂР°СЃСЃРєР°Р·Р°С‚СЊ Рѕ РіРёС‚Р°СЂР°С…
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
                        <span className="stage__label">Р§С‚Рѕ РўР°РєРѕРµ Р“РёС‚Р°СЂР°</span>
                        <h2>Р“РёС‚Р°СЂР° - РѕРґРёРЅ РёР· СЃР°РјС‹С… СѓР·РЅР°РІР°РµРјС‹С… РёРЅСЃС‚СЂСѓРјРµРЅС‚РѕРІ РІ РјРёСЂРµ.</h2>
                        <p>
                          Р“РёС‚Р°СЂР° - СЌС‚Рѕ СЃС‚СЂСѓРЅРЅС‹Р№ С‰РёРїРєРѕРІС‹Р№ РјСѓР·С‹РєР°Р»СЊРЅС‹Р№ РёРЅСЃС‚СЂСѓРјРµРЅС‚,
                          РЅР° РєРѕС‚РѕСЂРѕРј РёРіСЂР°СЋС‚ РїР°Р»СЊС†Р°РјРё РёР»Рё РјРµРґРёР°С‚РѕСЂРѕРј. РћРЅР° РјРѕР¶РµС‚
                          Р±С‹С‚СЊ Р°РєСѓСЃС‚РёС‡РµСЃРєРѕР№, РєР»Р°СЃСЃРёС‡РµСЃРєРѕР№ РёР»Рё СЌР»РµРєС‚СЂРёС‡РµСЃРєРѕР№, РЅРѕ
                          РІРѕ РІСЃРµС… РІР°СЂРёР°РЅС‚Р°С… РѕСЃС‚Р°С‘С‚СЃСЏ РёРЅСЃС‚СЂСѓРјРµРЅС‚РѕРј, РєРѕС‚РѕСЂС‹Р№
                          СЃРѕРµРґРёРЅСЏРµС‚ РјРµР»РѕРґРёСЋ, СЂРёС‚Рј Рё РіР°СЂРјРѕРЅРёСЋ РІ РѕРґРЅРѕРј РєРѕСЂРїСѓСЃРµ.
                        </p>
                        <p>
                          Р•С‘ С†РµРЅСЏС‚ Р·Р° СѓРЅРёРІРµСЂСЃР°Р»СЊРЅРѕСЃС‚СЊ: РіРёС‚Р°СЂР° РїРѕРґС…РѕРґРёС‚ Рё РґР»СЏ
                          РєР°РјРµСЂРЅРѕР№ РёРіСЂС‹ РґРѕРјР°, Рё РґР»СЏ Р±РѕР»СЊС€РёС… СЃС†РµРЅ, Рё РґР»СЏ
                          РѕР±СѓС‡РµРЅРёСЏ, Рё РґР»СЏ РїСЂРѕС„РµСЃСЃРёРѕРЅР°Р»СЊРЅРѕР№ Р·Р°РїРёСЃРё. РРјРµРЅРЅРѕ
                          РїРѕСЌС‚РѕРјСѓ РѕРЅР° СЃС‚Р°Р»Р° РѕРґРЅРёРј РёР· СЃР°РјС‹С… РїРѕРїСѓР»СЏСЂРЅС‹С…
                          РёРЅСЃС‚СЂСѓРјРµРЅС‚РѕРІ РІ РёСЃС‚РѕСЂРёРё РјСѓР·С‹РєРё.
                        </p>
                      </div>

                      <div className="stage__article-grid">
                        <div className="stage__article-card">
                          <h3>РџРѕС‡РµРјСѓ РіРёС‚Р°СЂР° С‚Р°Рє РїРѕРїСѓР»СЏСЂРЅР°</h3>
                          <ul>
                            <li>РµС‘ СѓРґРѕР±РЅРѕ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РєР°Рє СЃРѕР»СЊРЅС‹Р№ РёРЅСЃС‚СЂСѓРјРµРЅС‚;</li>
                            <li>РѕРЅР° РїРѕРґС…РѕРґРёС‚ РґР»СЏ Р°РєРєРѕРјРїР°РЅРµРјРµРЅС‚Р° Рё РЅР°РїРёСЃР°РЅРёСЏ РїРµСЃРµРЅ;</li>
                            <li>РЅР° РЅРµР№ РёРіСЂР°СЋС‚ РІ РєР»Р°СЃСЃРёРєРµ, СЂРѕРєРµ, РґР¶Р°Р·Рµ, Р±Р»СЋР·Рµ Рё РїРѕРї-РјСѓР·С‹РєРµ;</li>
                            <li>СЃСѓС‰РµСЃС‚РІСѓРµС‚ РјРЅРѕРіРѕ С„РѕСЂРј Рё С‚РµС…РЅРёРє РёРіСЂС‹ РїРѕРґ СЂР°Р·РЅС‹Р№ СЃС‚РёР»СЊ.</li>
                          </ul>
                        </div>

                        <div className="stage__article-card">
                          <h3>РљСЂР°С‚РєР°СЏ РёСЃС‚РѕСЂРёСЏ СЂР°Р·РІРёС‚РёСЏ</h3>
                          <div className="stage__timeline">
                            {guitarHistory.map((item) => (
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
            </div>
          </div>
        </motion.section>
      </section>
    </>
  );
}



