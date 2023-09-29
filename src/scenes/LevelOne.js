import Phaser from 'phaser'
import ScoreLabel from '../ui/ScoreLabel'

export default class LevelOneScene extends Phaser.Scene
{
	constructor()
	{
		super('level-one')
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
        this.load.spritesheet('robot', 'images/enemy_set.png', {
            frameWidth: 16, frameHeight: 20
        })
        this.load.spritesheet('warrior1', 'images/warrior1.png', {
            frameWidth: 80, frameHeight: 80
        })
        this.load.spritesheet('warrior2', 'images/warrior2.png', {
            frameWidth: 80, frameHeight: 80
        })
        this.load.spritesheet('slash', 'images/slash.png',{
            frameWidth: 42, frameHeight: 88
        })
        this.load.spritesheet('bullet', 'images/bullet_set.png',{
            frameWidth: 21, frameHeight: 16
        })
        this.load.audio('lose', 'sfx/lose.wav')
        this.load.audio('rdeath', 'sfx/death.wav')
        this.load.audio('wdeath', 'sfx/death_1_sean.wav')
        this.load.audio('newlvl', 'sfx/new level.wav')
        this.load.audio('rattack', 'sfx/laser.wav')
        this.load.audio('wattack', 'sfx/sword.wav')
        this.load.audio('jump', 'sfx/jump.wav')
    }

    create()
    {
        this.add.image(this.gameHalfWidth, this.gameHalfHeight, 'background0').setScale(3,4)
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(400, 590, 'platform1').setScale(3)
        this.platforms.create(260, 400, 'platform1')
        this.platforms.create(900, 270, 'platform1')
        this.platforms.create(100, 150, 'platform1').setScale(0.5, 1)
        this.platforms.create(385, 200, 'platform1').setScale(0.5, 1)
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
            this.gameHalfHeight,'robot')
            .setBounce(0.2) 
            .setScale(2)
            .setCollideWorldBounds(true)
        this.physics.add.collider(
            this.robott1,
            this.platforms)
        this.robott2 = this.physics.add.sprite(
            this.gameHalfWidth - 350,
            this.gameHalfHeight - 300,'robot')
            .setBounce(0.2) 
            .setScale(2)
            .setCollideWorldBounds(true)
        this.physics.add.collider(
            this.robott2,
            this.platforms)
        this.warrior1 = this.physics.add.sprite(
            this.gameHalfWidth + 50,
            this.gameHalfHeight - 300,'warrior1')
            .setBounce(0.2)
            .setCollideWorldBounds(true)
            .setOffset(null, -9)
        this.physics.add.collider(
            this.warrior1,
            this.platforms)
        this.warrior2 = this.physics.add.sprite(
            this.gameHalfWidth + 400,
            this.gameHalfHeight - 250,'warrior2')
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
        this.enemyAnimation()
        this.time.addEvent({
            delay: 5000,
            callback: this.warriorOne,
            callbackScope: this,
            loop: true
            })
        this.time.addEvent({
            delay: 5000,
            callback: this.robotOne,
            callbackScope: this,
            loop: true
            })
        this.time.addEvent({
            delay: 9000,
            callback: this.warriorTwo,
            callbackScope: this,
            loop: true
            })
        this.time.addEvent({
            delay: 9000,
            callback: this.robotTwo,
            callbackScope: this,
            loop: true
            })
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
        this.scoreLabel = this.createScoreLabel(26, 16, 0)
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
            this.slash3,
            this.player,
            this.playerHit,
            null,
            this
        )
        
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
            this.createSlash(this.player.x, this.player.y, 300, 1)
            this.sound.play('wattack')
        }
        else if (this.cursors.shift.isDown) {
            this.player.setFlipX(true)
            this.player.anims.play('player_attack', true)
            this.createSlash(this.player.x, this.player.y, -300, 1, true)
            this.sound.play('wattack')
        }
        else {
        this.player.setVelocityX(0)
        this.player.anims.play('player_turn')
        }
        this.win()
    }
    createSlash(x, y, velocity, frame,  flip = false)
        {
        this.slash.setPosition(x,y)
        .setActive(true)
        .setVisible(true)
        .setVelocityX(velocity)
        .setFrame(frame)
        .setFlipX(flip)
        }
    enemyAnimation(){
        this.anims.create({
            key: 'warrior1_attack', 
            frames: this.anims.generateFrameNumbers('warrior1',
            { start: 10, end: 14 }), 
            frameRate: 10,
            repeat: -1,
            });
            this.anims.create({
                key: 'warrior2_attack', 
                frames: this.anims.generateFrameNumbers('warrior2',
                { start: 10, end: 14 }), 
                frameRate: 10,
                repeat: -1,
                });
    }
    warriorOne(){
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
            .setVelocityX(100)
            .setFrame(1)
            this.sound.play('rattack')
    }
    robotTwo(){
        this.bullet2.setPosition(this.robott2.x,this.robott2.y)
            .setActive(true)
            .setVisible(true)
            .setVelocityX(100)
            .setFrame(2)
            this.sound.play('rattack')
    }
    playerHit()
    {
        this.scene.start('game-over-scene')   
        this.sound.play('lose')
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
            this.scene.start('level-two')
            this.sound.play('newlvl')
        }  
    }
}
