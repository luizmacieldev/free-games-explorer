<template>
  <div class="px-10 py-8 text-white">
    <h1 class="text-3xl font-bold mb-8">My Favorites</h1>

    <div v-if="store.favorites.length === 0">
      <p class="text-gray-400">No favorites yet.</p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10"
    >
      <GameCard
        v-for="game in store.favorites"
        :key="game.id"
        :game="game"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameCard from "../components/GameCard.vue";
import { useFavoritesStore } from "../stores/favorites";

const store = useFavoritesStore();
</script>