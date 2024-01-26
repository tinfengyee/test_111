import { createVNode, nextTick, render } from "vue";
import Preview from "./preview.vue";

let instance: ReturnType<typeof createVNode> | null = null;
export function createImgPreview() {

  const container = document.createElement("div");
  instance = createVNode(Preview, {
    show: true,
    srcList: [
      'https://www.google.com/logos/doodles/2023/sedad-hakk-eldems-115th-birthday-6753651837109993-2x.png'
    ],
  });

  render(instance, container);
  document.body.appendChild(container);

  nextTick(() => {
    setTimeout(() => {
      const el = container.querySelector(".el-image__preview") as HTMLElement;
      console.log("el :>> ", el);
      el.click();
    }, 10);
  });

  console.log("instance.component?.exposed :>> ", instance.component?.exposed);
  return instance.component?.exposed;
}
