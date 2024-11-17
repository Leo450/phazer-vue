import { useDuration } from '@/lib/utils/useDuration.js'
import { ref } from 'vue'

const UPDATE_RATE = 20

export const useAuraCollectionComponent = () => {
    let lastUpdate = 0
    const auras = ref([])
    
    const add = (aura) => {
        // If aura is already present, stack or refresh it
        const prevAura = auras.value.find(a => a.id === aura.id)
        if (prevAura) {
            if (prevAura.stackable) {
                stack(prevAura)
            } else {
                refresh(prevAura)
            }
            return
        }
        
        // If aura is not present, add it
        
        // Initialize aura
        if (aura.ticks) {
            aura.tickRate = aura.tickRate || 1000
            aura.duration = aura.ticks * aura.tickRate
            aura.currentTicks = 0
        }
        if (aura.duration) {
            aura.durationState = useDuration(aura.duration)
        }
        if (aura.stackable) {
            aura.currentStacks = 1
        }

        // Push aura
        auras.value.push({
            ...aura,
            pushedAt: Date.now(),
        })
        console.log(auras.value)
    }
    
    const stack = (aura) => {
        aura.currentStacks += 1
        refresh(aura)
    }
    
    const refresh = (aura) => {
        if (aura.ticks) {
            const totalTicks = aura.durationState.duration / aura.tickRate
            const remainingTicks = totalTicks - aura.currentTicks
            const newTotalTicks = Math.min(remainingTicks + aura.ticks, aura.ticks + aura.pandemic)
            const elapsedSinceLastTick = aura.durationState.elapsed() % aura.tickRate
            aura.durationState = useDuration(newTotalTicks * aura.tickRate, -elapsedSinceLastTick)
            aura.currentTicks = 0
        } else {
            aura.durationState = useDuration(aura.duration)
        }
    }
    
    const remove = (id) => {
        const removed = auras.value.find(aura => aura.id === id)
        if (removed) {
            if (removed.remove) removed.remove()
            auras.value = auras.value.filter(aura => aura.id !== id)
        }
    }
    
    const update = (self) => {
        const now = Date.now()
        if (now - lastUpdate < UPDATE_RATE) return
        lastUpdate = now
        
        // Iterate reverse
        for (let i = auras.value.length - 1; i >= 0; i--) {
            const aura = auras.value[i]
            
            if (!aura.duration) continue

            // Update duration
            aura.durationState.update()

            // If aura has tick, call it
            if (aura.tick) {
                const nbTicks = Math.floor(aura.durationState.elapsed() / aura.tickRate)
                if (nbTicks > aura.currentTicks) {
                    aura.currentTicks++
                    aura.tick(self, aura)
                }
            }

            // Remove if duration is over
            if (aura.durationState.isOver()) {
                if (aura.tick && aura.currentTicks < aura.ticks) {
                    aura.tick(self, aura)
                }
                auras.value.splice(i, 1)
            }
        }
    }
    
    return {
        auras,
        add,
        remove,
        update,
    }
}