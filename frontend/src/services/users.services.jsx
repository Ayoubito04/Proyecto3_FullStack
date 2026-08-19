import { api } from "./api";

export const registerUser = (userData) => api.post("/users/registro", userData);

export const loginUser = (userData) => api.post("/users/login", userData);

export const editUser = (id, userData, token) =>
  api.put(`/users/edit/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(userData instanceof FormData ? {} : { "Content-Type": "application/json" }),
    },
  });

export const deleteUser = (id, token) =>
  api.delete(`/users/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addGameToLibrary = (id, gameId, token) =>
  api.post(`/users/${id}/library/${gameId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const removeGameFromLibrary = (id, gameId, token) =>
  api.delete(`/users/${id}/library/${gameId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getLibrary = (id, token) =>
  api.get(`/users/${id}/library`, {
    headers: { Authorization: `Bearer ${token}` },
  });
