import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene";
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOver";
import GameStartScene from "./scenes/GameStartScene";

export const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: false,
		},
	},
	scene: [PreloadScene, GameStartScene, GameScene, GameOverScene],
};

export const game = new Phaser.Game(config);
