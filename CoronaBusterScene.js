import Phaser from 'phaser'
import FallingObject from '../ui/FallingObject.js'
import Laser from '../ui/Laser.js'
import ScoreLabel from '../ui/ScoreLabel.js'
import LifeLabel from '../ui/LifeLabel.js'
export default class CoronaBusterScene extends
Phaser.Scene
{
constructor()
{
super('corona-buster-scene')
}
init(){
    this.clouds = undefined
    this.nav_left = false
    this.nav_right = false
    this.shoot = false
    this.player = undefined
    this.speed = 100
    this.enemies = undefined
    this.enemySpeed = 60
    this.lasers = undefined
    this.lastFired = 0
    this.scoreLabel = undefined 
    this.lifeLabel = undefined
    this.handsanitizer = undefined
    this.backsound = undefined
    this.cursors = undefined
}
preload()
{
    this.load.image('background', 'image/bg_layer1.png')
    this.load.image('cloud', 'image/cloud.png')
    this.load.image('left-btn', 'image/left-btn.png')
    this.load.image('right-btn', 'image/right-btn.png')
    this.load.image('shoot-btn', 'image/shoot-btn.png')
    this.load.spritesheet('player','image/ship.png', 
    {frameWidth:66, frameHeight:66})
    this.load.image('enemy', 'image/enemy.png')
    this.load.spritesheet('laser', 'image/laser-bolts.png',
    {frameWidth: 16, frameHeight:32, startFrame:16, endFrame:32})
    this.load.image('handsanitizer', 'image/handsanitizer.png')
    this.load.audio('lasersound', 'sfx/sfx_laser.ogg')
    this.load.audio('destroy', 'sfx/destroy.mp3')
    this.load.audio('hssound', 'sfx/handsanitizer.mp3')
    this.load.audio('backsound','sfx/SkyFire.ogg')
    this.load.audio('gameover','sfx/WilhelmScream.mp3')
    this.load.audio('gethit', 'sfx/LOL Sound Effect.mp3')
}
create()
{
    const gameWidth = this.scale.width * 0.5
    const gameHeight = this.scale.height * 0.5
    this.add.image(gameWidth, gameHeight, 'background')
    this.clouds = this.physics.add.group({
        key: 'cloud',
        repeat: 45
    })
    Phaser.Actions.RandomRectangle(this.clouds.getChildren(),
    this.physics.world.bounds);
    this.createButton()
    this.player = this.createPlayer()
    this.enemies = this.physics.add.group({
        classType : FallingObject,
        maxSize : 20,
        runChildUpdate : true
        })
    this.handsanitizer = this.physics.add.group({
        classType : FallingObject,
        runChildUpdate : true
        })
    this.time.addEvent({
        delay: 500,
        callback: this.spawnEnemy,
        callbackScope: this,
        loop: true
        })
    this.lasers = this.physics.add.group({
        classType : Laser,
        maxSize : 10,
        runChildUpdate: true
        })
    this.physics.add.overlap(
        this.lasers,
        this.enemies,
        this.hitEnemy,
        null,this
    )
    this.scoreLabel = this.createScoreLabel(16, 16, 0)
    this.lifeLabel = this.createLifeLabel(16, 40, 5)
    this.physics.add.overlap(
        this.enemies,
        this.player,
        this.decreaseLife,
        null,this
    )
    this.physics.add.overlap(
        this.handsanitizer,
        this.player,
        this.increaseLife,
        null,this
    )
    this.time.addEvent({
        delay: 10000,
        callback: this.spawnHandsanitizer,
        callbackScope: this,
        loop: true
        })
    this.backsound = this.sound.add('backsound')
        var soundConfig = {
        loop :  true
        }
    this.backsound.play(soundConfig)
    this.cursors = this.input.keyboard.createCursorKeys()
}
createButton(){
    this.input.addPointer(3)
    let shoot = this.add.image(320, 550, 'shoot-btn')
    .setInteractive().setDepth(0.5).setAlpha(0.8)
    let nav_left = this.add.image(50, 550, 'left-btn')
    .setInteractive().setDepth(0.5).setAlpha(0.8)
    let nav_right = this.add.image(nav_left.x + nav_left
    .displayWidth + 20, 550, 'right-btn')
    .setInteractive().setDepth(0.5).setAlpha(0.8)
    nav_left.on('pointerdown', () => { this.nav_left = true
    }, this)
    nav_left.on('pointerout', () => { this.nav_left =false 
    }, this)
    nav_right.on('pointerdown', () => { this.nav_right = true
    }, this)
    nav_right.on('pointerout', () => { this.nav_right = false
    }, this)
    shoot.on('pointerdown', () => { this.shoot = true },
    this)
    shoot.on('pointerout', () => { this.shoot = false},
    this)
}
controls(){
    if(this.cursors.left.isDown){
        this.nav_left = true        
    }
    else if(this.cursors.left.isUp){
        this.nav_left = false
    }
    if(this.cursors.right.isDown){ 
        this.nav_right = true
    }
    else if(this.cursors.right.isUp){
        this.nav_right = false
    }
    if(this.cursors.space.isDown){
        this.shoot = true
    }
    else if(this.cursors.space.isUp){
        this.shoot = false
    }
}
update(time)
{
this.clouds.children.iterate((child) => {
 child.setVelocityY(20)
 if (child.y > this.scale.height){
 child.x = Phaser.Math.Between(10, 400)
 child.y = child.displayHeight * -1
 }
 })
this.movePlayer(this.player, time)
this.controls()
}
createPlayer()
{
    const player = this.physics.add.sprite(200, 450, 'player')
    player.setCollideWorldBounds(true)
    this.anims.create({
    key: 'turn',
    frames:[ { key: 'player', frame: 0 } ],
    })
    this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers(
    'player', {start: 1, end: 2}),
    frameRate: 10
    })
    this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player',
    {start:1, end:2}),
    frameRate: 10
    })
return player
}
movePlayer(player, time){
    if (this.nav_left){
        this.player.setVelocityX(this.speed * -1)
        this.player.anims.play('left', true)
        this.player.setFlipX(false)
    }
    else if (this.nav_right){
        this.player.setVelocityX(this.speed)
        this.player.anims.play('right', true)
        this.player.setFlipX(true)
    }
    else {
        this.player.setVelocityX(0)
        this.player.anims.play('turn')
    }
    if ((this.shoot) && time > this.lastFired){
        const laser = this.lasers.get(0, 0, 'laser')
        if(laser){
        laser.fire(this.player.x, this.player.y)
        this.lastFired = time + 300
        this.sound.play('lasersound')
        }
        if(this.scoreLabel.getScore() % 5 == 0){
            this.lastFired = time + 100
        }
        }
}
spawnEnemy()
{
 const config = {
 speed : this.enemySpeed,
 rotation : 0.06
 }
 // @ts-ignore
 const enemy = this.enemies.get(0,0,'enemy',config)
 const enemyWidth = enemy.displayWidth
 const positionX = Phaser.Math.Between(enemyWidth,
 this.scale.width - enemyWidth)
 if (enemy) {
 enemy.spawn(positionX)
 }
}
spawnHandsanitizer()
{
 const config = {
 speed : 150,
 rotation : 0
 }
 // @ts-ignore
 const handsanitizer = this.handsanitizer.get(0,0,'handsanitizer',config)
 const handsanitizerWidth = handsanitizer.displayWidth
 const positionX = Phaser.Math.Between(handsanitizerWidth,
 this.scale.width - handsanitizerWidth)
 if (handsanitizer) {
    handsanitizer.spawn(positionX)
 }
 if(this.scoreLabel.getScore() % 5 == 0){
     config.speed += 30
 }
}
hitEnemy(laser, enemy)
{
laser.erase() // destroy laser that touch
enemy.die() // destroy enemy that touch
this.scoreLabel.add(1)
this.sound.play('destroy')
if (this.scoreLabel.getScore() % 10 == 0){
this.enemySpeed += 100
}
}

createScoreLabel(x, y, score)
{
const style = { fontSize: '32px', fill: '#000'}
const label = new ScoreLabel(this, x, y,
score, style).setDepth(1)
this.add.existing(label)
return label
}
createLifeLabel(x, y, life)
{
const style = { fontSize: '32px', fill: '#000'}
const label = new LifeLabel(this, x, y,
life, style).setDepth(1)
this.add.existing(label)
return label
}
decreaseLife(player, enemy)
{
enemy.die()
this.lifeLabel.subtract(1)
this.sound.play('gethit')
if (this.lifeLabel.getLife() == 2){
player.setTint(0xff0000)
} else if (this.lifeLabel.getLife() == 1){
player.setTint(0xff0000).setAlpha(0.2)
} else if (this.lifeLabel.getLife() == 0) {
this.scene.start('game-over-scene',
{score: this.scoreLabel.getScore()})
this.sound.stopAll()
this.sound.play('gameover')
}
}
increaseLife(player, handsanitizer)
{
handsanitizer.die()
this.lifeLabel.add(1)
this.sound.play('hssound')

if (this.lifeLabel.getLife() >= 3){
player.clearTint().setAlpha(2)
}
this.enemySpeed += 50

}

}