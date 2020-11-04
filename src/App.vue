<template>
    <div class="w-full h-full p-5">
        <MkEditorComponent :config="config" />
    </div>
</template>

<style>
body,
html,
#app {
  height: 100%;
}
</style>
<script lang="ts">
import { defineComponent } from "vue";
import MkEditorComponent from "./components/MkEditor";

export default defineComponent({
  data() {
    return {
      config: {
        upload() {
          return new Promise((r) => {
            setTimeout(
              () =>
                r({
                  path:
                    "https://pic1.zhimg.com/80/v2-2655b868e875f5c76de3e7e4fae118c6_1440w.jpg?source=1940ef5c",
                }),
              3000
            );
          });
        },
      },
    };
  },
  components: {
    MkEditorComponent,
  },
  name: "App",
});
</script>