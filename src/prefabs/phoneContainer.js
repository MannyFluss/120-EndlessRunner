//scene class needs the following to work  (in create)
// this.thePhone = new Phone(this, 0, 0 ,'temp')
// this.phoneInput = new PhoneContainer(this,x,y);
// this.phoneInput.containerRef.add(this.thePhone);
class PhoneContainer extends Phaser.GameObjects.Container
{
    
    
    constructor(scene,x,y)
    {
        super(scene,x,y);
        scene.add.existing(this);

        this.textConfigPlayer = {
            fontFamily: 'Tickerbit',
            fontSize: '16px',
            backgroundColor: '#1982FC',
            color: '#FFFFFF',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            right: 2,
            left: 2
            },
            //fixedWidth: 100
        }
        this.textConfigMom = {
            fontFamily: 'Tickerbit',
            fontSize: '16px',
            backgroundColor: '#808080',
            color: '#000000',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            right: 2,
            left: 2
            },
            
        }
        this.ghostTextConfig = {
            fontFamily: 'Tickerbit',
            fontSize: '16px',
            color: '#000000',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            right: 2,
            left: 2
            },
            fixedWidth: 200
        }
        this.enterTextConfig = {
            fontFamily: 'Tickerbit',
            fontSize: '16px',
            strong : 20,
            color: '#1982FC',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            right: 2,
            left: 2
            },
            fixedWidth: 200
        }

        this.wordList = [
            "word","is","here","gamer","a",
            "sample","text","the","help","running",
            "establish","mono","best","or",
            "and","because","phone","quinn","colorado"
        ]
        this.momMessages = [//max char len 29
            "sample mom message aaaaaa ",
        ]
        
        
        this.active = true;
        //these get assigned to text
        this.sceneRef = scene;
        this.containerRef = scene.add.container(this.x, this.y);

        //this.playerTextDisplay.text = ""
        this.setSize(300,300);
        this.playerText = "";
        this.ghostText = this.createNewMessage();
        this.playerTextDisplay = scene.add.text(this.containerRef.x+3,this.containerRef.y + 155,this.playerText, this.enterTextConfig).setOrigin(.5,.5);
        this.ghostTextDisplay = scene.add.text(this.containerRef.x+3,this.containerRef.y + 155,this.ghostText, this.ghostTextConfig).setOrigin(.5,.5);
        this.add([this.containerRef,this.ghostTextDisplay,this.playerTextDisplay]);

        scene.input.keyboard.on('keydown', (event) => {
            this.handleInput(event.key);
        });
        //this.text1 = scene.add.text(200,200,"aaaaaaaaaaaaaa").setOrigin(.5,.5);
        this.on('pointerover',  () => {

            //bg.setTint(0x44ff44);
    
        });
    
        this.on('pointerout', () => {
    
            //bg.clearTint();
    
        });
        scene.input.on('drag',  (pointer, gameObject, dragX, dragY) => {
            
        });


    }


    updateTextMessage(container, text='default text', playerBool=true)
    {

        let FONT;
        if (playerBool)
        {
            FONT = this.textConfigPlayer;
        }else{FONT=this.textConfigMom;}
        var newMessage = this.sceneRef.add.text(-20,100,text,FONT).setOrigin(.5,.5);
        newMessage.setWordWrapWidth(200);
        if (playerBool == true)
        {
            newMessage.x = 20;
        }
        //this is not working?
        for (var i=1;i < container.list.length;i++)
        {            
            container.list[i].y -=  30;
        }
        container.addAt(newMessage,1);
        Phaser.Utils.Array.AddAt(container.list,newMessage,1);
        //console.log(container.list[container.list.length-1].y);
        if (container.list[container.list.length-1].y < -70)
        {
            var to_remove = container.list[container.list.length-1];
            Phaser.Utils.Array.Remove(container.list,container.list[container.list.length-1]);
            to_remove.destroy();
        }
    }
    

    handleInput(key)
    {
        if (this.active == false)
        {
            return;
        }
        if (this.isLetter(key) || key == " ")
        {
            this.playerText = this.playerText + key;
            
        }
        if (key == "Backspace")
        {
            if (this.playerText.length > 0)
            {
                this.playerText=this.playerText.slice(0, this.playerText.length - 1)
            }
        }
        if (this.playerText==this.ghostText)
        {
            
            this.updateTextMessage(this.containerRef,this.playerText,true);
            this.momSendMessage();
            this.ghostText = this.createNewMessage(); //insert message generator here
            this.playerText = "";
        }
        if (key == "Enter")
        {

            this.playerText = "";

        }
        
        this.ghostTextDisplay.text = this.ghostText;
        this.playerTextDisplay.text = this.playerText;
        


    }

    //func found at https://www.codegrepper.com/code-examples/javascript/javascript+check+if+a-z+A-Z
    isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
      }
    //
    
    createNewMessage(wordCount=3)
    {
        let to_return = "";
        for(let i=0;i<wordCount;i++)
        {
            let random_word = this.wordList[Math.floor(Math.random()*this.wordList.length)];
            if (i == wordCount-1)
            {
                to_return = to_return + random_word;
                break;
            }else
            {
                to_return = to_return + random_word + " ";
            }
        }
        
        return to_return;
    }

    momSendMessage()
    {
        let textMsg = this.momMessages[Math.floor(Math.random()*this.momMessages.length)];
        this.updateTextMessage(this.containerRef,textMsg,false);

    }

}