/*
    Game over scene. This scene is shown when the player dies
*/

module scenes {
    export class Gameover extends objects.Scene {

        private _bg : createjs.Bitmap;
        private _marioButton : objects.Button;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // Run when the scene is started
        public start() : void {
            this._bg = new createjs.Bitmap(assets.getResult("BG"));
            this.addChild(this._bg);

            this._marioButton = new objects.Button("Mario", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._marioButton);
            this._marioButton.on("click", this._marioClick, this);

            stage.addChild(this);
        }

        // Run on every tick
        public update() : void {

        }

        private _marioClick(event : createjs.MouseEvent) {
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}