// Game: Fire Escape
// Name: Marco Ogaz-Vega
// Date: 2/2/24

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 900,
    height: 640,
    frameRate: 60,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x:0,
                y:0
            }
        }
    },
    scene: [Menu, Play, GameOver]
}

let game = new Phaser.Game(config)

let { width, height } = game.config