import { computed, ref } from 'vue'
import { useDuration } from '@/lib/utils/useDuration.js'

const gcdDuration = 1500
const spellQueueWindow = 400

export const useSpellQueueComponent = () => {
    const queue = ref([])
    const currentSpell = computed(() => queue.value[0] ?? null)
    let gcd = null
    
    const push = (spell) => {
        if (!canPush()) return
        
        // Prevent pushing the same spell twice
        if (queue.value.length === 2) {
            queue.value.pop()
        }
        
        // Push spell to queue
        console.log('Pushing', spell.name, 'to queue')
        queue.value.push({
            ...spell,
            pushedAt: Date.now(),
        })
    }
    
    const canPush = () => {
        let canPush = true

        const currentSpell = getCurrentSpell()
        // If a spell is already casting
        if (currentSpell && currentSpell.castState !== null) {
            // If the spell is not in spell queue window, do not push
            if (currentSpell.castState.remaining() > spellQueueWindow) {
                canPush = false
            }
        }
        if (!canPush) return canPush
        
        // If GCD is running and not in spell queue window, do not push
        if (gcd && gcd.remaining() > spellQueueWindow) {
            canPush = false
        }
        
        return canPush
    }
    
    const update = () => {
        // Update GCD and current spell cast state
        if (gcd) gcd.update()
        const currentSpell = getCurrentSpell()
        if (currentSpell && currentSpell.castState !== undefined) currentSpell.castState.update()
        
        // If queue is empty, do nothing
        if (!currentSpell) {
            return
        }
        
        // If GCD was running
        if (gcd) {
            // If GCD is not over yet, do nothing
            if (!gcd.isOver()) return
            // If GCD is over, reset GCD
            gcd = null
        }
        
        // If spell is casting
        if (currentSpell.castState !== undefined) {
            // If spell cast is over, cast spell and remove from queue
            if (currentSpell.castState.isOver()) {
                currentSpell.cast(currentSpell.target)
                queue.value.shift()
                // Do nothing more but rerun update to handle next spell in queue
                return update()
            }
            // Do nothing more
            return
        }
        
        // If spell is instant cast
        if (currentSpell.castDuration === 0) {
            // Cast spell and remove from queue
            currentSpell.cast(currentSpell.target)
            queue.value.shift()
            gcd = useDuration(gcdDuration)
        } else { // If spell has a cast duration
            // Start spell cast
            console.log('Starting cast of', currentSpell.name)
            currentSpell.castState = useDuration(currentSpell.castDuration)
            gcd = useDuration(gcdDuration)
        }
    }
    
    const cancel = () => {
        const currentSpell = getCurrentSpell()
        if (!currentSpell) return
        if (currentSpell.cancel) currentSpell.cancel()
        queue.value.shift()
    }

    const getCurrentSpell = () => {
        return queue.value[0] ?? null
    }
    
    return {
        queue,
        currentSpell,
        push,
        update,
        cancel,
    }
}