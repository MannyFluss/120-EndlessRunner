class PhoneContainer extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,children)
    {
        super(scene,x,y,children);

        const testMessage = new Message(this,0,0,true,"this is a sample message");
        this.add(testMessage)
    }
}