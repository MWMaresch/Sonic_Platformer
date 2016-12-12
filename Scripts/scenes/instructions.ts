module scenes {
    export class Instructions extends objects.Scene {

        // Private instance variables
        private _backBtn : objects.Button;
        private _menuBG : createjs.Bitmap;

        constructor() {
            super();
        }

        public start() : void {
            //all we do is display a picture and give them a button
            console.log("Instructions Scene Started");

            this._backBtn = new objects.Button("ReturnBtn", config.Screen.CENTER_X - 85, config.Screen.CENTER_Y - 70, 82, 22);
            stage.addChild(this._backBtn);
            this._backBtn.on("click", this._backBtnClick, this);

            this._menuBG = new createjs.Bitmap(assets.getResult("InstScreen"));
            stage.addChild(this._menuBG);
        }

        public update() : void {

        }

        private _backBtnClick(event : createjs.MouseEvent) {
            stage.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}