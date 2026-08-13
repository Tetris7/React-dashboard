export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search-bar">
      <label htmlFor="post-search" className="sr-only">
        Search posts by title
      </label>
      <input
        id="post-search"
        type="search"
        placeholder="Search posts by title…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <span className="search-count">
          {resultCount} result{resultCount === 1 ? '' : 's'}
        </span>
      )}
    </div>
  )
}
