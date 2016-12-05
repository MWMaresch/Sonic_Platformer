var scenes;
(function (scenes) {
    class GreenHillZone extends scenes.Level {
        constructor() {
            super();
            //an array of 2d arrays
            this._act1Grids = new Array();
            this._act1Grids.push([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 28, 28, 28, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 14, 0, 0, 27, 19, 13, 13, 29, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 14, 16, 18, 8, 20, 15, 1, 24, 19, 13, 29, 12, 30, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17, 19, 13, 21, 22, 23, 26, 12, 12, 30, 13, 29, 31, 0, 28, 9, 10, 1, 6, 2, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 30, 15, 7, 1, 1, 1, 1, 1, 13, 15, 1, 1, 1, 1]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
            this.createBackground();
            this.createGridsFromTileGroups(this._act1Grids); //, objects.TileGroup.GHZ_1);
            for (var t = 1; t < 5; t++) {
                this._tileGrids[0][192][43 + t] = new objects.GroundTile("");
                this._tileGrids[0][192][43 + t].setDataToTile(objects.LinearTile.FLAT);
                this._tileGrids[0][192][43 + t].x = 192 * 16;
                this._tileGrids[0][192][43 + t].y = (43 + t) * 16;
            }
            //this._tileGrids[0][176][48] = null;
            //push whatever you want into the objects list here and it will automatically be updated every frame
            //enemies
            this._objects.push(new objects.Motobug(813, 925));
            this._objects.push(new objects.Crabmeat(200, 925));
            this._objects.push(new objects.Rock(2509, 765));
            this._objects.push(new objects.Rock(2967, 766));
            this._objects.push(new objects.Rock(4000, 513));
            this._objects.push(new objects.Rock(4056, 626));
            this._objects.push(new objects.Rock(7544, 1142));
            this._objects.push(new objects.Rock(8400, 880));
            //pathswitchers for foreground and background layers
            this._objects.push(new objects.PathSwitcher(5488, 528, 16, 16, 1));
            this._objects.push(new objects.PathSwitcher(5504, 528, 16, 16, 0));
            this._objects.push(new objects.PathSwitcher(5376, 512, 32, 192, 0));
            this._objects.push(new objects.PathSwitcher(5600, 512, 32, 192, 1));
            this._objects.push(new objects.PathSwitcher(5632, 512, 32, 192, 0));
            //adding all obstacles to spriteContainer
            for (let obj of this._objects)
                this._spriteContainer.addChild(obj);
            //adding everything to a single sprite container reduces the amount of times we need to draw things to the stage, therefore drastically increasing performance
            this._player = new objects.Player("stand", 80, 940);
            //this._player = new objects.Player("stand", 5800, 588);
            this._spriteContainer.addChild(this._player);
            stage.addChild(this._spriteContainer);
            this.createHUD();
            //this._spriteContainer.setChildIndex(this._player, 0);
            console.log(this._spriteContainer.numChildren);
        }
        start() {
            super.start();
        }
        update() {
            if (!gameWon) {
                //the main loop
                this._player.update();
                this.updateHUD();
                this.updateCamera();
                this.updateObjects();
                this._player.checkCollisionWithGrid(this._tileGrids[this._player.curLayer]);
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