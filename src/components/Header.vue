<script setup>
import { ref } from 'vue'

const tabs = ref([
  {
    // 객체속성
    id: 'object',
    label: 'Object',
  },
 
  {
    // 코드로 추출
    id: 'code',
    label: 'Code',
  },
  {
    // 코드 => 코드에 따라 임의 객체 만들고 애니메이션 재생
    id: 'preview',
    label: 'Preview',
  }
])

const activeTab = ref(null)

const changeTab = (tab) => {
  activeTab.value = tab
}
</script>
<template>
  <header class="h-[50px] absolute top-0 left-0 w-full border-b border-[#000] flex items-center justify-between px-10">
    <slot></slot>
    <div class="flex items-center gap-2">
      <button 
        v-for="tab in tabs" :key="tab.id" 
        class="px-2 py-1 rounded-md"
        :class="{ 'bg-blue-500 text-white': tab.id === activeTab?.id }" 
        @click="changeTab(tab)">
        {{ tab.label }}
      </button>
    </div>
  </header>
</template>
