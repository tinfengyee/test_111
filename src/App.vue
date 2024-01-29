<script setup lang="ts">
import { throttle } from "lodash-es";
import { computed, onMounted, reactive, ref } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";

const box = ref<HTMLElement>();

const position = reactive({
  top: 110,
  right: 0,
});

const boxSize = reactive({
  width: 0,
  height: 0,
});

const style = computed(() => {
  return {
    transform: `translate(${position.right}px, ${position.top}px)`,
    // top: position.top + "px",
    // right: position.right + "px",
  };
});

const handleClick = (event: MouseEvent) => {
  console.log("event.clientX :>> ", event.clientX);
  console.log("event.clientY :>> ", event.clientY);
  console.log("box :>> ", box.value);
};

const moving = ref(false);

// let timeoutId = 0

function onMove(event: MouseEvent) {
  // clearTimeout(timeoutId);
  // timeoutId = setTimeout(function() {
  //   console.log('mousemove事件未中断');
  // }, 1000);
  if (moving.value) {
    // position.top = event.clientY - boxSize.width / 2;
    // position.right = event.clientX - boxSize.height / 2;
  } else {
  }
}

function onDown(event: MouseEvent) {
  console.log("onDown :>> ", event);
  moving.value = true;
}

function onUp(event: MouseEvent) {
  moving.value = false;
  // setPosition();
}

const viewportSize = reactive({
  width: 0,
  height: 0,
});

onMounted(() => {
  viewportSize.width = document.documentElement.clientWidth;
  viewportSize.height = document.documentElement.clientHeight;
  const boxBouding = box.value!.getBoundingClientRect();
  boxSize.width = boxBouding.width;
  boxSize.height = boxBouding.height;

  position.right = 0;
  position.top = viewportSize.height - boxSize.height - 100;
});

function onResize(event: UIEvent) {
  viewportSize.width = document.documentElement.clientWidth;
  viewportSize.height = document.documentElement.clientHeight;
  // setPosition();
}

function setPosition() {
  console.log("setPosition :>> ", position.top);
  if (position.top < 0) {
    position.top = 0;
  }
  if (position.top + boxSize.height > viewportSize.height) {
    position.top = viewportSize.height - boxSize.height;
  }
}
window.addEventListener("resize", throttle(onResize, 100));

const onLeave = (e: MouseEvent) => {
  console.log("onLeave :>> ", e);
  moving.value = false;
  // setPosition();
};
</script>

<template>
  <div class="content" @click="handleClick">
    {{ viewportSize }}
    ===<br />
    {{ position }}
    ===<br />
    {{ boxSize }}
    <div
      ref="box"
      class="box"
      @mousedown="onDown"
      @mousemove="onMove"
      @mouseup="onUp"
      @mouseleave="onLeave"
      :style="style"
    >
      box
    </div>
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
  text-align: center;
  position: fixed;
  right: 0;
  top: 0;
  cursor: pointer;
}
.box:hover {
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.1);
}
</style>
