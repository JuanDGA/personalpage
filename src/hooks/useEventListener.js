import { onMounted, onUnmounted } from "vue";

const useEventListener = (source, event, handler) => {
  onMounted(() => {
    source.addEventListener(event, handler);
  });

  onUnmounted(() => {
    source.removeEventListener(event, handler);
  });
}

export default useEventListener;
