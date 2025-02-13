<script setup>
import { ref } from 'vue'

const code = ref('')
</script>

<template>
  <div class="w-full max-w-4xl p-4 mx-auto">
    <div class="bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden">
      <!-- Editor Header -->
      <div class="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2">
        <div class="flex gap-2">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <span class="ml-2 text-sm text-gray-400">Code Preview</span>
      </div>
      
      <!-- Code Editor Area -->
      <div class="p-4">
        <textarea
          v-model="code"
          class="w-full min-h-[300px] bg-[#1e1e1e] text-gray-100 font-mono text-sm p-2 outline-none resize-y"
          placeholder="Paste your code here..."
          spellcheck="false"
        ></textarea>
      </div>
    </div>
  </div>
</template>