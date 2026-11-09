import { Link, useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <section className="page-placeholder" aria-labelledby="product-heading">
      <Link className="back-link" to="/">← Back</Link>
      <h1 id="product-heading">Product details</h1>
      <p>Product {id} details will be shown here.</p>
    </section>
  );
}
