import Phaser from 'phaser'
import ScoreLabel from '../ui/ScoreLabel'

export default class LevelTwoScene extends Phaser.Scene
{
	constructor()
	{
		super('level-two')
	}

    init()
    {
        this.platforms = undefined
        this.gameHalfWidth = this.scale.width * 0.5
        this.gameHalfHeight = this.scale.height * 0.5
    }
	preload()
    {
        this.load.image('background0', 'images/background_0.png')
        this.load.image('background1', 'images/background_1.png')
        this.load.image('background2', 'images/background_2.png')
        this.load.image('platform1', 'images/platform.png')
        this.load.image('platform2', 'images/pixels.png')
        this.load.image('platform3', 'images/pixels (1).png')
        this.load.spritesheet('player', 'images/adventurer-Sheet.png', {
            frameWidth: 50, frameHeight: 37
        })
        this.load.spritesheet('enemy1', 'images/enemy_set.png', {
            frameWidth: 16, frameHeight: 20
        })
        this.load.spritesheet('enemy2', 'images/warrior1.png', {
            frameWidth: 80, frameHeight: 80
        })
        this.load.spritesheet('enemy3', 'images/warrior2.png', {
            frameWidth: 80, frameHeight: 80
        })
        this.load.spritesheet('slash', 'images/slash.png',{
            frameWidth: 42, frameHeight: 88
        })
        this.load.spritesheet('bullet', 'images/bullet_set.png',{
            frameWidth: 21, frameHeight: 16
        })
        this.load.audio('yay', 'sfx/win.wav')
        this.load.audio('lose', 'sfx/lose.wav')
        this.load.audio('rdeath', 'sfx/death.wav')
        this.load.audio('wdeath', 'sfx/death_1_sean.wav')
        this.load.audio('rattack', 'sfx/laser.wav')
        this.load.audio('wattack', 'sfx/sword.wav')
        this.load.audio('jump', 'sfx/jump.wav')
        this.load.audio('rmove', 'sfx/rmove.wav')
    }

    create()
    {
        this.add.image(this.gameHalfWidth, this.gameHalfHeight, 'background0').setScale(3,4)
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(400, 590, 'platform1').setScale(3)
        this.platforms.create(260, 400, 'platform1').setScale(0.5)
        this.platforms.create(500, 270, 'platform1')
        this.platforms.create(-80, 270, 'platform1')
        this.platforms.create(300, 100, 'platform1')
        this.platforms.create(900, 150, 'platform1')
        this.player = this.physics.add.sprite(
            this.gameHalfWidth - 150,
            this.gameHalfHeight + 150,'player')
            .setBounce(0.2) 
            .setScale(2)
            .setCollideWorldBounds(true)
        this.physics.add.collider(
            this.player,
            this.platforms)
            this.robott1 = this.physics.add.sprite(
                this.gameHalfWidth - 50,
                this.gameHalfHeight - 150,'enemy1')
                .setBounce(0.2) 
                .setScale(2)
                .setCollideWorldBounds(true)
                .setFlipX(true)
            this.physics.add.collider(
                this.robott1,
                this.platforms)
            this.robott2 = this.physics.add.sprite(
                this.gameHalfWidth - 350,
                this.gameHalfHeight - 200,'enemy1')
                .setBounce(0.2) 
                .setScale(2)
                .setCollideWorldBounds(true)
            this.physics.add.collider(
                this.robott2,
                this.platforms)
            this.warrior1 = this.physics.add.sprite(
                this.gameHalfWidth + 50,
                this.gameHalfHeight - 300,'enemy2')
                .setBounce(0.2)
                .setCollideWorldBounds(true)
                .setOffset(null, -9)
            this.physics.add.collider(
                this.warrior1,
                this.platforms)
            this.warrior2 = this.physics.add.sprite(
                this.gameHalfWidth + 400,
                this.gameHalfHeight - 250,'enemy3')
                .setBounce(0.2)
                .setCollideWorldBounds(true)
                .setOffset(null, -9)
                .setFlipX(true)
            this.physics.add.collider(
                this.warrior2,
                this.platforms)
            this.cursors = this.input.keyboard.createCursorKeys()
            this.anims.create({
                key: 'player_move', 
                frames: this.anims.generateFrameNumbers('player',
                { start: 8, end: 13 }), 
                frameRate: 10,
                repeat: -1,
                });
            this.anims.create({
                key: 'player_turn',
                frames: [ { key: 'player', frame: 0 } ], 
                frameRate: 20
                });
            this.anims.create({
                key: 'player_jump',
                frames: [ { key: 'player', frame: 16 } ], 
                frameRate: 20
                });
            this.anims.create({
                key: 'player_attack', 
                frames: this.anims.generateFrameNumbers('player',
                { start: 49, end: 52 }), 
                frameRate: 10,
                repeat: 0,
                });
            this.slash = this.physics.add.sprite(240, 60, 'slash')
            .setActive(false)
            .setVisible(false)
            .setGravityY(-200)
            .setOffset(0, -10)
            .setDepth(1)
            this.secondSlash = this.physics.add.sprite(240, 60, 'slash')
            .setActive(false)
            .setVisible(false)
            .setGravityY(-200)
            .setOffset(0, -10)
            .setDepth(1)
            this.enemyAnimation()
        this.slash2 = this.physics.add.sprite(240, 60, 'slash')
            .setActive(false)
            .setVisible(false)
            .setGravityY(-200)
            .setOffset(0, -10)
            .setDepth(1)
        this.slash3 = this.physics.add.sprite(240, 60, 'slash')
            .setActive(false)
            .setVisible(false)
            .setGravityY(-200)
            .setOffset(0, -10)
            .setDepth(1)
        this.slash4 = this.physics.add.sprite(240, 60, 'slash')
            .setActive(false)
            .setVisible(false)
            .setGravityY(-200)
            .setOffset(0, -10)
            .setDepth(1)
        this.bullet1 = this.physics.add.sprite(240, 60, 'bullet')
            .setActive(false)
            .setVisible(false)
            .setGravityY(-200)
            .setOffset(0, -10)
            .setDepth(1)
        this.bullet2 = this.physics.add.sprite(240, 60, 'bullet')
            .setActive(false)
            .setVisible(false)
            .setGravityY(-200)
            .setOffset(0, -10)
            .setDepth(1)
        this.enemyShoot()
        this.scoreLabel = this.createScoreLabel(26, 16, 0)
        this.collider()
    }
    update()
    {
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-150)
            this.player.anims.play('player_move', true)
            this.player.setFlipX(true)
        }
        else if (this.cursors.right.isDown) { 
            this.player.setVelocityX(150)
            this.player.anims.play('player_move', true)
            this.player.setFlipX(false)
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-300)
            this.player.anims.play('player_jump', true)
            this.sound.play('jump')
        }
        else if (this.cursors.space.isDown) {
            this.player.setFlipX(false)
            this.player.anims.play('player_attack', true)
            this.sound.play('wattack')
            this.createSlash(this.player.x, this.player.y, 300, 1, false, 1)
        }
        else if (this.cursors.shift.isDown) {
            this.player.setFlipX(true)
            this.player.anims.play('player_attack', true)
            this.sound.play('wattack')
            this.createSlash(this.player.x, this.player.y, -300, 1, true, 2)
        }
        else {
        this.player.setVelocityX(0)
        this.player.anims.play('player_turn')
        }
        this.robotOneMove()
        this.robotTwoMove()
        this.win()
    }
    createSlash(x, y, velocity, frame,  flip = false, no)
        {
            if(no == 1){
                this.slash.setPosition(x,y)
        .setActive(true)
        .setVisible(true)
        .setVelocityX(velocity)
        .setFrame(frame)
        .setFlipX(flip)
            }
            else if(no == 2){
                this.secondSlash.setPosition(x,y)
        .setActive(true)
        .setVisible(true)
        .setVelocityX(velocity)
        .setFrame(frame)
        .setFlipX(flip)
            }
        }
        enemyAnimation(){
            this.anims.create({
                key: 'warrior1_attack', 
                frames: this.anims.generateFrameNumbers('enemy2',
                { start: 10, end: 14 }), 
                frameRate: 10,
                repeat: -1,
                });
                this.anims.create({
                    key: 'warrior2_attack', 
                    frames: this.anims.generateFrameNumbers('enemy3',
                    { start: 10, end: 14 }), 
                    frameRate: 10,
                    repeat: -1,
                    });
                }
        warriorOne(){
            this.warrior1.setFlipX(false)
            this.slash2.setPosition(this.warrior1.x,this.warrior1.y)
                .setActive(true)
                .setVisible(true)
                .setVelocityX(100)
                .setFrame(2)
                this.warrior1.anims.play('warrior1_attack', true)
                this.sound.play('wattack')
                }
        warriorTwo(){
            this.slash3.setPosition(this.warrior2.x,this.warrior2.y)
                .setActive(true)
                .setVisible(true)
                .setVelocityX(-100)
                .setFrame(3)
                .setFlipX(true)
                this.warrior2.anims.play('warrior2_attack', true)
                this.sound.play('wattack')
                }
        robotOne(){
            this.bullet1.setPosition(this.robott1.x,this.robott1.y)
                .setActive(true)
                .setVisible(true)
                .setFrame(1)
                .setFlipX(true)
                this.sound.play('rattack')
            if(this.robott1.flipX == false){
                this.bullet1.setVelocityX(100)
                .setFlipX(false)
            }
            else if(this.robott1.flipX == true){
                this.bullet1.setVelocityX(-100)
            }
                }
        robotTwo(){
            this.bullet2.setPosition(this.robott2.x,this.robott2.y)
                .setActive(true)
                .setVisible(true)
                .setFrame(2)
                this.sound.play('rattack')
            if(this.robott2.flipX == false){
                this.bullet2.setVelocityX(100)
            }
            else if(this.robott2.flipX == true){
                this.bullet2.setVelocityX(-100)
            }
                }
        warriorOneTurn(){
            this.warrior1.setFlipX(true)
            this.slash4.setPosition(this.warrior1.x,this.warrior1.y)
            .setActive(true)
            .setVisible(true)
            .setVelocityX(-100)
            .setFlipX(true)
            .setFrame(2)
            this.sound.play('wattack')
        }
    enemyShoot()
    {
        this.time.addEvent({
            delay: 7000,
            callback: this.robotTwo,
            callbackScope: this,
            loop: true
            })
        this.time.addEvent({
            delay: 6000,
            callback: this.robotOne,
            callbackScope: this,
            loop: true
            })
        this.time.addEvent({
            delay: 3500,
            callback: this.warriorOne,
            callbackScope: this,
            loop: true
            })
        this.time.addEvent({
            delay: 8000,
            callback: this.warriorOneTurn,
            callbackScope: this,
            loop: true
            })
        this.time.addEvent({
            delay: 8000,
            callback: this.warriorTwo,
            callbackScope: this,
            loop: true
            })
    }
    playerHit()
    {
        this.scene.start('game-over-scene')  
        this.sound.play('lose') 
    }
    enemyHitROS()
    {
        this.robott1
        .disableBody(true, true)
        this.secondSlash.setPosition(0)
        .setActive(false)
        .setVisible(false)
        this.bullet1
        .disableBody(true, true)
        .setVisible(false)
        this.scoreLabel.add(10)
        this.sound.play('rdeath')
    }
    enemyHitRTS()
    {
        this.robott2
        .disableBody(true, true)
        this.secondSlash.setPosition(0)
        .setActive(false)
        .setVisible(false)
        this.bullet2
        .disableBody(true, true)
        .setVisible(false)
        this.scoreLabel.add(10)
        this.sound.play('rdeath')
    }
    enemyHitWOS()
    {
        this.warrior1
        .disableBody(true, true)
        this.secondSlash.setPosition(0)
        .setActive(false)
        .setVisible(false)
        this.slash2
        .disableBody(true, true)
        .setVisible(false)
        this.slash4
        .disableBody(true, true)
        .setVisible(false)
        this.scoreLabel.add(10)
        this.sound.play('wdeath')
    }
    enemyHitWTS()
    {
        this.warrior2
        .disableBody(true, true)
        this.secondSlash.setPosition(0)
        .setActive(false)
        .setVisible(false)
        this.slash3
        .disableBody(true, true)
        .setVisible(false)
        this.scoreLabel.add(10)
        this.sound.play('wdeath')
    }
    enemyHitRO()
    {
        this.robott1
        .disableBody(true, true)
        this.slash.setPosition(0)
        .setActive(false)
        .setVisible(false)
        this.bullet1
        .disableBody(true, true)
        .setVisible(false)
        this.scoreLabel.add(10)
        this.sound.play('rdeath')
    }
    enemyHitRT()
    {
        this.robott2
        .disableBody(true, true)
        this.slash.setPosition(0)
        .setActive(false)
        .setVisible(false)
        this.bullet2
        .disableBody(true, true)
        .setVisible(false)
        this.scoreLabel.add(10)
        this.sound.play('rdeath')
    }
    enemyHitWO()
    {
        this.warrior1
        .disableBody(true, true)
        this.slash.setPosition(0)
        .setActive(false)
        .setVisible(false)
        this.slash2
        .disableBody(true, true)
        .setVisible(false)
        this.scoreLabel.add(10)
        this.sound.play('wdeath')
    }
    enemyHitWT()
    {
        this.warrior2
        .disableBody(true, true)
        this.slash.setPosition(0)
        .setActive(false)
        .setVisible(false)
        this.slash3
        .disableBody(true, true)
        .setVisible(false)
        this.scoreLabel.add(10)
        this.sound.play('wdeath')
    }
    createScoreLabel(x, y, score)
        {
         const style = { fontSize: '24px', fill: '#000',
        fontStyle: 'bold' }
         const label = new ScoreLabel(this, x, y, score,
        style).setDepth(1)
         this.add.existing(label)
         return label
        }
    win()
    {
        if(this.scoreLabel.getScore() >= 40){
            this.scene.start('win-scene')
            this.sound.play('yay')
        }  
    }
    collider()
    {
        this.physics.add.collider(
            this.slash,
            this.robott1,
            this.enemyHitRO,
            null,
            this
        )
        this.physics.add.collider(
            this.slash,
            this.robott2,
            this.enemyHitRT,
            null,
            this
        )
        this.physics.add.collider(
            this.slash,
            this.warrior1,
            this.enemyHitWO,
            null,
            this
        )
        this.physics.add.collider(
            this.slash,
            this.warrior2,
            this.enemyHitWT,
            null,
            this
        )
        this.physics.add.collider(
            this.bullet1,
            this.player,
            this.playerHit,
            null,
            this
        )
        this.physics.add.collider(
            this.bullet2,
            this.player,
            this.playerHit,
            null,
            this
        )
        this.physics.add.collider(
            this.slash2,
            this.player,
            this.playerHit,
            null,
            this
        )
        this.physics.add.collider(
            this.slash4,
            this.player,
            this.playerHit,
            null,
            this
        )
        this.physics.add.collider(
            this.slash3,
            this.player,
            this.playerHit,
            null,
            this
        )
        this.physics.add.collider(
            this.secondSlash,
            this.robott1,
            this.enemyHitROS,
            null,
            this
        )
        this.physics.add.collider(
            this.secondSlash,
            this.robott2,
            this.enemyHitRTS,
            null,
            this
        )
        this.physics.add.collider(
            this.secondSlash,
            this.warrior1,
            this.enemyHitWOS,
            null,
            this
        )
        this.physics.add.collider(
            this.secondSlash,
            this.warrior2,
            this.enemyHitWTS,
            null,
            this
        )
    }
    robotOneMove(){
        if(this.robott1.x == this.gameHalfWidth - 50){
            this.robott1
            .setVelocityX(30)
            .setFlipX(false)
            this.sound.play('rmove')
        }
        else if(this.robott1.x == 650){
            this.robott1
            .setVelocityX(-30)
            .setFlipX(true)
            this.sound.play('rmove')
        }
    }
    robotTwoMove(){
        if(this.robott2.x == this.gameHalfWidth - 350){
            this.robott2
            .setVelocityX(30)
            .setFlipX(false)
            this.sound.play('rmove')
        }
        else if(this.robott2.x == 100){
            this.robott2
            .setVelocityX(-30)
            .setFlipX(true)
            this.sound.play('rmove')
        }
    }
}