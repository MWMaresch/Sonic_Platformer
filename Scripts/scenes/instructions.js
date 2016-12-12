var scenes;
(function (scenes) {
    class Instructions extends objects.Scene {
        constructor() {
            super();
        }
        start() {
            //all we do is display a picture and give them a button
            console.log("Instructions Scene Started");
            this._backBtn = new objects.Button("ReturnBtn", config.Screen.CENTER_X - 85, config.Screen.CENTER_Y - 70, 82, 22);
            stage.addChild(this._backBtn);
            this._backBtn.on("click", this._backBtnClick, this);
            this._menuBG = new createjs.Bitmap(assets.getResult("InstScreen"));
            stage.addChild(this._menuBG);
        }
        update() {
        }
        _backBtnClick(event) {
            stage.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map