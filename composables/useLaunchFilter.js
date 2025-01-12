export function useLaunchFilter(launches) {
  const filterYear = ref(null);

  const availableYears = computed(() => {
    return launches.value
      ? [...new Set(launches.value.map(launch => new Date(launch.launch_date_utc).getFullYear()))]
      : [];
  });

  const filteredLaunches = computed(() => {
    return filterYear.value
      ? launches.value.filter(
          launch => new Date(launch.launch_date_utc).getFullYear() === filterYear.value
        )
      : launches.value;
  });

  return { filterYear, availableYears, filteredLaunches };
}
