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
    { id: "ReturnBtn", src: "../../Assets/images/returnBtn.png" },
    { id: "Tiles", src: "../../Assets/images/metalblocks.png" },
    { id: "Font", src: "../../Assets/images/HUDfont.png" },
    { id: "Sonic", src: "../../Assets/images/SonicSprites.png" },
    { id: "TitleMusic", src: "../../Assets/sounds/title.mp3" },
    { id: "GHZ", src: "../../Assets/sounds/GHZ.mp3" },
    { id: "JumpSnd", src: "../../Assets/sounds/jump.wav" },
    { id: "RollSnd", src: "../../Assets/sounds/roll.wav" },
    { id: "RingSnd", src: "../../Assets/sounds/ring2.wav" },
    { id: "LoseRingsSnd", src: "../../Assets/sounds/loserings.wav" },
    { id: "SpringSnd", src: "../../Assets/sounds/spring.wav" },
    { id: "ReboundSnd", src: "../../Assets/sounds/rebound.wav" },
    { id: "DeathSnd", src: "../../Assets/sounds/death.wav" },
    //{ id: "SpikeSnd", src: "../../Assets/sounds/spikedeath.wav" },
    { id: "GoalSnd", src: "../../Assets/sounds/goalspin.wav" }
];
function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function exitBtnClick(event) {
    console.log("clicked exit button");
    stage.tickEnabled = true;
    stage.removeAllChildren();
    canPause = false;
    paused = false;
    scene = config.Scene.MENU;
    changeScene();
}
function frameAdvance() {
    if (paused) {
        stage.tickEnabled = true;
        currentScene.update();
        stage.update();
        stage.tickEnabled = false;
    }
}
function togglePause() {
    //pause functionality is here so we can use it in multiple scenes
    if (!paused && canPause) {
        stage.addChild(pauseBg);
        stage.addChild(exitBtn);
        paused = true;
        stage.tickEnabled = false;
    }
    else {
        stage.removeChild(pauseBg);
        stage.removeChild(exitBtn);
        paused = false;
        stage.tickEnabled = true;
    }
}
function toRadians(angle) {
    return angle * (Math.PI / 180);
}
function init() {
    pauseBg = new createjs.Bitmap(assets.getResult("Pause"));
    exitBtn = new objects.Button("ExitBtn", 0, 0, 177, 84);
    exitBtn.on("click", exitBtnClick, this);
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
            [1228, 527, 256, 256],
            [1750, 2615, 256, 256],
            [1307, 3635, 48, 32],
            [2011, 1049, 256, 256],
            [2011, 1571, 256, 256],
            [1489, 5, 256, 256],
            [1489, 1571, 256, 256],
            [1750, 1571, 256, 256],
            [1228, 788, 256, 256],
            [451, 331, 48, 31], [499, 331, 48, 31], [502, 365, 48, 31], [515, 403, 48, 31],
            [2272, 1571, 256, 256],
            [1750, 527, 256, 256],
            [2011, 527, 256, 256],
            [1750, 1049, 256, 256],
            [1489, 1049, 256, 256],
            [1228, 1310, 256, 256],
            [2011, 2615, 256, 256],
            [989, 268, 48, 48], [1042, 268, 48, 48], [1095, 268, 48, 48], [1148, 268, 48, 48], [989, 325, 48, 48],
            [557, 316, 12, 12], [557, 332, 12, 12], [557, 348, 12, 12],
            [1226, 3637, 64, 30],
            [716, 372, 16, 16], [736, 372, 16, 16], [757, 372, 16, 16], [778, 372, 16, 16],
            [802, 372, 16, 16], [823, 372, 16, 16], [844, 372, 16, 16], [865, 372, 16, 16],
            [792, 156, 28, 32], [879, 156, 28, 32], [792, 148, 28, 32],
            [2, 674, 44, 32],
            [1014, 475, 38, 38], [1047, 476, 38, 38], [1082, 475, 38, 38], [1120, 475, 38, 38], [1161, 475, 38, 38],
            //ghz wall + waterfall backgrounds
            [912, 3150, 256, 40], [912, 3191, 256, 40], [912, 3232, 256, 40], [912, 3273, 256, 40],
            [912, 3329, 256, 40], [912, 3370, 256, 40], [912, 3411, 256, 40], [912, 3452, 256, 40],
            [2011, 2988, 256, 40],
            [912, 3505, 256, 40], [912, 3546, 256, 40], [912, 3587, 256, 40], [912, 3628, 256, 40],
            [1489, 2988, 256, 40],
            [912, 3679, 256, 40], [912, 3720, 256, 40], [912, 3761, 256, 40], [912, 3802, 256, 40],
            [2272, 2988, 256, 40],
            //ghz sky + mountains backgrounds
            [1228, 3137, 256, 112],
            [1489, 3137, 256, 112],
            [2011, 2876, 256, 112],
            [1750, 3137, 256, 112],
            [1489, 2876, 256, 112],
            [1750, 2876, 256, 112],
            [2272, 2876, 256, 112],
            [1236, 3975, 256, 107], [1497, 3975, 256, 107], [1758, 3975, 256, 107], [2019, 3975, 256, 107],
            [1750, 1049, 256, 256],
            [1489, 266, 256, 256],
            [2011, 1310, 256, 256],
            [2272, 2354, 256, 256],
            [1489, 527, 256, 256],
            [2011, 788, 256, 256],
            [2272, 1049, 256, 256],
            [2272, 1310, 256, 256],
            [781, 406, 40, 39], [821, 406, 40, 39], [901, 406, 40, 39],
            [941, 406, 40, 39],
            [981, 451, 40, 16],
            [981, 406, 54, 16], [981, 430, 48, 16],
            [728, 276, 39, 39],
            [768, 276, 39, 39],
            [808, 276, 39, 39],
            [41, 6, 39, 40],
            [81, 6, 39, 40],
            [121, 6, 39, 40], [161, 6, 39, 40],
            [12, 568, 39, 40], [52, 568, 39, 40], [91, 568, 39, 40], [127, 568, 39, 40],
            [2272, 788, 256, 256],
            [1750, 1310, 256, 256],
            [2272, 1832, 256, 256],
            [1228, 2615, 256, 256],
            [1489, 2615, 256, 256] // GHZ51
        ],
        animations: {
            "stand": { frames: [0], next: "wait1", speed: 1 / 288 },
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
            "ghz24": { frames: [84] },
            "rock": { frames: [85] },
            "ghz26": { frames: [86] },
            "ghz27": { frames: [87] },
            "ghz28": { frames: [88] },
            "ghz29": { frames: [89] },
            "ghz30": { frames: [90] },
            "ghz31": { frames: [91] },
            "crabmeat_idle": { frames: [92] },
            "crabmeat_move": { frames: [92, 93, 94], speed: 1 / 16 },
            "crabmeat_shoot": { frames: [95] },
            "ghz32": { frames: [96] },
            "ghz33": { frames: [97] },
            "ghz34": { frames: [98] },
            "ghz35": { frames: [99] },
            "ghz36": { frames: [100] },
            "ghz37": { frames: [101] },
            "ghz38": { frames: [102] },
            "goal": { frames: [103] },
            "goalSpin1": { frames: [103, 104, 105, 106], speed: 0.5 },
            "goalSpin2": { frames: [107, 104, 105, 106], speed: 0.5 },
            "goalEnd": { frames: [107] },
            "redProjectile": { frames: [109, 110], speed: 0.5 },
            "yellowProjectile": { frames: [108, 110], speed: 0.5 },
            "platform": { frames: [111] },
            "ringSpin": { frames: [112, 113, 114, 115], speed: 1 / 8 },
            "ringSpark": { frames: [116, 117, 118, 119], speed: 1 / 8 },
            "yellowSpring": { frames: [120] },
            "yellowSpringAnim1": { frames: [122], next: "yellowSpringAnim2", speed: 1 },
            "yellowSpringAnim2": { frames: [120], next: "yellowSpringAnim3", speed: 1 / 2 },
            "yellowSpringAnim3": { frames: [121], next: "yellowSpring", speed: 1 / 6 },
            "hurt": { frames: [123] },
            "poof": { frames: [124, 125, 126, 127, 128], next: "empty", speed: 1 / 8 },
            "ghzbg0": { frames: [129, 130, 131, 132], speed: 1 / 6 },
            "ghzbg1": { frames: [133, 134, 135, 136], speed: 1 / 6 },
            "ghzbg2": { frames: [137] },
            "ghzbg3": { frames: [138, 139, 140, 141], speed: 1 / 6 },
            "ghzbg4": { frames: [142] },
            "ghzbg5": { frames: [143, 144, 145, 146], speed: 1 / 6 },
            "ghzbg6": { frames: [147] },
            "ghzsky0": { frames: [148] },
            "ghzsky1": { frames: [149] },
            "ghzsky2": { frames: [150] },
            "ghzsky3": { frames: [151] },
            "ghzsky4": { frames: [152] },
            "ghzsky5": { frames: [153] },
            "ghzsky6": { frames: [154] },
            "ghzWater": { frames: [155, 156, 157, 158], speed: 1 / 6 },
            "ghz39": { frames: [159] },
            "ghz40": { frames: [160] },
            "ghz41": { frames: [161] },
            "ghz42": { frames: [162] },
            "ghz43": { frames: [163] },
            "ghz44": { frames: [164] },
            "ghz45": { frames: [165] },
            "ghz46": { frames: [166] },
            "bNewtronAppear": { frames: [167, 168, 169, 170], next: "bNewtronFall", speed: 1 / 20 },
            "bNewtronFall": { frames: [171] },
            "bNewtronMove": { frames: [172, 173] },
            "gNewtronAppear": { frames: [174] },
            "gNewtronIdle": { frames: [175] },
            "gNewtronShoot": { frames: [176] },
            "wait1": { frames: [177], next: "wait2", speed: 1 / 24 },
            "wait2": { frames: [178], next: "wait3", speed: 1 / 72 },
            "wait3": { frames: [179, 180], speed: 1 / 24 },
            "push": { frames: [181, 182, 183, 184], speed: 1 / 32 },
            "ghz47": { frames: [185] },
            "ghz48": { frames: [186] },
            "ghz49": { frames: [187] },
            "ghz50": { frames: [188] },
            "ghz51": { frames: [189] }
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
    console.log("about to start menu scene");
    changeScene();
}
function gameLoop(event) {
    if (!paused) {
        // Update whatever scene is currently active.
        currentScene.update();
    }
    stage.update();
    //console.log("measured fps: "+Math.floor(createjs.Ticker.getMeasuredFPS()));
    //console.log("measured tick time: "+createjs.Ticker.getMeasuredTickTime());
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
        case config.Scene.GHZ1:
            stage.removeAllChildren();
            currentScene = new scenes.GreenHillZone1();
            console.log("Starting ACT 1");
            break;
        case config.Scene.GHZ2:
            stage.removeAllChildren();
            currentScene = new scenes.GreenHillZone2();
            console.log("Starting ACT 2");
            break;
        case config.Scene.GHZ3:
            stage.removeAllChildren();
            currentScene = new scenes.GreenHillZone3();
            console.log("Starting ACT 3");
            break;
        case config.Scene.INSTRUCTIONS:
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;
    }
}
//# sourceMappingURL=game.js.map