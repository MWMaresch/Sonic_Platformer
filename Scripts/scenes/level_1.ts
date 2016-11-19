module scenes {
    export class Level_1 extends objects.Scene {

        private _bg : createjs.Bitmap;
        private _returnBtn : objects.Button;

        private _player : objects.Player;
        private _maxCamSpeed : number = 16;
        private _leftCamBorder : number = 144;
        private _rightCamBorder : number = 160;
        private _topCamBorder : number = 64;
        private _groundCamBorder : number = 96;
        private _bottomCamBorder : number = 128;
        private _camDifR : number;
        private _camDifL : number;
        private _camDifU : number;
        private _camDifD : number;
        private _camRightBoundary : number;
        private _camBottomBoundary : number;

        private _tileGrid : objects.Tile[][] = [];
        private _stringGrid : string[] =
        ["...........................................................................................................................",
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

        private _SCALE : number = config.Screen.REAL_WIDTH / config.Screen.WIDTH;

        constructor() {
            super();

            this._player = new objects.Player("stand",90,90);
            this.addChild(this._player);

            for (var x = 0; x < this._stringGrid[0].length; x++){
                this._tileGrid[x] = [];
                for (var y = 0; y < this._stringGrid.length; y++){
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
                    this._tileGrid[x][y].x = x * 16;
                    this._tileGrid[x][y].y = y * 16;
                    this.addChild(this._tileGrid[x][y]);
                }
                this._camRightBoundary = this._tileGrid.length * -16 + config.Screen.WIDTH;
                this._camBottomBoundary = this._tileGrid[0].length * -16 + config.Screen.HEIGHT;
            }
        }

        private _convertAngle(hex_angle):number{
            return (256-hex_angle)*1.40625;
        }

        public start() : void {

            //add the background first so it's behind everything
            this._bg = new createjs.Bitmap(assets.getResult("Background"));
            this.addChild(this._bg);

            stage.addChild(this);
            canPause = true;

        }

        public update() : void {
            this._player.update();
            this._player.checkCollisions(this._tileGrid);
            //console.log(this._player.x);
            this._updateCameraPosition();
            //console.log(this.x);
        }

        private _updateCameraPosition() : void{
            this._camDifR = this.x - Math.floor(-this._player.x + this._rightCamBorder );
            this._camDifL = this.x - Math.floor(-this._player.x + this._leftCamBorder );
            if (this._camDifR > 0) 
                this.x -= Math.min(this._camDifR, this._maxCamSpeed)
            
            else if (this._camDifL < 0)
                this.x -= Math.max(this._camDifL, -this._maxCamSpeed)
            
            if (this._player.isGrounded()) {
                if (this._player.velY() <= this._maxCamSpeed - 10) {
                    this._camDifU = this.y - Math.floor(-this._player.y + this._groundCamBorder );
                    if (Math.abs(this._camDifU) < this._maxCamSpeed - 10)
                        this.y -= this._camDifU;
                    else
                        this.y -= (this._maxCamSpeed - 10) * Math.sign(this._camDifU);
                }
                else {
                    this._camDifU = this.y - Math.floor(-this._player.y + this._groundCamBorder );
                    if (Math.abs(this._camDifU) < this._maxCamSpeed)
                        this.y -= this._camDifU;
                    else
                        this.y -= this._maxCamSpeed * Math.sign(this._camDifU);
                }
            }
            else {
                this._camDifU = this.y - Math.floor(-this._player.y + this._topCamBorder);
                this._camDifD = this.y - Math.floor(-this._player.y + this._bottomCamBorder);
            if (this._camDifU < 0) 
                this.y -= Math.min(this._camDifU, this._maxCamSpeed)
            
            else if (this._camDifD > 0)
                this.y -= Math.max(this._camDifD, -this._maxCamSpeed)
            }
            //side wall boundarys
            if (this.x > 0)
                this.x = 0;
            else if (this.x < this._camRightBoundary)
                this.x = this._camRightBoundary;
            //upper and lower boundarys
            if (this.y > 0)
                this.y = 0;
            else if (this.y < this._camBottomBoundary)
                this.y = this._camBottomBoundary;
            
        }

        private _moveCamRight(amount : number) : void {
            this.x -= amount;
        }

        private _moveCamLeft(amount : number) : void {
            this.x += amount;
        }

        private _returnBtnClick(event : createjs.MouseEvent) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}