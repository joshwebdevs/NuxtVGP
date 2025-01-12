import { ref, onMounted, onUnmounted } from 'vue';

export function useCountdown(launchDate) {
  const remainingTime = ref('');

  const updateCountdown = () => {
    const now = new Date();
    const target = new Date(launchDate);
    const diff = target - now;

    if (diff <= 0) {
      remainingTime.value = 'Launched!';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    remainingTime.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  let interval;
  onMounted(() => {
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
  });

  onUnmounted(() => {
    clearInterval(interval);
  });

  return { remainingTime };
}
