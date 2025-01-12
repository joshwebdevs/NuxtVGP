// middleware/redirect.global.ts
export default defineNuxtRouteMiddleware((to) => {
    console.log('Middleware activated. Navigating to:', to.path);
  
    // Redirect if the route does not exist
    if (to.matched.length === 0) {
      console.log('Route not matched. Redirecting to /launches');
      return navigateTo('/launches');
    }
  });
  