import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[20rem] max-w-xl flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">404</p>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="leading-6 text-neutral-600">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link
        className="rounded-md bg-brand-navy px-4 py-2 font-semibold text-white no-underline hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        to="/"
      >
        Return to products
      </Link>
    </section>
  );
}
