export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex min-h-70 flex-col items-center justify-center gap-3.5 text-center text-red-800" role="alert">
      <p className="m-0 max-w-xl leading-6">{message}</p>
      <button
        className="rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
        type="button"
        onClick={onRetry}
      >
        Try again
      </button>
    </div>
  );
}
