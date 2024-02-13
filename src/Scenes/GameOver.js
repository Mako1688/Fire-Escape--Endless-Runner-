class GameOver extends Phaser.Scene {
    constructor() {
        super('gameoverScene')
    }

    init(data){
        this.score = data.score
        this.civiliansSaved = data.saved
        this.civiliansLost = data.lost
    }

    preload() {

    }

    create() {
        this.input.keyboard.enabled = true
        //initialize scores
        this.highScore = localStorage.getItem('fireEscapeHighScore') || 0
        this.mostPeopleSave = localStorage.getItem('fireEscapePeopleSaved') || 0
        this.mostPeopleLost = localStorage.getItem('fireEscapePeopleLost') || 0

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // Menu config
        this.menuConfig = {
            fontFamily: 'PressStart2P',
            fontSize: '40px',
            backgroundColor: '#510000',
            color: '#e68a00',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //add devil face
        this.devilFace = this.add.sprite(game.config.width / 2, game.config.height / 10, 'devil run', 0).setOrigin(0.5, 0).setScale(15)

        this.explosion = this.physics.add.sprite(game.config.width / 2, game.config.height / 3, 'explosion').setOrigin(0.5, 0.5).setScale(8)

        //make explosion immovable
        this.explosion.body.immovable = true
        this.explosion.body.allowGravity = false

        //play shitty explosion animation
        this.explosion.anims.play('explosion-anim', true)
        this.explosion.on('animationcomplete', () => {    //callback after anim completes
            this.explosion.destroy()                      //remove explosion sprite
            
            this.scoreText = this.add.text(game.config.width / 2, game.config.height / 5, 'GAME OVER', this.menuConfig).setOrigin(0.5, 0.5)
            this.menuConfig.fontSize = '18px'
            this.scoreText = this.add.text(game.config.width / 4, game.config.height / 2.5, 
            'Your Score: ' + this.score + '\nCivilians Saved: ' + this.civiliansSaved +'\nCivilians Lost: ' + this.civiliansLost, this.menuConfig).setOrigin(0.5)
            this.highScoreText = this.add.text(game.config.width / 4 * 3, game.config.height / 2.5, 
            'High Score: ' + this.highScore + '\nMost Civilians Saved: ' + this.mostPeopleSave +'\nMost Civilians Lost: ' + this.mostPeopleLost, this.menuConfig).setOrigin(0.5)

            this.time.delayedCall(1000 , ()=> {
                this.explosion = this.physics.add.sprite(game.config.width / 2, game.config.height / 1.3, 'explosion').setOrigin(0.5, 0.5).setScale(4)
                //make explosion immovable
                this.explosion.body.immovable = true
                this.explosion.body.allowGravity = false
                this.explosion.anims.play('explosion-anim', true)
                this.explosion.on('animationcomplete', () => {
                    this.explosion.destroy()                      //remove explosion sprite
                    this.menuConfig.align = 'center'
                    this.playAgainText = this.add.text(game.config.width / 2, game.config.height / 1.5, 'Press R to play again\n↑ to go to Menu\nPress ↓ for Credits', this.menuConfig).setOrigin(0.5, 0.5)
                })
            })
            

        })

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

          //press any key to play
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.input.keyboard.enabled = false
            this.sound.play('sfx-select')

            // Fade out effect
            this.cameras.main.fadeOut(500) // 500 milliseconds fade time

            // When the fade is complete, start the play scene
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.scene.start('creditsScene')
            }, this)
        }

        //press jump to go to menu
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