import { Link, Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <>
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Ecommerce Store home">
          <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="brand-name">Ecommerce Store</span>
        </Link>

        <form className="search-form" role="search" onSubmit={(event) => event.preventDefault()}>
          <label className="visually-hidden" htmlFor="product-search">
            Search products
          </label>
          <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.3" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            id="product-search"
            className="search-input"
            type="search"
            placeholder="Search products..."
          />
        </form>

        <nav className="header-actions" aria-label="Quick links">
          <button className="icon-button" type="button" aria-label="Shopping cart">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="9.5" cy="19" r="1.2" />
              <circle cx="18" cy="19" r="1.2" />
            </svg>
          </button>
          <button className="icon-button history-action" type="button" aria-label="Recently viewed">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.2 2" />
            </svg>
          </button>
          <button className="icon-button profile-action" type="button" aria-label="Account">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
            </svg>
          </button>
        </nav>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </>
  );
}
