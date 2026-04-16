import { defineStore } from "pinia";
import type { Game } from "../types/Game";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [] as Game[],
  }),

  actions: {
    toggleFavorite(game: Game) {
      const exists = this.favorites.find((g) => g.id === game.id);

      if (exists) {
        this.favorites = this.favorites.filter((g) => g.id !== game.id);
      } else {
        this.favorites.push(game);
      }

      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },

    loadFavorites() {
      const data = localStorage.getItem("favorites");
      if (data) {
        this.favorites = JSON.parse(data);
      }
    },
  },
});