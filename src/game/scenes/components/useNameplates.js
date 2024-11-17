import { computed, h, ref, render } from 'vue'
import Nameplate from '@/game/ui/Nameplate.vue'
import { setRelativePosition } from '@/lib/utils/useRelativePosition.js'

export const useNameplates = (scene, actors) => {
    const nameplates = ref({})
    
    const create = () => {
        for (let key in actors.actors.value) {
            const actor = actors.actors.value[key]
            
            if (!actor.health) continue

            const props = {
                health: computed(() => actor.health.health),
                maxHealth: computed(() => actor.health.maxHealth)
            }

            const container = document.createElement('div')
            container.id = `nameplate-${key}`

            const gameObject = scene.add.dom(0, 0, container)

            const vNode = h(Nameplate, props)
            render(vNode, container)
            
            gameObject.updateSize()

            nameplates.value[key] = {
                gameObject,
                actor,
                update: () => {
                    setRelativePosition(actor.gameObject, gameObject, 'top', { y: -16 })
                }
            }
        }
    }
    
    const update = () => {
        for (let key in nameplates.value) {
            nameplates.value[key].update()
        }
    }
    
    return {
        nameplates,
        create,
        update,
    }
}