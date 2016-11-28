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
        private _waterImage2 : createjs.Sprite;
        private _waterHeight : number;
        private _skyImage : createjs.Sprite;
        private _wallImage : createjs.Sprite;
        private _bgContainer : createjs.SpriteContainer;
        private _sonicContainer : createjs.SpriteContainer;
        private _playBtn : objects.Button;
        private _instBtn : objects.Button;        
        private _sonicAnimFrameCounter : number = 0;
        private _scrollFrameCounter : number;
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            //all we do is display a picture and give them 2 buttons
            console.log("Menu Scene Started");
            this._bgContainer = new createjs.SpriteContainer(spriteAtlas);
            this._sonicContainer = new createjs.SpriteContainer(spriteAtlas);

            //create sky at the back
            this._skyImage = new createjs.Sprite(spriteAtlas, "titleSky");
            this._bgContainer.addChild(this._skyImage);

            //create water at the back
            this._waterImage = new createjs.Sprite(spriteAtlas, "titleWater");
            this._waterImage.regY = 0;
            this._waterImage.x = -150;
            this._waterImage.y = config.Screen.HEIGHT - 104;
            this._waterImage.skewX = -55;
            this._waterHeight = this._waterImage.getBounds().height;
            this._waterImage.scaleY = this._waterHeight / this._waterImage.getTransformedBounds().height;
            this._waterImage2 = new createjs.Sprite(spriteAtlas, "titleWater");
            this._waterImage2.regY = 0;
            this._waterImage2.x = this._waterImage.x + this._waterImage.getBounds().width - 1;
            this._waterImage2.y = config.Screen.HEIGHT - 104;
            this._waterImage2.skewX = -40;
            this._waterImage2.scaleY = this._waterHeight / this._waterImage2.getTransformedBounds().height;
            this._bgContainer.addChild(this._waterImage2);
            this._bgContainer.addChild(this._waterImage);
            stage.addChild(this._bgContainer);

            //create wall at the back
            this._wallImage = new createjs.Sprite(spriteAtlas, "titleWall");
            this._wallImage.y = 99;
            this._bgContainer.addChild(this._wallImage);

            //create emblem behind sonic
            this._emblemImage = new createjs.Sprite(spriteAtlas, "emblem");
            this._emblemImage.regX = this._emblemImage.getBounds().width / 2;
            this._emblemImage.regY = 0;
            this._emblemImage.x = config.Screen.WIDTH/2;
            this._emblemImage.y = 35;
            this._sonicContainer.addChild(this._emblemImage);
            //create animated sonic
            this._sonicImage = new createjs.Sprite(spriteAtlas, "title1");
            this._sonicImage.regX = 45;
            this._sonicImage.x = config.Screen.WIDTH/2;
            this._sonicImage.y = this._emblemImage.y - 7;
            this._sonicContainer.addChild(this._sonicImage);
            stage.addChild(this._sonicContainer);

            //create buttons
            this._playBtn = new objects.Button("StrBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 75, 82, 22);
            stage.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);
            this._instBtn = new objects.Button("InstBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 100, 176, 22);
            stage.addChild(this._instBtn);
            this._instBtn.on("click", this._instBtnClick, this);

            this._scrollFrameCounter = 8;
        }


        public update() : void {
            if (this._sonicImage.currentAnimation == "title2")
                this._scrollFrameCounter --;
            if (this._scrollFrameCounter < 0 && this._bgContainer.x >= -593 + 320) {
                this._updateWater();
                this._wallImage.x -= 0.25;
                this._bgContainer.x-=0.75;
            }
            this._checkSonicAnimationEnd();
        }

        private _updateWater() {
            this._waterImage.scaleY = 1;
            this._waterImage.skewX += 0.36 * Math.cos(toRadians(this._waterImage.skewX));
            this._waterImage.skewX %= 55;//if the water's skew is greater than 55 (or < -55), the speed variance is noticeable
            this._waterImage.scaleY = this._waterHeight / this._waterImage.getTransformedBounds().height;
            this._waterImage2.skewX = this._waterImage.skewX;
            this._waterImage2.scaleY = this._waterImage.scaleY;
            this._waterImage.x -= 0.25;
            this._waterImage2.x -= 0.25;
        }

        private _checkSonicAnimationEnd() {
            if (this._sonicImage.currentAnimation == "title3") {
                if (this._sonicAnimFrameCounter < 288)
                    this._sonicAnimFrameCounter ++;
                else
                    this._sonicImage.stop();
            }
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