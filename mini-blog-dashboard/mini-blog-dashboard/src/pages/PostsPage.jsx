import { useEffect, useMemo, useState } from 'react'
import { getPosts, getUsers } from '../api/client'
import SearchBar from '../components/SearchBar'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { useFetch } from '../hooks/useFetch'
import { useFavorites } from '../hooks/useFavorites'

const POSTS_PER_PAGE = 10

export default function PostsPage() {
  const { data: posts, status: postsStatus, error: postsError, retry: retryPosts } =
    useFetch(getPosts, [])
  const { data: users, status: usersStatus, retry: retryUsers } = useFetch(getUsers, [])

  const { isFavorite, toggleFavorite } = useFavorites()

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const usersById = useMemo(() => {
    if (!users) return {}
    return Object.fromEntries(users.map((u) => [u.id, u]))
  }, [users])

  const filteredPosts = useMemo(() => {
    if (!posts) return []
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter((p) => p.title.toLowerCase().includes(q))
  }, [posts, query])

  useEffect(() => {
    setPage(1)
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const pagePosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  )

  if (postsStatus === 'loading' || usersStatus === 'loading') {
    return <Loading label="Loading posts…" />
  }

  if (postsStatus === 'error') {
    return (
      <ErrorMessage
        message="Something went wrong loading posts. Please try again."
        onRetry={retryPosts}
      />
    )
  }

  return (
    <section className="posts-page">
      <div className="posts-page-header">
        <h1>Latest posts</h1>
        <p className="subtitle">
          {filteredPosts.length} post{filteredPosts.length === 1 ? '' : 's'} from the
          community feed
        </p>
      </div>

      <SearchBar value={query} onChange={setQuery} resultCount={filteredPosts.length} />

      {usersStatus === 'error' && (
        <ErrorMessage
          message="Couldn't load author names. Posts will show as 'User #'."
          onRetry={retryUsers}
        />
      )}

      <PostList
        posts={pagePosts}
        usersById={usersById}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  )
}
