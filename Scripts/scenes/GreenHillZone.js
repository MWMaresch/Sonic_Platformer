var scenes;
(function (scenes) {
    class GreenHillZone extends scenes.Level {
        constructor() {
            super();
            //Green Hill Zone Act 1 will be 40x5
            this._act1Grid = ["                       00000            ",
                "                  00  000000            ",
                "            020 000000000000            ",
                "00123456789AB777000000000000 0000000    ",
                "                       00000000000000000"];
            this.createBackground();
            this.createGridFromTileGroups(this._act1Grid); //, objects.TileGroup.GHZ_1);
            for (var t = 1; t < 5; t++) {
                this._tileGrid[192][43 + t] = new objects.GroundTile("");
                this._tileGrid[192][43 + t].setDataToTile(objects.LinearTile.FLAT);
                this._tileGrid[192][43 + t].x = 192 * 16;
                this._tileGrid[192][43 + t].y = (43 + t) * 16;
            }
            //adding everything to a single sprite container reduces the amount of times we need to draw things to the stage, therefore drastically increasing performance
            this._player = new objects.Player("stand", 80, 940);
            this._spriteContainer.addChild(this._player);
            //creating obstacles
            this._obstacles.push(new objects.Motobug(813, 925));
            //push whatever you want into the obstacles list here and it will automatically be updated every frame
            //adding all obstacles to spriteContainer
            for (let obj of this._obstacles) {
                this._spriteContainer.addChild(obj);
            }
            stage.addChild(this._spriteContainer);
            this.createHUD();
        }
        start() {
            super.start();
        }
        update() {
            if (!gameWon) {
                //the main loop
                this._player.update();
                this._player.checkCollisionWithGrid(this._tileGrid);
                this.updateHUD();
                this.updateCamera();
                this.updateObjects();
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
        _returnBtnClick(event) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
    scenes.GreenHillZone = GreenHillZone;
})(scenes || (scenes = {}));
//# sourceMappingURL=greenhillzone.js.map