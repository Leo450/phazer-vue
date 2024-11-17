import { computed, ref } from 'vue'

export const useHealthComponent = (maxHealth) => {
    const health = ref(maxHealth)
    const isAlive = computed(() => health.value > 0)
    
    const hit = (amount) => {
        if (!isAlive.value) return
        health.value -= amount
        if (health.value <= 0) {
            health.value = 0
        }
    }
    
    const heal = (amount) => {
        if (!isAlive.value) return
        health.value += amount
        if (health.value > maxHealth) {
            health.value = maxHealth
        }
    }
    
    return {
        health,
        maxHealth,
        isAlive,
        hit,
        heal,
    }
}