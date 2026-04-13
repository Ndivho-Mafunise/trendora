import Product from "./product";

export default function Products({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fadeIn"
          style={{
            animationDelay: `${Math.min(index * 0.05, 0.5)}s`,
            opacity: 0,
            animationFillMode: "forwards"
          }}
        >
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}