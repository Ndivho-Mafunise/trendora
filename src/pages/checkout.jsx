import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/useCart";
import { Button } from "@/components/ui/button";

const FREE_SHIPPING_THRESHOLD = 75;

const checkoutSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z
    .string()
    .min(4, "Enter a valid postal code")
    .max(10, "Enter a valid postal code"),
  shippingMethod: z.enum(["standard", "express"]),
  cardName: z.string().min(1, "Name on card is required"),
  cardNumber: z
    .string()
    .regex(/^\d{13,19}$/, "Enter a valid card number"),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cardCvc: z.string().regex(/^\d{3,4}$/, "Enter a valid CVC"),
});

function Field({ label, error, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-danger mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-2.5 rounded-md border border-line bg-paper text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink/15 focus:border-ink transition-all";
const errorInputClass =
  "w-full px-4 py-2.5 rounded-md border border-danger/50 bg-paper text-sm text-ink focus:outline-none focus:ring-2 focus:ring-danger/20 focus:border-danger transition-all";

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [placedOrder, setPlacedOrder] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { shippingMethod: "standard" },
  });

  const shippingMethod = watch("shippingMethod");
  const shippingCost =
    subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : shippingMethod === "express"
      ? 14.99
      : 6.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  async function onSubmit(data) {
    await new Promise((r) => setTimeout(r, 600));
    const orderId = `#ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setPlacedOrder({ orderId, email: data.email });
    clearCart();
  }

  if (cartItems.length === 0 && !placedOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper pt-20 px-4">
        <div className="text-center">
          <p className="text-ink-soft text-lg">Your bag is empty.</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Continue shopping
          </Button>
        </div>
      </div>
    );
  }

  if (placedOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper pt-20 px-4">
        <div className="bg-card border border-line rounded-xl p-10 max-w-md w-full text-center">
          <CheckCircle2 className="h-14 w-14 text-success mx-auto mb-5" strokeWidth={1.5} />
          <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink mb-2">
            Order confirmed
          </h1>
          <p className="text-sm text-ink-soft mb-1">
            Order {placedOrder.orderId}
          </p>
          <p className="text-sm text-ink-soft mb-7">
            A confirmation has been sent to {placedOrder.email}
          </p>
          <Button onClick={() => navigate("/")} className="w-full">
            Continue shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pt-24 px-4 pb-16">
      <div className="max-w-5xl mx-auto">
        <p className="eyebrow text-clay mb-2">Checkout</p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-ink mb-8">
          Complete your order
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-8"
          noValidate
        >
          <div className="flex-1 space-y-8">
            {/* Contact */}
            <fieldset className="bg-card border border-line rounded-xl p-6">
              <legend className="eyebrow text-ink mb-4">Contact</legend>
              <Field label="Email" htmlFor="email" error={errors.email}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={errors.email ? errorInputClass : inputClass}
                  {...register("email")}
                />
              </Field>
            </fieldset>

            {/* Shipping address */}
            <fieldset className="bg-card border border-line rounded-xl p-6 space-y-4">
              <legend className="eyebrow text-ink mb-2">
                Shipping address
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="First name" htmlFor="firstName" error={errors.firstName}>
                  <input
                    id="firstName"
                    autoComplete="given-name"
                    className={errors.firstName ? errorInputClass : inputClass}
                    {...register("firstName")}
                  />
                </Field>
                <Field label="Last name" htmlFor="lastName" error={errors.lastName}>
                  <input
                    id="lastName"
                    autoComplete="family-name"
                    className={errors.lastName ? errorInputClass : inputClass}
                    {...register("lastName")}
                  />
                </Field>
              </div>
              <Field label="Address" htmlFor="address" error={errors.address}>
                <input
                  id="address"
                  autoComplete="shipping address-line1"
                  className={errors.address ? errorInputClass : inputClass}
                  {...register("address")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="City" htmlFor="city" error={errors.city}>
                  <input
                    id="city"
                    autoComplete="shipping address-level2"
                    className={errors.city ? errorInputClass : inputClass}
                    {...register("city")}
                  />
                </Field>
                <Field label="State" htmlFor="state" error={errors.state}>
                  <input
                    id="state"
                    autoComplete="shipping address-level1"
                    className={errors.state ? errorInputClass : inputClass}
                    {...register("state")}
                  />
                </Field>
                <Field label="ZIP code" htmlFor="zip" error={errors.zip}>
                  <input
                    id="zip"
                    autoComplete="shipping postal-code"
                    className={errors.zip ? errorInputClass : inputClass}
                    {...register("zip")}
                  />
                </Field>
              </div>
            </fieldset>

            {/* Shipping method */}
            <fieldset className="bg-card border border-line rounded-xl p-6">
              <legend className="eyebrow text-ink mb-4">
                Shipping method
              </legend>
              <div className="space-y-3">
                <label className="flex items-center justify-between border border-line rounded-md p-4 cursor-pointer transition-colors hover:border-ink/40 has-[:checked]:border-ink has-[:checked]:bg-clay-tint/40">
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="standard"
                      className="accent-ink"
                      {...register("shippingMethod")}
                    />
                    <span>
                      <span className="block text-sm font-medium text-ink">
                        Standard (3–5 business days)
                      </span>
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : "$6.99"}
                  </span>
                </label>
                <label className="flex items-center justify-between border border-line rounded-md p-4 cursor-pointer transition-colors hover:border-ink/40 has-[:checked]:border-ink has-[:checked]:bg-clay-tint/40">
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="express"
                      className="accent-ink"
                      {...register("shippingMethod")}
                    />
                    <span className="block text-sm font-medium text-ink">
                      Express (1–2 business days)
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : "$14.99"}
                  </span>
                </label>
              </div>
            </fieldset>

            {/* Payment */}
            <fieldset className="bg-card border border-line rounded-xl p-6 space-y-4">
              <legend className="eyebrow text-ink mb-2 flex items-center gap-2">
                Payment
                <ShieldCheck className="h-4 w-4 text-clay" strokeWidth={1.5} />
              </legend>
              <Field label="Name on card" htmlFor="cardName" error={errors.cardName}>
                <input
                  id="cardName"
                  autoComplete="cc-name"
                  className={errors.cardName ? errorInputClass : inputClass}
                  {...register("cardName")}
                />
              </Field>
              <Field label="Card number" htmlFor="cardNumber" error={errors.cardNumber}>
                <input
                  id="cardNumber"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="1234 1234 1234 1234"
                  className={errors.cardNumber ? errorInputClass : inputClass}
                  {...register("cardNumber")}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry (MM/YY)" htmlFor="cardExpiry" error={errors.cardExpiry}>
                  <input
                    id="cardExpiry"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    className={errors.cardExpiry ? errorInputClass : inputClass}
                    {...register("cardExpiry")}
                  />
                </Field>
                <Field label="CVC" htmlFor="cardCvc" error={errors.cardCvc}>
                  <input
                    id="cardCvc"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    className={errors.cardCvc ? errorInputClass : inputClass}
                    {...register("cardCvc")}
                  />
                </Field>
              </div>
            </fieldset>
          </div>

          {/* Order summary */}
          <div className="lg:w-96">
            <div className="bg-card border border-line rounded-xl p-6 sticky top-24">
              <h3 className="eyebrow text-ink mb-5">Order summary</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div key={item.lineId} className="flex gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-md border border-line flex-shrink-0"
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-ink line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-ink-faint">
                        Qty {item.qty}
                        {item.size && ` · Size ${item.size}`}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-ink">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-line pt-4">
                <div className="flex justify-between text-ink-soft">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "text-success" : ""}>
                    {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <span>Estimated tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline text-ink font-semibold border-t border-line pt-3">
                  <span>Total</span>
                  <span className="font-display text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full mt-6" disabled={isSubmitting}>
                {isSubmitting ? "Placing order…" : `Place order · $${total.toFixed(2)}`}
              </Button>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-ink-faint">
                <span className="flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" /> Secure checkout
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5" /> Easy returns
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
