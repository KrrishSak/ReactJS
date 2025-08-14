# React Movies App 🎬

A modern movie discovery web application built with **React**, **TMDB API**, and **Appwrite**. Users can search for movies, view trending movies, and the app keeps track of the most searched movies using Appwrite's database.

---

## Features

- 🔍 **Movie Search** – Search movies by name using **TMDB API**.
- 📈 **Trending Movies** – Shows the top trending movies based on user search counts.
- 🎨 **Responsive UI** – Clean and minimal interface with loading states and error handling.
- 🗄️ **Appwrite Integration** – Stores search counts, movie IDs, and poster URLs.
- ⏱️ **Debounced Search** – Optimized search to reduce API calls.

---

## Screenshots

![App Screenshot](C:\Users\sakhu\Pictures\Screenshots\movie1)  

---

## Tech Stack

- **Frontend:** React, JavaScript, Tailwind CSS
- **Backend / Database:** Appwrite
- **API:** [TMDB API](https://www.themoviedb.org/)
- **Utilities:** react-use (for `useDebounce`)

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Appwrite account and project
- TMDB API key

### Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/react-movies.git
cd react-movies
```
2. Install dependencies:
```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id

```
3. Create a .env file in the root and add your keys:
```bash
npm install
# or
yarn install
```
4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Appwrite Setup
1. Create a database in your Appwrite project.
2. Create a collection with these attributes:
  searchTerm (string, required)
  movie_id (integer, required)
  poster_URL (string / URL, required)
  count (integer, default 1)

4. Update .env with your Database ID and Collection ID.


Author
Krish Sakhuja
