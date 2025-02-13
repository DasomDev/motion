<script setup>
import { ref, onMounted } from 'vue'

const code = ref('')

onMounted(() => {
  code.value = `@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animated-element {
  animation: slideIn 0.5s ease-out forwards;
}

/* Hover animation */
.button-hover {
  transition: all 0.3s ease;
}

.button-hover:hover {
  transform: scale(1.1);
  background-color: #4a90e2;
  color: white;
}`
})
</script>

<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden">
      <!-- Editor Header -->
      <div class="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2">
        <div class="flex gap-2">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <span class="ml-2 text-sm text-gray-400">Code</span>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#9CA3AF"
          class="w-4 h-4 ml-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
          />
        </svg>
      </div>

      <!-- Code Editor Area -->
      <div class="p-4">
        <textarea
          v-model="code"
          class="w-full min-h-[300px] bg-[#1e1e1e] text-gray-100 font-mono text-sm p-2 outline-none resize-none"
          placeholder="Paste your code here..."
          spellcheck="false"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #2d2d2d;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* For Firefox */
textarea {
  scrollbar-width: thin;
  scrollbar-color: #555 #2d2d2d;
}
</style>
