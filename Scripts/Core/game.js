/// <reference path = "_reference.ts" />
// Global Variables
var assets;
var canvas;
var stage;
var spriteSheetLoader;
var spriteAtlas;
var tileSpriteSheet;
var fontSpriteSheet;
var currentScene;
var scene;
var numLaps;
var collision;
var paused = false;
var exitBtn;
var pauseBg;
var canPause = false;
//to simplify sonic's loop behaviour
var Quadrant;
(function (Quadrant) {
    Quadrant[Quadrant["Floor"] = 1] = "Floor";
    Quadrant[Quadrant["RightWall"] = 2] = "RightWall";
    Quadrant[Quadrant["Ceiling"] = 3] = "Ceiling";
    Quadrant[Quadrant["LeftWall"] = 4] = "LeftWall";
})(Quadrant || (Quadrant = {}));
// Preload Assets required
var assetData = [
    { id: "Pause", src: "../../Assets/images/pause.png" },
    { id: "Background", src: "../../Assets/images/nightsky.png" },
    { id: "Overlay", src: "../../Assets/images/FinishOverlay.png" },
    { id: "ExitBtn", src: "../../Assets/images/exit.png" },
    { id: "InstBtn", src: "../../Assets/images/Instructions.png" },
    { id: "Block", src: "../../Assets/images/metalblock.png" },
    { id: "Ramps", src: "../../Assets/images/metalblock2.png" },
    { id: "Tiles", src: "../../Assets/images/metalblocks.png" },
    { id: "Font", src: "../../Assets/images/HUDfont.png" },
    { id: "Ramp22", src: "../../Assets/images/ramp22.png" },
    { id: "Ramp23", src: "../../Assets/images/ramp23.png" },
    { id: "Ramp135", src: "../../Assets/images/ramp135.png" },
    { id: "Player", src: "../../Assets/images/Character.png" },
    { id: "Portal", src: "../../Assets/images/portal.png" },
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
    // Reference to canvas element
    pauseBg = new createjs.Bitmap(assets.getResult("Pause"));
    exitBtn = new objects.Button("ExitBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 150, 177, 84);
    canvas = document.getElementById("canvas");
    stage = new createjs.SpriteStage("canvas", false, false);
    stage.enableMouseOver(20);
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
            [2, 235, 39, 40, 0], [42, 235, 39, 40, 0], [82, 235, 39, 40, 0], [122, 235, 39, 40, 0], [162, 235, 39, 40, 0],
            [590, 365, 39, 29, 0],
            [272, 0, 16, 16, 0],
            [232, 0, 16, 16, 0],
            [252, 0, 16, 16, 0],
            [232, 20, 16, 16, 0],
            [252, 20, 16, 16, 0],
            [477, 473, 512, 256, 0]],
        /*animations: {
        player: 0,
        block: 1,
        empty: 2
        },*/
        animations: {
            "stand": { "frames": [0] },
            "lookup": { "frames": [1, 2] },
            "crouch": { "frames": [3, 4] },
            "walk": { "frames": [5, 6, 7, 8, 9, 10], speed: 1 / 60 },
            "run": { "frames": [11, 12, 13, 14] },
            "jump": { "frames": [15, 16, 17, 18, 19], speed: 12 / 60 },
            "motobug": { "frames": [20] },
            "block": { "frames": [21] },
            "ramp45": { "frames": [22] },
            "ramp315": { "frames": [23] },
            "ramp135": { "frames": [24] },
            "ramp225": { "frames": [25] },
            "nightsky": { "frames": [26] }
        },
        "texturepacker": [
            "SmartUpdateHash: $TexturePacker:SmartUpdate:013a2fc3dc6ba39276db3e6758d1ddbd:84789f29f2d01b3ea1c113a3b2d1bfdc:e696b1a5c9e543dbf26d7c8d29a6d04f$",
            "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
        ]
    };
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
    scene = config.Scene.LEVEL1;
    changeScene();
}
function gameLoop(event) {
    console.log("Framerate: " + createjs.Ticker.getFPS());
    if (!paused) {
        // Update whatever scene is currently active.
        currentScene.update();
    }
    canvas.style.width = (config.Screen.WIDTH * config.Screen.SCALE_X) + 'px';
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
            currentScene = new scenes.Level_1();
            console.log("Starting SINGLEPLAYER scene");
            break;
        case config.Scene.INSTRUCTIONS:
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;
    }
}
//# sourceMappingURL=game.js.map