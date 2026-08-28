# The Daily Feed

A blog dashboard for browsing posts, reading comments, and getting to know the people behind them. Built as a way to explore working with a real REST API in React — searching, paginating, and stitching together data from multiple endpoints into something that feels like an actual product.

🔗 **Live site:** [react-dashboard-self-nine.vercel.app](https://react-dashboard-self-nine.vercel.app/)

## What it does

- Browse a feed of posts, 10 at a time, with clean pagination controls
- Search posts by title as you type
- Click into any post to read the full thing, see who wrote it, and read the comments underneath
- Tap an author's name to see their full profile and everything else they've written
- Star your favorite posts — they stick around even after you close the tab
- Switch between light and dark mode depending on your mood
- Write and publish your own post from the "+ New post" button in the navbar

## Tech stack

- **React** (functional components, hooks)
- **React Router** for navigation between the feed, post details, author profiles, and the post composer
- **Axios** for talking to the API
- **Vite** for a fast dev/build setup
- Hand-written CSS — no framework, just a custom design system built around a warm editorial look (serif headlines, monospace post numbers, a pine-green accent)

Posts, comments, and author data come from [JSONPlaceholder](https://jsonplaceholder.typicode.com), a free public API. New posts submitted through the composer hit JSONPlaceholder's mock `POST` endpoint — it echoes back a realistic response but doesn't actually persist the post, which the app is upfront about on the confirmation screen.

## Running it locally

```bash
npm install
npm run dev
