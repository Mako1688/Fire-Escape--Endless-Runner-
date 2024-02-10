class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)//add objects to existing scene

        this.body.setCollideWorldBounds(true)

        // set custom Hero properties
        this.playerVelocity = 300    // in pixels
        this.hurtTimer = 250       // in ms
        this.WORLD_VELOCITY = -475


    }

    update() {
        // reset X velocity before checking keys
        if(!(keyLEFT.isDown || keyRIGHT.isDown || keyJUMP.isDown)) {
            this.body.setVelocityX(this.WORLD_VELOCITY);
        }
        

        // move left if left key is down
        if (keyLEFT.isDown) {
            this.body.setVelocityX(-this.playerVelocity + this.WORLD_VELOCITY)
            this.anims.play('walk-anim', true)
        } else if (keyRIGHT.isDown) {
            this.body.setVelocityX(this.playerVelocity)
            this.anims.play('walk-anim', true)
        }
        if(keyJUMP.isDown) {
            this.body.setVelocityY(-this.playerVelocity)
        }

    }
          
}
        
