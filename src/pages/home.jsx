import { useRef } from "react";
import { motion } from "motion/react";
import { Truck, RotateCcw, ShieldCheck, ArrowRight, SearchX } from "lucide-react";
import Products from "../components/products";
import Search from "../components/search";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home({ setProducts, products }) {
  const gridRef = useRef(null);

  const scrollToGrid = () =>
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-paper pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero — type led */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="pt-10 pb-14 md:pt-16 md:pb-20 border-b border-line"
        >
          <motion.p
            variants={item}
            className="eyebrow text-clay flex items-center gap-3"
          >
            <span className="h-px w-8 bg-clay" />
            Spring / Summer 2026
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl leading-[0.92] sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-ink mt-6 max-w-4xl text-balance"
          >
            Tailored for the <span className="text-clay">everyday</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-ink-soft text-lg leading-relaxed mt-6 max-w-xl"
          >
            Considered menswear — shirts, shoes and watches chosen to be worn
            well and often. No noise, just pieces that last.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-6 mt-9">
            <button
              onClick={scrollToGrid}
              className="group inline-flex items-center gap-2.5 h-13 px-8 rounded-md bg-ink text-paper text-sm uppercase tracking-wide font-semibold hover:bg-clay hover:text-ink transition-colors duration-200"
            >
              Shop the edit
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              onClick={scrollToGrid}
              className="eyebrow text-ink link-underline"
            >
              Browse the collection
            </button>
          </motion.div>
        </motion.section>

        {/* Service strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line border-b border-line">
          {[
            { icon: Truck, title: "Free shipping over $75", note: "On all domestic orders" },
            { icon: RotateCcw, title: "30-day returns", note: "Easy and free" },
            { icon: ShieldCheck, title: "Secure checkout", note: "Encrypted payment" },
          ].map(({ icon: Icon, title, note }) => (
            <div key={title} className="flex items-center gap-3 py-5 sm:px-6">
              <Icon className="h-5 w-5 text-clay shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-ink">{title}</p>
                <p className="text-xs text-ink-faint">{note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <Search setProducts={setProducts} />

        {/* Products */}
        <section ref={gridRef} id="featured-products" className="pb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow text-clay mb-2">The Edit</p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-ink">
                Featured pieces
              </h2>
            </div>
            <p className="text-sm text-ink-soft hidden sm:block">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24 border border-line rounded-xl bg-card">
              <SearchX
                className="h-12 w-12 text-ink-faint mx-auto mb-4"
                strokeWidth={1}
              />
              <p className="text-ink text-lg font-medium">Nothing matched</p>
              <p className="text-ink-soft text-sm mt-1">
                Try a different search term.
              </p>
            </div>
          ) : (
            <Products products={products} />
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl font-extrabold uppercase tracking-[0.14em] text-ink">
              Trendora
            </p>
            <p className="text-sm text-ink-soft mt-1">
              Considered menswear, made to last.
            </p>
          </div>
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} Trendora. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
