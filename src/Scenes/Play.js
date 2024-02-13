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
        this.input.keyboard.enabled = true
        this.WORLD_VELOCITY = -475  // velocity of background
        this.input.keyboard.enabled = true
        this.HOUSE_SPEED = 4

        //speed modifier for time based incrimintation
        this.SPEED_MODIFIER = 1

        //declare Scores
        this.score = 0
        this.civiliansSaved = 0
        this.civiliansLost = 0

        //initialize highscores
        //initialize scores
        this.highScore = localStorage.getItem('fireEscapeHighScore') || 0
        this.mostPeopleSave = localStorage.getItem('fireEscapePeopleSaved') || 0
        this.mostPeopleLost = localStorage.getItem('fireEscapePeopleLost') || 0

        //timer boolean
        this.timerStarted = false
        this.scoreTimerBool = false

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
        this.player = new Player(this, game.config.width - 60, 213, 'man', 0).setOrigin(0, 0)

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

        // Menu config
        this.menuConfig = {
            fontFamily: 'Helvetica',
            fontSize: '24px',
            backgroundColor: '#510000',
            color: '#FFD700',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //add high score text
        this.scoreText = this.add.text(0, 0, 
        'Current Score: ' + this.score + '\nCivilians Saved: ' + this.civiliansSaved +'\nCivilians Lost: ' + this.civiliansLost,
        this.menuConfig).setOrigin(0, 0)

        this.menuConfig.align = 'left'
        this.highScoreText = this.add.text(game.config.width, 0, 
            'High Score: ' + this.highScore + '\nMost Civilians Saved: ' + this.mostPeopleSave +'\nMost Civilians Lost: ' + this.mostPeopleLost,
            this.menuConfig).setOrigin(1, 0)
        this.menuConfig.align = 'center'
        
    }

    update() {
        //background parralaxing
        this.sky.tilePositionX += 1
        this.farBuildings.tilePositionX += 2
        this.closeBuildings.tilePositionX += 3
        this.house.tilePositionX += this.HOUSE_SPEED * this.SPEED_MODIFIER

        //setup score incrimentation with each second
        if(!this.scoreTimerBool) {
            this.scoreTimerBool = true
            this.time.delayedCall(1000 , ()=> {
                //increment score
                this.score += 1
                this.scoreText.text = 'Current Score: ' + this.score + '\nCivilians Saved: ' + this.civiliansSaved +'\nCivilians Lost: ' + this.civiliansLost
    
                //update high score if applicable
                if(this.score > this.highScore) {
                    this.highScore = this.score
                    this.scoreText.text = 'Current Score: ' + this.score + '\nCivilians Saved: ' + this.civiliansSaved +'\nCivilians Lost: ' + this.civiliansLost
    
                    //save high score to local storage
                    localStorage.setItem('fireEscapeHighScore', this.highScore)
                }

                this.scoreTimerBool = false
            })

        }
        

        //setup incrementation of speed
        if(!this.timerStarted && this.SPEED_MODIFIER <= 1.5) {
            this.timerStarted = true
            this.time.delayedCall(15000 , ()=> {
                //increment speed
                this.SPEED_MODIFIER += 0.1
                //add SPEED INCREASE TEXT
                if(this.SPEED_MODIFIER == 1.5){
                    this.speedText = this.add.text(game.config.width / 2, 0, 'MAX SPEEEEEED: ' + (Math.round(this.SPEED_MODIFIER * 10) / 10), this.menuConfig).setOrigin(0.5, 0)
                }
                this.speedText = this.add.text(game.config.width / 2, 0, 'Current Fire Speed Modifier: ' + (Math.round(this.SPEED_MODIFIER * 10) / 10), this.menuConfig).setOrigin(0.5, 0)
                this.timerStarted = false
            })

        }



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
                this.box1.body.setVelocityX(this.WORLD_VELOCITY * this.SPEED_MODIFIER)
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
                this.box2.body.setVelocityX(this.WORLD_VELOCITY * this.SPEED_MODIFIER)
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
                this.box3.body.setVelocityX(this.WORLD_VELOCITY * this.SPEED_MODIFIER)
            })

        }

        //move box
        if(this.box1.exists){
            this.box1.body.setVelocityX(this.WORLD_VELOCITY * this.SPEED_MODIFIER)
        }

        if(this.box2.exists){
            this.box2.body.setVelocityX(this.WORLD_VELOCITY * this.SPEED_MODIFIER)
        }

        if(this.box3.exists){
            this.box3.body.setVelocityX(this.WORLD_VELOCITY * this.SPEED_MODIFIER)
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
                this.devil1.body.setVelocityX(this.WORLD_VELOCITY * 1.25 * this.SPEED_MODIFIER)
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
                this.devil2.body.setVelocityX(this.WORLD_VELOCITY * 1.25 * this.SPEED_MODIFIER)
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
                this.devil3.body.setVelocityX(this.WORLD_VELOCITY * 1.25 * this.SPEED_MODIFIER)
                this.devil3.anims.play('devil-anim', true)
            })

        }

        //move devils
        if(this.devil1.exists){
            this.devil1.body.setVelocityX(this.WORLD_VELOCITY * 1.25 * this.SPEED_MODIFIER)
        }

        if(this.devil2.exists){
            this.devil2.body.setVelocityX(this.WORLD_VELOCITY * 1.25 * this.SPEED_MODIFIER)
        }

        if(this.devil3.exists){
            this.devil3.body.setVelocityX(this.WORLD_VELOCITY * 1.25 * this.SPEED_MODIFIER)
        }

        //setup civlian respwan 
        if(this.civilian && this.civilian.body && this.civilian.body.x < -40){
            //destroy box
            this.civilian.destroy()

            //increment civilians lost counter
            this.civiliansLost += 1
            //update most civilians saved if applicable
            if(this.civiliansLost > this.mostPeopleLost) {
                this.mostPeopleLost = this.civiliansLost
                this.scoreText.text = 'Current Score: ' + this.score + '\nCivilians Saved: ' + this.civiliansSaved +'\nCivilians Lost: ' + this.civiliansLost

                //save high score to local storage
                localStorage.setItem('fireEscapePeopleLost', this.mostPeopleLost)
            }

            this.scoreText.text = 'Current Score: ' + this.score + '\nCivilians Saved: ' + this.civiliansSaved +'\nCivilians Lost: ' + this.civiliansLost

            //create new one
            let random = Math.random()
            
            //respawns around 3 seconds after first one destroyed
            this.time.delayedCall(3000 * random, ()=> {
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
                this.civilian.body.setVelocityX(this.WORLD_VELOCITY * this.SPEED_MODIFIER)
                this.civilian.anims.play('civilian-anim', true)
            })

        }

        //update player
        this.player.update()
        
        if(this.player.body.x == 0) {
            this.sound.play('sfx-hurt')
            this.scene.start('gameoverScene', {
                score: this.score,
                saved: this.civiliansSaved,
                lost: this.civiliansLost
            })
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
        this.sound.play('sfx-pickup')
        civilian.destroy()
        this.score += 10
        this.civiliansSaved += 1
        this.scoreText.text = 'Current Score: ' + this.score + '\nCivilians Saved: ' + this.civiliansSaved +'\nCivilians Lost: ' + this.civiliansLost

        //update high score if applicable
        if(this.score > this.highScore) {
            this.highScore = this.score
            this.scoreText.text = 'Current Score: ' + this.score + '\nCivilians Saved: ' + this.civiliansSaved +'\nCivilians Lost: ' + this.civiliansLost

            //save high score to local storage
            localStorage.setItem('fireEscapeHighScore', this.highScore)
        }

        //update most civilians saved if applicable
        if(this.civiliansSaved > this.mostPeopleSave) {
            this.mostPeopleSave = this.civiliansSaved
            this.scoreText.text = 'Current Score: ' + this.score + '\nCivilians Saved: ' + this.civiliansSaved +'\nCivilians Lost: ' + this.civiliansLost

            //save high score to local storage
            localStorage.setItem('fireEscapePeopleSaved', this.mostPeopleSave)
        }

        //create new one
        let random = Math.random()
            
        this.time.delayedCall(3000 * random, ()=> {
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



