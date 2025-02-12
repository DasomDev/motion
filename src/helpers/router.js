import { createRouter, createWebHistory } from 'vue-router'

import {
  EditorView
} from '@/views'
import { ref } from 'vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: MainView,
    // },
    {
      path: '/',
      name: 'editor',
      component: EditorView,
    },
  ],
})

router.beforeEach(async (to, from) => {
})
