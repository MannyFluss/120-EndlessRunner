class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y = game.config.height - 64, texture = 'player', frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.movingLanes = false;
        this.sfxLaneChange = scene.sound.add('sfx_lanechange');
    }

    update(delta, timer) {
        this.checkRightLane();
        this.checkLeftLane();
        this.changeLanes();
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

    checkLeftLane() {
        // if not on the leftmost lane, move to the lane on the left
        if ((Phaser.Input.Keyboard.JustDown(keyLEFT) || this.bufferLeft) && !this.inLeftLane() && !this.movingLanes) {
            this.distNeeded = - this.scene.sidewalk.laneDistance;
            this.movingLanes = true;
            this.distTraveled = 0;
            this.bufferLeft = false;
            this.sfxLaneChange.play();
        }
    }

    checkRightLane() {
        // if not on the rightmost lane, move to the lane on the right
        if ((Phaser.Input.Keyboard.JustDown(keyRIGHT) || this.bufferRight) && !this.inRightLane() && !this.movingLanes) {
            this.distNeeded = this.scene.sidewalk.laneDistance;
            this.movingLanes = true;
            this.distTraveled = 0;
            this.bufferRight = false;
            this.sfxLaneChange.play();
        }
    }

    changeLanes() {
        let laneChangeSpeed = 8;
        let langeChangeBuffer = 1;

        if (this.movingLanes == true) {

            this.tween = this.scene.tweens.add({
                targets: this,
                duration: 100,
                yoyo: true,
                scaleX: {from: 1, to: 1.1},
                scaleY: {from: 1, to: .9},
            });

            this.x += (this.distNeeded / laneChangeSpeed);
            this.distTraveled += (this.distNeeded / laneChangeSpeed);
            if ((this.distTraveled / this.distNeeded >= langeChangeBuffer) && !this.bufferLeft && !this.bufferRight) {
                if (keyLEFT.isDown && (this.x >= this.scene.sidewalk.mid)) {
                    this.bufferLeft = true;
                } else if (keyRIGHT.isDown && (this.x <= this.scene.sidewalk.mid)) {
                    this.bufferRight = true;
                }
            }
            if (this.distTraveled == this.distNeeded) {
                this.movingLanes = false;
            }
        }
    }
}