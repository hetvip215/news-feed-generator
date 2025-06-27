import React from "react";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ article }) => {
  const navigate = useNavigate();

  const {
    title,
    description,
    urlToImage,
    source,
    publishedAt,
    author,
  } = article;

  const handleClick = () => {
    navigate("/article", { state: { article } });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-md transition cursor-pointer max-w-md w-full overflow-hidden"
    >
      {/* Image */}
      {urlToImage && (
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-36 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Meta */}
        <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
          <span>{source?.name || "News Source"}</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        {/* Chips */}
        <div className="flex items-center justify-between pt-2 text-xs">
          <span className="bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-gray-200 px-2 py-0.5 rounded-full">
            {author || "Unknown"}
          </span>
          <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
            {source?.name || "News"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
