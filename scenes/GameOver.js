import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
	constructor() {
		super("GameOverScene");
	}
	create() {
		this.add.image(400, 300, "bg");
		this.add.text(270, 300, "Game Over", {
			font: "48px Arial",
			fill: "#ffffff",
		});
		this.add.text(230, 400, "Press Space to restart", {
			font: "32px Arial",
			fill: "#ffffff",
		});
		this.input.keyboard.on("keydown-SPACE", () => {
			this.scene.start("GameScene");
		});
	}
}
