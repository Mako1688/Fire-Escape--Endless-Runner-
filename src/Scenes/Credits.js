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
        // Menu config
        this.menuConfig = {
            fontFamily: 'Helvetica',
            fontSize: '40px',
            backgroundColor: '#510000',
            color: '#FFD700',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.creditsText = this.add.text(game.config.width / 2, game.config.height / 2,
         'Credits:\nCoding: Marco Ogaz-Vega\nAssets: Marco Ogaz-Vega (help from Lois <3)\nExplosion Spritesheet: opengameart.org\nR to PLAY AGAIN',
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
        
    }
}