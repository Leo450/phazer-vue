import Phaser from 'phaser'
import { ref } from 'vue'

export const usePlayerMovementComponent = () => {
    let gameObject = null
    let inputKeys = null
    
    const hasMoved = ref(false)
    
    const onCreate = (scene, _gameObject) => {
        gameObject = _gameObject
        inputKeys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
    }
    
    const update = () => {
        const velocity = new Phaser.Math.Vector2(0, 0)
        
        if (inputKeys.left.isDown) velocity.x -= 160
        if (inputKeys.right.isDown) velocity.x += 160

        if (inputKeys.up.isDown) velocity.y -= 160
        if (inputKeys.down.isDown) velocity.y += 160
        
        velocity.normalize().scale(160)
        
        hasMoved.value = velocity.length() > 0

        gameObject.setVelocity(velocity.x, velocity.y)
    }
    
    return {
        hasMoved,
        onCreate,
        update,
    }
}