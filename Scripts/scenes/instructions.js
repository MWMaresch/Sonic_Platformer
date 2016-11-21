var scenes;
(function (scenes) {
    class Instructions extends objects.Scene {
        constructor() {
            super();
        }
        start() {
            //all we do is display a picture and give them a button
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
            stage.removeAllChildren();
            scene = config.Scene.LEVEL1;
            changeScene();
        }
    }
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map