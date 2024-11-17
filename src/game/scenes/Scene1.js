import Phaser from 'phaser'
import { Player } from '@/game/actors/Player.js'
import { Enemy } from '@/game/actors/Enemy.js'
import { useActors } from './components/useActors.js'
import { useNameplates } from './components/useNameplates.js'
import { EventBus } from '@/game/EventBus.js'
import { auras } from '@/game/data/auras.js'

export class Scene1 extends Phaser.Scene
{
    actors = null
    nameplates = null
    inputKeys = null
    
    constructor ()
    {
        super('Scene1')
        
        // Actors
        this.actors = useActors()
        // Player
        const player = Player(this)
        player.info.set('name', 'Player')
        this.actors.add(player, 'player')
        // Enemies
        for(let i = 0; i < 3; i++) {
            const enemy = Enemy(this)
            enemy.info.set('name', `Enemy ${i}`)
            this.actors.add(enemy, `enemy${i}`)
        }

        this.nameplates = useNameplates(this, this.actors)
        
        EventBus.emit('scene:created', this)
    }
    
    preload ()
    {
        this.actors.preload()
    }

    create ()
    {
        // Create
        this.actors.create()
        const player = this.actors.get('player')
        const enemies = this.actors.filter(([key, actor]) => key.startsWith('enemy'))
        const enemiesGameObjects = enemies.map((enemy) => enemy.gameObject)
        
        // Positions
        player.gameObject.x = this.game.config.width / 2
        player.gameObject.y = this.game.config.height / 2
        enemiesGameObjects.forEach((enemy, i) => {
            const angle = i / enemiesGameObjects.length * Math.PI * 2
            enemy.x = this.game.config.width / 2 + Math.cos(angle) * 300
            enemy.y = this.game.config.height / 2 + Math.sin(angle) * 300
        })
        
        // Collisions
        this.physics.add.collider(enemiesGameObjects, enemiesGameObjects)
        
        // Nameplates
        this.nameplates.create()
        
        this.inputKeys = this.input.keyboard.addKeys({
            test: Phaser.Input.Keyboard.KeyCodes.E,
        })
        this.input.keyboard.on('keydown-E', () => {
            this.actors.get('player').debuffs.add(auras.burn)
        }, this)
    }
    
    update(time, delta)
    {
        /*if (this.inputKeys.test.isDown) {
            console.log('Test key is down')
        }*/
        
        this.actors.update(time, delta)
        this.nameplates.update(time, delta)

        super.update(time, delta)
    }
}
