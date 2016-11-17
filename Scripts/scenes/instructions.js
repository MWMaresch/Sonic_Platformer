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
            console.log("Menu Scene Started");
            this._returnBtn = new objects.Button("ExitBtn", 200, 465, 177, 84);
            this.addChild(this._returnBtn);
            this._returnBtn.on("click", this._returnBtnClick, this);
            this._menuBG = new createjs.Bitmap(assets.getResult("Instructions"));
            this.addChildAt(this._menuBG, 0);
            // Add menu scene to global stage container
            stage.addChild(this);
        }
        update() {
        }
        _returnBtnClick(event) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map