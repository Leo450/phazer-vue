import { ref } from 'vue'
import { load as loadMarkersTexture } from '@/game/textures/markers.js'
import { useChaseComponent } from './components/useChaseComponent.js'
import { useHealthComponent } from './components/useHealthComponent.js'
import { useTargetComponent } from './components/useTargetComponent.js'
import { useInfoComponent } from './components/useInfoComponent.js'
import { useAuraCollectionComponent } from '@/game/actors/components/useAuraCollectionComponent.js'

export const Enemy = (scene) => {
    let self = null
    const gameObject = ref(null)
    
    const infoComponent = useInfoComponent()
    const healthComponent = useHealthComponent(100)
    const targetComponent = useTargetComponent()
    const chaseComponent = useChaseComponent(targetComponent, 100, 16)
    const buffsComponent = useAuraCollectionComponent()
    const debuffsComponent = useAuraCollectionComponent()
    
    const preload = () => {
        loadMarkersTexture(scene)
    }
    
    const create = (_self) => {
        self = _self
        gameObject.value = scene.physics.add.sprite(0, 0, 'markers', 'cross').setCircle(32)
        gameObject.value.setCollideWorldBounds(true)
        
        chaseComponent.onCreate(gameObject.value)
    }
    
    const afterAllCreated = () => {
        targetComponent.set(scene.actors.get('player'))
        chaseComponent.start()
    }
    
    const update = () => {
        chaseComponent.update()
    }
    
    return {
        gameObject,
        preload,
        create,
        afterAllCreated,
        update,
        info: infoComponent,
        health: healthComponent,
        target: targetComponent,
        chase: chaseComponent,
        buffs: buffsComponent,
        debuffs: debuffsComponent,
    }
}