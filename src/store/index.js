import { createPinia } from 'pinia'
import { useObjectStore } from './objectStore'
import { useControllerStore } from './controllerStore'
const pinia = createPinia()

export { pinia, useObjectStore, useControllerStore }
