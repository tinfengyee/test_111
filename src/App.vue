<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";

const box = ref(null);

const position = reactive({
  top: 10,
  right: 10,
});

const style = computed(() => {
  return {
    top: position.top + "px",
    left: position.right + "px",
  };
});

const handleClick = (event: Event) => {
  console.dir(event);
  console.log("box :>> ", box.value);
  console.log("window :>> ", window);
  console.log(document.documentElement.clientHeight);
  console.log(document.documentElement.clientWidth);
};

function onMove(event: MouseEvent) {
  // console.log("onMove :>> ", event);
}

function onDown(event: MouseEvent) {
  console.log("onDown :>> ", event);
}

function onUp(event: MouseEvent) {
  console.log("onUp :>> ", event);
}

const viewportSize = reactive({
  width: 0,
  height: 0,
});

onMounted(() => {
  viewportSize.width = document.documentElement.clientWidth;
  viewportSize.height = document.documentElement.clientHeight;
});
</script>

<template>
  <div class="content" @click="handleClick">
    {{ viewportSize }}
    <div
      ref="box"
      class="box"
      @mousedown="onDown"
      @mousemove="onMove"
      @mouseup="onUp"
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
