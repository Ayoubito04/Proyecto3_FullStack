import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import EmptyState from "../components/EmptyState/EmptyState";
import ReviewList from "../components/ReviewList/ReviewList";
import { useAuth } from "../context/AuthContext";
import { getGameById } from "../services/games.services";
import { addGameToLibrary } from "../services/users.services";
import { createReview, deleteReview, getReviewsByGame } from "../services/reviews.services";
import "./GameDetail.css";

const localImages = {
  Minecraft: "/games/minecraft.jpg",
  Fortnite: "/games/fortnite.jpg",
  "League of Legends": "/games/league-of-legends.jpg",
  "Escape from Tarkov": "/games/escape-from-tarkov.jpg",
  "Gran Turismo 7": "/games/gran-turismo-7.jpg",
  "The Surge 2": "/games/the-surge-2.jpg",
};

const formatDate = (value) => {
  if (!value) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
};

const formatPrice = (price) => (Number(price) === 0 ? "Gratis" : `${Number(price).toFixed(2)} €`);

const SpecList = ({ title, specs }) => (
  <article className="spec-card glass-panel">
    <h3>{title}</h3>
    <dl>
      <div><dt>Sistema</dt><dd>{specs?.os || "No indicado"}</dd></div>
      <div><dt>CPU</dt><dd>{specs?.cpu || "No indicado"}</dd></div>
      <div><dt>RAM</dt><dd>{specs?.ram ? `${specs.ram} GB` : "No indicado"}</dd></div>
      <div><dt>GPU</dt><dd>{specs?.gpu || "No indicado"}</dd></div>
      <div><dt>Almacenamiento</dt><dd>{specs?.storage ? `${specs.storage} GB` : "No indicado"}</dd></div>
    </dl>
  </article>
);

const GameDetail = () => {
  const { gameId } = useParams();
  const { isAuthenticated, token, user, userId } = useAuth();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [reviewForm, setReviewForm] = useState({ rating: "8", comment: "" });
  const [sendingReview, setSendingReview] = useState(false);

  const image = useMemo(() => (game ? game.image : ""), [game]);
  const [detailImageSrc, setDetailImageSrc] = useState("");

  const loadReviews = useCallback(async () => {
    try {
      const response = await getReviewsByGame(gameId);
      setReviews(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      if (error.response?.status === 404) {
        setReviews([]);
      } else {
        setMessage("No se han podido cargar las reviews.");
      }
    }
  }, [gameId]);

  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getGameById(gameId);
        setGame(response.data);
        setDetailImageSrc(response.data.image);
        await loadReviews();
      } catch (error) {
        setError(error.response?.data?.message || "No se ha podido cargar el videojuego.");
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [gameId, loadReviews]);

  const handleAddToLibrary = async () => {
    if (!isAuthenticated) {
      setMessage("Inicia sesión para añadir el juego a tu biblioteca.");
      return;
    }

    try {
      await addGameToLibrary(userId, game.id, token);
      setMessage("Juego añadido a tu biblioteca.");
    } catch (error) {
      setMessage(error.response?.data?.message || "No se ha podido añadir el juego.");
    }
  };

  const handleReviewChange = (event) => {
    const { name, value } = event.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      setMessage("Inicia sesión para publicar una review.");
      return;
    }

    try {
      setSendingReview(true);
      setMessage("");
      await createReview(game.id, { rating: Number(reviewForm.rating), comment: reviewForm.comment }, token);
      setReviewForm({ rating: "8", comment: "" });
      setMessage("Review publicada correctamente.");
      await loadReviews();
    } catch (error) {
      setMessage(error.response?.data?.message || "No se ha podido publicar la review.");
    } finally {
      setSendingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId, token);
      setMessage("Review eliminada.");
      await loadReviews();
    } catch (error) {
      setMessage(error.response?.data?.message || "No se ha podido eliminar la review.");
    }
  };

  if (loading) return <main className="page"><Loader text="Cargando videojuego..." /></main>;

  if (error || !game) {
    return (
      <main className="page">
        <EmptyState title="Juego no encontrado" text={error} action={<Link className="btn" to="/games">Volver al catálogo</Link>} />
      </main>
    );
  }

  return (
    <main className="game-detail-page">
      <section className="game-detail-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(8,10,18,0.96), rgba(8,10,18,0.78), rgba(8,10,18,0.45)), url(${image})` }}>
        <div className="page game-detail-hero__content">
          <Link className="back-link" to="/games">← Volver al catálogo</Link>
          <span className="eyebrow">{game.genre}</span>
          <h1 className="page-title">{game.title}</h1>
          <p className="page-subtitle">{game.description}</p>
          <div className="detail-actions">
            <button className="btn btn--primary" type="button" onClick={handleAddToLibrary}>Añadir a biblioteca</button>
            <span className="detail-pill">★ {game.rating}/10</span>
            <span className="detail-pill">{formatPrice(game.price)}</span>
          </div>
        </div>
      </section>

      <section className="page detail-grid">
        <aside className="detail-summary glass-panel">
          <img
            src={detailImageSrc}
            alt={game.title}
            referrerPolicy="no-referrer"
            onError={() => {
              const localImage = localImages[game.title];
              if (localImage && detailImageSrc !== localImage) setDetailImageSrc(localImage);
            }}
          />
          <dl>
            <div><dt>Plataforma</dt><dd>{game.platform}</dd></div>
            <div><dt>Fecha</dt><dd>{formatDate(game.releaseDate)}</dd></div>
            <div><dt>Desarrollador</dt><dd>{game.developer}</dd></div>
            <div><dt>Publisher</dt><dd>{game.publisher}</dd></div>
          </dl>
        </aside>

        <div className="detail-main">
          {message && <p className="message">{message}</p>}

          <section className="specs-grid">
            <SpecList title="Requisitos mínimos" specs={game.minspecs} />
            <SpecList title="Requisitos recomendados" specs={game.recSpecs} />
          </section>

          <section className="reviews-section glass-panel">
            <div className="reviews-section__header">
              <div>
                <span className="eyebrow">Comunidad</span>
                <h2>Reviews</h2>
              </div>
              {isAuthenticated ? <span>{user?.nombre}</span> : <Link className="btn" to="/login">Entrar para opinar</Link>}
            </div>

            {isAuthenticated && (
              <form className="review-form" onSubmit={handleReviewSubmit}>
                <label className="form-field">
                  Valoración
                  <select name="rating" value={reviewForm.rating} onChange={handleReviewChange}>
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((value) => (
                      <option key={value} value={value}>{value}/10</option>
                    ))}
                  </select>
                </label>
                <label className="form-field">
                  Comentario
                  <textarea name="comment" value={reviewForm.comment} onChange={handleReviewChange} placeholder="Escribe tu opinión..." required />
                </label>
                <button className="btn btn--primary" type="submit" disabled={sendingReview}>
                  {sendingReview ? "Publicando..." : "Publicar review"}
                </button>
              </form>
            )}

            <ReviewList reviews={reviews} currentUserId={user?._id} onDelete={handleDeleteReview} />
          </section>
        </div>
      </section>
    </main>
  );
};

export default GameDetail;
