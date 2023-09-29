import Phaser from 'phaser'
import LevelOneScene from './scenes/LevelOne'
import LevelTwoScene from './scenes/LevelTwo'
import GameOverScene from './scenes/GameOverScene'
import WinScene from './scenes/Win'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
			
		}
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	scene: [LevelOneScene, LevelTwoScene, WinScene, GameOverScene]
}

export default new Phaser.Game(config)
