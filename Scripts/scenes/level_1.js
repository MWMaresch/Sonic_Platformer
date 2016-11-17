var scenes;
(function (scenes) {
    class Level_1 extends objects.Scene {
        constructor() {
            super();
            this._tileGrid = [];
            this._stringGrid = ["...........................................................................................................................",
                "..(                                        ....(           ]......                                                        .",
                ".[                                         ...[             ].....                                                        .",
                ".             )..                          ..[               ]....                                                        .",
                ".              )..                         ..                 )...                                                      E .",
                ".               )..                        ..`                 ...    ..           .....        .....        ..       .....",
                ".                )..                       ...\\                ... y  ..   ...                                            .",
                ".`                )..                      ..............      ...    ..                                                  .",
                "..`                )..                                         .........                                                  .",
                "...`                )                                          .........                                                  .",
                "....`                                                         /............                                               .",
                ".....`                                                       /..........                                                  .",
                "......`                                                     /...........                                                  .",
                ".......\\                    ,..\\                           ,............                                                  .",
                "...........................................................................................................................",
                "...........................................................................................................................",
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
            this._player = new objects.Player("stand", 90, 90);
            this.addChild(this._player);
            console.log('\\');
            for (var x = 0; x < this._stringGrid[0].length; x++) {
                this._tileGrid[x] = [];
                for (var y = 0; y < this._stringGrid.length; y++) {
                    if (this._stringGrid[y].charAt(x) == ' ')
                        this._tileGrid[x][y] = new objects.Tile("blank", 0, 0, 0, 0);
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
                    else if (this._stringGrid[y].charAt(x) == '\\')
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
                    this._tileGrid[x][y].x = x * 16;
                    this._tileGrid[x][y].y = y * 16;
                    this.addChild(this._tileGrid[x][y]);
                }
            }
        }
        _convertAngle(hex_angle) {
            return (256 - hex_angle) * 1.40625;
        }
        start() {
            //add the background first so it's behind everything
            this._bg = new createjs.Bitmap(assets.getResult("Background"));
            this.addChild(this._bg);
            stage.addChild(this);
            canPause = true;
        }
        update() {
            this._player.update();
            this._player.checkCollisions(this._tileGrid);
            //console.log(this._player.x);
            this._updateCameraPosition();
            //console.log(this.x);
        }
        _updateCameraPosition() {
            this.x = Math.floor(((-this._player.x * this._SCALE) + config.Screen.CENTER_X * this._SCALE));
            if (this.x > 0)
                this.x = 0;
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