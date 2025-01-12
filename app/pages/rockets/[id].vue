<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ rocket?.name || "Rocket Details" }}</v-card-title>
          <v-card-text>
            <div v-if="loading">Loading rocket details...</div>
            <div v-else-if="error">
              <strong>Error:</strong> {{ error.message }}
            </div>
            <div v-else-if="rocket">
              <strong>Description:</strong> {{ rocket.description || "No description available" }}<br />
              <strong>First Flight:</strong> {{ rocket.first_flight || "N/A" }}<br />
              <strong>Height:</strong> {{ rocket.height?.meters || "N/A" }} meters<br />
              <strong>Diameter:</strong> {{ rocket.diameter?.meters || "N/A" }} meters<br />
              <strong>Mass:</strong> {{ rocket.mass?.kg || "N/A" }} kg<br />
              <strong>Number of Stages:</strong> {{ rocket.stages || "N/A" }}
              <div class="d-flex justify-end mt-4">
                <v-btn color="primary" @click="handleAddToFavorites(rocket)">
                  Add to Favorites
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.visible" :timeout="3000" top>
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import gql from 'graphql-tag';
import { useFavoritesStore } from '../../stores/favorites';

// Get the 'id' parameter from the route
const route = useRoute();
const rocketId = route.params.id || ''; // Using 'id' from the dynamic route

// Pinia Store
const favoritesStore = useFavoritesStore();
const snackbar = ref({
  visible: false,
  message: '',
});
const handleAddToFavorites = () => {
  if (rocket.value) {
    favoritesStore.addFavorite(rocket.value);
    snackbar.value.message = `${rocket.value.name} has been added to your favorites!`;
    snackbar.value.visible = true;
  }
};

// GraphQL query to fetch rocket details by name
const GET_ROCKET_DETAILS = gql`
  query GetRocketDetails($id: ID!) {
    rocket(id: $id) {
      id
      name
      description
      first_flight
      height {
        meters
      }
      diameter {
        meters
      }
      mass {
        kg
      }
      stages
    }
  }
`;

const { result, loading, error } = useQuery(GET_ROCKET_DETAILS, { id: route.params.id });




// Compute rocket details from result
const rocket = computed(() => result.value?.rocket || null);
</script>


<style scoped>
/* Add custom styles as needed */
</style>
