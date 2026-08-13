import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { getUser } from '../api/client'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { useFetch } from '../hooks/useFetch'

const fetchUserPosts = (userId) =>
  axios
    .get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then((res) => res.data)

export default function UserPage() {
  const { id } = useParams()

  const fetcher = useCallback(async () => {
    const [user, posts] = await Promise.all([getUser(id), fetchUserPosts(id)])
    return { user, posts }
  }, [id])

  const { data, status, error, retry } = useFetch(fetcher, [id])

  if (status === 'loading') return <Loading label="Loading profile…" />

  if (status === 'error') {
    return (
      <ErrorMessage
        message="Something went wrong loading this profile. Please try again."
        onRetry={retry}
      />
    )
  }

  const { user, posts } = data

  return (
    <section className="user-page">
      <Link to="/" className="back-link">
        ← Back to all posts
      </Link>

      <div className="user-profile-card">
        <div className="author-avatar author-avatar-lg" aria-hidden="true">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1>{user.name}</h1>
          <p className="author-handle">
            @{user.username} · {user.email}
          </p>
          <p className="user-meta">
            {user.company?.name} · {user.address?.city}
          </p>
        </div>
      </div>

      <h2 className="user-posts-heading">Posts by {user.name} ({posts.length})</h2>
      <ul className="user-post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
