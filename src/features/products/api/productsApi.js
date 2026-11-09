import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

async function get(path, config = {}) {
  try {
    const response = await apiClient.get(path, config);
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }

    if (error.response) {
      throw new Error(`The product service returned an error (${error.response.status}).`);
    }

    if (error.request) {
      throw new Error("Unable to reach the product service. Check your connection and try again.");
    }

    throw new Error(error.message || "Unable to load data. Please try again.");
  }
}

export async function getProducts({ category, signal } = {}) {
  const path = category
    ? `/products/category/${encodeURIComponent(category)}`
    : "/products";
  const data = await get(path, { params: { limit: 0 }, signal });
  return data.products ?? [];
}

export async function getCategories({ signal } = {}) {
  return get("/products/categories", { signal });
}

export async function getProductById(id, { signal } = {}) {
  return get(`/products/${encodeURIComponent(id)}`, { signal });
}
