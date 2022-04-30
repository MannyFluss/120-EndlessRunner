class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }
    create()
    {
        keySTART = this.input.keyboard.addKey('SPACE');
        //main menu creation goes here
        this.add.text(this.width/2,this.height/2,"press space to start");
        this.add.text(this.width/2,this.height/2,"working title");
        this.add.text(this.width/2,this.height/2,"controls");
        this.add.text(this.width/2,this.height/2,"credits");

        
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keySTART)) {
            this.scene.start('play');
        }
    }

}
