class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    init(){
        
    }

    preload() {

    }

    create() {
        //re-enable keyboard
        this.input.keyboard.enabled = true

        //place tile sprites
        this.sky = this.add.tileSprite(0, 0, 900, 640, 'sky').setOrigin(0, 0)
        this.farBuildings = this.add.tileSprite(0, 0, 900, 640, 'far buildings').setOrigin(0, 0)
        this.closeBuildings = this.add.tileSprite(0, 0, 900, 640, 'close buildings').setOrigin(0, 0)
        this.house = this.add.tileSprite(0, 0, 900, 640,'house').setOrigin(0,0)

        //add reset key
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        // Menu config
        this.menuConfig = {
            fontFamily: 'PressStart2P',
            fontSize: '20px',
            backgroundColor: '#510000',
            color: '#e68a00',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.creditsText = this.add.text(game.config.width / 2, game.config.height / 2,
         'Credits:\n\nCoding: Marco Ogaz-Vega\n\nAssets: Marco Ogaz-Vega (help from Lois <3)\n\nExplosion Spritesheet: opengameart.org\n\nFont: Google Fonts\n\nR to PLAY AGAIN\n\n↑ to go to Menu',
          this.menuConfig).setOrigin(0.5, 0.5)

    }

    update() {

         //press R to restart
         if(Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.input.keyboard.enabled = false
            this.sound.play('sfx-select')
 
            // Fade out effect
            this.cameras.main.fadeOut(500) // 500 milliseconds fade time
 
            // When the fade is complete, start the play scene
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.scene.start('playScene')
            }, this)
         }

         //press R to restart
         if(Phaser.Input.Keyboard.JustDown(keyJUMP)) {
            this.input.keyboard.enabled = false
            this.sound.play('sfx-select')
 
            // Fade out effect
            this.cameras.main.fadeOut(500) // 500 milliseconds fade time
 
            // When the fade is complete, start the play scene
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.scene.start('menuScene')
            }, this)
         }
        
    }
}