import { ref } from "vue";
import useEventListener from "@/hooks/useEventListener";

export const useKeyUp = () => {
  const keycode = ref();

  const keyUp = (key) => {
    keycode.value = key.keyCode;
  };

  useEventListener(window, "keyup", keyUp);

  return { keycode };
};
