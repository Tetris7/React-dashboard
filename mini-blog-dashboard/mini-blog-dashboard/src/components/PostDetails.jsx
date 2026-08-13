import { Link } from 'react-router-dom'
import CommentList from './CommentList'

export default function PostDetails({
  post,
  author,
  comments,
  isFavorite,
  onToggleFavorite,
  onDelete,
  deleting,
}) {
  return (
    <article className="post-details">
      <span className="post-id">No. {String(post.id).padStart(3, '0')}</span>
      <h1>{post.title}</h1>

      {author && (
        <Link to={`/users/${author.id}`} className="author-card">
          <div className="author-avatar" aria-hidden="true">
            {author.name.charAt(0)}
          </div>
          <div>
            <p className="author-name">{author.name}</p>
            <p className="author-handle">
              @{author.username} · {author.email}
            </p>
          </div>
        </Link>
      )}

      <p className="post-full-body">{post.body}</p>

      <div className="post-actions">
        <button
          type="button"
          className={`btn btn-favorite ${isFavorite ? 'is-active' : ''}`}
          onClick={() => onToggleFavorite(post.id)}
        >
          {isFavorite ? '★ Favorited' : '☆ Add to favorites'}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={onDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting…' : 'Delete post'}
        </button>
      </div>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>
        <CommentList comments={comments} />
      </section>
    </article>
  )
}
