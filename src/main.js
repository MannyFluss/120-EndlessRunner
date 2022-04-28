let canvasStyle = " \
border-radius: 10px; \
"

let config = {
    type: Phaser.CANVAS,
    width: 128*6, // street.png width * export resize factor
    height: 480,
    canvasStyle: canvasStyle,
    scene : [Play, mannyDebug ]
}

// declare keys
let keyLEFT, keyRIGHT;

// set UI sizes
let game = new Phaser.Game(config);

let highScore = 0;

//global variables, see accessed in play.js
