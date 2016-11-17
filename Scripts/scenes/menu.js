/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/
var scenes;
(function (scenes) {
    class Menu extends objects.Scene {
        // Menu Class Contructor
        constructor() {
            super();
        }
        start() {
            console.log("Menu Scene Started");
            this._1pBtn = new objects.Button("TimAtBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 140, 300, 68);
            this.addChild(this._1pBtn);
            this._1pBtn.on("click", this._playBtnClick, this);
            this._1p1lBtn = new objects.Button("LapBtn", config.Screen.CENTER_X + 300, config.Screen.CENTER_Y + 140, 300, 68);
            this.addChild(this._1p1lBtn);
            this._1p1lBtn.on("click", this._play1lBtnClick, this);
            this._instBtn = new objects.Button("InstBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 300, 300, 68);
            this.addChild(this._instBtn);
            this._instBtn.on("click", this._instBtnClick, this);
            this._menuBG = new createjs.Bitmap(assets.getResult("Menu_BG"));
            // this.addChild(this._menuBG);
            this.addChildAt(this._menuBG, 0);
            // Add menu scene to global stage container
            stage.addChild(this);
        }
        update() {
        }
        _playBtnClick(event) {
            numLaps = 3;
            this.removeAllChildren();
            scene = config.Scene.LEVEL1;
            changeScene();
        }
        _play1lBtnClick(event) {
            numLaps = 1;
            this.removeAllChildren();
            scene = config.Scene.LEVEL1;
            changeScene();
        }
        _instBtnClick(event) {
            this.removeAllChildren();
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        }
    }
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map