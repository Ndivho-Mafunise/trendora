import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { Star, ChevronLeft, Check, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/useCart";
import { Button } from "@/components/ui/button";

const SIZES = ["S", "M", "L", "XL", "XXL"];

function getStatusStyle(status) {
  switch (status) {
    case "In Stock":
      return "bg-success-tint text-success";
    case "Low Stock":
      return "bg-warn-tint text-warn";
    case "Out of Stock":
      return "bg-danger-tint text-danger";
    default:
      return "bg-line text-ink-soft";
  }
}

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    // Always refetch by id so refresh/share/back-nav never lose product data,
    // even if router state already gave us a value to render instantly.
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("not found");
        const data = await res.json();
        if (!cancelled) setProduct(data);
      } catch {
        if (!cancelled && !location.state?.product) setProduct(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleAddToCart() {
    if (!size) {
      setSizeError(true);
      toast.error("Please select a size");
      return;
    }
    addToCart(product, { size, qty });
    toast.success("Added to cart", {
      description: `${product.title} (${size}) × ${qty}`,
      action: { label: "View cart", onClick: () => navigate("/cart") },
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-paper">
        <div className="w-8 h-8 border-2 border-line border-t-ink rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20 bg-paper">
        <p className="text-ink-soft">Product not found.</p>
        <Link to="/" className="eyebrow text-ink link-underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.thumbnail];
  const outOfStock = product.availabilityStatus === "Out of Stock";

  return (
    <div className="min-h-screen bg-paper pt-20 pb-28 md:pb-12">
      {/* Back link */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="eyebrow text-ink-soft hover:text-ink transition inline-flex items-center gap-1.5"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      {/* Main product section */}
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 lg:gap-14">
        {/* Gallery */}
        <div className="md:w-1/2">
          <img
            src={images[activeImage]}
            alt={`${product.title} — view ${activeImage + 1}`}
            className="w-full aspect-square object-cover rounded-xl border border-line bg-card"
          />
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {images.slice(0, 6).map((img, idx) => (
                <button
                  key={img + idx}
                  onClick={() => setActiveImage(idx)}
                  aria-label={`Show image ${idx + 1} of ${product.title}`}
                  aria-current={activeImage === idx}
                  className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border transition-colors ${
                    activeImage === idx ? "border-ink" : "border-line"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 flex-1">
          <p className="eyebrow text-clay">{product.brand}</p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-ink leading-[1.05]">
            {product.title}
          </h1>
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl font-semibold text-ink">
              ${product.price}
            </span>
            <span className="text-sm text-ink-soft font-medium flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-clay text-clay" />
              {product.rating}
              {product.reviews?.length ? (
                <span className="text-ink-faint font-normal">
                  ({product.reviews.length} reviews)
                </span>
              ) : null}
            </span>
          </div>
          <p className="text-ink-soft text-[0.95rem] leading-relaxed">
            {product.description}
          </p>

          <span
            className={`inline-block w-fit text-xs font-semibold px-3 py-1.5 rounded-full ${getStatusStyle(product.availabilityStatus)}`}
          >
            {product.availabilityStatus}
          </span>

          {/* Size selector */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2.5">
              <span className="eyebrow text-ink">Size</span>
              {sizeError && (
                <span className="text-xs text-danger">Select a size</span>
              )}
            </div>
            <div className="flex gap-2" role="radiogroup" aria-label="Size">
              {SIZES.map((s) => (
                <button
                  key={s}
                  role="radio"
                  aria-checked={size === s}
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  className={`h-11 min-w-11 px-3 rounded-md text-sm font-medium border transition-colors ${
                    size === s
                      ? "bg-ink text-paper border-ink"
                      : sizeError
                      ? "border-danger/40 text-ink hover:border-ink"
                      : "border-line text-ink hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-2">
            <span className="eyebrow text-ink block mb-2.5">Quantity</span>
            <div className="inline-flex items-center border border-line rounded-md">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="h-11 w-11 flex items-center justify-center text-ink-soft hover:text-ink disabled:opacity-40"
                disabled={qty <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span
                className="w-10 text-center text-sm font-semibold"
                aria-live="polite"
              >
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
                className="h-11 w-11 flex items-center justify-center text-ink-soft hover:text-ink"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Desktop add to cart */}
          <Button
            onClick={handleAddToCart}
            disabled={outOfStock}
            size="lg"
            className="hidden md:flex mt-4 w-full sm:w-auto"
          >
            {outOfStock ? (
              "Out of Stock"
            ) : (
              <>
                <Check className="h-4 w-4" /> Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews?.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-6 pt-10 border-t border-line">
          <p className="eyebrow text-clay mb-2">Reviews</p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-ink mb-6">
            What people say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.slice(0, 4).map((review, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl p-5 border border-line"
              >
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating
                          ? "text-clay fill-clay"
                          : "text-line fill-line"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-ink leading-relaxed">{review.comment}</p>
                <p className="eyebrow text-ink-faint mt-3">
                  {review.reviewerName}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky mobile add-to-cart bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-line p-4 flex items-center gap-3 z-40">
        <div className="flex-1">
          <p className="text-xs text-ink-soft">Total</p>
          <p className="font-display text-lg font-semibold text-ink">
            ${(product.price * qty).toFixed(2)}
          </p>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={outOfStock}
          size="lg"
          className="flex-1"
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
