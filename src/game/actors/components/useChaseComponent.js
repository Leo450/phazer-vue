import Phaser from 'phaser'
import { ref } from 'vue'

export const useChaseComponent = (targetB, speed, range = 0) => {
    const gameObject = ref(null)
    const chasing = ref(false)
    const reached = ref(false)
    
    const onCreate = (newGameObject) => {
        gameObject.value = newGameObject
        if (range === 0) {
            range = gameObject.value.width + 1
        } else {
            range += gameObject.value.width
        }
    }
    
    const start = () => {
        chasing.value = true
        reached.value = false
    }
    
    const stop = () => {
        chasing.value = false
    }
    
    const update = () => {
        if (!chasing.value || !gameObject.value) return
        
        const target = targetB.getGameObject()
        if (!target) return
        
        const distance = Phaser.Math.Distance.Between(gameObject.value.x, gameObject.value.y, target.x, target.y)
        
        if (distance < range) {
            reached.value = true
            gameObject.value.setVelocityX(0)
            gameObject.value.setVelocityY(0)
            return
        }
        
        reached.value = false
        let angle = Math.atan2(target.y - gameObject.value.y, target.x - gameObject.value.x)
        gameObject.value.setVelocityX(Math.cos(angle) * speed)
        gameObject.value.setVelocityY(Math.sin(angle) * speed)
    }
    
    return {
        onCreate,
        start,
        stop,
        update,
    }
}