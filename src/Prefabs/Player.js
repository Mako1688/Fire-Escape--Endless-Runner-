class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)//add objects to existing scene

        this.body.setCollideWorldBounds(true)

        // set custom Player properties
        this.playerVelocity = 400    // in pixels
        this.hurtTimer = 250       // in ms
        this.WORLD_VELOCITY = -475  // velocity of background
        this.MAX_JUMPS = 2          // double jump
        this.JUMP_VELOCITY = -600   // jump velocity
        this.SPEED_MODIFIER = 1

        //timer boolean
        this.timerStarted = false

        this.isPressingDown = false; // Track whether the down key is being held
        this.downKeyTimer = 0; // Timer to control how long collision is disabled when pressing down
        this.downKeyDuration = 500; // Set the duration in milliseconds (adjust as needed)

        this.scene = scene // Store a reference to the scene

        //rocket sound
        this.sfxJump = scene.sound.add('sfx-jump')


    }

    update() {
        // reset X velocity before checking keys
        if(!(keyLEFT.isDown || keyRIGHT.isDown || keyJUMP.isDown)) {
            this.body.setVelocityX(this.WORLD_VELOCITY * this.SPEED_MODIFIER)
        }

        // move left if left key is down
        if (keyLEFT.isDown) {
            this.body.setVelocityX(-this.playerVelocity + this.WORLD_VELOCITY)
            this.anims.play('walk-anim', true)
        } else if (keyRIGHT.isDown) {
            this.body.setVelocityX(this.playerVelocity)
            this.anims.play('walk-anim', true)
        }
        
        // Check for jumping
        if (keyJUMP.isDown && this.jumps > 0 && !this.jumping) {
            this.body.setVelocityY(this.JUMP_VELOCITY);
            this.jumping = true
            this.jumps--
            this.sfxJump.play()
        } else if (this.body.onFloor()) {
            // Reset jumps if the player is on the floor
            this.jumping = false
            this.jumps = this.MAX_JUMPS
        }

        // Allow another jump if the player releases the jump key
        if (!keyJUMP.isDown && this.jumping) {
            this.jumping = false

        }

        // Check for falling through platforms by pressing down
        if (keyDOWN.isDown) {
            // Allow the player to fall through the platform
            this.isPressingDown = true;
        } else {
            // Reset collision properties when the down key is released
            this.isPressingDown = false;
        }

        //setup incrementation of speed
        if(!this.timerStarted && this.SPEED_MODIFIER <= 1.5) {
            this.timerStarted = true
            this.scene.time.delayedCall(15000 , ()=> {
                //increment speed
                this.SPEED_MODIFIER += 0.05
                //add SPEED INCREASE bool
                this.timerStarted = false
            })

        }
          
    }
}