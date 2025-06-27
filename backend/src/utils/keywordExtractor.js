import keyword_extractor from "keyword-extractor";

export const extractKeywords = (text) => {
  if (!text || typeof text !== "string") return [];

  return keyword_extractor
    .extract(text, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    })
    .slice(0, 10);
};
