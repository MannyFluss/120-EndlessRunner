class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y = game.config.height - 64, texture = 'player', frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update() {

        // if not on the leftmost lane, move to the lane on the left
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && !this.inLeftLane()) {
            this.x -= this.scene.sidewalk.laneDistance;
        }

        // if not on the rightmost lane, move to the lane on the right
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && !this.inRightLane()) {
            this.x += this.scene.sidewalk.laneDistance;
        }
    }

    inLeftLane() {
        return this.x === this.scene.sidewalk.left;
    }

    inMidLane() {
        return this.x === this.scene.sidewalk.mid;
    }

    inRightLane() {
        return this.x === this.scene.sidewalk.right;
    }
}