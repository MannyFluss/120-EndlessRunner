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

    updateTextMessage(container, text='default text', playerBool)
    {
        var newMessage = new Message(this,0,0,playerBool,text);
        for (var i=1;i<container.list.length;i++)
        {
        //     if (container.list[i].GameObjects == Message)
        //     {
        //         console.log("dhasdhasd");
        //     }
            
            container.list[i].y -= container.list[i].height + 10;
        }
        container.add([newMessage]);

    }

    create()
    {
        
        var thePhone = new Phone(this, 0, 0 ,'temp');

        var testMessage = new Message(this,0 ,0,true,"test");
        //container
        this.containerTest = this.add.container(400, 300);
        //this.containerTest.x = 0;
        this.containerTest.add([thePhone,testMessage]);
        this.containerTest.x = 40
        console.log(this.containerTest.list);
        this.updateTextMessage(this.containerTest, "sample", true);
        this.updateTextMessage(this.containerTest, "sample", true);



        //this.dbgMsg = new Message(this, 200,200, true, sample text");
    }

}