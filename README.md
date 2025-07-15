# Movie Explorer App
## Overview

**Movie Explorer** is a modern web app for discovering, searching, and saving your favorite movies. It features a beautiful UI, authentication, and seamless integration with The Movie Database (TMDb) API. Users can browse popular movies, search by title, view detailed information, and manage a list of favorites.

---

## ✨ Features

- **User Authentication** (Email/Password via Firebase)
- **Browse Popular Movies** (powered by TMDb API)
- **Search Movies** by title
- **Movie Details Page** with genres, ratings, overview, and production info
- **Add/Remove Favorites** (stored locally per user)
- **Favorites Dashboard**
- **Responsive UI** with dark mode support
- **Modern UI Components** (Radix UI, Tailwind CSS)
- **API Routes** for movie data and search

---

## 🖥️ Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Firebase Auth](https://firebase.google.com/)
- [TMDb API](https://www.themoviedb.org/documentation/api)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
$ git clone <your-repo-url>
$ cd movie-explorer (1)

# Install dependencies
$ pnpm install
# or
$ npm install
```

### Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use the provided `movieapp-3c30b`)
3. Enable **Email/Password** authentication:
   - Go to **Authentication > Sign-in method**
   - Click on **Email/Password** and enable it
   - Save changes

> The project is pre-configured for `movieapp-3c30b`. If you use your own Firebase project, update `lib/firebase.ts` with your credentials.

### Running the App

```bash
# Development
$ pnpm dev
# or
$ npm run dev

# Production
$ pnpm build && pnpm start
# or
$ npm run build && npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

- `app/` - Next.js app directory (pages, API routes)
- `components/` - Reusable UI and logic components
- `lib/` - Firebase and utility functions
- `hooks/` - Custom React hooks
- `public/` - Static assets
- `styles/` - Global styles

---

## 🛠️ API Endpoints

- `GET /api/movies` - Fetches popular movies (from TMDb)
- `GET /api/movies/[id]` - Fetches details for a specific movie
- `GET /api/search?q=...` - Searches movies by title

---

## 🧑‍💻 Usage

- **Login/Register** with your email and password
- **Browse** the latest popular movies
- **Search** for any movie by title
- **Click** a movie card for detailed info
- **Add/Remove** movies to your favorites (heart icon)
- **View Favorites** from the dashboard or favorites page

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🙏 Acknowledgements

- [TMDb](https://www.themoviedb.org/) for movie data
- [Firebase](https://firebase.google.com/) for authentication
- [Radix UI](https://www.radix-ui.com/) and [Tailwind CSS](https://tailwindcss.com/) for UI
- [v0.dev](https://v0.dev/) for rapid prototyping

---


