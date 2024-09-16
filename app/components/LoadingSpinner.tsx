export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center" aria-live="polite" aria-busy="true">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}