<template>
  <div class="min-h-screen bg-slate-950 text-white">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { useFavoritesStore } from "./stores/favorites";

const store = useFavoritesStore();
store.loadFavorites();
</script>