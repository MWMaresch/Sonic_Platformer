/// <reference path = "_reference.ts" />

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var spriteSheetLoader : createjs.SpriteSheetLoader;
var shipAtlas : createjs.SpriteSheet;

var currentScene : objects.Scene;
var scene: number;
var numLaps: number;

var collision: managers.Collision;

var paused : boolean = false;
var exitBtn : objects.Button;
var pauseBg : createjs.Bitmap;
var canPause : boolean = false;

// Preload Assets required
var assetData:objects.Asset[] = [
    {id: "Pause", src:"../../Assets/images/pause.png"},
    {id: "Overlay", src:"../../Assets/images/FinishOverlay.png"},
    {id: "ExitBtn", src:"../../Assets/images/exit.png"},
    {id: "InstBtn", src:"../../Assets/images/Instructions.png"},
    {id: "Block", src:"../../Assets/images/metalblock.png"},
    {id: "Ramps", src:"../../Assets/images/metalblock2.png"},
    {id: "Ramp22", src:"../../Assets/images/ramp22.png"},
    {id: "Ramp23", src:"../../Assets/images/ramp23.png"},
    {id: "Ramp135", src:"../../Assets/images/ramp135.png"},
    {id: "Player", src:"../../Assets/images/Character.png"},
    {id: "Portal", src:"../../Assets/images/portal.png"},
    {id: "Sonic", src:"../../Assets/images/SonicSprites.png"}
];

function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);

    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function exitBtnClick(event : createjs.MouseEvent) {
    canPause = false;
    paused = false;
    scene = config.Scene.MENU;
    changeScene();
}

function togglePause(){
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


    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);



    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);

    collision = new managers.Collision();

    let atlasData = {
        images: [assets.getResult("Sonic"),  assets.getResult("Block"), assets.getResult("Ramps"), assets.getResult("Portal") ],

        frames:[ [1, 6, 39, 40, 0], //standing still
        [1, 47, 39, 40, 0], [41, 47, 39, 40, 0], //looking up
        [81, 47, 39, 40, 0], [121, 47, 39, 40, 0], //crouching
        [81, 91, 39, 40, 0], [121, 91, 39, 40, 0], [161, 91, 39, 40, 0], [201, 91, 39, 40, 0], [1, 91, 39, 40, 0], [41, 91, 39, 40, 0], //walking
        [1, 141, 39, 40, 0], [41, 141, 39, 40, 0], [81, 141, 39, 40, 0], [121, 141, 39, 40, 0], //running
        [162, 235, 39, 40, 0], [162, 235, 39, 40, 0], [162, 235, 39, 40, 0], [162, 235, 39, 40, 0],//jumping
        [0, 0, 16, 16, 1],//solid tile
        [0, 0, 1, 1, 0],//blank
        [0, 0, 16, 16, 2],//bottom right slope tile, 45
        [20, 0, 16, 16, 2],//bottom left slope tile, 315
        [0, 20, 16, 16, 2],//top right slope tile, 135
        [20, 20, 16, 16, 2],//top left slope tile, 225
        [0, 0, 16, 16, 3]],//portal

        /*animations: {
        player: 0,
        block: 1,
        empty: 2
        },*/

        animations: {
            "stand": { "frames": [0] },
            "lookup": { "frames": [1,2] },
            "crouch": { "frames": [3,4] },
            "walk": { "frames": [5,6,7,8,9,10], speed:1/60 },
            "run": { "frames": [11,12,13,14] },
            "jump": { "frames": [15,16,17,18] },
            "block": { "frames": [19] },
            "blank": { "frames": [20] },
            "ramp45": { "frames": [21] },
            "ramp315": { "frames": [22] },
            "ramp135": { "frames": [23] },
            "ramp225": { "frames": [24] },
            "portal": { "frames": [25] }
        },

        "texturepacker": [
                "SmartUpdateHash: $TexturePacker:SmartUpdate:013a2fc3dc6ba39276db3e6758d1ddbd:84789f29f2d01b3ea1c113a3b2d1bfdc:e696b1a5c9e543dbf26d7c8d29a6d04f$",
                "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
        ]
    }

    shipAtlas = new createjs.SpriteSheet(atlasData);

    scene = config.Scene.LEVEL1;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    if (!paused)
    {
        // Update whatever scene is currently active.
        currentScene.update();
    }
                canvas.style.width = (config.Screen.WIDTH * config.Screen.SCALE_X) + 'px';

    stage.update();    

}

function changeScene() : void {
    
    // Simple state machine pattern to define scene swapping.
    switch(scene)
    {
        case config.Scene.MENU :
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
        case config.Scene.LEVEL1 :
            stage.removeAllChildren();
            currentScene = new scenes.Level_1();
            console.log("Starting SINGLEPLAYER scene");
            break;
        case config.Scene.INSTRUCTIONS :
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;
    }
}