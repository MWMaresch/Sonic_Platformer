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
                ".                  ,.....1                 ..                 )...                                                      E .",
                ".                 /.......`                ..`                 ...    ..           .....        .....        ..       .....",
                ".                 .........                ...1                ... y  ..   ...                                            .",
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
            this._tileSpriteContainer = new createjs.SpriteContainer(tileSpriteSheet);
            this._playerSpriteContainer = new createjs.SpriteContainer(shipAtlas);
            this._player = new objects.Player("stand", 90, 90);
            this._camera = new createjs.Container();
            this._playerSpriteContainer.addChild(this._player);
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
            stage.addChild(this._tileSpriteContainer);
            stage.addChild(this._playerSpriteContainer);
            console.log("tilegrid created");
            this._tileSpriteContainer.tickEnabled = false;
            this._tileSpriteContainer.tickChildren = false;
            this._playerSpriteContainer.snapToPixel = true;
            this._tileSpriteContainer.snapToPixel = true;
            stage.snapToPixelEnabled = true;
        }
        _convertAngle(hex_angle) {
            return (256 - hex_angle) * 1.40625;
        }
        start() {
            //add the background first so it's behind everything
            this._bg = new createjs.Bitmap(assets.getResult("Background"));
            //stage.addChild(this._bg);
            //stage.addChild(this);
            canPause = true;
            //stage.addChild(this._camera);
        }
        update() {
            //console.log(stage.x);
            //console.log(Math.floor((config.Screen.WIDTH + (stage.x * -1)) / 16));
            this._player.update();
            this._player.checkCollisions(this._tileGrid);
            //console.log(this._player.x);
            this._updateCameraPosition();
            //console.log(stage.x);
        }
        _updateCameraPosition() {
            this._camDifR = this._playerSpriteContainer.x - (-this._player.x + this._rightCamBorder);
            this._camDifL = this._playerSpriteContainer.x - (-this._player.x + this._leftCamBorder);
            if (this._camDifR > 0) {
                this._playerSpriteContainer.x -= Math.min(this._camDifR, this._maxCamSpeed);
                //make offscreen things invisible, and onscreen things visible
                for (var y = 0; y < this._tileGrid[0].length; y++) {
                    var screenTilePos = Math.floor((this._playerSpriteContainer.x * -1) / 16);
                    if (config.Screen.WIDTH / 16 + screenTilePos < this._tileGrid.length && this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos)][y] != null)
                        this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos)][y].visible = true;
                    if (screenTilePos - 2 >= 0 && this._tileGrid[screenTilePos - 2][y] != null)
                        this._tileGrid[screenTilePos - 2][y].visible = false;
                }
            }
            else if (this._camDifL < 0) {
                this._playerSpriteContainer.x -= Math.max(this._camDifL, -this._maxCamSpeed);
                //make offscreen things invisible, and onscreen things visible
                for (var y = 0; y < this._tileGrid[0].length; y++) {
                    var screenTilePos = Math.floor((this._playerSpriteContainer.x * -1) / 16);
                    if (screenTilePos >= 0 && this._tileGrid[screenTilePos][y] != null)
                        this._tileGrid[screenTilePos][y].visible = true;
                    if (config.Screen.WIDTH / 16 + screenTilePos + 1 < this._tileGrid.length && this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos + 1)][y] != null)
                        this._tileGrid[(config.Screen.WIDTH / 16 + screenTilePos + 1)][y].visible = false;
                }
            }
            if (this._player.isGrounded()) {
                if (this._player.velY() <= this._maxCamSpeed - 10) {
                    this._camDifU = this._playerSpriteContainer.y - (-this._player.y + this._groundCamBorder);
                    if (Math.abs(this._camDifU) < this._maxCamSpeed - 10)
                        this._playerSpriteContainer.y -= this._camDifU;
                    else
                        this._playerSpriteContainer.y -= (this._maxCamSpeed - 10) * Math.sign(this._camDifU);
                }
                else {
                    this._camDifU = this._playerSpriteContainer.y - (-this._player.y + this._groundCamBorder);
                    if (Math.abs(this._camDifU) < this._maxCamSpeed)
                        this._playerSpriteContainer.y -= this._camDifU;
                    else
                        this._playerSpriteContainer.y -= this._maxCamSpeed * Math.sign(this._camDifU);
                }
            }
            else {
                this._camDifU = this._playerSpriteContainer.y - (-this._player.y + this._topCamBorder);
                this._camDifD = this._playerSpriteContainer.y - (-this._player.y + this._bottomCamBorder);
                if (this._camDifU < 0)
                    this._playerSpriteContainer.y -= Math.min(this._camDifU, this._maxCamSpeed);
                else if (this._camDifD > 0)
                    this._playerSpriteContainer.y -= Math.max(this._camDifD, -this._maxCamSpeed);
            }
            //side wall boundarys
            if (this._playerSpriteContainer.x > 0)
                this._playerSpriteContainer.x = 0;
            else if (this._playerSpriteContainer.x < this._camRightBoundary)
                this._playerSpriteContainer.x = this._camRightBoundary;
            //upper and lower boundarys
            if (this._playerSpriteContainer.y > 0)
                this._playerSpriteContainer.y = 0;
            else if (this._playerSpriteContainer.y < this._camBottomBoundary)
                this._playerSpriteContainer.y = this._camBottomBoundary;
            this._tileSpriteContainer.x = this._playerSpriteContainer.x;
            this._tileSpriteContainer.y = this._playerSpriteContainer.y;
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