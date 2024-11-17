import { reactive } from 'vue'

export const useInfoComponent = () => {
    const info = reactive({})
    
    const set = (key, value) => {
        info[key] = value
    }
    
    const get = (key) => {
        return info[key]
    }
    
    const remove = (key) => {
        delete info[key]
    }
    
    const has = (key) => {
        return info[key] !== undefined
    }
    
    return {
        info,
        set,
        get,
        remove,
        has,
    }
}