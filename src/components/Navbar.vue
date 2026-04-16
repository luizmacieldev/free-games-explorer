<template>
  <nav class="flex items-center justify-between px-10 py-4 bg-slate-900 text-white">
    <!-- Logo -->
     <router-link to="/">
        <h1 class="text-lg font-bold">🎮 GameHub</h1>
     </router-link>
    

    <!-- Links -->
    <div class="flex items-center gap-6">
      <router-link to="/" class="hover:text-blue-400">
        Home
      </router-link>

      <!-- Favorites -->
      <router-link
        to="/favorites"
        class="flex items-center gap-2 hover:text-blue-400"
      >
         Favorites 

        <!-- Badge -->
        <span
          v-if="store.favorites.length"
          class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
        >
          {{ store.favorites.length }}
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "../stores/favorites";

const store = useFavoritesStore();
</script>