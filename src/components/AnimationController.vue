<script setup>
import { ref } from "vue"

const animationType = ref([
  {
    id: 1,
    name: "이동",
    type: "translate",
  },
  {
    id: 2,
    name: "회전",
    type: "rotate",
  },
  {
    id: 3,
    name: "확대/축소",
    type: "scale",
  },
  {
    id: 4,
    name: "투명도",
    type: "opacity",
  },
])
</script>
<template>
  <div class="flex gap-2">
    <button
      v-for="animation in animationType"
      :key="animation.id"
      class="border border-[#000] rounded-md px-2 py-1"
    >
      {{ animation.name }}
    </button>
  </div>
</template>