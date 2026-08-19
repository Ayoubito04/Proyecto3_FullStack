import { api } from "./api";

export const getAllGames = () => api.get("/games");

export const getGameById = (gameId) => api.get(`/games/${gameId}`);

export const filterGames = (params) => api.get("/games/filter", { params });
