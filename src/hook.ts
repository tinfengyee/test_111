import { onMounted, ref, toValue } from "vue";
import type { MaybeRefOrGetter } from "@vueuse/core";
import { useEventListener } from "@vueuse/core";

interface UseResizeWidthOptions {
  initialMinWidth?: MaybeRefOrGetter<number>;
}

type ElementTarget = MaybeRefOrGetter<HTMLElement | null | undefined>;
export function useResizeWidth(
  widthTarget: ElementTarget,
  barTarget: ElementTarget,
  options: UseResizeWidthOptions = {}
) {
  const { initialMinWidth } = options;
  const minWidth = ref<number>(toValue(initialMinWidth) ?? 0);
  const clickData = ref<number>();
  const widthTargetX = ref<number>(0)

  onMounted(() => {
    widthTargetX.value = toValue(widthTarget)!.getBoundingClientRect().x;
  });

  const start = (e: MouseEvent) => {
    clickData.value = e.clientX;
  };
  const move = (e: MouseEvent) => {
    if (clickData.value) {
      // let widthTargetPosition = toValue(widthTarget)!.getBoundingClientRect();
      let width = e.clientX - toValue(widthTargetX);
      if (width < toValue(minWidth)) width = toValue(minWidth);
      clickData.value = width;
    }
  };
  const up = (_e: MouseEvent) => {
    if (!clickData.value) return;
    clickData.value = undefined;
  };

  useEventListener(barTarget, "mousedown", start);
  useEventListener(document, "mousemove", move);
  useEventListener(document, "mouseup", up);

  return {
    width: clickData,
  };
}
