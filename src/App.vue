<template>
    <MkEditorComponent :config="config" class="h-full" />
    <ProviderComponent />
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
import ProviderComponent from "./views/Provide";

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
    ProviderComponent,
  },
  name: "App",
});
</script>