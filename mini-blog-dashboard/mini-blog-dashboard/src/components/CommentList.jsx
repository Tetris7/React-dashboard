export default function CommentList({ comments }) {
  if (comments.length === 0) {
    return <p className="no-comments">No comments yet on this post.</p>
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id} className="comment">
          <div className="comment-avatar" aria-hidden="true">
            {comment.email.charAt(0).toUpperCase()}
          </div>
          <div className="comment-body">
            <div className="comment-meta">
              <span className="comment-name">{comment.name}</span>
              <span className="comment-email">{comment.email}</span>
            </div>
            <p>{comment.body}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
