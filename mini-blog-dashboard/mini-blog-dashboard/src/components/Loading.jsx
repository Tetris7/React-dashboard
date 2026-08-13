export default function Loading({ label = 'Loading posts…' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading-mark" aria-hidden="true">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </span>
      <p>{label}</p>
    </div>
  )
}
