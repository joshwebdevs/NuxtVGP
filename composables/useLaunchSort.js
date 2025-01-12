import { ref, computed } from 'vue';

export const useLaunchSort = (launches) => {
  const sortOrder = ref('asc'); // 'asc' for ascending, 'desc' for descending

  // Computed property for sorted launches
  const sortedLaunches = computed(() => {
    return [...launches.value].sort((a, b) => {
      const dateA = new Date(a.launch_date_utc);
      const dateB = new Date(b.launch_date_utc);

      if (sortOrder.value === 'asc') {
        return dateA - dateB; // Ascending order
      } else {
        return dateB - dateA; // Descending order
      }
    });
  });

  return {
    sortOrder,
    sortedLaunches,
  };
};
