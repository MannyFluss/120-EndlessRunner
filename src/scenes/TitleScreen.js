class TitleScreen extends Phaser.Scene {
    constructor() {
        super("TitleScreen");
    }

    preload()
    {
        this.load.image('titleCard', "./assets/distracction-title.png")
    }

    create()
    {
        keySTART = this.input.keyboard.addKey('SPACE');

        new BasicSprite(this, game.config.width/2, game.config.height/2, 'titleCard');
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(keySTART)) {
            this.scene.start('Instructions1');
        }
    }



}
