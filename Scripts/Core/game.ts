/// <reference path = "_reference.ts" />

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.SpriteStage;

var spriteAtlas: createjs.SpriteSheet;
var fontSpriteSheet: createjs.SpriteSheet;

var currentScene: objects.Scene;
var scene: number;

var collision: managers.Collision;
console.log("loading core");
//when we have multiple levels, they should all be able to pause
var paused: boolean = false;
var exitBtn: objects.Button;
var pauseBg: createjs.Bitmap;
var canPause: boolean = false;
var gameWon: boolean = false;

//to simplify sonic's loop behaviour
//and by simplify, I mean make it accurate to the originals, because they simplified it
enum Quadrant {
    Floor = 1,
    RightWall = 2,
    Ceiling = 3,
    LeftWall = 4
}
/*
   quadrant 1: ground and left lower slope
       315 up to 44
       -45

   quadrant 2: right lower slope and right wall
       45 up to 134

   quadrant 3: right upper slope and ceiling
       135 up to 224

   quadrant 4: left upper slope and left wall
       225 up to 314
*/

// Preload Assets required
var assetData: objects.Asset[] = [
    { id: "Pause", src: "../../Assets/images/pause.png" },
    { id: "Overlay", src: "../../Assets/images/FinishOverlay.png" },
    { id: "ExitBtn", src: "../../Assets/images/exit.png" },
    { id: "InstBtn", src: "../../Assets/images/Instructions.png" },
    { id: "InstScreen", src: "../../Assets/images/InstrScreen.png" },
    { id: "StrBtn", src: "../../Assets/images/Start.png" },
    { id: "Tiles", src: "../../Assets/images/metalblocks.png" },
    { id: "Font", src: "../../Assets/images/HUDfont.png" },
    { id: "Sonic", src: "../../Assets/images/SonicSprites.png" }
];

function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);

    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function exitBtnClick(event: createjs.MouseEvent) {
    stage.removeAllChildren();
    canPause = false;
    paused = false;
    scene = config.Scene.MENU;
    changeScene();
}

function togglePause() {
    //pause functionality is here so we can use it in multiple scenes
    if (!paused && canPause) {
        stage.addChild(pauseBg);
        stage.addChild(exitBtn);
        exitBtn.on("click", exitBtnClick, this);
        paused = true;
    }
    else {
        stage.removeChild(pauseBg);
        stage.removeChild(exitBtn);
        paused = false;
    }
}

function init() {
    pauseBg = new createjs.Bitmap(assets.getResult("Pause"));
    exitBtn = new objects.Button("ExitBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y, 177, 84);
    // Reference to canvas element
    canvas = document.getElementById("canvas");

    stage = new createjs.SpriteStage("canvas", false, false);
    stage.enableMouseOver(20);
    stage.snapToPixelEnabled = true;

    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);

    collision = new managers.Collision();

    let spriteData = {
        images: [assets.getResult("Sonic")],

        frames: [[1, 6, 39, 40, 0], //standing still
        [1, 47, 39, 40, 0], [41, 47, 39, 40, 0], //looking up
        [81, 47, 39, 40, 0], [121, 47, 39, 40, 0], //crouching
        [81, 91, 39, 40, 0], [121, 91, 39, 40, 0], [161, 91, 39, 40, 0], [201, 91, 39, 40, 0], [1, 91, 39, 40, 0], [41, 91, 39, 40, 0], //walking
        [1, 141, 39, 40, 0], [41, 141, 39, 40, 0], [81, 141, 39, 40, 0], [121, 141, 39, 40, 0], //running
        [2, 245, 39, 30, 0], [42, 245, 39, 30, 0], [82, 245, 39, 30, 0], [122, 245, 39, 30, 0], [162, 245, 39, 30, 0],//jumping/rolling
        [272, 0, 16, 16, 0],//solid tile
        [232, 0, 16, 16, 0],//bottom right slope tile, 45
        [252, 0, 16, 16, 0],//bottom left slope tile, 315
        [232, 20, 16, 16, 0],//top right slope tile, 135
        [252, 20, 16, 16, 0],//top left slope tile, 225
        [477, 473, 512, 256, 0], //sky
        [905, 319, 40, 32, 0], //spikes
        [91, 617, 40, 43, 0], //ouch
        [315, 0, 16, 16, 0], [0, 0, 1, 1, 0],//emerald
        [589, 364, 40, 30, 0], [590, 401, 40, 30, 0], [589, 364, 40, 30, 0], [686, 401, 40, 30, 0],  //motobug enemy
        [18, 738, 90, 77, 0], [18, 746, 90, 77, 0], [18, 754, 90, 77, 0], [18, 762, 90, 77, 0], [18, 770, 90, 77, 0],
        [18, 778, 90, 77, 0], [18, 786, 90, 77, 0], [18, 794, 90, 77, 0], [18, 802, 90, 77, 0], [18, 810, 90, 77, 0], //title1
        [108, 771, 90, 77, 0], [200, 771, 90, 77, 0], [296, 771, 92, 77, 0], [398, 771, 93, 77, 0], [482, 771, 90, 77, 0], //title 2
        [577, 771, 90, 77, 0], [677, 771, 90, 77, 0], //title3
        [200, 588, 256, 144, 0],//title emblem
        [507, 854, 511, 98] ], //title water



        animations: {
            "stand": { frames: [0] },
            "lookup": { frames: [1, 2] },
            "crouch": { frames: [3, 4] },
            "walk": { frames: [5, 6, 7, 8, 9, 10], speed: 1 / 8 },
            "run": { frames: [11, 12, 13, 14] },
            "jump": { frames: [15, 16, 17, 18, 19], speed: 12 / 60 },
            "block": { frames: [20] },
            "ramp45": { frames: [21] },
            "ramp315": { frames: [22] },
            "ramp135": { frames: [23] },
            "ramp225": { frames: [24] },
            "nightsky": { frames: [25] },
            "spikes": { frames: [26] },
            "dead": { frames: [27] },
            "emerald": { frames: [28, 29] },
            "motobug": { frames: [30, 31, 32, 33], speed: 1 / 8 },
            "title1": { frames: [34, 35, 36, 37, 38, 39, 40, 41, 42], next: "title2" },
            "title2": { frames: [43, 44, 45, 46, 47, 48], next: "title3", speed: 1 / 8 },
            "title3": { frames: [49, 50], speed: 1 / 8 },
            "emblem": { frames: [51] },
            "titleWater": { frames: [52] }
        },

        "texturepacker": [
            "SmartUpdateHash: $TexturePacker:SmartUpdate:013a2fc3dc6ba39276db3e6758d1ddbd:84789f29f2d01b3ea1c113a3b2d1bfdc:e696b1a5c9e543dbf26d7c8d29a6d04f$",
            "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
        ]
    }

    //this exists so we can display text in a SpriteContainer
    let fontData = {
        images: [assets.getResult("Font")],

        frames: [
            [7, 0, 7, 11, 0], [15, 0, 7, 11, 0],
            [23, 0, 7, 11, 0], [31, 0, 7, 11, 0],
            [39, 0, 7, 11, 0], [47, 0, 7, 11, 0],
            [55, 0, 7, 11, 0], [63, 0, 7, 11, 0],
            [72, 0, 3, 11, 0], [77, 0, 7, 11, 0],
            [85, 0, 8, 11, 0], [94, 0, 6, 11, 0],
            [101, 0, 10, 11, 0], [112, 0, 9, 11, 0],
            [122, 0, 7, 11, 0], [130, 0, 7, 11, 0],
            [138, 0, 8, 11, 0], [146, 0, 7, 11, 0],
            [154, 0, 7, 11, 0], [162, 0, 7, 11, 0],
            [170, 0, 7, 11, 0], [178, 0, 7, 11, 0],
            [186, 0, 10, 11, 0], [197, 0, 8, 11, 0],
            [206, 0, 7, 11, 0], [214, 0, 8, 11, 0],
            [223, 0, 7, 11, 0], [232, 0, 4, 11, 0],
            [238, 0, 7, 11, 0], [246, 0, 7, 11, 0],
            [254, 0, 7, 11, 0], [262, 0, 7, 11, 0],
            [270, 0, 7, 11, 0], [278, 0, 7, 11, 0],
            [286, 0, 7, 11, 0], [294, 0, 7, 11, 0],
            [428, 0, 7, 11, 0]],

        animations: {
            "A": [0], "B": [1],
            "C": [2], "D": [3],
            "E": [4], "F": [5],
            "G": [6], "H": [7],
            "I": [8], "J": [9],
            "K": [10], "L": [11],
            "M": [12], "N": [13],
            "O": [14], "P": [15],
            "Q": [16], "R": [17],
            "S": [18], "T": [19],
            "U": [20], "V": [21],
            "W": [22], "X": [23],
            "Y": [24], "Z": [25],
            "0": [26], "1": [27],
            "2": [28], "3": [29],
            "4": [30], "5": [31],
            "6": [32], "7": [33],
            "8": [34], "9": [35],
            ":": [36],
            ".": [36],
        },

        "texturepacker": [
            "SmartUpdateHash: $TexturePacker:SmartUpdate:013a2fc3dc6ba39276db3e6758d1ddbd:84789f29f2d01b3ea1c113a3b2d1bfdc:e696b1a5c9e543dbf26d7c8d29a6d04f$",
            "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
        ]
    }

    fontSpriteSheet = new createjs.SpriteSheet(fontData);
    spriteAtlas = new createjs.SpriteSheet(spriteData);

    objects.LinearTile.initialize();
    //scale up the low res game through the canvas
    canvas.style.width = (config.Screen.WIDTH * config.Screen.SCALE_X) + 'px';



    scene = config.Scene.MENU;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    if (!paused) {
        // Update whatever scene is currently active.
        currentScene.update();
    }

    stage.update();

}

function changeScene(): void {

    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
        case config.Scene.LEVEL1:
            stage.removeAllChildren();
            currentScene = new scenes.TestRoom();
            console.log("Starting LEVEL1 scene");
            break;
        case config.Scene.INSTRUCTIONS:
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;
    }
}