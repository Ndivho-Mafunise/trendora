import Products from "../components/products";
import Search from "../components/search";

export default function Home({ setProducts, products }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 animate-fadeIn">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8 md:p-16 shadow-2xl">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                New Season Arrivals
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Elevate Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Style Game
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                Discover premium menswear crafted for the modern gentleman.
                Quality meets sophistication.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Shop Now
                </button>
                <button className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                  View Collections
                </button>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                  fill="currentColor"
                  d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,71.6,33.3C61,45.1,51.1,55.8,40.5,64.1C29.9,72.4,18.6,78.3,6.8,75.6C-5,72.9,-16.2,61.6,-27.2,50.1C-38.2,38.6,-48.9,26.8,-57.6,14.1C-66.3,1.4,-73,-12.2,-69.1,-24.3C-65.2,-36.4,-50.7,-46.8,-36.7,-54.9C-22.7,-63,-9.2,-68.8,4.2,-75.2L44.7,-76.4Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <Search setProducts={setProducts} />
        </div>

        {/* Products Grid */}
        <div className="animate-fadeIn">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {products.length} {products.length === 1 ? "product" : "products"} available
              </p>
            </div>
            {/* Sort dropdown could be added here */}
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-gray-300 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-gray-400 text-lg">No products found</p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search terms
              </p>
            </div>
          ) : (
            <Products products={products} />
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 py-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© 2024 luno. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}