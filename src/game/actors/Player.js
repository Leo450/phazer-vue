import { ref } from 'vue'
import { load as loadMarkersTexture } from '@/game/textures/markers.js'
import { useTargetComponent } from './components/useTargetComponent.js'
import { useInfoComponent } from './components/useInfoComponent.js'
import { usePlayerAbilityComponent } from '@/game/actors/components/usePlayerAbilityComponent.js'
import { usePlayerMovementComponent } from '@/game/actors/components/usePlayerMovementComponent.js'
import { useHealthComponent } from '@/game/actors/components/useHealthComponent.js'
import { useAuraCollectionComponent } from '@/game/actors/components/useAuraCollectionComponent.js'

export const Player = (scene) => {
    let self = null
    const gameObject = ref(null)
    
    const infoComponent = useInfoComponent()
    const healthComponent = useHealthComponent(100)
    const targetComponent = useTargetComponent()
    const playerMovementComponent = usePlayerMovementComponent()
    const playerAbilityComponent = usePlayerAbilityComponent(targetComponent)
    const buffsComponent = useAuraCollectionComponent()
    const debuffsComponent = useAuraCollectionComponent()
    
    const preload = () => {
        loadMarkersTexture(scene)
    }
    
    const create = (_self) => {
        self = _self
        gameObject.value = scene.physics.add.sprite(0, 0, 'markers', 'skull').setCircle(32)
        gameObject.value.setCollideWorldBounds(true)

        playerMovementComponent.onCreate(scene, gameObject.value)
        playerAbilityComponent.onCreate(scene)
    }
    
    const afterAllCreated = () => {
        const enemies = scene.actors.filter(([key, actor]) => key.startsWith('enemy'))
        enemies.forEach((actor) => {
            actor.gameObject.setInteractive()
            actor.gameObject.on('pointerdown', () => {
                targetComponent.set(actor)
            })
        })
        
        scene.input.on('pointerdown', (pointer, objectsClicked) => {
            if (objectsClicked.length === 0) {
                targetComponent.unset()
            }
        })
    }
    
    const update = () => {
        playerMovementComponent.update()
        if (playerMovementComponent.hasMoved.value) playerAbilityComponent.queue.cancel()
        playerAbilityComponent.update()
        buffsComponent.update()
        debuffsComponent.update(self)
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
        ability: playerAbilityComponent,
        buffs: buffsComponent,
        debuffs: debuffsComponent,
    }
}