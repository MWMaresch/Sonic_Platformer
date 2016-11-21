/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/
var scenes;
(function (scenes) {
    class Instructions extends objects.Scene {
        // Menu Class Contructor
        constructor() {
            super();
        }
        start() {
            console.log("Instructions Scene Started");
            this._playBtn = new objects.Button("StrBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 75, 82, 22);
            stage.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);
            this._menuBG = new createjs.Bitmap(assets.getResult("InstScreen"));
            stage.addChild(this._menuBG);
        }
        update() {
        }
        _playBtnClick(event) {
            this.removeAllChildren();
            scene = config.Scene.LEVEL1;
            changeScene();
        }
    }
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map