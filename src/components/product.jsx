import { useNavigate } from "react-router-dom";
import { Star, ArrowUpRight } from "lucide-react";

export default function Product({ product }) {
  const navigate = useNavigate();

  function handleButton() {
    navigate(`/product/${product.id}`, { state: { product } });
  }

  return (
    <div
      onClick={handleButton}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleButton()}
      className="group cursor-pointer flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded-lg"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg bg-card border border-line aspect-[4/5]">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/[0.06] transition-colors duration-300" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 bg-card/95 backdrop-blur-sm text-ink text-xs font-medium px-3 py-1.5 rounded-full opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          View
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Info */}
      <div className="pt-4 flex flex-col flex-1">
        <p className="eyebrow text-ink-faint">{product.brand}</p>
        <h4 className="font-medium text-ink text-[0.95rem] leading-snug line-clamp-2 mt-1.5 group-hover:text-clay transition-colors">
          {product.title}
        </h4>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-ink">
            ${product.price}
          </span>
          <span className="flex items-center gap-1 text-xs text-ink-soft">
            <Star className="h-3.5 w-3.5 fill-clay text-clay" />
            {product.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
