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

        this.player = new Player(this, game.config.width/2, game.config.height/3, 'man', 0)

        
    }

    update() {
        this.sky.tilePositionX += 1
        this.farBuildings.tilePositionX += 2
        this.closeBuildings.tilePositionX += 3
        this.house.tilePositionX +=4

        this.player.update()
        
    }
}