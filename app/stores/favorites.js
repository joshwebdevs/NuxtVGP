import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteRockets: [],
  }),
  actions: {
    addFavorite(rocket) {
      if (!this.favoriteRockets.some((r) => r.id === rocket.id)) {
        this.favoriteRockets.push(rocket);
      }
    },
    removeFavorite(rocketId) {
      this.favoriteRockets = this.favoriteRockets.filter((r) => r.id !== rocketId);
    },
    clearFavorites() {
      this.favoriteRockets = [];
    },
  },
  getters: {
    getFavorites(state) {
      return state.favoriteRockets;
    },
  },
});
