/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Menu extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        // Button 
        private _img : createjs.Sprite;
        private _playBtn : objects.Button;
        private _instBtn : objects.Button;        
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            console.log("Menu Scene Started");
            this._img = new createjs.Sprite(spriteAtlas, "title");
            this._img.regX = this._img.getBounds().width/2;
            this._img.regY = this._img.getBounds().height/2;
            this._img.x = config.Screen.WIDTH/2;
            this._img.y = config.Screen.HEIGHT/2 - 20;
            stage.addChild(this._img);

            this._playBtn = new objects.Button("StrBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 75, 82, 22);
            stage.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);

            this._instBtn = new objects.Button("InstBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 100, 176, 22);
            stage.addChild(this._instBtn);
            this._instBtn.on("click", this._instBtnClick, this);

            // Add menu scene to global stage container
            //stage.addChild(this);
        }

        public update() : void {

        }

        private _playBtnClick(event : createjs.MouseEvent) {
            this.removeAllChildren();
            scene = config.Scene.LEVEL1;
            changeScene();
        }

        private _instBtnClick(event : createjs.MouseEvent) {
            this.removeAllChildren();
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        }
    }
}