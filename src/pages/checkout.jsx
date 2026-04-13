import { useLocation } from "react-router-dom";

export default function Checkout() {
    const location = useLocation();
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h1>
        <p className="text-gray-500">Checkout page coming soon</p>
      </div>
    </div>
  );
}
