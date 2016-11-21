module scenes {
    export class Instructions extends objects.Scene {

        // Private instance variables
        private _playBtn : objects.Button;
        private _menuBG : createjs.Bitmap;

        constructor() {
            super();
        }

        public start() : void {
            //all we do is display a picture and give them a button
            console.log("Instructions Scene Started");

            this._playBtn = new objects.Button("StrBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 75, 82, 22);
            stage.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);

            this._menuBG = new createjs.Bitmap(assets.getResult("InstScreen"));
            stage.addChild(this._menuBG);
        }

        public update() : void {

        }

        private _playBtnClick(event : createjs.MouseEvent) {
            stage.removeAllChildren();
            scene = config.Scene.LEVEL1;
            changeScene();
        }
    }
}