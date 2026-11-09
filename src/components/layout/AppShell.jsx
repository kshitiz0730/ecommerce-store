import { Link, Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900 antialiased">
      <header className="sticky top-0 z-10 flex min-h-16 flex-wrap items-center gap-3 bg-neutral-950 px-4 py-3 text-white sm:px-6 md:flex-nowrap md:gap-6 md:px-8 md:py-0">
        <Link
          className="order-1 inline-flex w-fit min-w-0 shrink-0 items-center gap-2 whitespace-nowrap font-bold text-white no-underline sm:gap-3.5"
          to="/"
          aria-label="Ecommerce Store home"
        >
          <svg className="size-6 shrink-0 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="truncate text-sm sm:text-base">Ecommerce Store</span>
        </Link>

        <form
          className="relative order-3 w-full md:order-2 md:mx-auto md:max-w-[32.5rem] md:min-w-0 md:flex-1"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="product-search">
            Search products
          </label>
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 fill-none stroke-neutral-500 stroke-2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="10.8" cy="10.8" r="6.3" />
            <path strokeLinecap="round" d="m16 16 4 4" />
          </svg>
          <input
            id="product-search"
            className="min-h-10 w-full rounded-md border border-neutral-300 bg-white py-2 pl-10 pr-3.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:text-base"
            type="search"
            placeholder="Search products..."
          />
        </form>

        <nav className="order-2 ml-auto flex shrink-0 justify-end gap-2 sm:gap-4 md:order-3 md:ml-0" aria-label="Quick links">
          <button className="grid size-9 shrink-0 place-items-center text-white hover:text-neutral-300" type="button" aria-label="Shopping cart">
            <svg className="size-6 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="9.5" cy="19" r="1.2" />
              <circle cx="18" cy="19" r="1.2" />
            </svg>
          </button>
          <button className="hidden size-9 shrink-0 place-items-center text-white hover:text-neutral-300 lg:grid" type="button" aria-label="Recently viewed">
            <svg className="size-6 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3.2 2" />
            </svg>
          </button>
          <button className="grid size-9 shrink-0 place-items-center text-white hover:text-neutral-300" type="button" aria-label="Account">
            <svg className="size-6 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.2" />
              <path strokeLinecap="round" d="M5.5 20a6.5 6.5 0 0 1 13 0" />
            </svg>
          </button>
        </nav>
      </header>

      <main className="mx-auto my-3 w-full max-w-[75rem] bg-white p-3 shadow-sm sm:my-6 sm:rounded-lg sm:p-5 md:p-7">
        <Outlet />
      </main>
    </div>
  );
}



