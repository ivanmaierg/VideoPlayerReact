import types from '../types/types';

export const setFavorite = (payload) => ({
  type: types.setFavorites,
  payload,
});

export const deleteFavorite = (payload) => ({
  type: types.deleteFavorites,
  payload,
});

export const loginRequest = (payload) => ({
  type: types.loginRequest,
  payload,
});

export const logoutRequest = (payload) => ({
  type: types.logoutRequest,
});

export const registerRequest = (payload) => ({
  type: types.registerRequest,
  payload,
});

export const getVideoSource = (payload) => ({
  type: types.getVideoSource,
  payload,
});
