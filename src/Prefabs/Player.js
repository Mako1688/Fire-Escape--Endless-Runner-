class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture)
        scene.add.existing(this)

    }

    update() {
        
    }
}