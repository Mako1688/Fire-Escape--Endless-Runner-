// Game: Fire Escape
// Name: Marco Ogaz-Vega
// Date: 2/2/24
/*
Approx hours: 26 hours
animations help by: Lois <3
Your game should:

- Use multiple Scene classes (dictated by your game's style) (1) X
- Properly transition between Scenes and allow the player to restart w/out having to reload the page (1) X
- Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1) X
- Have some form of player input/control appropriate to your game design (1) X
- Include one or more animated characters that use a texture atlas* (1) X
- Simulate scrolling with a tileSprite (or equivalent means) (1) X
- Implement proper collision detection (via Arcade Physics or a custom routine) (1) X
- Have looping background music* (1) X
- Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1) X
- Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1) X
- Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1) X
- Be theoretically endless (1) X
- Be playable for at least 15 seconds for a new player of low to moderate skill (1) X
- Run without significant crashes or errors (1) X
- Include in-game credits for all roles, assets, music, etc. (1) X

Does your game...

- do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new? (1)
 I figured out how to implement fall through and jump through platforms which i am particularly proud of
- have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form? (1)
 I implemented a hand drawn stick figure artsyle but I am proud of the music because my good friend, who is a musician, made it for me
*/

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 900,
    height: 640,
    pixelArt: true,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    frameRate: 60,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x:0,
                y: 1500
            }
        }
    },
    scene: [Menu, Play, GameOver, Credits]
}

let game = new Phaser.Game(config)

let { width, height } = game.config

//reserve key bindings
let keyJUMP, keyRESET, keyLEFT, keyRIGHT, keyDOWN

//set music boolean
let musicPlaying = false

let animsCreated = false