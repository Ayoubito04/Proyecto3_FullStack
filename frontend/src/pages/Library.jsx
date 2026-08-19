import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState/EmptyState";
import GameCard from "../components/GameCard/GameCard";
import Loader from "../components/Loader/Loader";
import { useAuth } from "../context/AuthContext";
import { getLibrary, removeGameFromLibrary } from "../services/users.services";

const Library = () => {
  const { token, userId } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadLibrary = useCallback(async () => {
    try {
      setLoading(true);
      setMessage("");
      const response = await getLibrary(userId, token);
      setGames(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      if (error.response?.status === 404) {
        setGames([]);
      } else {
        setMessage(error.response?.data?.message || "No se ha podido cargar la biblioteca.");
      }
    } finally {
      setLoading(false);
    }
  }, [token, userId]);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  const handleRemove = async (gameId) => {
    try {
      await removeGameFromLibrary(userId, gameId, token);
      setMessage("Juego eliminado de tu biblioteca.");
      setGames((prev) => prev.filter((game) => game.id !== gameId));
    } catch (error) {
      setMessage(error.response?.data?.message || "No se ha podido eliminar el juego.");
    }
  };

  if (loading) return <main className="page"><Loader text="Cargando biblioteca..." /></main>;

  return (
    <main className="page games-page">
      <section className="page-header">
        <span className="eyebrow">Zona privada</span>
        <h1 className="page-title">Mi biblioteca</h1>
        <p className="page-subtitle">Tus videojuegos guardados para consultar más tarde.</p>
      </section>

      {message && <p className="message">{message}</p>}

      {games.length ? (
        <section className="games-grid">
          {games.map((game) => (
            <GameCard key={game._id} game={game} onRemove={handleRemove} isInLibrary />
          ))}
        </section>
      ) : (
        <EmptyState
          title="Tu biblioteca está vacía"
          text="Añade videojuegos desde el catálogo para verlos aquí."
          action={<Link className="btn btn--primary" to="/games">Ir al catálogo</Link>}
        />
      )}
    </main>
  );
};

export default Library;
