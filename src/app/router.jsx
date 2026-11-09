import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import ProductDetailPage from "../features/products/pages/ProductDetailPage";
import ProductListPage from "../features/products/pages/ProductListPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<ProductListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
