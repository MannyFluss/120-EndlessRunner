class Walker extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y=-32, texture='walker', frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        this.moveSpeed = 2;
    }

    update() {
        this.y += this.moveSpeed;

        // destroy the enemy if it reaches the bottom of the screen
        if (this.y > game.config.height) {
            this.destroy();
        }
    }
}