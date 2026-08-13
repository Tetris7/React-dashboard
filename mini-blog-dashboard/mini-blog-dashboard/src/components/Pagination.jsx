export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i++) pages.push(i)

  return (
    <nav className="pagination" aria-label="Post pages">
      <button
        type="button"
        className="btn btn-page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      <ul className="page-numbers">
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`page-number ${page === currentPage ? 'is-active' : ''}`}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="btn btn-page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </nav>
  )
}
