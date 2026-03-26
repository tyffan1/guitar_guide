import { motion } from "framer-motion";

const items = [
  "Astro как основа и маршрутизация",
  "React-компоненты для интерактива",
  "Framer Motion для живой анимации"
];

export function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero__panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.span
          className="hero__eyebrow"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Starter kit
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Основа сайта на Astro, React и Framer Motion
        </motion.h1>

        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          База уже готова: можно сразу развивать страницы, блоки и анимации
          под твой контент.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <a className="button button--primary" href="#stack">
            Смотреть стек
          </a>
          <a className="button button--ghost" href="https://astro.build">
            Astro Docs
          </a>
        </motion.div>
      </motion.div>

      <motion.ul
        id="stack"
        className="feature-list"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.55
            }
          }
        }}
      >
        {items.map((item) => (
          <motion.li
            key={item}
            className="feature-card"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
