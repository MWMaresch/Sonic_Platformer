module scenes {
    export class Level_1 extends objects.Scene {

        private _bg1 : createjs.Sprite;
        private _bg2 : createjs.Sprite;
        private _bgWidth : number;
        private _returnBtn : objects.Button;
        private _timer : number;
        private _motobug : objects.Enemy;

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
        private _tileSpriteContainer : createjs.SpriteContainer;
        private _spriteContainer : createjs.SpriteContainer;
        private _hudContainer : createjs.SpriteContainer;
        private _timeText : createjs.BitmapText;
        private _ringsText : createjs.BitmapText;
        private _camera : createjs.Container;
        private _text : createjs.BitmapText;
        private _spikes : objects.Spike[];

        private _alreadyWon : boolean = false;
        private _tileGrid : objects.Tile[][] = [];
        private _stringGrid : string[] =
        ["..........................................................................   ..............................................",
         "....(                                    ]...(                                                                            .",
         "...[                                      ].(                                                                             .",
         "..[                                                                                                                     E .",
         ".[                 ,.....1                                                                                                .",
         ".                 /.......`                                         ...             .....       .....        ...       ....",
         ".                 .........                                         ...                                                ....",
         ".`                .........                                         ......    ...                                       ]..",
         "..1               ).......[                                         ......                                               ).",
         "...1               ].....(                                          ......                                                .",
         "....1                                                               ......                                                .",
         ".....1                                   ,...1                      ......`                                              /.",
         "......1                                 ,.....1                     .......1                         ,.......1          ,..",
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

        private _SCALE : number = config.Screen.REAL_WIDTH / config.Screen.WIDTH;

        constructor() {
            super();

            this._tileSpriteContainer = new createjs.SpriteContainer(spriteAtlas);
            this._spriteContainer = new createjs.SpriteContainer(spriteAtlas);
            this._hudContainer = new createjs.SpriteContainer(fontSpriteSheet);
            this._spikes = [new objects.Spike(33*16, 192), new objects.Spike(105*16, 176)];

            this._bg1 = new createjs.Sprite(spriteAtlas, "nightsky");
            this._bg2 = new createjs.Sprite(spriteAtlas, "nightsky");
            this._bgWidth = this._bg1.getBounds().width - 1;
            this._bg2.x = this._bgWidth;
            this._spriteContainer.addChild(this._bg1);
            this._spriteContainer.addChild(this._bg2);
            this._spriteContainer.addChild(this._spikes[0]);
            this._spriteContainer.addChild(this._spikes[1]);


            for (var x = 0; x < this._stringGrid[0].length; x++){
                this._tileGrid[x] = [];
                for (var y = 0; y < this._stringGrid.length; y++){
                    if (this._stringGrid[y].charAt(x) == ' ')
                        this._tileGrid[x][y] = null;
                    else if (this._stringGrid[y].charAt(x) == 'E')
                        this._tileGrid[x][y] = new objects.Emerald("emerald", 0, 0, 0, 0);
                    else if (this._stringGrid[y].charAt(x) == '.')
                        this._tileGrid[x][y] = new objects.GroundTile("block", 0, 180, 90, 270);
                    else if (this._stringGrid[y].charAt(x) == '/')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp45", 45, 180, 45, 270);
                    else if (this._stringGrid[y].charAt(x) == ',')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp45", 44, 180, 44, 270);
                    else if (this._stringGrid[y].charAt(x) == '1')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp315", 315, 180, 90, 315);
                    else if (this._stringGrid[y].charAt(x) == '`')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp315", 314, 180, 90, 314);
                    else if (this._stringGrid[y].charAt(x) == ']')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp135", 0, 135, 135, 270);
                    else if (this._stringGrid[y].charAt(x) == '[')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp225", 0, 225, 90, 225);
                    else if (this._stringGrid[y].charAt(x) == '(')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp225", 0, 224, 90, 224);
                    else if (this._stringGrid[y].charAt(x) == ')')
                        this._tileGrid[x][y] = new objects.GroundTile("ramp135", 0, 134, 134, 270);
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
            for (var x = 0; x < 21; x++){
                for (var y = 0; y < this._tileGrid[0].length; y++) {
                    if (this._tileGrid[x][y] != null)
                        this._tileGrid[x][y].visible = true;
                }
            }
            this._spriteContainer.addChild(this._tileSpriteContainer);

            this._player = new objects.Player("stand",90,90);
            //this._motobug = new objects.Enemy("motobug", 90, 90);
            //this._spriteContainer.addChild(this._motobug);
            this._spriteContainer.addChild(this._player);

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
        }

        private _convertAngle(hex_angle):number{
            return (256-hex_angle)*1.40625;
        }

        public start() : void {

            this._timer = 0;
            canPause = true;
            gameWon = false;

        }

        public update() : void {
            if (!gameWon){
                this._timer += createjs.Ticker.interval;
                this._timeText.text = "TIME  " + Math.floor((this._timer/1000)/60).toString() + ":" + Math.floor(((this._timer/1000)%60));
                this._ringsText.text = "RINGS  " + this._player.getNumRings();
                this._player.update();
                this._player.checkCollisions(this._tileGrid);
                this._updateCameraPosition();
                this._checkCollisions();
            }
            else if (!this._alreadyWon) {
                this._timeText.text = "YOU WON IN " + Math.floor((this._timer/1000)/60).toString() + ":" + Math.floor(((this._timer/1000)%60)) + "\n PRESS ESC TO \nPAUSE AND EXIT";
                this._timeText.scaleX = 1.5;
                this._timeText.scaleY = 1.5;
                this._timeText.regX = this._timeText.getBounds().width/2;
                this._timeText.regY = this._timeText.getBounds().height/2;
                this._timeText.x = config.Screen.WIDTH / 2;
                this._timeText.y = config.Screen.HEIGHT / 2;
            }
        }

        private _checkCollisions() : void {
            if (!this._player.isDead()){
                for (var obj = 0; obj < this._spikes.length; obj++) {
                    if (collision.sensorBoxCheck(this._player.getLeftSideSensor(), this._spikes[obj])) {
                        this._player.collideWithLeftWall(this._spikes[obj].rightLine);
                    }
                    else if (collision.sensorBoxCheck(this._player.getRightSideSensor(), this._spikes[obj])) {
                        this._player.collideWithRightWall(this._spikes[obj].leftLine);
                    }
                    else if (this._player.velY() > 0 && (collision.sensorBoxCheck(this._player.getLeftFootSensor(), this._spikes[obj])
                                                    || collision.sensorBoxCheck(this._player.getRightFootSensor(), this._spikes[obj]))){
                        this._player.getHurt();
                    }
                }
            }
            else if (this._camDifU > 300) {
                stage.removeAllChildren();
                changeScene();
            }
        }

        private _updateCameraPosition() : void{ 
            this._camDifR = this._spriteContainer.x -(this._rightCamBorder - this._player.x);
            this._camDifL = this._spriteContainer.x -(this._leftCamBorder - this._player.x);
            if (this._camDifR > 0) {
                this._spriteContainer.x -= Math.min(this._camDifR, this._maxCamSpeed)
                //make offscreen things invisible, and onscreen things visible
                //older computers can lag if we don't do this
                for (var y = 0; y < this._tileGrid[0].length; y++)
                {
                    var screenTilePos = Math.floor((this._spriteContainer.x * -1) / 16);
                    if (config.Screen.WIDTH/16 + screenTilePos < this._tileGrid.length && this._tileGrid[(config.Screen.WIDTH/16 + screenTilePos)][y] != null)
                        this._tileGrid[(config.Screen.WIDTH/16 + screenTilePos)][y].visible = true;
                    if ( screenTilePos - 2 >= 0 && this._tileGrid[screenTilePos - 2][y] != null)
                        this._tileGrid[screenTilePos - 2][y].visible = false;
                }
            }
            
            else if (this._camDifL < 0) {
                this._spriteContainer.x -= Math.max(this._camDifL, -this._maxCamSpeed)
                //make offscreen things invisible, and onscreen things visible
                for (var y = 0; y < this._tileGrid[0].length; y++)
                {
                    var screenTilePos = Math.floor((this._spriteContainer.x  * -1) / 16);
                    if (screenTilePos >= 0 && this._tileGrid[screenTilePos][y] != null)
                        this._tileGrid[screenTilePos][y].visible = true;
                    if (config.Screen.WIDTH/16 + screenTilePos + 1 < this._tileGrid.length && this._tileGrid[(config.Screen.WIDTH/16 + screenTilePos + 1)][y] != null)
                        this._tileGrid[(config.Screen.WIDTH/16 + screenTilePos + 1)][y].visible = false;
                }
            }
            
            if (this._player.isGrounded()) {
                if (this._player.velY() <= this._maxCamSpeed - 10) {
                    this._camDifU = this._spriteContainer.y - (-this._player.y + this._groundCamBorder );
                    if (Math.abs(this._camDifU) < this._maxCamSpeed - 10)
                        this._spriteContainer.y -= this._camDifU;
                    else
                        this._spriteContainer.y -= (this._maxCamSpeed - 10) * Math.sign(this._camDifU);
                }
                else {
                    this._camDifU = this._spriteContainer.y - (-this._player.y + this._groundCamBorder );
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
                this._spriteContainer.y -= Math.min(this._camDifU, this._maxCamSpeed)
            
            else if (this._camDifD > 0)
                this._spriteContainer.y -= Math.max(this._camDifD, -this._maxCamSpeed)
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

        private _returnBtnClick(event : createjs.MouseEvent) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}