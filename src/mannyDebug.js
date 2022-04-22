class mannyDebug extends Phaser.Scene
{
    constructor()
    {
        super("mannyDebug");
    }
    preload()
    {
        this.load.image('temp',"./assets/phoneAssets/phone.png");
        this.load.image('message','./assets/phoneAssets/text.png')
        
    }

    create()
    {
        
        this.thePhone = new Phone(this, 300, 300 ,'temp');
        //this.dbgMsg = new Message(this, 200,200, true, "sample text");
    }

}