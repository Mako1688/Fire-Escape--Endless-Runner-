class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init(){

    }

    preload() {

    }

    create() {
        //place tile sprites
        this.sky = this.add.tileSprite(0, 0, 900, 640, 'sky').setOrigin(0, 0)
        this.farBuildings = this.add.tileSprite(0, 0, 900, 640, 'far buildings').setOrigin(0, 0)
        this.closeBuildings = this.add.tileSprite(0, 0, 900, 640, 'close buildings').setOrigin(0, 0)
        this.house = this.add.tileSprite(0, 0, 900, 640,'house').setOrigin(0,0)

    }

    update() {
        this.sky.tilePositionX += 1
        this.farBuildings.tilePositionX += 2
        this.closeBuildings.tilePositionX += 3
        this.house.tilePositionX +=4
        
    }
}