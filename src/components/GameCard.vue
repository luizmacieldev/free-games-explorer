<template>
  <div
    @click="goToGame"
    class="group bg-slate-900 rounded-2xl overflow-hidden cursor-pointer
           hover:scale-105 hover:-translate-y-1
           hover:shadow-2xl hover:shadow-black/60
           transition duration-300"
  >
    <!-- Image + Favorite -->
    <div class="relative">
      <img
        :src="game.thumbnail"
        class="w-full h-52 object-cover group-hover:opacity-80 transition"
        loading="lazy"
      />

      <!-- Favorite button -->
      <button
        @click.stop="store.toggleFavorite(game)"
        class="absolute top-2 right-2 bg-black/60 hover:bg-black/80
               p-2 rounded-full transition"
      >
        <span v-if="isFavorite">❤️</span>
        <span v-else>🤍</span>
      </button>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-2">
      <!-- Title -->
      <h3 class="text-base font-semibold text-gray-100 line-clamp-2">
        {{ game.title }}
      </h3>

      <!-- Description -->
      <p class="text-xs text-gray-400 line-clamp-2">
        {{ game.short_description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mt-2">
        <span class="text-xs bg-blue-600 px-2 py-1 rounded-md">
          {{ game.genre }}
        </span>

        <span class="text-xs bg-slate-700 px-2 py-1 rounded-md">
          {{ game.platform }}
        </span>
      </div>

      <!-- Publisher -->
      <p class="text-[11px] text-gray-500 mt-1">
        {{ game.publisher }}
      </p>

      <!-- Release Date -->
      <p class="text-[11px] text-gray-500">
        {{ game.release_date }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Game } from "../types/Game";
import { useRouter } from "vue-router";
import { useFavoritesStore } from "../stores/favorites";
import { computed } from "vue";

// Props
const props = defineProps<{
  game: Game;
}>();

const router = useRouter();
const store = useFavoritesStore();

// Navigation
const goToGame = () => {
  router.push(`/game/${props.game.id}`);
};

// Check if favorite
const isFavorite = computed(() =>
  store.favorites.some((g) => g.id === props.game.id)
);
</script>