<script setup lang="ts">
import { throttle } from "lodash-es";
import { computed, onBeforeMount, onMounted, reactive, ref, unref } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";

const box = ref<HTMLElement>();

const offsetBottom = -100;

const viewportSize = reactive({
  width: 0,
  height: 0,
});

const boxPosition = reactive({
  bottom: offsetBottom,
  right: 0,
});

const boxSize = reactive({
  width: 0,
  height: 0,
});

const eventPosition = reactive({
  x: 0,
  y: 0,
});

const mousePosition = reactive({
  x: 0,
  y: 0,
});

const isClick = ref(true);

const style = computed(() => {
  return {
    transition: moving.value
      ? "none"
      : "transform 0.3s cubic-bezier(0.31, 0.9, 0.88, 0.62)",
    transform: `translate(${boxPosition.right}px, ${boxPosition.bottom}px)`,
  };
});

const moving = ref(false);

function onDown(_event: MouseEvent) {
  moving.value = true;
  isClick.value = true;
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
}

function onMove(event: MouseEvent) {
  if (unref(moving)) {
    isClick.value = false;
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
    boxPosition.right = event.clientX - viewportSize.width + boxSize.width / 2;
    boxPosition.bottom =
      event.clientY - viewportSize.height + boxSize.height / 2;
  }
}

function onUp(_event: MouseEvent) {
  moving.value = false;
  setEdgePosition();
  if (unref(isClick)) {
    isClick.value = false;
  }
  document.removeEventListener("mousemove", onMove);
  document.removeEventListener("mouseup", onUp);
}

function setEdgePosition() {
  if (boxPosition.right < 0) {
    boxPosition.right = 0;
  }
  // 贴右
  if (boxPosition.right > 0) {
    boxPosition.right = 0;
  }
  // 贴底
  if (boxPosition.bottom > 0) {
    boxPosition.bottom = 0;
  }
  // 贴顶
  if (viewportSize.height < boxSize.height - boxPosition.bottom) {
    boxPosition.bottom = boxSize.height - viewportSize.height;
  }
}

function onResize(_event: UIEvent) {
  viewportSize.width = document.documentElement.clientWidth;
  viewportSize.height = document.documentElement.clientHeight;
}

window.addEventListener("resize", throttle(onResize, 200));

onMounted(() => {
  viewportSize.width = document.documentElement.clientWidth;
  viewportSize.height = document.documentElement.clientHeight;
  const boxBouding = box.value!.getBoundingClientRect();
  boxSize.width = boxBouding.width;
  boxSize.height = boxBouding.height;

  // boxPosition.right = 0;
  // boxPosition.bottom = offsetBottom;
});

onBeforeMount(() => {
  document.removeEventListener("mousemove", onMove);
  document.removeEventListener("mouseup", onUp);
});
</script>

<template>
  <div class="content">
    {{ moving }}
    viewportSize: {{ viewportSize }} <br />
    === <br />
    boxPosition:{{ boxPosition }} <br />
    === <br />
    boxSize:{{ boxSize }}
    <br />
    === <br />
    eventPosition:{{ eventPosition }}
    <br />
    === <br />
    mousePosition:{{ mousePosition }}

    <div ref="box" class="box" :style="style" @mousedown="onDown">box</div>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}
.box {
  background-color: aquamarine;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  position: fixed;
  right: 0;
  bottom: 0;
  cursor: pointer;
  user-select: none;
}
.box:hover {
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
}
</style>
