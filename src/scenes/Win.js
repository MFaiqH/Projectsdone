import Phaser from 'phaser'
export default class WinScene extends Phaser.Scene {
constructor() 
{
    super('win-scene')
}
init(){
    this.replayButton = undefined
}
preload() {
this.load.image('background', 'images/whitey.webp')
this.load.image('win-text', 'images/winimage.jpeg')
this.load.image('replay-button', 'images/button.jpeg')
}
create() {
this.add.image(400, 300, 'background').setScale(1.5)
this.add.image(300, 200, 'win-text').setScale(0.5)
this.replayButton = this.add.image(300, 500, 'replay-button').setInteractive().setScale(0.5)
this.replayButton.once('pointerup', () => { this.scene.start('level-one')
}, this)
}
}