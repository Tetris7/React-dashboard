import { useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPost, getUser, getComments, deletePost } from '../api/client'
import PostDetails from '../components/PostDetails'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { useFetch } from '../hooks/useFetch'
import { useFavorites } from '../hooks/useFavorites'

export default function PostDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [deleting, setDeleting] = useState(false)

  const fetcher = useCallback(async () => {
    const post = await getPost(id)
    const [author, comments] = await Promise.all([
      getUser(post.userId),
      getComments(id),
    ])
    return { post, author, comments }
  }, [id])

  const { data, status, error, retry } = useFetch(fetcher, [id])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deletePost(id)
      navigate('/')
    } catch {
      setDeleting(false)
    }
  }

  if (status === 'loading') return <Loading label="Loading post…" />

  if (status === 'error') {
    return (
      <ErrorMessage
        message="Something went wrong loading this post. Please try again."
        onRetry={retry}
      />
    )
  }

  return (
    <section className="post-details-page">
      <Link to="/" className="back-link">
        ← Back to all posts
      </Link>
      <PostDetails
        post={data.post}
        author={data.author}
        comments={data.comments}
        isFavorite={isFavorite(data.post.id)}
        onToggleFavorite={toggleFavorite}
        onDelete={handleDelete}
        deleting={deleting}
      />
    </section>
  )
}
