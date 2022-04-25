class mannyDebug extends Phaser.Scene
{
    constructor()
    {
        super("mannyDebug");
    }
    preload()
    {
        this.load.image('phoneTexture',"./assets/phoneAssets/phone.png");
        this.load.image('message','./assets/phoneAssets/text.png')
        
    }

    checkCollision(rocket, ship) { //collision isnt working
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



    create()
    {


        
        //container
        //this.containerTest = this.add.container(200, 200);
        //this.containerTest.x = 0;
        
        this.thePhone = new Phone(this, 0, 0 ,'phoneTexture')
        this.phoneInput = new PhoneContainer(this,50,50);
        this.phoneInput.containerRef.add(this.thePhone);
        // this.text1 = this.add.text(this.containerRef.x,this.containerRef.y,"").setOrigin(.5,.5);
        // this.text2 =
        
        


        // this.phoneInput.ghostTextDisplay = this.text1;
        // this.phoneInput.playerTextDisplay = this.text2;
        //this.phoneInput.containerRef = this.containerTest;
        //this.dbgMsg = new Message(this, 200,200, true, sample text");



        this.load.image('temp',"./assets/rocket.png");
    }


}