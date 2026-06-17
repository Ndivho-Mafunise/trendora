import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Tag, Lock, Truck } from "lucide-react";
import { useCart } from "@/context/useCart";
import { Button } from "@/components/ui/button";

const FREE_SHIPPING_THRESHOLD = 75;

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, subtotal } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState(null);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper pt-20 px-4">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-ink-faint mx-auto mb-5" strokeWidth={1} />
          <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
            Your bag is empty
          </h1>
          <p className="text-ink-soft text-sm mt-1.5">
            Pieces you add will appear here.
          </p>
          <Button onClick={() => navigate("/")} className="mt-6">
            Continue shopping
          </Button>
        </div>
      </div>
    );
  }

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shipping = remainingForFreeShipping > 0 ? 6.99 : 0;
  const total = subtotal + shipping;

  function handleApplyPromo(e) {
    e.preventDefault();
    if (!promoCode.trim()) return;
    setPromoMessage({ type: "error", text: "That code isn't valid." });
  }

  return (
    <div className="min-h-screen bg-paper pt-24 px-4 pb-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-line">
          <p className="eyebrow text-clay mb-2">Your bag</p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-ink">
            Shopping bag
          </h1>
          <p className="text-sm text-ink-soft mt-1.5">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Free shipping progress */}
        <div className="bg-card border border-line rounded-xl p-5 mb-6">
          {remainingForFreeShipping > 0 ? (
            <p className="text-sm text-ink mb-2.5 flex items-center gap-2">
              <Truck className="h-4 w-4 text-clay" strokeWidth={1.5} />
              Add <span className="font-semibold">${remainingForFreeShipping.toFixed(2)}</span> more for free shipping
            </p>
          ) : (
            <p className="text-sm text-success mb-2.5 flex items-center gap-2 font-medium">
              <Truck className="h-4 w-4" strokeWidth={1.5} />
              You've unlocked free shipping
            </p>
          )}
          <div className="h-1.5 bg-line rounded-full overflow-hidden">
            <div
              className="h-full bg-clay rounded-full transition-all duration-500"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.lineId}
                className="bg-card border border-line rounded-xl p-4 flex gap-4 hover:border-ink/20 transition-colors"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0 border border-line"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-ink text-sm line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="eyebrow text-ink-faint mt-1.5">
                      {item.brand}
                      {item.size && <span> · Size {item.size}</span>}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-base font-semibold text-ink">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                      <div className="inline-flex items-center border border-line rounded-md">
                        <button
                          onClick={() => updateQty(item.lineId, item.qty - 1)}
                          aria-label={`Decrease quantity of ${item.title}`}
                          className="h-8 w-8 flex items-center justify-center text-ink-soft hover:text-ink"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium" aria-live="polite">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.lineId, item.qty + 1)}
                          aria-label={`Increase quantity of ${item.title}`}
                          className="h-8 w-8 flex items-center justify-center text-ink-soft hover:text-ink"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.lineId)}
                      aria-label={`Remove ${item.title} from cart`}
                      className="text-xs text-ink-soft hover:text-danger transition-colors px-3 py-1.5 rounded-md hover:bg-danger-tint"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-card border border-line rounded-xl p-6 sticky top-24">
              <h3 className="eyebrow text-ink mb-5">Order summary</h3>

              <form onSubmit={handleApplyPromo} className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    aria-label="Promo code"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-line rounded-md bg-paper focus:outline-none focus:ring-2 focus:ring-ink/15 focus:border-ink"
                  />
                </div>
                <Button type="submit" variant="secondary" size="sm">
                  Apply
                </Button>
              </form>
              {promoMessage && (
                <p className="text-xs text-danger mb-4" role="alert">
                  {promoMessage.text}
                </p>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-ink-soft">
                  <span>Subtotal</span>
                  <span className="font-medium text-ink">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <span>Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? "text-success" : "text-ink"}`}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-line pt-3 flex justify-between items-baseline text-ink font-semibold">
                  <span>Total</span>
                  <span className="font-display text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                onClick={() => navigate("/checkout")}
                size="lg"
                className="w-full mt-6"
              >
                Proceed to checkout
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-ink-faint mt-3">
                <Lock className="h-3.5 w-3.5" />
                Secure checkout
              </p>
              <Button
                onClick={() => navigate("/")}
                variant="ghost"
                className="w-full mt-1"
              >
                Continue shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
