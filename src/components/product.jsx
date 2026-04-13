import { useNavigate } from "react-router-dom";

export default function Product({ product }) {
  const navigate = useNavigate();

  function handleButton() {
    navigate("/productDetails", { state: { product } });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer transform hover:-translate-y-1">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <button
            onClick={handleButton}
            className="bg-white/95 backdrop-blur-sm text-gray-900 px-5 py-2.5 rounded-xl text-sm font-semibold transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white"
          >
            Quick View
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-black transition-colors">
            {product.title}
          </h4>
          <p className="text-gray-500 text-xs mt-1.5 font-medium uppercase tracking-wider">
            {product.brand}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-yellow-700">{product.rating}</span>
          </div>
        </div>
        <button
          onClick={handleButton}
          className="mt-4 w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white text-sm py-2.5 rounded-xl font-medium hover:from-gray-800 hover:to-gray-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
