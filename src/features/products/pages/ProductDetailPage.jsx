import { Link, useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <section aria-labelledby="product-heading">
      <Link className="font-semibold text-neutral-800 no-underline hover:underline" to="/">
        ← Back
      </Link>
      <h1 id="product-heading" className="mt-6 text-3xl font-bold tracking-tight">
        Product details
      </h1>
      <p className="mt-2 leading-6 text-neutral-600">Product {id} details will be built in a later step.</p>
    </section>
  );
}
