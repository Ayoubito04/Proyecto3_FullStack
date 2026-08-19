import { useCallback, useMemo, useState } from "react";
import GameCard from "../components/GameCard/GameCard";
import Loader from "../components/Loader/Loader";
import EmptyState from "../components/EmptyState/EmptyState";
import { useAuth } from "../context/AuthContext";
import { useDebounce } from "../hooks/useDebounce";
import { useGames } from "../hooks/useGames";
import { addGameToLibrary } from "../services/users.services";
import "./Games.css";

const Games = () => {
  const { games, loading, error } = useGames();
  const { isAuthenticated, token, userId } = useAuth();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("rating-desc");
  const [message, setMessage] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  const genres = useMemo(() => [...new Set(games.map((game) => game.genre).filter(Boolean))].sort(), [games]);

  const platforms = useMemo(() => {
    const values = games.flatMap((game) => String(game.platform || "").split("/").map((item) => item.trim()).filter(Boolean));
    return [...new Set(values)].sort();
  }, [games]);

  const filteredGames = useMemo(() => {
    const cleanSearch = debouncedSearch.trim().toLowerCase();

    const result = games.filter((game) => {
      const title = game.title?.toLowerCase() || "";
      const developer = game.developer?.toLowerCase() || "";
      const matchesSearch = !cleanSearch || title.includes(cleanSearch) || developer.includes(cleanSearch);
      const matchesGenre = genre === "all" || game.genre === genre;
      const matchesPlatform = platform === "all" || String(game.platform).toLowerCase().includes(platform.toLowerCase());
      const matchesPrice = price === "all" || (price === "free" ? Number(game.price) === 0 : Number(game.price) > 0);

      return matchesSearch && matchesGenre && matchesPlatform && matchesPrice;
    });

    return result.sort((a, b) => {
      if (sort === "rating-desc") return b.rating - a.rating;
      if (sort === "rating-asc") return a.rating - b.rating;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return a.title.localeCompare(b.title);
    });
  }, [games, debouncedSearch, genre, platform, price, sort]);

  const handleAddToLibrary = useCallback(
    async (gameId) => {
      if (!isAuthenticated) {
        setMessage("Inicia sesión para añadir juegos a tu biblioteca.");
        return;
      }

      try {
        await addGameToLibrary(userId, gameId, token);
        setMessage("Juego añadido a tu biblioteca.");
      } catch (error) {
        setMessage(error.response?.data?.message || "No se ha podido añadir el juego.");
      }
    },
    [isAuthenticated, token, userId]
  );

  const resetFilters = () => {
    setSearch("");
    setGenre("all");
    setPlatform("all");
    setPrice("all");
    setSort("rating-desc");
  };

  if (loading) return <main className="page"><Loader text="Cargando catálogo..." /></main>;

  if (error) {
    return (
      <main className="page">
        <EmptyState title="No se ha podido cargar el catálogo" text={error} />
      </main>
    );
  }

  return (
    <main className="page games-page">
      <section className="page-header games-header">
        <span className="eyebrow">Catálogo</span>
        <h1 className="page-title">Galería de videojuegos</h1>
        <p className="page-subtitle">
          Filtra, busca y descubre títulos para guardar en tu biblioteca personal.
        </p>
      </section>

      <section className="games-toolbar glass-panel" aria-label="Filtros de videojuegos">
        <label className="form-field games-search">
          Buscar
          <input
            type="search"
            placeholder="Busca por título o desarrollador..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="form-field">
          Género
          <select value={genre} onChange={(event) => setGenre(event.target.value)}>
            <option value="all">Todos</option>
            {genres.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label className="form-field">
          Plataforma
          <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
            <option value="all">Todas</option>
            {platforms.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label className="form-field">
          Precio
          <select value={price} onChange={(event) => setPrice(event.target.value)}>
            <option value="all">Todos</option>
            <option value="free">Gratis</option>
            <option value="paid">De pago</option>
          </select>
        </label>

        <label className="form-field">
          Ordenar
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="rating-desc">Mejor valoración</option>
            <option value="rating-asc">Menor valoración</option>
            <option value="price-asc">Precio ascendente</option>
            <option value="price-desc">Precio descendente</option>
            <option value="title-asc">Título A-Z</option>
          </select>
        </label>

        <button className="btn" type="button" onClick={resetFilters}>Limpiar</button>
      </section>

      <div className="games-count">
        <p>Mostrando <strong>{filteredGames.length}</strong> de <strong>{games.length}</strong> videojuegos</p>
        {message && <p className="message">{message}</p>}
      </div>

      {filteredGames.length ? (
        <section className="games-grid">
          {filteredGames.map((game) => (
            <GameCard key={game._id} game={game} onAdd={handleAddToLibrary} />
          ))}
        </section>
      ) : (
        <EmptyState title="No hay resultados" text="Prueba a cambiar la búsqueda o limpiar los filtros." />
      )}
    </main>
  );
};

export default Games;
