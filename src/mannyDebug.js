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

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    updateTextMessage(container, text='default text', playerBool)
    {
        var newMessage = new Message(this,0,0,playerBool,text);
        //this is not working?
        for (var i=1;i<container.list.length;i++)
        {
        //     if (container.list[i].GameObjects == Message)
        //     {
        //         console.log("dhasdhasd");
        //     }
            
            container.list[i].y -= container.list[i].height + 10;


            if (this.checkCollision(container.list[i],container.list[0]) == false)
            {
                var to_remove = container.list[i];
                Phaser.Utils.Array.Remove(container.list,container.list[i]);
                to_remove.destroy();
                console.log("you should not see this");
            }

        }
        container.add([newMessage]);

    }

    create()
    {
        
        var thePhone = new Phone(this, 0, 0 ,'temp');
        //container
        this.containerTest = this.add.container(200, 200);
        //this.containerTest.x = 0;
        this.containerTest.add([thePhone]);

        // this.updateTextMessage(this.containerTest, "sample", true);

        // this.updateTextMessage(this.containerTest, "sample", true);
        // this.updateTextMessage(this.containerTest, "sample", true);



        //this.dbgMsg = new Message(this, 200,200, true, sample text");
    }

}