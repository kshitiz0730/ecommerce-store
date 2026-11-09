export default function LoadingState() {
  return (
    <div className="flex min-h-[17.5rem] flex-col items-center justify-center gap-3.5 text-center text-neutral-600" role="status" aria-live="polite">
      <span
        className="size-8 animate-spin rounded-full border-[0.1875rem] border-neutral-200 border-t-blue-600 motion-reduce:animate-none"
        aria-hidden="true"
      />
      <span>Loading products…</span>
    </div>
  );
}

