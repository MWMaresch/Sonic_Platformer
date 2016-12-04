/// <reference path = "_reference.ts" />
// Global Variables
var assets;
var canvas;
var stage;
var spriteAtlas;
var fontSpriteSheet;
var currentScene;
var scene;
var collision;
console.log("loading core");
//when we have multiple levels, they should all be able to pause
var paused = false;
var exitBtn;
var pauseBg;
var canPause = false;
var gameWon = false;
//to simplify sonic's loop behaviour
//and by simplify, I mean make it accurate to the originals, because they simplified it
var Quadrant;
(function (Quadrant) {
    Quadrant[Quadrant["Floor"] = 1] = "Floor";
    Quadrant[Quadrant["RightWall"] = 2] = "RightWall";
    Quadrant[Quadrant["Ceiling"] = 3] = "Ceiling";
    Quadrant[Quadrant["LeftWall"] = 4] = "LeftWall";
})(Quadrant || (Quadrant = {}));
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
var assetData = [
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
function exitBtnClick(event) {
    stage.removeAllChildren();
    canPause = false;
    paused = false;
    scene = config.Scene.MENU;
    changeScene();
}
function frameAdvance() {
    if (paused) {
        currentScene.update();
        stage.update();
    }
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
function toRadians(angle) {
    return angle * (Math.PI / 180);
}
function init() {
    pauseBg = new createjs.Bitmap(assets.getResult("Pause"));
    exitBtn = new objects.Button("ExitBtn", 0, 0, 177, 84);
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
        frames: [[1, 6, 39, 40, 0],
            [1, 47, 39, 40, 0], [41, 47, 39, 40, 0],
            [81, 47, 39, 40, 0], [121, 47, 39, 40, 0],
            [81, 91, 39, 40, 0], [121, 91, 39, 40, 0], [161, 91, 39, 40, 0], [201, 91, 39, 40, 0], [1, 91, 39, 40, 0], [41, 91, 39, 40, 0],
            [1, 141, 39, 40, 0], [41, 141, 39, 40, 0], [81, 141, 39, 40, 0], [121, 141, 39, 40, 0],
            [2, 245, 39, 30, 0], [42, 245, 39, 30, 0], [82, 245, 39, 30, 0], [122, 245, 39, 30, 0], [162, 245, 39, 30, 0],
            [272, 0, 16, 16, 0],
            [232, 0, 16, 16, 0],
            [252, 0, 16, 16, 0],
            [232, 20, 16, 16, 0],
            [252, 20, 16, 16, 0],
            [477, 473, 512, 256, 0],
            [905, 319, 40, 32, 0],
            [91, 617, 40, 43, 0],
            [315, 0, 16, 16, 0], [0, 0, 1, 1, 0],
            [589, 364, 40, 30, 0], [590, 401, 40, 30, 0], [589, 364, 40, 30, 0], [686, 401, 40, 30, 0],
            [18, 738, 90, 77, 0], [18, 746, 90, 77, 0], [18, 754, 90, 77, 0], [18, 762, 90, 77, 0], [18, 770, 90, 77, 0],
            [18, 778, 90, 77, 0], [18, 786, 90, 77, 0], [18, 794, 90, 77, 0], [18, 802, 90, 77, 0], [18, 810, 90, 77, 0],
            [108, 771, 90, 77, 0], [200, 771, 90, 77, 0], [296, 771, 92, 77, 0], [398, 771, 93, 77, 0], [482, 771, 90, 77, 0],
            [577, 771, 90, 77, 0], [677, 771, 90, 77, 0],
            [200, 588, 256, 144, 0],
            [507, 964, 594, 150],
            [507, 854, 640, 104], [515, 1222, 640, 104], [512, 1335, 640, 104], [511, 1441, 640, 104],
            [98, 1109, 557, 40], [658, 1109, 557, 40], [98, 1159, 557, 40], [658, 1159, 557, 40],
            [1228, 2354, 256, 256],
            [2011, 5, 256, 256],
            [2011, 2354, 256, 256],
            [1489, 1832, 256, 256],
            [1489, 788, 256, 256],
            [1750, 5, 256, 256],
            [1750, 266, 256, 256],
            [2272, 5, 256, 256],
            [1228, 266, 256, 256],
            [2011, 2093, 256, 256],
            [2272, 527, 256, 256],
            [1228, 1571, 256, 256],
            [1750, 788, 256, 256],
            [1489, 1832, 256, 256],
            [1750, 1832, 256, 256],
            [2272, 2093, 256, 256],
            [1489, 1310, 256, 256],
            [2272, 2615, 256, 256],
            [2011, 1832, 256, 256],
            [1228, 1832, 256, 256],
            [2011, 266, 256, 256],
            [2272, 266, 256, 256],
            [1228, 5527, 256, 256],
            [1750, 2615, 256, 256]],
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
            "titleSky": { frames: [52] },
            "titleWater": { frames: [53, 54, 55, 56], speed: 1 / 6 },
            "titleWall": { frames: [57, 58, 59, 60], speed: 1 / 6 },
            "ghz1": { frames: [61] },
            "ghz2": { frames: [62] },
            "ghz3": { frames: [63] },
            "ghz4": { frames: [64] },
            "ghz5": { frames: [65] },
            "ghz6": { frames: [66] },
            "ghz7": { frames: [67] },
            "ghz8": { frames: [68] },
            "ghz9": { frames: [69] },
            "ghz10": { frames: [70] },
            "ghz11": { frames: [71] },
            "ghz12": { frames: [72] },
            "ghz13": { frames: [73] },
            "ghz14": { frames: [74] },
            "ghz15": { frames: [75] },
            "ghz16": { frames: [76] },
            "ghz17": { frames: [77] },
            "ghz18": { frames: [78] },
            "ghz19": { frames: [79] },
            "ghz20": { frames: [80] },
            "ghz21": { frames: [81] },
            "ghz22": { frames: [82] },
            "ghz23": { frames: [83] },
            "ghz24": { frames: [84] }
        },
        "texturepacker": [
            "SmartUpdateHash: $TexturePacker:SmartUpdate:013a2fc3dc6ba39276db3e6758d1ddbd:84789f29f2d01b3ea1c113a3b2d1bfdc:e696b1a5c9e543dbf26d7c8d29a6d04f$",
            "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
        ]
    };
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
    };
    fontSpriteSheet = new createjs.SpriteSheet(fontData);
    spriteAtlas = new createjs.SpriteSheet(spriteData);
    objects.TileGroup.initialize();
    scene = config.Scene.MENU;
    changeScene();
}
function gameLoop(event) {
    if (!paused) {
        // Update whatever scene is currently active.
        currentScene.update();
    }
    stage.update();
}
function changeScene() {
    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();
            ;
            console.log("Starting MENU scene");
            break;
        case config.Scene.LEVEL1:
            stage.removeAllChildren();
            currentScene = new scenes.GreenHillZone();
            console.log("Starting LEVEL1 scene");
            break;
        case config.Scene.INSTRUCTIONS:
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;
    }
}
//# sourceMappingURL=game.js.map