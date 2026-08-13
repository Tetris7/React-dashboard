import { Link } from 'react-router-dom'

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">TDF</span>
        <span className="brand-text">
          The Daily Feed
          <span className="brand-sub">a mini blog dashboard</span>
        </span>
      </Link>
      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☾ Night' : '☀ Day'}
      </button>
    </header>
  )
}
