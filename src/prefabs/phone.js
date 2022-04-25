class Phone extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y, texture, frame)
    {
        super(scene,x,y,texture,frame);

        scene.add.existing(this);

        this.active = true //if the phone is on screen, true.
        this.playerKeyInput = "sample message";
        this.currentResponseMessage = "sample message"; //the current msg the player needs to send
        this.create();
    }

    create()
    {
        console.log("test")
        //const testMessage = new Message(this,0,0,true,"this is a sample message");
        //this.add.existing(testMessage);
    }
    resetResponseMessage()
    {
        this.currentResponseMessage = "new message"
    }
    playerSubmitMessage()
    {
        if (this.playerKeyInput == this.currentResponseMessage)
        {
            
        }
    }



}