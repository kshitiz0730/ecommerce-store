import formatCategory from "./formatCategory";

export default function normalizeCategory(category) {
  if (typeof category === "string") {
    return {
      slug: category,
      name: formatCategory(category),
    };
  }

  const slug = category?.slug ?? category?.name ?? "";
  if (!slug) {
    return null;
  }

  return {
    slug,
    name: category?.name ?? formatCategory(slug),
  };
}
