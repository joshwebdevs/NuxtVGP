<template>
    <div class="layout-loader">
      <v-progress-circular indeterminate color="primary" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'LayoutLoader',
  };
  </script>
  
  <style scoped>
  .layout-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>
  