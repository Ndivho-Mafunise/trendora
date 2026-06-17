import { useEffect, useState } from "react";
import { Search as SearchIcon, Loader2 } from "lucide-react";

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
    <div className="flex justify-center py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className="flex items-center gap-3 border-b border-ink/30 focus-within:border-ink transition-colors pb-2">
          <SearchIcon className="h-5 w-5 text-ink-faint shrink-0" strokeWidth={1.5} />
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            value={query}
            placeholder="Search shirts, shoes, watches…"
            aria-label="Search products"
            className="flex-1 bg-transparent text-base text-ink placeholder:text-ink-faint focus:outline-none"
          />
          {loading && (
            <Loader2 className="h-4 w-4 text-ink-faint animate-spin shrink-0" />
          )}
        </div>
      </form>
    </div>
  );
}