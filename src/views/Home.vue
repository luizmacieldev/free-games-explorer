<template>
  <div class="home">
    <h1>Free Games Explorer</h1>
    <div v-if="loading">Loading games...</div>
        <div v-else class="grid">
        <div v-for="game in games" :key="game.id" class="card" @click="goToGame(game.id)">
            <img :src="game.thumbnail" />
            <h3>{{ game.title }}</h3>
            <p>{{ game.genre }}</p>
        </div>
        </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "../services/api";
import type { Game } from "../types/Game";
import { useRouter } from "vue-router";
const router = useRouter();

const goToGame = (id: number) => {
  router.push(`/game/${id}`);
};

const games = ref<Game[]>([]);
const loading = ref<boolean>(true);

onMounted(async () => {
  try {
    console.log("Fetching games...");
    const { data } = await api.get<Game[]>("/games");
    games.value = data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>
