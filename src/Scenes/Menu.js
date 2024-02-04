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


    }

    create() {

    }

    update() {
        this.scene.start('playScene')

    }
}