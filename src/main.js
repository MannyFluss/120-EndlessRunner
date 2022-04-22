let config = {
    type: Phaser.CANVAS,
    width: 432,
    height: 480,
    scene : [mannyDebug, Play]
}

// declare keys
let keyLEFT, keyRIGHT;

// set UI sizes
let game = new Phaser.Game(config);

//global variables, see accessed in play.js
