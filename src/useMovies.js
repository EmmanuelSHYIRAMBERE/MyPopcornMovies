import { useEffect, useState } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // callback?.();

    const controller = new AbortController();

    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setError("");

        const result = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=4152f998&s=${query}`,
          { signal: controller.signal }
        );

        if (!result.ok)
          throw new Error("Something went wrong with fetching movie");

        const data = await result.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovie();

    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}
