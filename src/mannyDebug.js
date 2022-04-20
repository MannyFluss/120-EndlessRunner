class mannyDebug extends Phaser.Scene
{
    constructor()
    {
        super("mannyDebug");
    }
    preload()
    {
        this.load.image('temp',"./assets/rocket.png");
    }

    create()
    {
        this.thePhone = new Phone(this, 300, 300 ,'temp');
    }

}