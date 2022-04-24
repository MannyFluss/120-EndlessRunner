let config = {
    type: Phaser.CANVAS,
    width: 444,
    height: 480,
    scene : [Play, mannyDebug]
}

// declare keys
let keyLEFT, keyRIGHT;

// set UI sizes
let game = new Phaser.Game(config);

let highScore = 0;

//global variables, see accessed in play.js
