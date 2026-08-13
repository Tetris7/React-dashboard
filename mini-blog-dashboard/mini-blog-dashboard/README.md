# The Daily Feed — Mini Blog Dashboard

A React dashboard that consumes the [JSONPlaceholder](https://jsonplaceholder.typicode.com) REST API to browse posts, view authors, read comments, and search/paginate through content.

## Project description

Built for the React API Integration assignment. The app fetches posts, users, and comments from JSONPlaceholder and stitches them together into a readable blog experience: a searchable, paginated post feed, a details view with author info and comments, and a couple of bonus features (favorites, dark mode, per-author profile pages).

## Technologies used

- React 18 (functional components + hooks)
- React Router v6
- Axios for API requests
- Vite as the build tool
- Plain CSS (custom design system, no UI framework)

## How to run the project

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## API used

[JSONPlaceholder](https://jsonplaceholder.typicode.com) — no API key required.

| Endpoint | Used for |
|---|---|
| `GET /posts` | Post feed |
| `GET /posts/:id` | Single post |
| `GET /posts/:id/comments` | Comments on a post |
| `GET /users` | Author names in the feed |
| `GET /users/:id` | Author details |
| `GET /users/:id/posts` | A user's posts (profile page) |
| `POST /posts` | Create post (bonus) |
| `DELETE /posts/:id` | Delete post (bonus) |

## Features implemented

- **Posts feed** — card-based layout showing title, body excerpt, user ID, and post ID
- **Search** — live filter by title as you type
- **Post details** — full body, author card, and comments (`/posts/:id`)
- **Author info** — real name/username/email pulled from `GET /users/:id`, shown in the feed and on the details page
- **Loading states** — animated "Loading…" indicator on every async view
- **Error handling** — friendly error messages with a **Retry** button on every fetch
- **Pagination** — 10 posts per page with Previous / page numbers / Next
- **Reusable components** — `Navbar`, `SearchBar`, `PostList`, `PostCard`, `PostDetails`, `CommentList`, `Loading`, `ErrorMessage`, `Pagination`
- **Routing** — React Router with `/`, `/posts/:id`, and `/users/:id`
- **Responsive layout** — single-column cards on mobile, multi-column grid on desktop

## Bonus features completed

- ✅ **Favorites** — star a post from the card or details page; persisted in `localStorage`
- ✅ **Dark mode** — toggle in the navbar, persisted in `localStorage`, respects system preference on first visit
- ✅ **User page** — `/users/:id` shows profile info and all posts by that author
- ✅ **Delete post** — delete button on the details page (calls `DELETE /posts/:id`; JSONPlaceholder mocks the response, so the post disappears client-side after navigating back)
- ⬜ Create post form — not implemented in this pass

## Notes on scope

JSONPlaceholder's `/comments` endpoint returns the same ~5 comments for every post ID, and `DELETE`/`POST` are mocked (they don't persist), which is expected behavior for this fake API — the app calls the real endpoints and handles the real responses either way.

## Project structure

```
src/
  api/client.js         # Axios instance + endpoint functions
  hooks/useFetch.js      # Generic loading/error/data hook with retry
  hooks/useFavorites.js  # localStorage-backed favorites
  hooks/useTheme.js      # localStorage-backed dark/light mode
  components/            # Reusable UI pieces
  pages/                 # Route-level views (Posts, PostDetails, User)
  App.jsx                # Routes + layout shell
  main.jsx               # Entry point
```
