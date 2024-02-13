class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    init(){

    }

    preload() {
        //load background images
        this.load.image('sky', './assets/Sprites/Night.png')
        this.load.image('far buildings', './assets/Sprites/Far Buildings.png')
        this.load.image('close buildings', './assets/Sprites/Close Buildings.png')
        this.load.image('house', './assets/Sprites/house.png')
        this.load.image('man', './assets/Sprites/BadMan.png')
        this.load.image('platform', './assets/Sprites/Platform.png')
        this.load.image('Box', './assets/Sprites/Boxes.png')

        //load sounds
        this.load.audio('sfx-hurt', './assets/Sounds/Hit_hurt 11.wav')
        this.load.audio('sfx-jump', './assets/Sounds/Jump 21.wav')
        this.load.audio('sfx-pickup', './assets/Sounds/Pickup_coin 17.wav')
        this.load.audio('sfx-select', './assets/Sounds/Blip_select 32.wav')

        //load spritesheets
        this.load.spritesheet('walk', './assets/Sprite Sheets/BadWalk.png', {
            frameWidth: 60,
            frameHeight: 60,
            startFrame:  0,
            endFrames: 3
        })

        this.load.spritesheet('devil run', './assets/Sprite Sheets/DevilManRun.png', {
            frameWidth: 60,
            frameHeight: 80,
            startFrame: 0,
            endFrames: 3
        })

        this.load.spritesheet('civilian', './assets/Sprite Sheets/CivilianOnFire.png', {
            frameWidth: 60,
            frameHeight: 60,
            startFrame:  0,
            endFrames: 3
        })

        this.load.spritesheet('fire', './assets/Sprite Sheets/Fire4Frame.png', {
            frameWidth: 40,
            frameHeight: 640,
            startFrame:  0,
            endFrames: 3
        })

        this.load.spritesheet('explosion', './assets/Sprite Sheets/Shitty Explosion.png', {
            frameWidth: 100,
            frameHeight: 100,
            startFrame:  0,
            endFrames: 24
        })

    }

    create() {
        //animation configuration
        this.anims.create({
            key: 'walk-anim',
            
            frames: this.anims.generateFrameNumbers('walk', { 
                start: 0, 
                end: 3, 
                first: 0
            }),
            frameRate: 8
        })

        this.anims.create({
            key: 'devil-anim',
            frames: this.anims.generateFrameNumbers('devil run', {
                start: 0,
                end: 3,
                first: 0
            }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'civilian-anim',
            frames: this.anims.generateFrameNumbers('civilian', { 
                start: 0, 
                end: 3, 
                first: 0
            }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'fire-anim',
            frames: this.anims.generateFrameNumbers('fire', { 
                start: 0, 
                end: 3, 
                first: 0
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'explosion-anim',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 24, 
                first: 0
            }),
            frameRate: 60,
        })

        //initialize scores
        let highScore = localStorage.getItem('fireEscapeHighScore') || 0
        let mostPeopleSave = localStorage.getItem('fireEscapePeopleSaved') || 0
        let mostPeopleLost = localStorage.getItem('fireEscapePeopleLost') || 0

        //place tile sprites
        this.sky = this.add.tileSprite(0, 0, 900, 640, 'sky').setOrigin(0, 0)
        this.farBuildings = this.add.tileSprite(0, 0, 900, 640, 'far buildings').setOrigin(0, 0)
        this.closeBuildings = this.add.tileSprite(0, 0, 900, 640, 'close buildings').setOrigin(0, 0)
        this.house = this.add.tileSprite(0, 0, 900, 640,'house').setOrigin(0,0)

        // Menu config
        let menuConfig = {
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

        //title text
        this.add.text(game.config.width/2, game.config.height/2 - 200, 'Fire Escape', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = 28
        this.add.text(game.config.width / 2, game.config.height/2 - 100,
            'Avoid the fire and obstacles and save the civilians!', menuConfig).setOrigin(0.5)

        menuConfig.align = 'left'
        //control text
        this.add.text(game.config.width/10, game.config.height/2, 'Use:\n<->\n↑\n↓', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/3, game.config.height / 2, 'To Do:\nMove Left and Right\nJump (Use Double Jump)\nFall Through Platforms', menuConfig).setOrigin(0.5)

        //add high score text
        this.add.text(game.config.width/4 * 3, game.config.height/2, 
        'Current High Score: ' + highScore + '\nMost People Saved: ' + mostPeopleSave +'\nMost People Lost: ' + mostPeopleLost, menuConfig).setOrigin(0.5)

        // Adjust colors for the last text
        menuConfig.backgroundColor = '#FF4500'
        menuConfig.color = '#FFF'
        this.add.text(game.config.width/2, game.config.height/4 * 3, 'Press any button to start', menuConfig).setOrigin(0.5, 1)

        

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }

    update() {

        //setup background movement
        this.sky.tilePositionX += .5
        this.farBuildings.tilePositionX += 1
        this.closeBuildings.tilePositionX += 1.5
        this.house.tilePositionX +=2

        //press any key to play
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyRIGHT) 
        || Phaser.Input.Keyboard.JustDown(keyJUMP) || Phaser.Input.Keyboard.JustDown(keyDOWN)
        || Phaser.Input.Keyboard.JustDown(keyRESET)) {
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