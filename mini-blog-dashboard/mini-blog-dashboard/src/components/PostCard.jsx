import { Link } from 'react-router-dom'

export default function PostCard({ post, author, isFavorite, onToggleFavorite }) {
  return (
    <article className="post-card">
      <div className="post-card-top">
        <span className="post-id">No. {String(post.id).padStart(3, '0')}</span>
        <button
          type="button"
          className={`favorite-btn ${isFavorite ? 'is-active' : ''}`}
          onClick={() => onToggleFavorite(post.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <Link to={`/posts/${post.id}`} className="post-card-link">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-excerpt">{post.body}</p>
      </Link>
      <footer className="post-card-footer">
        <span className="post-author">{author ? author.name : `User ${post.userId}`}</span>
        <Link to={`/posts/${post.id}`} className="read-more">
          Read more →
        </Link>
      </footer>
    </article>
  )
}
