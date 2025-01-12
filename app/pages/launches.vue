<template>
  <v-container>
    <!-- Filters -->
    <v-row justify="end" align="center" class="mb-4">
      <v-col cols="12" md="3">
        <v-select
          v-model="filterYear"
          :items="availableYears"
          label="Filter by Year"
          dense
          outlined
          clearable
          class="filter-select"
          @change="applyFilter"
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="sortOrder"
          :items="['asc', 'desc']"
          label="Sort by Launch Date"
          dense
          outlined
          class="filter-select"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Launches List -->
    <v-row>
      <v-col v-for="launch in sortedLaunches" :key="launch.id" cols="12" md="6">
        <v-card>
          <v-card-title>{{ launch.mission_name }}</v-card-title>
          <v-card-subtitle>
            <strong>Launch Date:</strong> {{ launch.launch_date_utc }}
          </v-card-subtitle>
          <v-card-text>
            <strong>Launch Site:</strong> 
            <span v-if="launch.launch_site">{{ launch.launch_site.site_name }}</span>
            <span v-else>No site information available</span>
            <br />
            <v-card-text>
              <strong>Rocket:</strong>
              <router-link :to="`/rockets/${launch.rocket.rocket.id}`">
                {{ launch.rocket.rocket.name }}
              </router-link>
            </v-card-text>
            <strong v-if="launch.details">Details:</strong> {{ launch.details }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from 'vue';
import { useLaunchFilter } from '../composables/useLaunchFilter';
import { useLaunchSort } from '../composables/useLaunchSort';

// GraphQL query to fetch launches
const GET_LAUNCHES = gql`
  query {
    launches {
      id
      mission_name
      launch_date_utc
      launch_site {
        site_name
      }
      rocket {
        rocket {
          id
          name
        }
      }
      details
    }
  }
`;

definePageMeta({
  layout: 'default', // Ensure this layout is applied
});

function applyFilter() {
  console.log('Filter applied!');
}

// Fetch launches
const { result, loading, error } = useQuery(GET_LAUNCHES);
const launches = ref([]);
if (result.value) {
  launches.value = result.value.launches;
}

// Filtering
const { filterYear, filteredLaunches, availableYears } = useLaunchFilter(launches);

// Sorting
const { sortOrder, sortedLaunches } = useLaunchSort(filteredLaunches);
</script>

<style scoped>
.filter-select {
  max-width: 100%;
}

.v-select {
  font-size: 0.875rem; /* Reduce font size */
}
</style>
