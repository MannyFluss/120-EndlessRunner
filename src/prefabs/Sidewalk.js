class Sidewalk extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y, width, height, texture, frame) {
        super(scene, x, y, width, height, texture, frame);
        scene.add.existing(this);

        this.laneDistance = 45;
        this.left = 305;
        this.mid = this.left + this.laneDistance;
        this.right = this.mid + this.laneDistance;
    }
}