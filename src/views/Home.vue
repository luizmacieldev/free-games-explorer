<template>
  <div class="px-10 py-8 text-white">
    <h1 class="text-3xl font-bold mb-6">
      Free Games Explorer
    </h1>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-6 mb-8">
      <!-- Search -->
      <input
        v-model="search"
        placeholder="Search games..."
        class="bg-slate-800 px-4 py-2 rounded-lg text-white w-full max-w-md"
      />

      <!-- Platform -->
      <select v-model="selectedPlatform" class="bg-slate-800 px-4 py-2 rounded-lg">
        <option value="">All Platforms</option>
        <option value="pc">PC</option>
        <option value="browser">Browser</option>
      </select>

      <!-- Sort -->
      <select v-model="sortBy" class="bg-slate-800 px-4 py-2 rounded-lg">
        <option value="">Sort</option>
        <option value="release-date">Release Date</option>
        <option value="alphabetical">A-Z</option>
      </select>

      <!-- Clear -->
      <button
        @click="clearFilters"
        class="text-sm text-gray-400 hover:text-white"
      >
        Clear
      </button>
    </div>

    <!-- Genres -->
    <div class="mb-10">
      <p class="mb-3 text-sm text-gray-400">Genres</p>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="genre in genres"
          :key="genre"
          @click="toggleGenre(genre)"
          :class="[
            'px-3 py-1 rounded-full text-xs transition transform',
            selectedGenre === genre
              ? 'bg-blue-600 text-white scale-105'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
          ]"
        >
          {{ genre }}
        </button>
      </div>
    </div>

    <!-- Selected genre -->
    <p v-if="selectedGenre" class="text-sm text-blue-400 mb-4">
      Filtering by: {{ selectedGenre }}
    </p>

    <!-- Skeleton -->
    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10"
    >
      <div
        v-for="n in 12"
        :key="n"
        class="bg-slate-900 rounded-2xl overflow-hidden animate-pulse"
      >
        <div class="h-56 bg-slate-800"></div>
        <div class="p-4 space-y-2">
          <div class="h-4 bg-slate-800 rounded"></div>
          <div class="h-3 bg-slate-800 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="visibleGames.length === 0" class="text-center py-10">
      <p class="text-gray-400">No games found.</p>
    </div>

    <!-- Games -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10"
    >
      <GameCard
        v-for="game in visibleGames"
        :key="game.id"
        :game="game"
      />
    </div>

    <!-- Infinite Scroll Trigger -->
    <div ref="loadMoreRef" class="h-10"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { api } from "../services/api";
import type { Game } from "../types/Game";
import GameCard from "../components/GameCard.vue";

// State
const games = ref<Game[]>([]);
const visibleGames = ref<Game[]>([]);
const loading = ref(true);

// Filters
const search = ref("");
const selectedGenre = ref("");
const selectedPlatform = ref("");
const sortBy = ref("");

// Genres list
const genres = [
  "mmorpg","shooter","strategy","moba","racing","sports",
  "open-world","survival","pvp","pve","zombie",
  "turn-based","first-person","third-person","top-down",
  "tank","space","card","battle-royale",
  "anime","fantasy","sci-fi","fighting","action-rpg",
  "action","military","horror"
];

// Pagination
const itemsPerPage = 20;
let page = 1;

// Toggle genre
const toggleGenre = (genre: string) => {
  selectedGenre.value =
    selectedGenre.value === genre ? "" : genre;
};

// Clear filters
const clearFilters = () => {
  selectedGenre.value = "";
  selectedPlatform.value = "";
  sortBy.value = "";
  search.value = "";
};

// Fetch API
const fetchGames = async () => {
  try {
    loading.value = true;

    let url = "/games";
    const params: string[] = [];

    if (selectedGenre.value) {
      params.push(`category=${selectedGenre.value}`);
    }

    if (selectedPlatform.value) {
      params.push(`platform=${selectedPlatform.value}`);
    }

    if (sortBy.value) {
      params.push(`sort-by=${sortBy.value}`);
    }

    if (params.length) {
      url += "?" + params.join("&");
    }

    const { data } = await api.get<Game[]>(url);

    games.value = data;
    page = 1;
    visibleGames.value = filteredGames.value.slice(0, itemsPerPage);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Filter FIRST then paginate
const filteredGames = computed(() => {
  return games.value.filter((game) =>
    game.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Then paginate
const loadMore = () => {
  visibleGames.value = filteredGames.value.slice(0, page * itemsPerPage);
};

// Intersection observer
const loadMoreRef = ref<HTMLElement | null>(null);

// Watch filters (API)
watch([selectedGenre, selectedPlatform, sortBy], () => {
  fetchGames();
});

// Watch search (client-side)
watch(search, () => {
  page = 1;
  visibleGames.value = filteredGames.value.slice(0, itemsPerPage);
});

// Init
onMounted(async () => {
  await fetchGames();

  const observer = new IntersectionObserver((entries) => {
    if (
      entries[0].isIntersecting &&
      visibleGames.value.length < filteredGames.value.length &&
      !search.value // optional: disable infinite scroll while searching
    ) {
      page++;
      loadMore();
    }
  });

  if (loadMoreRef.value) {
    observer.observe(loadMoreRef.value);
  }
});
</script>