import "./ReviewList.css";

const ReviewList = ({ reviews, currentUserId, onDelete }) => {
  if (!reviews.length) {
    return <p className="reviews-empty">Todavía no hay reviews para este juego.</p>;
  }

  return (
    <div className="reviews-list">
      {reviews.map((review) => {
        const isOwner = review.user?._id === currentUserId || review.user === currentUserId;

        return (
          <article className="review-card" key={review._id || review.id}>
            <div className="review-card__header">
              <div className="review-user">
                {review.user?.avatar && <img src={review.user.avatar} alt={review.user?.nombre || "Usuario"} />}
                <div>
                  <strong>{review.user?.nombre || "Usuario"}</strong>
                  <span>★ {review.rating}/10</span>
                </div>
              </div>
              {isOwner && onDelete && (
                <button className="btn btn--danger" type="button" onClick={() => onDelete(review.id)}>
                  Eliminar
                </button>
              )}
            </div>
            <p>{review.comment}</p>
          </article>
        );
      })}
    </div>
  );
};

export default ReviewList;
