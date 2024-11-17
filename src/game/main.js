import Phaser from 'phaser'
import { Scene1 } from '@/game/scenes/Scene1.js'

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'world-container',
    backgroundColor: '#272727',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: [
        Scene1,
    ],
    dom: {
        createContainer: true
    }
}

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent })
    
}

export default StartGame
