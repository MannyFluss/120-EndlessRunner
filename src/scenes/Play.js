class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    // preload assets
    preload() {
        this.load.audio('sfx_lanechange', 'assets/placeholder_lanechange.wav');
        this.load.audio('sfx_bump', 'assets/placeholder_bump.wav');
        this.load.image('sidewalk', 'assets/street.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('walker', 'assets/raccoon.png');
        let raccoonResize = 3;
        this.load.spritesheet('raccoon', 'assets/raccoon-sheet.png', {frameWidth: 12*raccoonResize, frameHeight: 16*raccoonResize, startFrame: 0, endFrame: 4});
    }

    create() {

        // movement keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // background sprite
        this.sidewalk = new Sidewalk(this, 0, 0, game.config.width, game.config.height, 'sidewalk').setOrigin(0,0);

        // player sprite
        this.player = new Player(this, this.sidewalk.mid).setOrigin(0,0);

        // racoon animation config
        this.anims.create({
            key: 'raccoon_walk',
            frames: this.anims.generateFrameNumbers('raccoon', { start: 0, end: 4, first: 0}),
            frameRate: 4,
            repeat: -1,
            showOnStart: true,
            skipMissedFrame: true,
            hideOnComplete: false,
        });

        // container of enemies
        this.walkers = [];

        // send first two enemies immediately
        this.walkers.push(new Walker(this, this.sidewalk.left).setOrigin(0,0));
        this.walkers.push(new Walker(this, this.sidewalk.right).setOrigin(0,0));

        for (let walker of this.walkers)
            walker.anims.play('raccoon_walk');

        this.gameOver = false;

        // milliseconds between spawns
        this.spawnRate = 1000;

        // milliseconds passed since last spawn
        this.spawnTimer = 0;

        // previous pattern chosen
        this.previousOne = 2;

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

    }

    // need timer as an argument to get access to delta
    // since delta is the second argumnt
    update(timer, delta) {

        // scroll sidewalk
        this.sidewalk.tilePositionY -= 1.5;

        // delta is innate Phaser thing that counts milliseconds between updates
        this.spawnTimer += delta;
        this.distanceTraveled += delta / 250;
        this.distanceText.text = "Distance Traveled: " + Math.round(this.distanceTraveled) + " m";

        // once spawn reached, spawn in enemies and reset timer
        if (this.spawnTimer >= this.spawnRate) {
            this.walkerRespawn();
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

    // respawns enemies
    walkerRespawn(walkerL, walkerC, walkerR) {
        
        // determines which of 3 patterns will be chosen
        do {
            this.whichOne = Math.round(Math.random() * 2);
        } while (this.whichOne == this.previousOne);

        // determines whether to send 1 or 2 enemies
        if (Math.round(Math.random())) {

            // 3 patterns of sending 2 enemies
            if (this.whichOne == 0) {
                this.walkers.push(new Walker(this, this.sidewalk.left).setOrigin(0,0));
                this.walkers.push(new Walker(this, this.sidewalk.mid).setOrigin(0,0));
                this.previousOne = 0;
            } else if (this.whichOne == 1) {
                this.walkers.push(new Walker(this, this.sidewalk.mid).setOrigin(0,0));
                this.walkers.push(new Walker(this, this.sidewalk.right).setOrigin(0,0));
                this.previousOne = 1;
            } else {
                this.walkers.push(new Walker(this, this.sidewalk.left).setOrigin(0,0));
                this.walkers.push(new Walker(this, this.sidewalk.right).setOrigin(0,0));
                this.previousOne = 2;
            }
        } else {

            // 3 patterns of sending 1 enemy
            if (this.whichOne == 0) {
                this.walkers.push(new Walker(this, this.sidewalk.left).setOrigin(0,0));
                this.previousOne = 0;
            } else if (this.whichOne == 1) {
                this.walkers.push(new Walker(this, this.sidewalk.mid).setOrigin(0,0));
                this.previousOne = 1;
            } else {
                this.walkers.push(new Walker(this, this.sidewalk.right).setOrigin(0,0));
                this.previousOne = 2;
            }
        }

        // play walk animation
        for (let walker of this.walkers) {
            if (walker.anims)
                walker.anims.play('raccoon_walk');
        }
    }
}