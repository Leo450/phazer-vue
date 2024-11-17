import Phaser from 'phaser'
import { useSpellQueueComponent } from '@/game/actors/components/useSpellQueueComponent.js'
import { spells } from '@/game/data/spells.js'

export const usePlayerAbilityComponent = (targetComponent) => {
    let inputKeys = null
    let wasDown = {
        hit: false,
    }
    
    const spellQueue = useSpellQueueComponent()
    
    const onCreate = (scene) => {
        inputKeys = scene.input.keyboard.addKeys({
            hit: Phaser.Input.Keyboard.KeyCodes.SPACE,
        })
    }
    
    const update = () => {
        if (inputKeys.hit.isDown && !wasDown.hit) {
            spellQueue.push({
                ...spells.fireball,
                target: targetComponent.target,
            })
        }
        wasDown.hit = inputKeys.hit.isDown
        
        spellQueue.update()
    }
    
    return {
        queue: spellQueue,
        onCreate,
        update,
    }
}