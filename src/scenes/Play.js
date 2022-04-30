class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.audio('sfx_lanechange', 'assets/placeholder_lanechange.wav');
        this.load.audio('sfx_bump', 'assets/placeholder_bump.wav');
        
        this.load.image('sidewalk', 'assets/street.png');
        this.load.image('distracted', './assets/distracted.png');
        this.load.image('mischievous', './assets/mischievous.png');
        this.load.image('distract-holder', './assets/distract-o-meter.png');
        this.load.image('distract-measure', './assets/distract-measure.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('phoneTexture',"./assets/phoneAssets/phone.png");
        
        let raccoonResize = 3;
        this.load.spritesheet('raccoon', 'assets/raccoon-sheet.png', {frameWidth: 12*raccoonResize, frameHeight: 16*raccoonResize, startFrame: 0, endFrame: 3});
        this.load.spritesheet('red-panda', 'assets/red-panda-behind-Sheet.png', {frameWidth: 9*raccoonResize, frameHeight: 15*raccoonResize, startFrame: 0, endFrame: 7});
    }

    create() {

        // movement keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // background sprite
        this.sidewalk = new Sidewalk(this, 0, 0, game.config.width, game.config.height, 'sidewalk').setOrigin(0,0);
        
        // distract-o-meter sprites
        this.distractText = new BasicSprite(this, 820, 40, 'distracted').setOrigin(0,0);
        this.mischeivousText = new BasicSprite(this, 820, 385, 'mischievous').setOrigin(0,0);
        this.distractHolder = new BasicSprite(this, 770, 40, 'distract-holder').setOrigin(0,0);
        this.distractMeter = new Meter(this, 776, 437, 18, 391, 'distract-measure').setOrigin(0,1);

        //phone and its assets
        this.thePhone = new Phone(this, -20, 0 ,'phoneTexture');
        this.phoneInput = new PhoneContainer(this, 316, 120);
        this.phoneInput.containerRef.add(this.thePhone);

        // player animation config
        this.anims.create({
            key: 'red-panda-walk',
            frames: this.anims.generateFrameNumbers('red-panda', { start: 0, end: 7, first: 0}),
            frameRate: 4,
            repeat: -1,
            showOnStart: true,
            skipMissedFrame: true,
            hideOnComplete: false,
        });

        // player sprite
        this.player = new Player(this, this.sidewalk.mid).setOrigin(0,0);
        this.player.anims.play('red-panda-walk');

        // racoon animation config
        this.anims.create({
            key: 'raccoon_walk',
            frames: this.anims.generateFrameNumbers('raccoon', { start: 0, end: 3, first: 0}),
            frameRate: 4,
            repeat: -1,
            showOnStart: true,
            skipMissedFrame: true,
            hideOnComplete: false,
        });

        // container of enemies
        this.walkers = [];

        // send first two enemies immediately
        this.spawnWalker(this.sidewalk.left);
        this.spawnWalker(this.sidewalk.right);

        this.gameOver = false;

        // milliseconds between spawns
        this.spawnRate = 1800;

        // slowest allowed spawn rate
        this.maxSpawnRate = 2000;

        // fastest allowed spawn rate
        this.minSpawnRate = 1000;

        // milliseconds passed since last spawn
        this.spawnTimer = 0;

        // the number of waves between difficulty increases
        this.rampRate = 4;

        // keep track of the number of waves
        this.waveNumber = 0;

        // track run distance
        this.distanceTraveled = 0;

        let distanceConfig = {
            fontFamily: 'Helvetica',
            fontSize: '25px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.distanceText = this.add.text(0, 0, "Distance Traveled: " + this.distanceTraveled + " m", distanceConfig);

        let highScoreConfig = {
            fontFamily: 'Helvetica',
            fontSize: '25px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.highScoreText = this.add.text(0, this.distanceText.height, "Farthest Traveled: " + highScore + " m", highScoreConfig);

        this.distractMeter.set(this.spawnRateToMeter());
    }
    
    //this will trigger whenever the phone text is successful
    //ad ms to spawnrt for each text
    //update future bar intensity here
    recieveSignal()
    {   
        if (this.spawnRate < this.maxSpawnRate) {
            this.spawnRate += 200;
            this.distractMeter.set(this.spawnRateToMeter());
        }
    }

    // need timer as an argument to get access to delta
    // since delta is the second argumnt
    update(timer, delta) {

        // scroll sidewalk
        this.sidewalk.tilePositionY -= 1.35;

        // delta is innate Phaser thing that counts milliseconds between updates
        this.spawnTimer += delta;
        this.distanceTraveled += delta / 250;
        this.distanceText.text = "Distance Traveled: " + Math.round(this.distanceTraveled) + " m";

        // once spawn reached, spawn in enemies and reset timer
        if (this.spawnTimer >= this.spawnRate) {
            this.spawnWave();
            this.spawnTimer = 0;
        }

        // iterate through enemy container and update everything
        if (!this.gameOver) {
            this.player.update();
            for (let i = 0; i < this.walkers.length; i++) {
                this.walkers[i].update();
            }
        }

        // iterate through enemy container to check for collisions and, if so, death
        for (let i = 0; i < this.walkers.length; i++) {
            if (this.checkCollision(this.player, this.walkers[i])) {
                this.sound.play('sfx_bump');
                if(this.distanceTraveled > highScore) {
                    highScore = Math.round(this.distanceTraveled);
                }
                this.scene.restart();
            }
        }
    }

    // basic collision checker
    checkCollision(player, walker) {
        let collisionGenerosity = 20;

        if (player.x < walker.x + walker.width &&
            player.x + player.width > walker.x &&
            player.y < walker.y + walker.height &&
            player.height + player.y > walker.y + collisionGenerosity) {
            return true;
        } else {
            return false;
        }
    }

    // spawns a wave of enemies (1 or 2)
    spawnWave() {
    
        // setup lanes
        let lanes = [this.sidewalk.left, this.sidewalk.mid, this.sidewalk.right];
        
        // spawn a first raccoon
        let lane = Phaser.Math.RND.pick(lanes);
        this.spawnWalker(lane);

        // spawn a second raccoon
        if (this.shouldSpawn2()) {
            lane = Phaser.Math.RND.pick(lanes.filter((value) => {return value != lane}));
            this.spawnWalker(lane);
        }

        // ramp up difficulty every few waves based on rampRate
        if (this.timeToRamp()) {
            this.spawnRate -= 200;
            this.distractMeter.set(this.spawnRateToMeter());
        }

        this.waveNumber++;
    }

    // spawns 1 walker in a specified lane
    spawnWalker(lane) {
        let walker = new Walker(this, lane).setOrigin(0,0);
        this.walkers.push(walker);
        walker.anims.play('raccoon_walk');
    }

    // decides whether to spawn 2 walkers
    shouldSpawn2() {
        return Math.round(Math.random());
    }

    timeToRamp() {
        return (this.spawnRate > this.minSpawnRate) && (this.waveNumber % this.rampRate == 0);
    }

    spawnRateToMeter() {
        return .05 + ((1 - .05) / (this.maxSpawnRate - this.minSpawnRate)) * (this.spawnRate - this.minSpawnRate);
    }
}