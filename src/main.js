let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene : [Play, mannyDebug]
}

// declare keys
let keyLEFT, keyRIGHT;

// set UI sizes
let game = new Phaser.Game(config);

//global variables, see accessed in play.js
