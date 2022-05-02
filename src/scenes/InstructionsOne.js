class InstructionsOne extends Phaser.Scene {
    constructor() {
        super("Instructions1");
    }

    preload()
    {
        this.load.image('instructions', "./assets/instructions-1.png");
        this.load.atlas('raccoonAtlas','./assets/RaccoonAtlas.png','./assets/raccoon.json');
    }

    create()
    {
        keySTART = this.input.keyboard.addKey('SPACE');
        
        new BasicSprite(this, game.config.width/2, game.config.height/2, 'instructions');

        //atlas implementation
        const animConfig = {
            key: 'animation',
            frames: 'raccoonAtlas',
            frameRate: 3,
            repeat: -1,
        };
        this.anims.create(animConfig);
        this.raccoonSprite1 = this.add.sprite(295, 135, 'raccoonAtlas');
        this.raccoonSprite1.play('animation');
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(keySTART)) {
            this.scene.start('Instructions2');
        }
    }



}
