/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Instructions extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        // Button 
        private _playBtn : objects.Button;
        private _menuBG : createjs.Bitmap;

        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
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
            this.removeAllChildren();
            scene = config.Scene.LEVEL1;
            changeScene();
        }
    }
}