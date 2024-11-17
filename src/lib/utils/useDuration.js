import { ref } from 'vue'

const UPDATE_RATE = 20

export const useDuration = (duration, startOffset = 0) => {
    if (!duration) return null
    
    const start = Date.now() + startOffset
    const end = start + duration
    const now = ref(Date.now())
    const elapsed = () => now.value - start
    const remaining = () => end - now.value
    const progress = () => elapsed() / duration
    const isOver = () => remaining() <= 0
    const update = () => {
        const newNow = Date.now()
        if (newNow - now.value < UPDATE_RATE) return
        now.value = newNow
    }
    
    return {
        duration,
        start,
        end,
        elapsed,
        remaining,
        progress,
        isOver,
        update,
    }
}