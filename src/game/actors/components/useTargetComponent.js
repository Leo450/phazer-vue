import { ref } from 'vue'

export const useTargetComponent = () => {
    const target = ref(null)
    
    const set = (newTarget) => {
        if (!newTarget.gameObject) throw new Error('Target must have a gameObject property')
        target.value = newTarget
    }
    
    const get = () => {
        return target.value
    }
    
    const getGameObject = () => {
        return target.value?.gameObject
    }
    
    const unset = () => {
        target.value = null
    }
    
    return {
        target,
        set,
        get,
        getGameObject,
        unset,
    }
}