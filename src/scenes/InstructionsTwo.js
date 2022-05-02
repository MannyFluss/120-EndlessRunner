class InstructionsTwo extends Phaser.Scene {
    constructor() {
        super("Instructions2");
    }

    preload()
    {
        this.load.image('instructions2', "./assets/instructions-2.png");
    }

    create()
    {
        keySTART = this.input.keyboard.addKey('SPACE');
        
        new BasicSprite(this, game.config.width/2, game.config.height/2, 'instructions2');
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(keySTART)) {
            this.scene.start('play');
        }
    }
}
