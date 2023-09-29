import Phaser from 'phaser'
var platforms
var player
var cursors
var stars
var score = 0
var scoreText
var bombs
var gameOver
export default class CollectingStarsScene extends Phaser.Scene{
    constructor(){
        super('collecting-stars-scene')
    }
    preload(){
        this.load.image('sky', 'images/sky.png')
        this.load.image('ground', 'images/platform.png')        
        this.load.image('bomb', 'images/bomb.png')
        this.load.image('star', 'images/star.png')
        this.load.spritesheet('dude', 'images/dude.png', {
            frameWidth: 32, frameHeight: 48
        })
    }
    create(){
        this.add.image(400, 300, 'sky')
        platforms = this.physics.add.staticGroup()
        platforms.create(600, 400, 'ground')
        platforms.create(50, 250, 'ground')
        platforms.create(750, 220, 'ground')
        platforms.create(600, 568, 'ground').setScale(3).refreshBody()

        player = this.physics.add.sprite(100, 480, 'dude')
        player.setCollideWorldBounds(true)
        player.setBounce(0.2)

        // Animation Walks Left
        this.anims.create({
            key: 'left', // animation name
            frames: this.anims.generateFrameNumbers('dude',
            { start: 0, end: 3 }), // frame used
            frameRate: 10,
            repeat: -1
            });
        // Front-facing animation
        this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ], //only one frame
        frameRate: 20
        });
        //Animation walks right
        this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude',
        { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1 //repeat animation (loop)
        });
        this.physics.add.collider(player, platforms)
        cursors = this.input.keyboard.createCursorKeys()
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70}
            });
           
            stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 1.0));
            });
            this.physics.add.collider(stars, platforms)
            this.physics.add.overlap(
                player,
                stars,
                this.collectStar,
                null,
                this 
                )
                scoreText = this.add.text(16, 16, 'score : 0', {
                    fontSize: '32px'
                });
            bombs = this.physics.add.group()
            this.physics.add.collider(bombs, platforms)
            this.physics.add.collider(
            player,
            bombs,
            this.hitBomb,
            null,
            this
            );
        }
        update(){
            if(cursors.left.isDown){
                player.setVelocityX(-350)
                player.anims.play('left', true)
                
            }
            else if (cursors.right.isDown) { 
                player.setVelocityX(350)
                player.anims.play('right', true)
            }
            else if (cursors.up.isDown) {
                player.setVelocityY(-350)
            }
            else if (cursors.down.isDown) {
                player.setVelocityY(350)
            }
            else {
            player.setVelocityX(0)
            player.anims.play('turn')
            }
        }   
        collectStar(player, star)
        {
        star.disableBody(true, true)
        score += 10
        scoreText.setText('Score : ' + score)
        var x = (player.x < 400) ?
        Phaser.Math.Between(400, 800) :
        Phaser.Math.Between(0, 400)
        var bomb = bombs.create(x, Phaser.Math.Between(0, 400), 'bomb')
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(true)
        var X = Phaser.Math.Between(-100, 100);
        var Y = 150;
        bomb.setVelocity(
        X, Y)
        if(score % 120 == 0) {
            stars = this.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 70}
                });
                stars.children.iterate(function (child) {
                    child.setBounceY(Phaser.Math.FloatBetween(0.4, 1.0));
                    });
                    this.physics.add.collider(stars, platforms)
                    this.physics.add.overlap(
                        player,
                        stars,
                        this.collectStar,
                        null,
                        this 
                        )
            X = X + 50
            Y = Y + 50
            bomb.setVelocity(
                X, Y)
        }
        }
        hitBomb(player, bomb){
            this.physics.pause()
            player.setTint(0xff0000) 
            player.anims.play('turn') 
            gameOver = true 
            scoreText.setText('Game Over')
        }
}