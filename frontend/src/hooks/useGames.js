import { useEffect, useState } from "react";
import { getAllGames } from "../services/games.services";

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getAllGames();
        setGames(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setError(error.response?.data?.message || "No se han podido cargar los videojuegos.");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  return { games, loading, error };
};
