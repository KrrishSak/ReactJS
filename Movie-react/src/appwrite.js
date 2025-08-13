import { Client, Databases, Query, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const database = new Databases(client);
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

/**
 * Increment search count or create a new movie record
 */
export const updateSearchCount = async (searchTerm, movie_id, poster_path) => {
  try {
    if (!movie_id) return;

    const normalizedTerm = searchTerm.trim().toLowerCase();
    const movieIdInt = Number(movie_id);
    if (isNaN(movieIdInt)) return;

    const posterURL = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image";

    // Check if movie already exists
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("movie_id", [movieIdInt]),
      Query.limit(1),
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      // Ensure count exists
      const currentCount = typeof doc.count === "number" ? doc.count : 0;

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        searchTerm: normalizedTerm,
        movie_id: movieIdInt,
        poster_URL: posterURL,
        count: currentCount + 1,
      });
    } else {
      // Create new document
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: normalizedTerm,
        movie_id: movieIdInt,
        poster_URL: posterURL,
        count: 1,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", {
      message: error.message,
      code: error.code,
      response: error.response,
    });
  }
};

/**
 * Get top trending movies (by count)
 */
export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"), // must match schema key exactly
      Query.limit(5),
    ]);

    // Fill missing count for legacy documents
    return result.documents.map((doc) => ({
      ...doc,
      count: typeof doc.count === "number" ? doc.count : 1,
      poster_URL: doc.poster_URL || "https://via.placeholder.com/500x750?text=No+Image",
    }));
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};
