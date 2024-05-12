import Phaser from "phaser";
import { config } from "../game";

let player;
let cursors;
let score = 0;

class GameScene extends Phaser.Scene {
	constructor() {
		super("GameScene");
	}

	create() {
		this.add.image(400, 300, "bg");

		// adding player
		player = this.physics.add.image(400, 570, "player");
		player.setCollideWorldBounds(true);

		// adding fire button event
		this.fireButton = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.SPACE
		);
		this.lastFire = 0;

		// adding enemies group
		this.enemies = this.physics.add.group();

		// int spawnEnemies for the first time
		this.spawnEnemies();

		// spawn enemies every 3 sec
		this.time.addEvent({
			delay: 2000,
			callback: this.spawnEnemies,
			callbackScope: this,
			loop: true,
		});

		// enemy destroy animation
		this.anims.create({
			key: "enemyExplosion",
			frames: this.anims.generateFrameNumbers("explode", {
				start: 0,
				end: 23,
			}),
			frameRate: 20,
			repeat: 0,
			hideOnComplete: true,
		});

		// game score
		this.scoreText = this.add.text(16, 16, `Score: 0`, {
			fontSize: "32px",
			fill: "#fff",
		});
	}
	update(time) {
		// player movement
		cursors = this.input.keyboard.createCursorKeys();
		if (cursors.left.isDown) {
			player.setVelocityX(-200);
		} else if (cursors.right.isDown) {
			player.setVelocityX(200);
		} else {
			player.setVelocityX(0);
		}

		// fire the bullet
		let bullet;
		if (this.fireButton.isDown && time > this.lastFire) {
			bullet = this.physics.add.image(player.x, player.y - 15, "bullet");
			bullet.setVelocityY(-200);
			this.lastFire = time + 200;
		}

		// destroy the bullet when it hits the top
		this.physics.world.bounds.setTo(0, 0, config.width, config.height);
		this.physics.world.setBoundsCollision(true, true, true, true);
		if (bullet) {
			bullet.setCollideWorldBounds(true);
			bullet.body.onWorldBounds = true;
		}

		this.physics.world.on(
			"worldbounds",
			function (body) {
				if (body.gameObject === bullet) {
					bullet.destroy();
				}
			},
			this
		);

		// destroy the enemeies when they hit the bottom
		this.enemies.children.each(function (enemy) {
			if (enemy.y > config.height) {
				enemy.destroy();
			}
		});

		// check for collision between bullet and enemies
		this.physics.add.overlap(
			this.enemies,
			bullet,
			function (enemy, bullet) {
				score++;
				this.scoreText.setText("Score: " + score);
				const explosion = this.physics.add.sprite(enemy.x, enemy.y, "explode");
				explosion.anims.play("enemyExplosion");
				enemy.destroy();
				bullet.destroy();
			},
			null,
			this
		);
		// check collision for player and enemies
		this.physics.add.collider(
			this.enemies,
			player,
			function () {
				this.scene.start("GameOverScene");
			},
			null,
			this
		);
	}
	spawnEnemies() {
		let numberOfEnemies = Phaser.Math.Between(2, 5);

		let xValues = Phaser.Utils.Array.NumberArrayStep(20, config.width, 50);
		Phaser.Utils.Array.Shuffle(xValues);

		for (let i = 0; i <= numberOfEnemies; i++) {
			let x = xValues[i];
			let enemy = this.enemies.create(x, 0, "invader");
			enemy.setVelocityY(100);
			let color = Phaser.Display.Color.RandomRGB();
			let tint = Phaser.Display.Color.GetColor(color.r, color.g, color.b);
			enemy.setTint(tint);
		}
	}
}

export default GameScene;
