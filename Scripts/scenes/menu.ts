/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Menu extends objects.Scene {

        // Private instance variables
        private _sonicImage : createjs.Sprite;
        private _emblemImage : createjs.Sprite;
        private _waterImage : createjs.Sprite;
        private _playBtn : objects.Button;
        private _instBtn : objects.Button;        
        private _frameCounter : number = 0;
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            //all we do is display a picture and give them 2 buttons
            console.log("Menu Scene Started");

            //create water at the back
            this._waterImage = new createjs.Sprite(spriteAtlas, "titleWater");
            this._waterImage.regY = 0;
            this._waterImage.x = -100;
            this._waterImage.y = config.Screen.HEIGHT - 98;
            this._waterImage.skewX = -40;
            stage.addChild(this._waterImage);

            //create emblem behind sonic
            this._emblemImage = new createjs.Sprite(spriteAtlas, "emblem");
            this._emblemImage.regX = this._emblemImage.getBounds().width / 2;
            this._emblemImage.regY = this._emblemImage.getBounds().height / 2;
            this._emblemImage.x = config.Screen.WIDTH/2;
            this._emblemImage.y = config.Screen.HEIGHT/2 - 10;
            stage.addChild(this._emblemImage);

            //create animated sonic
            this._sonicImage = new createjs.Sprite(spriteAtlas, "title1");
            this._sonicImage.regX = 45;
            this._sonicImage.regY = 38;
            this._sonicImage.x = config.Screen.WIDTH/2;
            this._sonicImage.y = config.Screen.HEIGHT/2 - 51;
            stage.addChild(this._sonicImage);

            //create buttons
            this._playBtn = new objects.Button("StrBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 75, 82, 22);
            stage.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);

            this._instBtn = new objects.Button("InstBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 100, 176, 22);
            stage.addChild(this._instBtn);
            this._instBtn.on("click", this._instBtnClick, this);
        }

        private _toRadians(angle: number) {
            return angle * (Math.PI / 180);
        }

        public update() : void {
            this._waterImage.scaleY = 1;
            this._waterImage.skewX += 0.1 * Math.cos(this._toRadians(this._waterImage.skewX));
            this._waterImage.skewX %= 40;
            this._waterImage.scaleY = 98 / this._waterImage.getTransformedBounds().height;
            
            if (this._sonicImage.currentAnimation == "title3") {
                if (this._frameCounter < 288)
                    this._frameCounter ++;
                else
                    this._sonicImage.stop();
            }
            //TODO: scrolling backgrounds and animated water
        }

        private _playBtnClick(event : createjs.MouseEvent) {
            stage.removeAllChildren();
            scene = config.Scene.LEVEL1;
            changeScene();
        }

        private _instBtnClick(event : createjs.MouseEvent) {
            stage.removeAllChildren();
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        }
    }
}