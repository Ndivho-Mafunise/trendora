import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function ProductDetails({ addToCart }) {
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function getStatusStyle(status) {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      case "Out of Stock":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back link */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <Link
          to="/"
          className="text-sm text-gray-500 hover:text-black transition inline-flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Main product section */}
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 lg:gap-12">
        <div className="md:w-1/2">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-80 md:h-[28rem] object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">
            {product.brand}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h2>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-sm text-yellow-500 font-medium flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {product.rating}
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            {product.description}
          </p>

          <div className="mt-2">
            <span
              className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full ${getStatusStyle(product.availabilityStatus)}`}
            >
              {product.availabilityStatus}
            </span>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={product.availabilityStatus === "Out of Stock"}
            className={`mt-6 w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
              added
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                : product.availabilityStatus === "Out of Stock"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600"
            }`}
          >
            {added ? (
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Added to Cart
              </span>
            ) : product.availabilityStatus === "Out of Stock" ? (
              "Out of Stock"
            ) : (
              "Add to Cart"
            )}
          </button>

          {added && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Item added!{" "}
              <Link to="/cart" className="underline hover:no-underline">
                View cart
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
