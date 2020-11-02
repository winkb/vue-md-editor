<template>
    <MkEditorComponent class="h-full" />
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
  components: {
    MkEditorComponent,
    ProviderComponent,
  },
  name: "App",
});
</script>