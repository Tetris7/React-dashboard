import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import PostsPage from './pages/PostsPage'
import PostDetailsPage from './pages/PostDetailsPage'
import UserPage from './pages/UserPage'
import CreatePostPage from './pages/CreatePostPage'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/create" element={<CreatePostPage />} />

          <Route path="/posts/:id" element={<PostDetailsPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route
            path="*"
            element={
              <div className="empty-state">
                <p>Page not found.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>Data from JSONPlaceholder — a free fake REST API for testing.</p>
      </footer>
    </div>
  )
}
