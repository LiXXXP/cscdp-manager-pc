import { ref } from 'vue'

export const isFull = ref(true)

export const useFullMethod = () => {
  const onFullMap = () => {
    isFull.value = !isFull.value
  }
  return {
    onFullMap
  }
}
