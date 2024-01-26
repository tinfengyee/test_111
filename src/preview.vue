<script setup lang="ts">
import { ElImage } from "element-plus";

import { reactive } from "vue";

export interface Props {
  show: boolean;
  srcList: string[];
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  srcList: () => [],
});

const imgState = reactive({
  show: props.show,
  srcList: props.srcList,
});

console.log("imgState:>> ", imgState);

const url = imgState.srcList[0]

const handleClose = () => {
  console.log("close");
  imgState.show = false;
  const img = document.querySelector(".image-show");
  img?.parentNode?.parentNode?.removeChild(img.parentNode)
  console.debug(img);
};

defineExpose({
  imgState,
});
</script>
<template>
  <ElImage
    class="image-show"
    v-if="imgState.show"
    style="width: 0; height: 0"
    :src="url"
    :zoom-rate="1.2"
    :max-scale="7"
    :min-scale="0.2"
    :preview-src-list="imgState.srcList"
    :initial-index="0"
    fit="cover"
    @close="handleClose"
  />
</template>
