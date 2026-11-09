import axios from "axios";
import { API_BASE_URL, API_TIMEOUT_MS } from "../../../constants/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
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
      throw new Error(`The product service returned an error (${error.response.status}).`, { cause: error });
    }

    if (error.request) {
      throw new Error("Unable to reach the product service. Check your connection and try again.", { cause: error });
    }

    throw new Error(error.message || "Unable to load data. Please try again.", { cause: error });
  }
}

export async function getProducts({
  category,
  query,
  limit = 8,
  skip = 0,
  signal,
} = {}) {
  const path = category
    ? `/products/category/${encodeURIComponent(category)}`
    : query
      ? "/products/search"
      : "/products";
  const params = { limit, skip };

  if (query && !category) {
    params.q = query;
  }

  const data = await get(path, { params, signal });

  if (!Array.isArray(data.products)) {
    throw new Error("The product service returned an invalid product list.");
  }

  return {
    products: data.products,
    total: Number.isFinite(data.total) ? data.total : data.products.length,
    skip: Number.isFinite(data.skip) ? data.skip : skip,
    limit: Number.isFinite(data.limit) ? data.limit : limit,
  };
}

export async function getCategories({ signal } = {}) {
  const categories = await get("/products/categories", { signal });

  if (!Array.isArray(categories)) {
    throw new Error("The product service returned an invalid category list.");
  }

  return categories;
}

export async function getProductById(id, { signal } = {}) {
  return get(`/products/${encodeURIComponent(id)}`, { signal });
}
