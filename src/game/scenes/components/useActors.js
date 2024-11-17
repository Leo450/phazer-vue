import { ref } from 'vue'

export const useActors = () => {
    const actors = ref({})
    
    const add = (actor, key) => {
        if (key === undefined) {
            key = Math.random().toString(36).substring(7)
        }
        if (actors.value[key] !== undefined) {
            console.error(`Actor with key ${key} already exists`)
            return
        }
        actors.value[key] = actor
        
        return {
            key,
            actor,
        }
    }
    
    const get = (key) => {
        return actors.value[key]
    }
    
    const filter = (filterFunction) => {
        return Object.entries(actors.value).filter(filterFunction).map(([key, actor]) => actor)
    }
    
    const remove = (key) => {
        delete actors.value[key]
    }

    const preload = () => {
        for (let key in actors.value) {
            if (actors.value[key].preload !== undefined) {
                actors.value[key].preload()
            }
        }
    }

    const create = (paramsByKey) => {
        for (let key in actors.value) {
            if (actors.value[key].create !== undefined) {
                if (paramsByKey !== undefined && paramsByKey[key] !== undefined) {
                    actors.value[key].create(...paramsByKey[key])
                    continue
                }
                actors.value[key].create(actors.value[key])
            }
        }
        for (let key in actors.value) {
            if (actors.value[key].afterAllCreated !== undefined) {
                actors.value[key].afterAllCreated()
            }
        }
    }

    const update = (time, delta) => {
        for (let key in actors.value) {
            if (actors.value[key].update !== undefined) {
                actors.value[key].update(time, delta)
            }
        }
    }
    
    return {
        actors,
        add,
        get,
        filter,
        remove,
        preload,
        create,
        update,
    }
}