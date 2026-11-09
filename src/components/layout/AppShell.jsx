import { Link, Outlet } from "react-router-dom";
import { APP_NAME } from "../../constants/app";
import ProductSearch from "./ProductSearch";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900 antialiased">
      <header className="sticky top-0 z-10 flex min-h-16 flex-wrap items-center gap-3 bg-brand-navy px-4 py-3 text-white sm:px-6 md:flex-nowrap md:gap-6 md:px-8 md:py-0">
        <Link
          className="order-1 inline-flex w-fit min-w-0 shrink-0 items-center gap-2 whitespace-nowrap font-bold text-white no-underline sm:gap-3.5"
          to="/"
          aria-label={`${APP_NAME} home`}
        >
          <svg className="size-6 shrink-0 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="truncate text-sm sm:text-base">{APP_NAME}</span>
        </Link>

        <ProductSearch />

        <div className="order-2 ml-auto flex shrink-0 items-center justify-end gap-2 sm:gap-4 md:order-3 md:ml-0" aria-hidden="true">
          <span className="grid size-9 place-items-center">
            <svg className="size-6 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="9.5" cy="19" r="1.2" />
              <circle cx="18" cy="19" r="1.2" />
            </svg>
          </span>
          <span className="hidden size-9 place-items-center lg:grid">
            <svg className="size-6 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3.2 2" />
            </svg>
          </span>
          <span className="grid size-9 place-items-center">
            <svg className="size-6 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3.2" />
              <path strokeLinecap="round" d="M5.5 20a6.5 6.5 0 0 1 13 0" />
            </svg>
          </span>
        </div>
      </header>

      <main className="mx-auto my-3 w-full max-w-[75rem] bg-white p-3 shadow-sm sm:my-6 sm:rounded-lg sm:p-5 md:p-7">
        <Outlet />
      </main>
    </div>
  );
}
