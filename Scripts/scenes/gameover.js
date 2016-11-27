/*
    Game over scene. This scene is shown when the player dies
*/
var scenes;
(function (scenes) {
    class Gameover extends objects.Scene {
        // CONSTRUCTOR
        constructor() {
            super();
        }
        // Run when the scene is started
        start() {
            this._bg = new createjs.Bitmap(assets.getResult("BG"));
            this.addChild(this._bg);
            this._marioButton = new objects.Button("Mario", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._marioButton);
            this._marioButton.on("click", this._marioClick, this);
            stage.addChild(this);
        }
        // Run on every tick
        update() {
        }
        _marioClick(event) {
            scene = config.Scene.MENU;
            changeScene();
        }
    }
    scenes.Gameover = Gameover;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map