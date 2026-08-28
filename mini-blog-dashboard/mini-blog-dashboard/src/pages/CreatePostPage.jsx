import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createPost, getUsers } from '../api/client'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { useFetch } from '../hooks/useFetch'

export default function CreatePostPage() {
  const navigate = useNavigate()
  const { data: users, status: usersStatus, retry: retryUsers } = useFetch(getUsers, [])

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [created, setCreated] = useState(null)

  const isValid = title.trim() && body.trim() && userId

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) return

    setSubmitting(true)
    setSubmitError(null)

    try {
      const result = await createPost({
        title: title.trim(),
        body: body.trim(),
        userId: Number(userId),
      })
      setCreated(result)
    } catch {
      setSubmitError('Something went wrong creating your post. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setTitle('')
    setBody('')
    setUserId('')
    setCreated(null)
    setSubmitError(null)
  }

  if (usersStatus === 'loading') return <Loading label="Loading authors…" />

  if (usersStatus === 'error') {
    return (
      <ErrorMessage
        message="Something went wrong loading authors. Please try again."
        onRetry={retryUsers}
      />
    )
  }

  if (created) {
    const author = users.find((u) => u.id === created.userId)
    return (
      <section className="create-post-page">
        <Link to="/" className="back-link">
          ← Back to all posts
        </Link>
        <div className="create-success">
          <span className="success-mark" aria-hidden="true">✓</span>
          <h1>Post created</h1>
          <p className="create-success-note">
            JSONPlaceholder mocks this request, so it won't actually appear in the feed
            or be fetchable by ID — but here's exactly what the API sent back:
          </p>
          <article className="post-details created-preview">
            <span className="post-id">No. {String(created.id).padStart(3, '0')}</span>
            <h2>{created.title}</h2>
            {author && <p className="author-handle">by {author.name}</p>}
            <p className="post-full-body">{created.body}</p>
          </article>
          <div className="post-actions">
            <button type="button" className="btn" onClick={handleReset}>
              Create another post
            </button>
            <Link to="/" className="btn btn-favorite">
              Back to feed
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="create-post-page">
      <Link to="/" className="back-link">
        ← Back to all posts
      </Link>

      <div className="posts-page-header">
        <h1>Write a new post</h1>
        <p className="subtitle">Posts here to JSONPlaceholder's mock endpoint</p>
      </div>

      <form className="create-post-form" onSubmit={handleSubmit}>
        <label htmlFor="post-author">Posting as</label>
        <select
          id="post-author"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose an author…
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} (@{user.username})
            </option>
          ))}
        </select>

        <label htmlFor="post-title">Title</label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your post a title…"
          required
        />

        <label htmlFor="post-body">Body</label>
        <textarea
          id="post-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post…"
          rows={8}
          required
        />

        {submitError && <ErrorMessage message={submitError} onRetry={handleSubmit} />}

        <div className="post-actions">
          <button type="submit" className="btn btn-favorite" disabled={!isValid || submitting}>
            {submitting ? 'Publishing…' : 'Publish post'}
          </button>
        </div>
      </form>
    </section>
  )
}
