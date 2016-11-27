module scenes {
    export class Level_1 extends scenes.Level {

        private _returnBtn: objects.Button;

        //Green Hill Zone Act 1 will be 40x5
        private _act1Grid: string[] =
           ["                       00000            ",
            "                  00  000000            ",
            "            0000000000000000            ",
            "0000000000000000000000000000 0000000    ",
            "                       00000000000000000"];

        constructor() {
            super();
            this.createBackground();
            this.createGridFromTileGroups(this._act1Grid, objects.TileGroup.GHZ_1);

            //adding everything to a single sprite container reduces the amount of times we need to draw things to the stage, therefore drastically increasing performance
            this._player = new objects.Player("stand", 90, 90);
            this._spriteContainer.addChild(this._player);
            stage.addChild(this._spriteContainer);

            this.createHUD();
        }

        public start(): void {
            super.start();

        }

        public update(): void {
            if (!gameWon) {
                //the main loop
                this._player.update();
                this._player.checkCollisionWithGrid(this._tileGrid);
                this.updateHUD(); 
                this.updateCamera();
            }
            else if (!this._alreadyWon) {
                //we only want this to execute once when sonic wins, so we do a check first
                this._timeText.text = "YOU WON IN " + Math.floor((this._timer / 1000) / 60).toString() + ":" + Math.floor(((this._timer / 1000) % 60)) + "\n PRESS ESC TO \nPAUSE AND EXIT";
                this._timeText.scaleX = 1.5;
                this._timeText.scaleY = 1.5;
                this._timeText.regX = this._timeText.getBounds().width / 2;
                this._timeText.regY = this._timeText.getBounds().height / 2;
                this._timeText.x = config.Screen.WIDTH / 2;
                this._timeText.y = config.Screen.HEIGHT / 2;
            }
        }

        private _returnBtnClick(event: createjs.MouseEvent) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}