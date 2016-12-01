var scenes;
(function (scenes) {
    class Level extends objects.Scene {
        constructor() {
            super(...arguments);
            this._maxCamSpeed = 16;
            this._leftCamBorder = 144;
            this._rightCamBorder = 160;
            this._topCamBorder = 64;
            this._groundCamBorder = 96;
            this._bottomCamBorder = 128;
            //other variables
            this._alreadyWon = false;
            this._tileGrid = [];
        }
        start() {
            this._tileSpriteContainer = new createjs.SpriteContainer(spriteAtlas);
            this._spriteContainer = new createjs.SpriteContainer(spriteAtlas);
            this._hudContainer = new createjs.SpriteContainer(fontSpriteSheet);
            this._obstacles = [];
            this._timer = 0;
            canPause = true;
            gameWon = false;
        }
        update() {
            if (!gameWon) {
                //the main loop
                this._player.update();
                this._player.checkCollisionWithGrid(this._tileGrid);
                this.updateHUD();
                this.updateCameraAndTiles();
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
        setInitialTilesVisible() {
            for (var x = 0; x < 21; x++) {
                for (var y = 0; y < this._tileGrid[0].length; y++) {
                    if (this._tileGrid[x][y] != null)
                        this._tileGrid[x][y].visible = true;
                }
            }
        }
        updateObjects() {
            if (this._player.isDead) {
                for (let enemy of this._obstacles) {
                    if (!enemy.isDead) {
                        enemy.update();
                        enemy.checkCollisionWithGrid(this._tileGrid);
                    }
                }
                this.checkGameOver();
            }
            else {
                for (let enemy of this._obstacles) {
                    if (Math.abs(enemy.x - this._player.x) < 450 && !enemy.isDead) {
                        enemy.update();
                        enemy.checkCollisionWithGrid(this._tileGrid);
                        if (enemy.checkCollisionWithPlayer(this._player))
                            this._spriteContainer.removeChild(enemy);
                    }
                }
            }
        }
        checkGameOver() {
            //if sonic has fallen offscreen, we know to reset everything
            if (this._camDifU > 300) {
                stage.removeAllChildren();
                changeScene();
            }
        }
        updateBackground() {
        }
        createBackground() {
            this._bg1 = new createjs.Sprite(spriteAtlas, "nightsky");
            this._bg2 = new createjs.Sprite(spriteAtlas, "nightsky");
            this._bgWidth = this._bg1.getBounds().width - 1;
            this._bg2.x = this._bgWidth;
            this._spriteContainer.addChild(this._bg1);
            this._spriteContainer.addChild(this._bg2);
        }
        updateHUD() {
            this._timer += createjs.Ticker.interval;
            this._timeText.text = "TIME  " + Math.floor((this._timer / 1000) / 60).toString() + ":" + Math.floor(((this._timer / 1000) % 60));
            this._ringsText.text = "RINGS  " + this._player.numRings;
        }
        createHUD() {
            this._timeText = new createjs.BitmapText("TIME 0:00", fontSpriteSheet);
            this._ringsText = new createjs.BitmapText("RINGS", fontSpriteSheet); //rings are not implemented yet
            this._timeText.letterSpacing = 1;
            this._ringsText.letterSpacing = 1;
            this._timeText.x = 18;
            this._timeText.y = 28;
            this._ringsText.x = 18;
            this._ringsText.y = 45;
            this._hudContainer.addChild(this._timeText);
            //this._hudContainer.addChild(this._ringsText);
            stage.addChild(this._hudContainer);
        }
        createGridFromTiles(stringGrid) {
            this._tileGrid = [];
            //go through the level string array and add all tiles from it to our sprite container
            for (var x = 0; x < stringGrid[0].length; x++) {
                this._tileGrid[x] = [];
                for (var y = 0; y < stringGrid.length; y++) {
                    if (stringGrid[y].charAt(x) == ' ')
                        this._tileGrid[x][y] = null;
                    else if (stringGrid[y].charAt(x) == 'E')
                        this._tileGrid[x][y] = new objects.Emerald("emerald", 0, 0, 0, 0);
                    else if (stringGrid[y].charAt(x) == '.')
                        this._tileGrid[x][y] = new objects.GroundTile("block", 0, 180, 90, 270, true);
                    else if (stringGrid[y].charAt(x) == '/')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp45", 45, 180, 45, 270, true);
                    else if (stringGrid[y].charAt(x) == ',')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp45", 44, 180, 44, 270, true);
                    else if (stringGrid[y].charAt(x) == '1')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp315", 315, 180, 90, 315, true);
                    else if (stringGrid[y].charAt(x) == '`')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp315", 314, 180, 90, 314, true);
                    else if (stringGrid[y].charAt(x) == ']')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp135", 0, 135, 135, 270, true);
                    else if (stringGrid[y].charAt(x) == '[')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp225", 0, 225, 90, 225, true);
                    else if (stringGrid[y].charAt(x) == '(')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp225", 0, 224, 90, 224, true);
                    else if (stringGrid[y].charAt(x) == ')')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp135", 0, 134, 134, 270, true);
                    if (this._tileGrid[x][y] != null) {
                        this._tileGrid[x][y].x = x * 16;
                        this._tileGrid[x][y].y = y * 16;
                        this._tileSpriteContainer.addChild(this._tileGrid[x][y]);
                        this._tileGrid[x][y].visible = false;
                    }
                }
            }
            this._camRightBoundary = this._tileGrid.length * -16 + config.Screen.WIDTH;
            this._camBottomBoundary = this._tileGrid[0].length * -16 + config.Screen.HEIGHT;
            this._spriteContainer.addChild(this._tileSpriteContainer);
            //increasing performance slightly more by disabling ticking for the tiles, which shouldn't move anyway
            this._tileSpriteContainer.tickEnabled = false;
            this._tileSpriteContainer.tickChildren = false;
            this._spriteContainer.snapToPixel = true;
        }
        createGridFromTileGroups(stringGrid) {
            this._tileGrid = new Array(stringGrid[0].length * 16);
            var tileGroup = new Array(stringGrid[0].length * 16);
            for (var x = 0; x < stringGrid[0].length * 16; x++) {
                this._tileGrid[x] = new Array(stringGrid.length * 16);
            }
            for (var groupX = 0; groupX < stringGrid[0].length; groupX++) {
                for (var groupY = 0; groupY < stringGrid.length; groupY++) {
                    if (stringGrid[groupY].charAt(groupX) == ' ') {
                        tileGroup = objects.TileGroup.EMPTY;
                    }
                    else if (stringGrid[groupY].charAt(groupX) == '0') {
                        tileGroup = objects.TileGroup.GHZ_1;
                    }
                    else if (stringGrid[groupY].charAt(groupX) == '1') {
                        tileGroup = objects.TileGroup.GHZ_2;
                    }
                    for (var tileX = 0; tileX < tileGroup.length; tileX++) {
                        for (var tileY = 0; tileY < tileGroup[0].length; tileY++) {
                            if (tileGroup[tileX][tileY] != null) {
                                //if (tileGroup[tileX][tileY] instanceof createjs.Sprite ) {
                                this._tileGrid[groupX * 16 + tileX][groupY * 16 + tileY] = new objects.GroundTile(tileGroup[tileX][tileY].currentAnimation, 0, 0, 0, 0, false);
                                this._tileGrid[groupX * 16 + tileX][groupY * 16 + tileY].setDataToTile(tileGroup[tileX][tileY]);
                                this._tileGrid[groupX * 16 + tileX][groupY * 16 + tileY].x = (groupX * 16 + tileX) * 16;
                                this._tileGrid[groupX * 16 + tileX][groupY * 16 + tileY].y = (groupY * 16 + tileY) * 16;
                                if (this._tileGrid[groupX * 16 + tileX][groupY * 16 + tileY].visible)
                                    this._tileSpriteContainer.addChild(this._tileGrid[groupX * 16 + tileX][groupY * 16 + tileY]);
                            }
                            else if (groupX * 16 + tileX == 0 || groupX * 16 + tileX == this._tileGrid.length - 1) {
                                this._tileGrid[groupX * 16 + tileX][groupY * 16 + tileY] = new objects.GroundTile("block", 0, 0, 0, 0, false);
                                this._tileGrid[groupX * 16 + tileX][groupY * 16 + tileY].setDataToTile(objects.LinearTile.FLAT);
                                this._tileGrid[groupX * 16 + tileX][groupY * 16 + tileY].x = (groupX * 16 + tileX) * 16;
                                this._tileGrid[groupX * 16 + tileX][groupY * 16 + tileY].y = (groupY * 16 + tileY) * 16;
                                objects.LinearTile.resetTiles();
                            }
                        }
                    }
                }
            }
            this._camRightBoundary = this._tileGrid.length * -16 + config.Screen.WIDTH;
            this._camBottomBoundary = this._tileGrid[0].length * -16 + config.Screen.HEIGHT;
            this._spriteContainer.addChild(this._tileSpriteContainer);
            //increasing performance slightly more by disabling ticking for the tiles, which shouldn't move anyway
            this._tileSpriteContainer.tickEnabled = false;
            this._tileSpriteContainer.tickChildren = false;
            this._spriteContainer.snapToPixel = true;
        }
        updateCamera() {
            this._camDifR = this._spriteContainer.x - (this._rightCamBorder - this._player.x);
            this._camDifL = this._spriteContainer.x - (this._leftCamBorder - this._player.x);
            //horizontal camera movement
            if (this._camDifR > 0) {
                //move the 'camera' to sonic, unless he's faster than the max cam speed
                this._spriteContainer.x -= Math.min(this._camDifR, this._maxCamSpeed);
            }
            else if (this._camDifL < 0) {
                //same as above, only for moving left
                //this had to be separated because of the small window sonic has to move in the middle of the screen
                this._spriteContainer.x -= Math.max(this._camDifL, -this._maxCamSpeed);
            }
            //vertical camera movement
            //camera is slightly different when sonic is grounded or in the air
            if (this._player.isGrounded) {
                if (this._player.velY <= this._maxCamSpeed - 10) {
                    this._camDifU = this._spriteContainer.y - (-this._player.y + this._groundCamBorder);
                    if (Math.abs(this._camDifU) < this._maxCamSpeed - 10)
                        this._spriteContainer.y -= this._camDifU;
                    else
                        this._spriteContainer.y -= (this._maxCamSpeed - 10) * Math.sign(this._camDifU);
                }
                else {
                    this._camDifU = this._spriteContainer.y - (-this._player.y + this._groundCamBorder);
                    if (Math.abs(this._camDifU) < this._maxCamSpeed)
                        this._spriteContainer.y -= this._camDifU;
                    else
                        this._spriteContainer.y -= this._maxCamSpeed * Math.sign(this._camDifU);
                }
            }
            else {
                this._camDifU = this._spriteContainer.y - (-this._player.y + this._topCamBorder);
                this._camDifD = this._spriteContainer.y - (-this._player.y + this._bottomCamBorder);
                if (this._camDifU < 0)
                    this._spriteContainer.y -= Math.min(this._camDifU, this._maxCamSpeed);
                else if (this._camDifD > 0)
                    this._spriteContainer.y -= Math.max(this._camDifD, -this._maxCamSpeed);
            }
            //side wall boundarys
            if (this._spriteContainer.x > 0)
                this._spriteContainer.x = 0;
            else if (this._spriteContainer.x < this._camRightBoundary)
                this._spriteContainer.x = this._camRightBoundary;
            //upper and lower boundarys
            if (this._spriteContainer.y > 0)
                this._spriteContainer.y = 0;
            else if (this._spriteContainer.y < this._camBottomBoundary)
                this._spriteContainer.y = this._camBottomBoundary;
            //move the background(s) in relation to everything else
            //when the background is made to scroll vertically as well, this code will be moved to its own method
            this._bg1.x = (Math.floor(-this._spriteContainer.x / this._bgWidth) * this._bgWidth);
            this._bg2.x = this._bg1.x + this._bgWidth;
        }
        updateCameraAndTiles() {
            this._camDifR = this._spriteContainer.x - (this._rightCamBorder - this._player.x);
            this._camDifL = this._spriteContainer.x - (this._leftCamBorder - this._player.x);
            //horizontal camera movement
            if (this._camDifR > 0) {
                //move the 'camera' to sonic, unless he's faster than the max cam speed
                this._spriteContainer.x -= Math.min(this._camDifR, this._maxCamSpeed);
                for (var y = 0; y < this._tileGrid[0].length; y++) {
                    //make offscreen tiles invisible, and onscreen tiles visible
                    //older computers can lag if we don't do this
                    var screenTilePos = Math.floor((this._spriteContainer.x * -1) / 16);
                    if (config.Screen.WIDTH / 16 + screenTilePos < this._tileGrid.length && this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos)][y] != null)
                        this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos)][y].visible = true;
                    if (screenTilePos - 2 >= 0 && this._tileGrid[screenTilePos - 2][y] != null)
                        this._tileGrid[screenTilePos - 2][y].visible = false;
                }
            }
            else if (this._camDifL < 0) {
                //same as above, only for moving left
                //this had to be separated because of the small window sonic has to move in the middle of the screen
                this._spriteContainer.x -= Math.max(this._camDifL, -this._maxCamSpeed);
                for (var y = 0; y < this._tileGrid[0].length; y++) {
                    var screenTilePos = Math.floor((this._spriteContainer.x * -1) / 16);
                    if (screenTilePos >= 0 && this._tileGrid[screenTilePos][y] != null)
                        this._tileGrid[screenTilePos][y].visible = true;
                    if (config.Screen.WIDTH / 16 + screenTilePos + 1 < this._tileGrid.length && this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos + 1)][y] != null)
                        this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos + 1)][y].visible = false;
                }
            }
            //vertical camera movement
            //camera is slightly different when sonic is grounded or in the air
            if (this._player.isGrounded) {
                if (this._player.velY <= this._maxCamSpeed - 10) {
                    this._camDifU = this._spriteContainer.y - (-this._player.y + this._groundCamBorder);
                    if (Math.abs(this._camDifU) < this._maxCamSpeed - 10)
                        this._spriteContainer.y -= this._camDifU;
                    else
                        this._spriteContainer.y -= (this._maxCamSpeed - 10) * Math.sign(this._camDifU);
                }
                else {
                    this._camDifU = this._spriteContainer.y - (-this._player.y + this._groundCamBorder);
                    if (Math.abs(this._camDifU) < this._maxCamSpeed)
                        this._spriteContainer.y -= this._camDifU;
                    else
                        this._spriteContainer.y -= this._maxCamSpeed * Math.sign(this._camDifU);
                }
            }
            else {
                this._camDifU = this._spriteContainer.y - (-this._player.y + this._topCamBorder);
                this._camDifD = this._spriteContainer.y - (-this._player.y + this._bottomCamBorder);
                if (this._camDifU < 0)
                    this._spriteContainer.y -= Math.min(this._camDifU, this._maxCamSpeed);
                else if (this._camDifD > 0)
                    this._spriteContainer.y -= Math.max(this._camDifD, -this._maxCamSpeed);
            }
            //side wall boundarys
            if (this._spriteContainer.x > 0)
                this._spriteContainer.x = 0;
            else if (this._spriteContainer.x < this._camRightBoundary)
                this._spriteContainer.x = this._camRightBoundary;
            //upper and lower boundarys
            if (this._spriteContainer.y > 0)
                this._spriteContainer.y = 0;
            else if (this._spriteContainer.y < this._camBottomBoundary)
                this._spriteContainer.y = this._camBottomBoundary;
            //move the background(s) in relation to everything else
            this._bg1.x = (Math.floor(-this._spriteContainer.x / this._bgWidth) * this._bgWidth);
            this._bg2.x = this._bg1.x + this._bgWidth;
        }
    }
    scenes.Level = Level;
})(scenes || (scenes = {}));
//# sourceMappingURL=level.js.map