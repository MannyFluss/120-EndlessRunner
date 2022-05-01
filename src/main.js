// Distracction
// Manny Fluss, Benjamin Paulsen, and Manas Sara
// Date Completed: 5/1/22

// Creative Tilt:
// Technical: We are super proud of the system we came up with for texting the raccoons. We created a great looking phone messaging app, which gives the player a randomly generated prompt to copy and highlights the letters as they type. When the player enters the prompt correctly, it is sent as a message and the raccoons will give a randomized reply. This was definitely beyond the examples shown in class and makes our game's message about distracted texting really come through.
// Visual: We put a lot of effort into the game's sprites, animations, and music to make it cute and visually appealing. In particular, we wanted the assets to live up to the goofy premise of an army of raccoons with a texting addiction. We think we did something clever by combining the movement and dodging of an endless runner with the experience of texting-while-walking.

let canvasStyle = " \
border-radius: 10px; \
"

let config = {
    type: Phaser.CANVAS,
    width: 179*6, // street.png width * export resize factor
    height: 480,
    scene : [MainMenu, Play,mannyDebug],
    backgroundColor : "#1982FC",
    canvasStyle: canvasStyle
}

// declare keys
let keyLEFT, keyRIGHT, keySTART;

// set UI sizes
let game = new Phaser.Game(config);

let highScore = 0;

//global variables, see accessed in play.js
