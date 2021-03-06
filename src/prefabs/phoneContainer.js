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
            fontFamily: 'Avenir Next Condensed',
            fontSize: '14px',
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
        };
        this.textConfigMom = {
            fontFamily: 'Avenir Next Condensed',
            fontSize: '14px',
            backgroundColor: '#dddddd',
            color: '#000000',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            right: 2,
            left: 2
            },
            
        };
        this.ghostTextConfig = {
            fontFamily: 'Avenir Next Condensed',
            fontSize: '14px',
            color: '#666666',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            right: 2,
            left: 2
            },
            fixedWidth: 200
        };
        this.enterTextConfig = {
            fontFamily: 'Avenir Next Condensed',
            fontSize: '14px',
            color: '#1982FC',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            right: 2,
            left: 2
            },
            fixedWidth: 200
        };

        this.subjects = [
            "raccoons","we","red pandas","gamers","you",
        ];
        this.verbs = [
            "are","eat","love","want","hate","have","like",
        ];
        this.adjectives = [
            "bros","chill","trash","cringe","brains","the city","cool",
        ];

        this.momMessages = [
            "we are coming",
            "if you dont respond big trouble",
            "hello this is pizza hut",
            "what is your opinion on the mayor",
            "heyyyyyyyyyyyyyyyyyyyyy",
            "*raccoon noises*",
            "meow",
            "*teleports behind u*",
            "nothin personnel kid",
            "texty texty",
            "this is our sidewalk now",
        ];
        
        
        this.active = true;
        //these get assigned to text
        this.sceneRef = scene;
        this.containerRef = scene.add.container(this.x, this.y);

        //this.playerTextDisplay.text = ""
        this.setSize(300,300);
        this.playerText = "";
        this.ghostText = this.createNewMessage();
        this.playerTextDisplay = scene.add.text(this.containerRef.x+6,this.containerRef.y + 155,this.playerText, this.enterTextConfig).setOrigin(.5,.5);
        this.ghostTextDisplay = scene.add.text(this.containerRef.x+6,this.containerRef.y + 155,this.ghostText, this.ghostTextConfig).setOrigin(.5,.5);
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
        let FONT = playerBool ? this.textConfigPlayer : this.textConfigMom;
        let newMessage;
        if (playerBool) {
            newMessage = this.sceneRef.add.text(82,110,text,this.textConfigPlayer).setOrigin(1,.5);
        } else {
            newMessage = this.sceneRef.add.text(-120,110,text,this.textConfigMom).setOrigin(0,.5);
        }

        newMessage.setWordWrapWidth(200);
        //this is not working?
        for (var i=1;i < container.list.length;i++)
        {            
            container.list[i].y -= 30;
        }
        container.addAt(newMessage,1);
        Phaser.Utils.Array.AddAt(container.list,newMessage,1);
        //console.log(container.list[container.list.length-1].y);
        if (container.list[container.list.length-1].y < -50)
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
            this.sendSignal();
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
        
        to_return += this.subjects[Math.floor(Math.random()*this.subjects.length)] + " ";
        to_return += this.verbs[Math.floor(Math.random()*this.verbs.length)] + " ";
        to_return += this.adjectives[Math.floor(Math.random()*this.adjectives.length)];
            
        return to_return;
    }

    momSendMessage()
    {
        let textMsg = this.momMessages[Math.floor(Math.random()*this.momMessages.length)];
        this.updateTextMessage(this.containerRef,textMsg,false);

    }
    sendSignal()
    {
        this.sceneRef.recieveSignal();
    }

}