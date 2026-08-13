import PostCard from './PostCard'

export default function PostList({ posts, usersById, isFavorite, onToggleFavorite }) {
  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <p>No posts match your search.</p>
        <span>Try a different keyword.</span>
      </div>
    )
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          author={usersById[post.userId]}
          isFavorite={isFavorite(post.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
