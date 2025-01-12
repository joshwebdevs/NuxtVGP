<template>
    <v-app-bar app>
      <v-app-bar-nav-icon />
      <v-toolbar-title>SpaceX Launch Tracker</v-toolbar-title>
      <v-spacer />
      <v-btn variant="text" to="/">Home</v-btn>
      <v-btn variant="text" to="/launches">Launches</v-btn>
      <v-btn variant="text" to="/favorites">Favorites</v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  };
  </script>
  
  <style scoped>
  </style>
  