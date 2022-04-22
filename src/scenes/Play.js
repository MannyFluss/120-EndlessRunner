class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    // preload assets
    preload() {
        this.load.image('sidewalk', 'assets/pixel-street-from-above.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('walker', 'assets/walker.png');
    }

    create() {

        // movement keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // background sprite
        this.sidewalk = new Sidewalk(this, 0, 0, game.config.width, game.config.height, 'sidewalk').setOrigin(0,0);

        // player sprite
        this.player = new Player(this, this.sidewalk.mid).setOrigin(0,0);

        // container of enemies
        this.walkers = [];

        // send first two enemies immediately
        this.walkers.push(new Walker(this, this.sidewalk.left).setOrigin(0,0));
        this.walkers.push(new Walker(this, this.sidewalk.right).setOrigin(0,0));

        this.gameOver = false;

        // milliseconds between spawns
        this.spawnRate = 1000;

        // milliseconds passed since last spawn
        this.spawnTimer = 0;

        // previous pattern chosen
        this.previousOne = 2;
    }

    // need timer as an argument to get access to delta
    // since delta is the second argumnt
    update(timer, delta) {

        // scroll sidewalk
        this.sidewalk.tilePositionY -= 1.5;

        // delta is innate Phaser thing that counts milliseconds between updates
        this.spawnTimer += delta;

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
                // this.player.destroy();
                // this.gameOver = true;
                this.scene.restart();
            }
        }
    }

    // basic collision checker
    checkCollision(player, walker) {
        if (player.x < walker.x + walker.width &&
            player.x + player.width > walker.x &&
            player.y < walker.y + walker.height &&
            player.height + player.y > walker.y) {
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
            console.log(this.whichOne, this.previousOne)
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
    }
}