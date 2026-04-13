import { useEffect, useState } from "react";

const URL = "https://dummyjson.com/products/category";

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Search({ setProducts }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const mensCategory = ["mens-shirts", "mens-shoes", "mens-watches"];

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    // Load all products on mount with randomization
    fetchData();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.trim() !== "") {
        fetchData();
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [query]);

  async function fetchData() {
    setLoading(true);
    try {
      let allProducts = [];
      for (let category of mensCategory) {
        const res = await fetch(`${URL}/${category}`);
        const data = await res.json();
        allProducts = allProducts.concat(data.products);
      }

      // Filter if search query exists
      let filteredProducts = allProducts;
      if (query.trim() !== "") {
        filteredProducts = allProducts.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Always shuffle for random display
      const shuffledProducts = shuffleArray(filteredProducts);
      setProducts(shuffledProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center my-8">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md relative">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          value={query}
          placeholder="Search products..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Search
        </button>
        {loading && (
          <div className="absolute right-20 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
          </div>
        )}
      </form>
    </div>
  );
}