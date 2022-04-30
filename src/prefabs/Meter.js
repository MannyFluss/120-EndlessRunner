class Meter extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y, width, height, texture, frame) {
        super(scene, x, y, width, height, texture, frame);
        scene.add.existing(this);

        this.total = height;
    }

    // set the meter from 0 to 1
    set(value) {
        this.height = value * this.total;
    }
}