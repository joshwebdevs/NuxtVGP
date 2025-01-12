<template>
  <v-app>
    <NavBar />
    <v-main>
      <template v-if="loading">
        <LayoutLoader />
      </template>
      <slot v-else />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import LayoutLoader from '../components/LayoutLoader.vue';

const loading = ref(false); // Set to true only when loading
</script>
