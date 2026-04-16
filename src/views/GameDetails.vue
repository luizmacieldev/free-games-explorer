<template>
  <div class="px-10 py-8 text-white">
    <!-- Back button -->
    <button
      @click="goBack"
      class="mb-6 text-sm text-blue-400 hover:underline"
    >
      ← Back
    </button>

    <!-- Loading -->
    <div v-if="loading" class="animate-pulse space-y-4">
      <div class="h-64 bg-slate-800 rounded-xl"></div>
      <div class="h-6 bg-slate-800 w-1/3 rounded"></div>
      <div class="h-4 bg-slate-800 w-1/2 rounded"></div>
      <div class="h-4 bg-slate-800 w-full rounded"></div>
    </div>

    <!-- Content -->
    <div v-else-if="game" class="grid lg:grid-cols-2 gap-10">
      <!-- Image -->
      <div>
        <img
          :src="game.thumbnail"
          class="w-full h-[400px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      <!-- Info -->
      <div class="flex flex-col justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-3">
            {{ game.title }}
          </h1>

          <span
            class="inline-block bg-blue-600 px-3 py-1 rounded-md text-sm mb-4"
          >
            {{ game.genre }}
          </span>

          <p class="text-gray-300 leading-relaxed mb-6">
            {{ game.description }}
          </p>

          <!-- Details -->
          <div class="space-y-2 text-sm text-gray-400">
            <p><span class="text-white font-medium">Platform:</span> {{ game.platform }}</p>
            <p><span class="text-white font-medium">Publisher:</span> {{ game.publisher }}</p>
            <p><span class="text-white font-medium">Release:</span> {{ game.release_date }}</p>
          </div>
        </div>

        <!-- Action -->
        <a
          :href="game.game_url"
          target="_blank"
          class="mt-6 inline-block bg-green-500 hover:bg-green-600
                 text-white px-6 py-3 rounded-lg text-center font-semibold
                 transition"
        >
          🎮 Play Now
        </a>
      </div>
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

// Navigation
const goBack = () => {
  router.back();
};

// Fetch game
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