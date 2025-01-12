<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <h1>Your Favorite Rockets</h1>
      <v-btn color="red" @click="handleClearFavorites">
        Clear All Favorites
      </v-btn>
    </v-row>

    <v-row>
      <v-col
        v-for="rocket in favoriteRockets"
        :key="rocket.id"
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>{{ rocket.name }}</v-card-title>
          <v-card-subtitle>
            <strong>Description:</strong> {{ rocket.description || "No description available" }}
          </v-card-subtitle>
          <v-card-text>
            <strong>First Flight:</strong> {{ rocket.first_flight || "N/A" }}<br />
            <strong>Height:</strong> {{ rocket.height?.meters || "N/A" }} meters<br />
            <strong>Diameter:</strong> {{ rocket.diameter?.meters || "N/A" }} meters<br />
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" @click="handleRemoveFavorite(rocket.id)">
              Remove from Favorites
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar for messages -->
    <v-snackbar v-model="showSnackbar" :timeout="3000">
      {{ snackbarMessage }}
      <template #actions>
        <v-btn color="primary" variant="text" @click="showSnackbar = false">
  Close
</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFavoritesStore } from '../stores/favorites';

// Define the Rocket type
type Rocket = {
  id: string;
  name: string;
  description?: string;
  first_flight?: string;
  height?: { meters: number };
  diameter?: { meters: number };
};

// Pinia store
const favoritesStore = useFavoritesStore();

// Reactive state for snackbar
const showSnackbar = ref(false);
const snackbarMessage = ref('');

// Computed property for favorite rockets
const favoriteRockets = computed<Rocket[]>(() => favoritesStore.getFavorites);

// Handle clearing all favorites
const handleClearFavorites = () => {
  favoritesStore.clearFavorites();
  snackbarMessage.value = 'All favorites cleared!';
  showSnackbar.value = true;
};

// Handle removing a single favorite
const handleRemoveFavorite = (rocketId: string) => {
  favoritesStore.removeFavorite(rocketId);
  snackbarMessage.value = 'Rocket removed from favorites!';
  showSnackbar.value = true;
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
