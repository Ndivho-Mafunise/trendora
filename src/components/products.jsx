import { motion } from "motion/react";
import Product from "./product";

export default function Products({ products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.5,
            delay: Math.min((index % 8) * 0.05, 0.4),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Product product={product} />
        </motion.div>
      ))}
    </div>
  );
}
