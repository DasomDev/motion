import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useObjectStore = defineStore('object', () => {
  // Constants
  const ANIMATION_TYPES = {
    TRANSLATE: 'translate',
    ROTATE: 'rotate',
    SCALE: 'scale',
    OPACITY: 'opacity',
  }

  const DEFAULT_ANIMATION_SETTINGS = {
    [ANIMATION_TYPES.TRANSLATE]: {
      x: 0,
      y: 0,
      duration: 1000,
      easing: 'linear',
    },
    [ANIMATION_TYPES.ROTATE]: {
      angle: 0,
      duration: 1000,
      easing: 'linear',
    },
    [ANIMATION_TYPES.SCALE]: {
      x: 1,
      y: 1,
      duration: 1000,
      easing: 'linear',
    },
    [ANIMATION_TYPES.OPACITY]: {
      value: 1,
      duration: 1000,
      easing: 'linear',
    },
  }

  const EASING_FUNCTIONS = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  }

  // State
  const yay = ref(false)
  const objects = ref([])
  const cloneObjects = ref([]) // marker 값을 위한 복사객체
  const selectedObject = ref(null)
  const objectStartFrom = ref(null)

  const OBJECT_TYPE = ref([
    {
      id: 1,
      name: '도형',
      type: 'shape',
    },
    {
      id: 2,
      name: '이미지',
      type: 'image',
    },
    {
      id: 3,
      name: '텍스트',
      type: 'text',
    },
  ])

  const generateUniqueId = () => {
    let newId
    do {
      newId = `object-${crypto.randomUUID()}`
    } while (objects.value.some((obj) => obj.id === newId))
    return newId
  }

  // Actions
  const addObject = (object, isClone = false) => {
    const newObject = {
      id: generateUniqueId(),
      type: object.type || 'circle',
      x: object.x || 0,
      y: object.y || 0,
      radius: object.radius || 50,
      fillStyle: object.fillStyle || '#000000',
      animations: [],
      ...(object.imageUrl && { imageUrl: object.imageUrl }),
    }

    if (isClone) {
      newObject.fillStyle = '#E9D5FF'
      newObject.isClone = true
      cloneObjects.value.push(newObject)
    } else {
      objects.value.push(newObject)
    }
    return newObject.id
  }

  const removeObject = (objectId) => {
    const index = objects.value.findIndex((obj) => obj.id === objectId)
    if (index !== -1) {
      objects.value.splice(index, 1)
      // Also remove associated animations
      animations.value = animations.value.filter((anim) => anim.objectId !== objectId)
    }
  }

  const selectObject = (objectId) => {
    const object = objects.value.find((obj) => obj.id === objectId)
    selectedObject.value = object || null
  }

  const clearSelection = () => {
    selectedObject.value = null
  }

  const setObjectStartFrom = (startFrom) => {
    objectStartFrom.value = startFrom
  }

  return {
    // Constants
    ANIMATION_TYPES,
    DEFAULT_ANIMATION_SETTINGS,
    EASING_FUNCTIONS,
    OBJECT_TYPE,

    // State
    objects,
    cloneObjects,
    selectedObject,
    objectStartFrom,
    yay,

    // Actions
    addObject,
    removeObject,
    selectObject,
    clearSelection,
    setObjectStartFrom,
  }
})
