var scenes;
(function (scenes) {
    class Level_1 extends objects.Scene {
        constructor() {
            super();
            this._maxCamSpeed = 16;
            this._leftCamBorder = 144;
            this._rightCamBorder = 160;
            this._topCamBorder = 64;
            this._groundCamBorder = 96;
            this._bottomCamBorder = 128;
            this._tileGrid = [];
            this._stringGrid = ["...........................................................................................................................",
                "..(                                        ....(           ]......                                                        .",
                ".[                                         ...[             ].....                                                        .",
                ".                                          ..[               ]....                                                        .",
                ".                  ,.....1                 ..                 )...                                                        .",
                ".                 /.......`                ..`                 ...    ..           .....        .....        ..       .....",
                ".                 .........                ...1                ...    ..   ...                                            .",
                ".`                .........                ..............      ...    ..                                                  .",
                "..1               ).......[                                    .........                         ,.                       .",
                "...1               ].....(                                     .........                        ,.                        .",
                "....1                                                         /............                    /.                         .",
                ".....1                                                       ,..........                      /.                          .",
                "......1                                                     ,...........                     ,.                           .",
                ".......1                    ,..1                           ,............                    ,..         ,.......1         .",
                "...................................  ..........................................  ..........................................",
                "...................................                                              ..........................................",
                "...................................                                              ..........................................",
                "..........................................................................................................................."]; //this is actually the level itself.
            //it can be any size, but all rows must be equal, and all columns must be equal
            /*
               quadrant 1: ground and left lower slope
                   315 up to 44
                   -45
   
               quadrant 2: right lower slope and right wall
                   45 up to 134
   
               quadrant 3: right upper slope and ceiling
                   135 up to 224
   
               quadrant 4: left upper slope and left wall
                   225 up to 314
            */
            this._SCALE = config.Screen.REAL_WIDTH / config.Screen.WIDTH;
            this._tileSpriteContainer = new createjs.SpriteContainer(spriteAtlas);
            this._spriteContainer = new createjs.SpriteContainer(spriteAtlas);
            this._hudContainer = new createjs.SpriteContainer(fontSpriteSheet);
            this._bg1 = new createjs.Sprite(spriteAtlas, "nightsky");
            this._bg2 = new createjs.Sprite(spriteAtlas, "nightsky");
            this._bgWidth = this._bg1.getBounds().width - 1;
            this._bg2.x = this._bgWidth;
            this._spriteContainer.addChild(this._bg1);
            this._spriteContainer.addChild(this._bg2);
            this._player = new objects.Player("stand", 90, 90);
            //this._motobug = new objects.Enemy("motobug", 90, 90);
            //this._spriteContainer.addChild(this._motobug);
            this._spriteContainer.addChild(this._player);
            for (var x = 0; x < this._stringGrid[0].length; x++) {
                this._tileGrid[x] = [];
                for (var y = 0; y < this._stringGrid.length; y++) {
                    if (this._stringGrid[y].charAt(x) == ' ') {
                        this._tileGrid[x][y] = null;
                    }
                    else if (this._stringGrid[y].charAt(x) == 'x')
                        this._tileGrid[x][y] = new objects.Warp("portal", 0);
                    else if (this._stringGrid[y].charAt(x) == 'y')
                        this._tileGrid[x][y] = new objects.Tile("portal", 0, 0, 0, 0);
                    else if (this._stringGrid[y].charAt(x) == 'E')
                        this._tileGrid[x][y] = new objects.Tile("portal", 0, 0, 0, 0);
                    else if (this._stringGrid[y].charAt(x) == '.')
                        this._tileGrid[x][y] = new objects.GroundTile("block", 0, 180, 90, 270);
                    else if (this._stringGrid[y].charAt(x) == '/')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp45", 45, 180, 45, 270); //correct
                    else if (this._stringGrid[y].charAt(x) == ',')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp45", 44, 180, 44, 270); //correct
                    else if (this._stringGrid[y].charAt(x) == '”')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp23", 10, 180, 23, 270);
                    else if (this._stringGrid[y].charAt(x) == '1')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp315", 315, 180, 90, 315); //correct
                    else if (this._stringGrid[y].charAt(x) == '`')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp315", 314, 180, 90, 314); //correct
                    else if (this._stringGrid[y].charAt(x) == ']')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp135", 0, 135, 135, 270); //correct
                    else if (this._stringGrid[y].charAt(x) == '[')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp225", 0, 225, 90, 225); //correct
                    else if (this._stringGrid[y].charAt(x) == '(')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp225", 0, 224, 90, 224); //correct
                    else if (this._stringGrid[y].charAt(x) == ')')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp135", 0, 134, 134, 270); //correct
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
            for (var x = 0; x < 21; x++) {
                for (var y = 0; y < this._tileGrid[0].length; y++) {
                    if (this._tileGrid[x][y] != null)
                        this._tileGrid[x][y].visible = true;
                }
            }
            this._spriteContainer.addChild(this._tileSpriteContainer);
            stage.addChild(this._spriteContainer);
            this._timeText = new createjs.BitmapText("TIME 0:00", fontSpriteSheet);
            this._ringsText = new createjs.BitmapText("RINGS", fontSpriteSheet);
            this._timeText.letterSpacing = 1;
            this._ringsText.letterSpacing = 1;
            this._timeText.x = 18;
            this._timeText.y = 28;
            this._ringsText.x = 18;
            this._ringsText.y = 45;
            this._hudContainer.addChild(this._timeText);
            //this._hudContainer.addChild(this._ringsText);
            stage.addChild(this._hudContainer);
            console.log("tilegrid created");
            this._tileSpriteContainer.tickEnabled = false;
            this._tileSpriteContainer.tickChildren = false;
            this._spriteContainer.snapToPixel = true;
            stage.snapToPixelEnabled = true;
        }
        _convertAngle(hex_angle) {
            return (256 - hex_angle) * 1.40625;
        }
        start() {
            this._timer = 0;
            canPause = true;
        }
        update() {
            //console.log(stage.x);
            //console.log(Math.floor((config.Screen.WIDTH + (stage.x * -1)) / 16));
            this._timer += createjs.Ticker.interval;
            this._timeText.text = "TIME  " + Math.floor((this._timer / 1000) / 60).toString() + ":" + Math.floor(((this._timer / 1000) % 60));
            this._ringsText.text = "RINGS  " + this._player.numRings();
            this._player.update();
            this._player.checkCollisions(this._tileGrid);
            //console.log(this._player.x);
            this._updateCameraPosition();
            //console.log(stage.x);
        }
        _updateCameraPosition() {
            this._camDifR = this._spriteContainer.x - (this._rightCamBorder - this._player.x);
            this._camDifL = this._spriteContainer.x - (this._leftCamBorder - this._player.x);
            if (this._camDifR > 0) {
                this._spriteContainer.x -= Math.min(this._camDifR, this._maxCamSpeed);
                //make offscreen things invisible, and onscreen things visible
                for (var y = 0; y < this._tileGrid[0].length; y++) {
                    var screenTilePos = Math.floor((this._spriteContainer.x * -1) / 16);
                    if (config.Screen.WIDTH / 16 + screenTilePos < this._tileGrid.length && this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos)][y] != null)
                        this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos)][y].visible = true;
                    if (screenTilePos - 2 >= 0 && this._tileGrid[screenTilePos - 2][y] != null)
                        this._tileGrid[screenTilePos - 2][y].visible = false;
                }
            }
            else if (this._camDifL < 0) {
                this._spriteContainer.x -= Math.max(this._camDifL, -this._maxCamSpeed);
                //make offscreen things invisible, and onscreen things visible
                for (var y = 0; y < this._tileGrid[0].length; y++) {
                    var screenTilePos = Math.floor((this._spriteContainer.x * -1) / 16);
                    if (screenTilePos >= 0 && this._tileGrid[screenTilePos][y] != null)
                        this._tileGrid[screenTilePos][y].visible = true;
                    if (config.Screen.WIDTH / 16 + screenTilePos + 1 < this._tileGrid.length && this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos + 1)][y] != null)
                        this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos + 1)][y].visible = false;
                }
            }
            if (this._player.isGrounded()) {
                if (this._player.velY() <= this._maxCamSpeed - 10) {
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
            this._bg1.x = (Math.floor(-this._spriteContainer.x / this._bgWidth) * this._bgWidth);
            this._bg2.x = this._bg1.x + this._bgWidth;
        }
        _returnBtnClick(event) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
    scenes.Level_1 = Level_1;
})(scenes || (scenes = {}));
//# sourceMappingURL=level_1.js.map