import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ArticlePage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.article) {
      navigate("/");
    }

    // Track click
    fetch("http://localhost:5000/api/v1/activity/track-click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        url: state.article.url,
        title: state.article.title,
        content: state.article.content || state.article.description,
      }),
    }).catch((err) => console.error("Tracking failed", err));
  }, [state, navigate]);

  if (!state?.article) return null;

  const { title, urlToImage, description, content, url, source, publishedAt } = state.article;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Hero Image */}
      {urlToImage && (
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-6">
            <img
            src={urlToImage}
            alt={title}
            className="w-full max-h-[60vh] object-cover object-center rounded-xl shadow-md"
            />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-6">
        

        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {title}
        </h1>

        <p className="text-sm text-gray-400">
          {new Date(publishedAt).toLocaleString()} • {source?.name}
        </p>

        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          {content || description || "No preview available."}
        </p>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline inline-block pt-4"
        >
          🔗 Read full article on {source?.name || "original site"}
        </a>
      </div>
    </div>
  );
}

export default ArticlePage;
