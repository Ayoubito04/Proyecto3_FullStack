import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import GameCard from "../components/GameCard/GameCard";
import Loader from "../components/Loader/Loader";
import { useGames } from "../hooks/useGames";
import "./Home.css";

const Home = () => {
  const { games, loading } = useGames();
  const { isAuthenticated } = useAuth();

  const featuredGames = useMemo(() => {
    return [...games].sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, [games]);

  return (
    <div className="home-page">
      <section className="home-hero page">
        <div className="home-hero__content">
          <span className="eyebrow">Fullstack gaming gallery</span>
          <h1 className="hero-title">Tu biblioteca gamer empieza aquí.</h1>
          <p className="hero-subtitle">
            Explora videojuegos, guarda tus favoritos, consulta requisitos y comparte reviews con otros jugadores.
          </p>
          <div className="home-hero__actions">
            <Link className="btn btn--primary" to="/games">Explorar juegos</Link>
            {isAuthenticated ? (
              <Link className="btn" to="/library">Ver mi biblioteca</Link>
            ) : (
              <Link className="btn" to="/register">Crear cuenta</Link>
            )}
          </div>
        </div>

        <div className="home-hero__panel glass-panel">
          <div className="stat-card">
            <span>{games.length || "+100"}</span>
            <p>juegos en catálogo</p>
          </div>
          <div className="stat-card">
            <span>JWT</span>
            <p>sesión segura</p>
          </div>
          <div className="stat-card">
            <span>MongoDB</span>
            <p>datos reales</p>
          </div>
        </div>
      </section>

      <section className="page home-section">
        <div className="page-header">
          <span className="eyebrow">Destacados</span>
          <h2 className="page-title">Juegos mejor valorados</h2>
          <p className="page-subtitle">
            Una primera selección del catálogo, cargada directamente desde el backend.
          </p>
        </div>

        {loading ? (
          <Loader text="Cargando destacados..." />
        ) : (
          <div className="home-featured-grid">
            {featuredGames.map((game) => (
              <GameCard key={game._id} game={game} compact />
            ))}
          </div>
        )}
      </section>

      <section className="page home-benefits">
        <article className="glass-panel benefit-card">
          <span>01</span>
          <h3>Catálogo filtrable</h3>
          <p>Busca por título, género, plataforma, precio y valoración sin perder fluidez.</p>
        </article>
        <article className="glass-panel benefit-card">
          <span>02</span>
          <h3>Biblioteca personal</h3>
          <p>Guarda juegos en tu cuenta y consúltalos desde una ruta protegida.</p>
        </article>
        <article className="glass-panel benefit-card">
          <span>03</span>
          <h3>Reviews reales</h3>
          <p>Comenta y puntúa juegos conectando frontend, backend y MongoDB.</p>
        </article>
      </section>
    </div>
  );
};

export default Home;
