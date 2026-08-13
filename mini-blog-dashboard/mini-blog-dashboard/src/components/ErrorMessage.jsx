export default function ErrorMessage({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) {
  return (
    <div className="error-box" role="alert">
      <span className="error-mark" aria-hidden="true">!</span>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-retry" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}
