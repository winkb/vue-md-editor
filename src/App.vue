<template>
    <MkEditorComponent class="h-full" />
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
  components: { MkEditorComponent },
  name: "App",
});
</script>