class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }
    preload()
    {
        let raccoonResize = 3;
        this.load.image('phoneTexture',"./assets/phoneAssets/phone.png");
        this.load.spritesheet('raccoon', 'assets/raccoon-sheet.png', {frameWidth: 12*raccoonResize, frameHeight: 16*raccoonResize, startFrame: 0, endFrame: 4});
        this.load.atlas('raccoonAtlas','./assets/RaccoonAtlas.png','./assets/raccoon.json');

    }
    create()
    {
        const animConfig = {
            key: 'animation',
            frames: 'raccoonAtlas',
            frameRate: 3,
            repeat: -1,
        };
        this.anims.create(animConfig);
        this.raccoonSprite1 = this.add.sprite(125 , Phaser.Math.Between(100, 400) , 'raccoonAtlas').setScale(1.5);
        this.raccoonSprite1.play('animation');

        this.menuTextConfig = {
            fontFamily: 'Tickerbit',
            fontSize: '16px',
            backgroundColor: '#1982FC',
            color: '#FFFFFF',
            padding: {
            top: 5,
            bottom: 5,
            right: 2,
            left: 2
            },
            //fixedWidth: 100
        }

        this.controlsTXT = 'controls: \n <- and -> to move raccoon \n ' +
                            'type any key to type into phone\n' +
                            'press enter to clear your current text\n' +
                            'keep up with messages or else raccoons\n' +
                            'will get angry and speed up!';
        this.creditsTXT = 'credits: \n'+
                            'Ben Paulsen \n'+
                            'Manas Sara \n'+
                            'Manny Fluss';

        keySTART = this.input.keyboard.addKey('SPACE');
        //main menu creation goes here


        
        //sprites scroll backgrnd
        
        this.anims.create({
            key: 'raccoon_walk',
            frames: this.anims.generateFrameNumbers('raccoon', { start: 0, end: 3, first: 0}),
            frameRate: 4,
            repeat: -1,
            showOnStart: true,
            skipMissedFrame: true,
            hideOnComplete: false,
        });

        this.spriteList = [];
        this.phoneSprite2 = this.add.sprite(100 , 300 , 'phoneTexture').setScale(.65);
        this.phoneSprite1 = this.add.sprite(125 , 100 , 'phoneTexture').setScale(.5);
        Phaser.Math.Between(100, 400)
        this.raccoonSprite2 = this.add.sprite(125 , Phaser.Math.Between(100, 400) , 'raccoon').setScale(2).anims.play('raccoon_walk');
        this.raccoonSprite3 = this.add.sprite(125 , Phaser.Math.Between(100, 400) , 'raccoon').setScale(2).anims.play('raccoon_walk');
        this.raccoonSprite4 = this.add.sprite(125 , Phaser.Math.Between(100, 400) , 'raccoon').setScale(2).anims.play('raccoon_walk');
        this.raccoonSprite5 = this.add.sprite(125 , Phaser.Math.Between(100, 400) , 'raccoon').setScale(2).anims.play('raccoon_walk');
        
        Phaser.Utils.Array.Add(this.spriteList, [this.phoneSprite2,this.phoneSprite1,this.raccoonSprite1,
            this.raccoonSprite2,this.raccoonSprite3,this.raccoonSprite4,this.raccoonSprite5]);

        for (let i = 0; i < this.spriteList.length; i++)
        {
            this.spriteList[i].speed = Phaser.Math.FloatBetween(1.0, 3.5);
            this.spriteList[i].setScale(Phaser.Math.FloatBetween(.35, .8));
        }

        this.add.text(384,380,"press space to start",this.menuTextConfig).setOrigin(.5,.5);
        this.add.text(384,100,"working title",this.menuTextConfig).setOrigin(.5,.5);
        this.add.text(128*1.5,128*1.25,this.controlsTXT,this.menuTextConfig).setOrigin(.5,.5);
        this.add.text(640,128*1.25,this.creditsTXT,this.menuTextConfig).setOrigin(.5,.5);
        


    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keySTART)) {
            this.scene.start('play');
        }

        for (let i = 0; i < this.spriteList.length; i++)
        {
            this.spriteList[i].x += this.spriteList[i].speed;

            if (this.spriteList[i].x >= 900)
            {
                this.spriteList[i].x = -100;
                this.spriteList[i].speed = Phaser.Math.FloatBetween(1.0, 3.5);
                this.spriteList[i].y = Phaser.Math.Between(100, 400);
            }
        }
    }



}
