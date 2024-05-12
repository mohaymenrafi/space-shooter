import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
	constructor() {
		super("PreloadScene");
	}
	preload() {
		this.load.image("bg", "assets/bg.jpg");
		this.load.image("player", "assets/ship.png");
		this.load.spritesheet("bullet", "assets/bullet2.png", {
			frameWidth: 32,
			frameHeight: 48,
		});
		this.load.spritesheet("invader", "assets/invader1.png", {
			frameWidth: 32,
			frameHeight: 32,
		});
		this.load.spritesheet("explode", "assets/explosion.png", {
			frameWidth: 64,
			frameHeight: 64,
			endFrame: 23,
		});
	}
	create() {
		this.scene.start("GameStartScene");
	}
}

export default PreloadScene;
