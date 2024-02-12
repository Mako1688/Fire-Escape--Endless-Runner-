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
        this.WORLD_VELOCITY = -475  // velocity of background
        this.input.keyboard.enabled = true

        //declare Scores
        this.score = 0
        this.civiliansSaved = 0
        this.civiliansLost = 0

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

        //place platforms
        this.housePlatform = this.physics.add.sprite(0, 426, 'platform').setOrigin(0, 0)
        this.roofPlatform = this.physics.add.sprite(0, 213, 'platform').setOrigin(0, 0)

        //place boxes
        this.box1 = this.physics.add.sprite(1000, 640, 'Box').setOrigin(1, 1)
        this.box2 = this.physics.add.sprite(940, 426, 'Box').setOrigin(1, 1)
        this.box3 = this.physics.add.sprite(1050, 213, 'Box').setOrigin(1, 1)

        //place devil men
        this.devil1 = this.physics.add.sprite(940, 640, 'devil run', 0).setOrigin(1, 1)
        this.devil2 = this.physics.add.sprite(1050, 426, 'devil run', 0).setOrigin(1, 1)
        this.devil3 = this.physics.add.sprite(1000, 213, 'devil run', 0).setOrigin(1, 1)

        //create player
        this.player = new Player(this, game.config.width/2, game.config.height/3, 'man', 0).setOrigin(0, 0)

        //place fire
        this.fire = this.add.sprite(0, 0, 'fire').setOrigin(0, 0)

        //animate fire
        this.fire.anims.play('fire-anim', true)

        //place civilian
        let ranNum = Math.random()
        if(ranNum < 0.33) {
            this.civilian = this.physics.add.sprite(1500, 640, 'civilian', 0).setOrigin(1, 1)
        } else if(ranNum < 0.66) {
            this.civilian = this.physics.add.sprite(1500, 426, 'civilian', 0).setOrigin(1, 1)
        } else {
            this.civilian = this.physics.add.sprite(1500, 213, 'civilian', 0).setOrigin(1, 1)
        }

        //make civilian collision
        this.civilian.body.immovable = false
        this.civilian.body.allowGravity = false
        this.physics.add.collider(this.player, this.civilian, this.handleCivilianCollision, null, this)

        //move civilian
        this.civilian.body.setVelocityX(this.WORLD_VELOCITY)

        //play civilian animation
        this.civilian.anims.play('civilian-anim', true)

        //make box collision
        this.box1.body.immovable = true
        this.box1.body.allowGravity = false
        this.physics.add.collider(this.player, this.box1)

        this.box2.body.immovable = true
        this.box2.body.allowGravity = false
        this.physics.add.collider(this.player, this.box2)

        this.box3.body.immovable = true
        this.box3.body.allowGravity = false
        this.physics.add.collider(this.player, this.box3)

        //make devil collision
        this.devil1.body.immovable = true
        this.devil1.body.allowGravity = false
        this.physics.add.collider(this.player, this.devil1)

        this.devil2.body.immovable = true
        this.devil2.body.allowGravity = false
        this.physics.add.collider(this.player, this.devil2)
        

        this.devil3.body.immovable = true
        this.devil3.body.allowGravity = false
        this.physics.add.collider(this.player, this.devil3)

        //move box
        this.box1.body.setVelocityX(this.WORLD_VELOCITY)
        this.box2.body.setVelocityX(this.WORLD_VELOCITY)
        this.box3.body.setVelocityX(this.WORLD_VELOCITY)

        //move devil men
        this.devil1.body.setVelocityX(this.WORLD_VELOCITY * 1.25)
        this.devil2.body.setVelocityX(this.WORLD_VELOCITY * 1.25)
        this.devil3.body.setVelocityX(this.WORLD_VELOCITY * 1.25)

        //play devil animations
        this.devil1.anims.play('devil-anim', true)
        this.devil2.anims.play('devil-anim', true)
        this.devil3.anims.play('devil-anim', true)

        //setup collision for platforms
        this.housePlatform.body.immovable = true
        this.housePlatform.body.allowGravity = false
        this.housePlatform.body.checkCollision.down = false
        this.physics.add.collider(this.player, this.housePlatform, this.handlePlatformCollision, null, this)

        this.roofPlatform.body.immovable = true
        this.roofPlatform.body.allowGravity = false
        this.roofPlatform.body.checkCollision.down = false
        this.physics.add.collider(this.player, this.roofPlatform, this.handlePlatformCollision, null, this)

        
    }

    update() {
        //background parralaxing
        this.sky.tilePositionX += 1
        this.farBuildings.tilePositionX += 2
        this.closeBuildings.tilePositionX += 3
        this.house.tilePositionX +=4

        //setup box respwan 
        if(this.box1 && this.box1.body && this.box1.body.x < -40){
            //destroy box
            this.box1.destroy()

            //create new one
            let random = Math.random()
            
            this.time.delayedCall(1000 * random, ()=> {
                this.box1 = this.physics.add.sprite(940, 640, 'Box').setOrigin(1, 1)
                //make box collision
                this.box1.body.immovable = true
                this.box1.body.allowGravity = false
                this.physics.add.collider(this.player, this.box1)

                //move box
                this.box1.body.setVelocityX(this.WORLD_VELOCITY)
            })
        }

        //setup box respwan 
        if(this.box2 && this.box2.body && this.box2.body.x < -40){
            //destroy box
            this.box2.destroy()

            //create new one
            let random = Math.random()
            
            this.time.delayedCall(1000 * random, ()=> {
                this.box2 = this.physics.add.sprite(940, 426, 'Box').setOrigin(1, 1)
                //make box collision
                this.box2.body.immovable = true
                this.box2.body.allowGravity = false
                this.physics.add.collider(this.player, this.box2)

                //move box
                this.box2.body.setVelocityX(this.WORLD_VELOCITY)
            })

        }

        //setup box respwan 
        if(this.box3 && this.box3.body && this.box3.body.x < -40){
            //destroy box
            this.box3.destroy()

            //create new one
            let random = Math.random()
            
            this.time.delayedCall(1000 * random, ()=> {
                this.box3 = this.physics.add.sprite(940, 213, 'Box').setOrigin(1, 1)
                //make box collision
                this.box3.body.immovable = true
                this.box3.body.allowGravity = false
                this.physics.add.collider(this.player, this.box3)

                //move box
                this.box3.body.setVelocityX(this.WORLD_VELOCITY)
            })

        }

        //move box
        if(this.box1.exists){
            this.box1.body.setVelocityX(this.WORLD_VELOCITY)
        }

        if(this.box2.exists){
            this.box2.body.setVelocityX(this.WORLD_VELOCITY)
        }

        if(this.box3.exists){
            this.box3.body.setVelocityX(this.WORLD_VELOCITY)
        }
        
        //setup devil men respawn 
        if(this.devil1 && this.devil1.body && this.devil1.body.x < -40){
            //destroy box
            this.devil1.destroy()

            //create new one
            let random = Math.random()
            
            this.time.delayedCall(1000 * random, ()=> {
                this.devil1 = this.physics.add.sprite(940, 640, 'devil run', 0).setOrigin(1, 1)
                //make box collision
                this.devil1.body.immovable = true
                this.devil1.body.allowGravity = false
                this.physics.add.collider(this.player, this.devil1)

                //move box
                this.devil1.body.setVelocityX(this.WORLD_VELOCITY * 1.25)
                this.devil1.anims.play('devil-anim', true)
            })
        }

        //setup box respwan 
        if(this.devil2 && this.devil2.body && this.devil2.body.x < -40){
            //destroy box
            this.devil2.destroy()

            //create new one
            let random = Math.random()
            
            this.time.delayedCall(1000 * random, ()=> {
                this.devil2 = this.physics.add.sprite(940, 426, 'devil run', 0).setOrigin(1, 1)
                //make box collision
                this.devil2.body.immovable = true
                this.devil2.body.allowGravity = false
                this.physics.add.collider(this.player, this.devil2)

                //move box
                this.devil2.body.setVelocityX(this.WORLD_VELOCITY * 1.25)
                this.devil2.anims.play('devil-anim', true)
            })

        }

        //setup box respwan 
        if(this.devil3 && this.devil3.body && this.devil3.body.x < -40){
            //destroy box
            this.devil3.destroy()

            //create new one
            let random = Math.random()
            
            this.time.delayedCall(1000 * random, ()=> {
                this.devil3 = this.physics.add.sprite(940, 213, 'devil run', 0).setOrigin(1, 1)
                //make box collision
                this.devil3.body.immovable = true
                this.devil3.body.allowGravity = false
                this.physics.add.collider(this.player, this.devil3)

                //move box
                this.devil3.body.setVelocityX(this.WORLD_VELOCITY * 1.25)
                this.devil3.anims.play('devil-anim', true)
            })

        }

        //move devils
        if(this.devil1.exists){
            this.devil1.body.setVelocityX(this.WORLD_VELOCITY * 1.25)
        }

        if(this.devil2.exists){
            this.devil2.body.setVelocityX(this.WORLD_VELOCITY * 1.25)
        }

        if(this.devil3.exists){
            this.devil3.body.setVelocityX(this.WORLD_VELOCITY * 1.25)
        }

        //setup civlian respwan 
        if(this.civilian && this.civilian.body && this.civilian.body.x < -40){
            //destroy box
            this.civilian.destroy()

            //increment civilians lost counter
            this.civiliansLost += 1

            //create new one
            let random = Math.random()
            
            this.time.delayedCall(1000 * random, ()=> {
                //place civilian
                let ranNum = Math.random()
                if(ranNum < 0.33) {
                    this.civilian = this.physics.add.sprite(1500, 640, 'civilian', 0).setOrigin(1, 1)
                } else if(ranNum < 0.66) {
                    this.civilian = this.physics.add.sprite(1500, 426, 'civilian', 0).setOrigin(1, 1)
                } else {
                    this.civilian = this.physics.add.sprite(1500, 213, 'civilian', 0).setOrigin(1, 1)
                }
                //make box collision
                this.civilian.body.immovable = false
                this.civilian.body.allowGravity = false
                this.physics.add.collider(this.player, this.civilian, this.handleCivilianCollision, null, this)

                //move box
                this.civilian.body.setVelocityX(this.WORLD_VELOCITY)
                this.civilian.anims.play('civilian-anim', true)
            })

        }

        //update player
        this.player.update()
        
        if(this.player.body.x == 0) {
            this.scene.start('gameoverScene')
        }


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

    handleCivilianCollision(player, civilian) {
        civilian.destroy()
        this.score += 5
        this.civiliansSaved += 1
        //create new one
        let random = Math.random()
            
        this.time.delayedCall(1000 * random, ()=> {
            //place civilian
            let ranNum = Math.random()
            if(ranNum < 0.33) {
                this.civilian = this.physics.add.sprite(1500, 640, 'civilian', 0).setOrigin(1, 1)
            } else if(ranNum < 0.66) {
                this.civilian = this.physics.add.sprite(1500, 426, 'civilian', 0).setOrigin(1, 1)
            } else {
                this.civilian = this.physics.add.sprite(1500, 213, 'civilian', 0).setOrigin(1, 1)
            }
            //make box collision
            this.civilian.body.immovable = false
            this.civilian.body.allowGravity = false
            this.physics.add.collider(this.player, this.civilian, this.handleCivilianCollision, null, this)

            //move box
            this.civilian.body.setVelocityX(this.WORLD_VELOCITY)
            this.civilian.anims.play('civilian-anim', true)
        })
    }
}



