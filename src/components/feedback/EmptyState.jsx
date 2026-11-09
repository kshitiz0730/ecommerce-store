export default function EmptyState({ message = "No products are available right now." }) {
  return (
    <div className="grid min-h-70 place-items-center text-center text-neutral-600" role="status">
      <p className="m-0 max-w-xl leading-6">{message}</p>
    </div>
  );
}
