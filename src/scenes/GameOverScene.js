import Phaser from 'phaser'
export default class GameOverScene extends Phaser.Scene {
constructor() 
{
    super('game-over-scene')
}
init(){
    this.replayButton = undefined
}
preload() {
this.load.image('background', 'images/gameover.jpeg')
this.load.image('replay-button', 'images/button.jpeg')
}
create() {
this.add.image(400, 300, 'background') 
this.replayButton = this.add.image(400, 490, 'replay-button').setInteractive().setScale(0.5)
this.replayButton.once('pointerup', () => { this.scene.start('level-one')
}, this)
}
}