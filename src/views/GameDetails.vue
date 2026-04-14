<template>
  <div class="details">
    <button @click="goBack">← Back</button>

    <div v-if="loading">Loading...</div>

    <div v-else-if="game">
      <img :src="game.thumbnail" />

      <h1>{{ game.title }}</h1>

      <p class="genre">{{ game.genre }}</p>

      <p>{{ game.description }}</p>

      <p><strong>Platform:</strong> {{ game.platform }}</p>
      <p><strong>Publisher:</strong> {{ game.publisher }}</p>
      <p><strong>Release:</strong> {{ game.release_date }}</p>

      <a :href="game.game_url" target="_blank">Play Now</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "../services/api";

const route = useRoute();
const router = useRouter();

const game = ref<any>(null);
const loading = ref(true);

const goBack = () => {
  router.back();
};

onMounted(async () => {
  try {
    const { data } = await api.get(`/game?id=${route.params.id}`);
    game.value = data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>