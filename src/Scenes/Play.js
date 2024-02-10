class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init(){
        // Access key bindings from the global scope
        keyJUMP = window.keyJUMP;
        keyRESET = window.keyRESET;
        keyLEFT = window.keyLEFT;
        keyRIGHT = window.keyRIGHT;
        keyDOWN = window.keyDOWN;

    }

    preload() {

    }

    create() {
        this.input.keyboard.enabled = true;
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        //place tile sprites
        this.sky = this.add.tileSprite(0, 0, 900, 640, 'sky').setOrigin(0, 0)
        this.farBuildings = this.add.tileSprite(0, 0, 900, 640, 'far buildings').setOrigin(0, 0)
        this.closeBuildings = this.add.tileSprite(0, 0, 900, 640, 'close buildings').setOrigin(0, 0)
        this.house = this.add.tileSprite(0, 0, 900, 640,'house').setOrigin(0,0)
        this.housePlatform = this.physics.add.sprite(0, 426, 'platform').setOrigin(0, 0)
        this.roofPlatform = this.physics.add.sprite(0, 213, 'platform').setOrigin(0, 0)

        
        //create player
        this.player = new Player(this, game.config.width/2, game.config.height/3, 'man', 0)

        //setup collision
        this.housePlatform.body.immovable = true
        this.housePlatform.body.allowGravity = false
        this.physics.add.collider(this.player, this.housePlatform, this.handlePlatformCollision, null, this)

        this.roofPlatform.body.immovable = true
        this.roofPlatform.body.allowGravity = false
        this.physics.add.collider(this.player, this.roofPlatform, this.handlePlatformCollision, null, this)

        
    }

    update() {
        this.sky.tilePositionX += 1
        this.farBuildings.tilePositionX += 2
        this.closeBuildings.tilePositionX += 3
        this.house.tilePositionX +=4

        //update player
        this.player.update()
        
    }

    handlePlatformCollision(player, platform) {
        if (player.isPressingDown) {
            // Disable collisions between the player and the platform when the down key is pressed
            platform.body.checkCollision.none = true
            this.time.delayedCall(1000, ()=> {
                platform.body.checkCollision.none = false
            })
        } else {
            // Enable collisions between the player and the platform when the down key is not pressed
            platform.body.checkCollision.none = false
        }
    }
}



