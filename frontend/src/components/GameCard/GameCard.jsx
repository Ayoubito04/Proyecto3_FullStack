import { Link } from "react-router-dom";
import { memo, useState } from "react";
import "./GameCard.css";

const localImages = {
  Minecraft: "/games/minecraft.jpg",
  Fortnite: "/games/fortnite.jpg",
  "League of Legends": "/games/league-of-legends.jpg",
  "Escape from Tarkov": "/games/escape-from-tarkov.jpg",
  "Gran Turismo 7": "/games/gran-turismo-7.jpg",
  "The Surge 2": "/games/the-surge-2.jpg",
};

const formatPrice = (price) => {
  if (Number(price) === 0) return "Gratis";
  return `${Number(price).toFixed(2)} €`;
};

const GameCard = memo(({ game, onAdd, onRemove, isInLibrary = false, compact = false }) => {
  const [imageSrc, setImageSrc] = useState(game.image);

  const handleImageError = () => {
    const localImage = localImages[game.title];
    if (localImage && imageSrc !== localImage) {
      setImageSrc(localImage);
    }
  };

  return (
    <article className={`game-card ${compact ? "game-card--compact" : ""}`}>
      <Link to={`/games/${game.id}`} className="game-card__media" aria-label={`Ver ${game.title}`}>
        <img src={imageSrc} alt={game.title} referrerPolicy="no-referrer" onError={handleImageError} />
        <span className="game-card__rating">★ {game.rating}</span>
      </Link>

      <div className="game-card__body">
        <div className="game-card__topline">
          <span>{game.genre}</span>
          <strong>{formatPrice(game.price)}</strong>
        </div>

        <h2>{game.title}</h2>
        <p>{game.description}</p>

        <div className="game-card__meta">
          <span>{game.platform}</span>
          <span>{game.developer}</span>
        </div>

        <div className="game-card__actions">
          <Link className="btn" to={`/games/${game.id}`}>Ver detalle</Link>
          {onAdd && !isInLibrary && (
            <button className="btn btn--primary" type="button" onClick={() => onAdd(game.id)}>
              Añadir
            </button>
          )}
          {onRemove && isInLibrary && (
            <button className="btn btn--danger" type="button" onClick={() => onRemove(game.id)}>
              Quitar
            </button>
          )}
        </div>
      </div>
    </article>
  );
});

GameCard.displayName = "GameCard";

export default GameCard;
