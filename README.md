# Space Shooter
Space shooter a basic 2d game, where we spawn the enemies at the top of the screen and come down towards user ship.
User ship has the ability to fire using `SPACE` to destroy the enemy ship. If enemy collides with player ship the game will be over.

### Technologies used
- Vanilla javascript
- Phaser js
- Vite as bundler
- pnpm for package manager

To start on local server, clone the repo and run the below command. 
```
pnpm run dev
```

### Approach
Since this is a basic version, the approach is to make it modular so that we add more scenes when needed.
For scenes, there's a folder in root called `scenes` where we have currently 3 scenes and 1 scene for preloading all the assets.
Each scene is extended from the default `Phaser.Scene` class.
The assets are inside the `assets` folder in root.

This is a web-based game, another important part is if we're managing the memory efficiently. For this basic version, the bullets and enemies are destroyed once pass outside of the screen.
The game calculations are made using Phaser API's. For example we checked for collisions between bullet and enemies to kill the enemeis and also collision is deteched between player ship
and enemy ship to finish the game where player loses.
Moreover, I also used Phaser time function to loop over the `spawnEnemies()` function to create enemies continuously.

### Some game scene images

Game Start 
<br />
<img width="808" alt="image" src="https://github.com/mohaymenrafi/space-shooter/assets/25064932/d21238e7-365a-4c36-920f-4b7388092358">

Game running scene
<br />
<img width="817" alt="image" src="https://github.com/mohaymenrafi/space-shooter/assets/25064932/56660906-acc7-4882-a3df-51d3e4434f22">

Game over scene
<br />
<img width="808" alt="image" src="https://github.com/mohaymenrafi/space-shooter/assets/25064932/2c149414-3841-448e-b79a-a0a6a10e38e4">
