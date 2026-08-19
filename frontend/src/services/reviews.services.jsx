import { api } from "./api";

export const getReviewsByGame = (gameId) => api.get(`/reviews/${gameId}`);

export const createReview = (gameId, reviewData, token) =>
  api.post(`/reviews/${gameId}`, reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteReview = (reviewId, token) =>
  api.delete(`/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
