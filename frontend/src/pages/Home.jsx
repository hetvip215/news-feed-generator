import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import NewsCard from "../components/NewsCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [query, setQuery] = useState("technology");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNews = async (searchQuery) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/news?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();
      setArticles(data?.data || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/activity/recommendations", {
        credentials: "include",
      });
      const data = await res.json();
      if (data?.articles?.length > 0) {
        setRecommended(data.articles.slice(0, 3)); // only first 3
      }
    } catch (err) {
      console.warn("Recommendation fetch failed", err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setQuery(input.trim());

      // Track search
      await fetch("http://localhost:5000/api/v1/activity/track-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ keyword: input.trim() }),
      });
    }
  };

  useEffect(() => {
    fetchNews(query);
    fetchRecommendations();
  }, [query]);

  return (
    <div className="p-4 min-h-screen bg-[#121212] text-white">
      <ToastContainer />

      {user && (
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Welcome, {user.username || "User"}!
          </h1>
          <p className="text-sm text-gray-400">
            Get the latest news tailored to your interests.
          </p>
        </div>
      )}

      {/* 🔍 Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Search news..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-xl bg-[#1e1e1e] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 text-white font-medium"
        >
          Search
        </button>
      </form>

      {/* ⭐ Recommended - just 1 row */}
      {recommended.length > 0 && (
        <div className="mb-10 px-4 sm:px-8 md:px-16">
          <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((article, i) => (
              <NewsCard key={i} article={article} />
            ))}
          </div>
        </div>
      )}

      {/* 📰 News Results */}
      <div className="px-4 sm:px-8 md:px-16 py-8">
        <h2 className="text-xl font-semibold mb-4 capitalize">
          Results for "{query}"
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading news...</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-400">No articles found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
