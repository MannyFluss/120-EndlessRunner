class Message extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y ,playerTextBool, playerTextString,frame)
    {

        
        super(scene,x,y,'message',frame);
        scene.add.existing(this);
        this.playerText = playerTextBool;
        this.playerKeyInput = playerTextString;
    
    
    }
    preload()
    {
        //this.load.image('message','./assets/phoneAssets/text.png');
    }
    create()
    {
        //console.log("test");
    }
}