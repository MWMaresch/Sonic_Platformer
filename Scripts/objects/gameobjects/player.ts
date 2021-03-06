module objects {
    export class Player extends objects.GameObject {

        private _keyPressed: number;

        //constant variables
        //if only the const or readonly keywords could be used here
        private _GROUNDACCELERATION: number = 0.046875; //applied when moving left or right
        private _AIRACCELERATION: number = 0.09375; //applied when moving left or right in the air
        private _AIRDRAG: number = 0.96875;        //applied when moving upwards in the air
        private _DECELERATION: number = 0.5;       //applied when turning around
        private _FRICTION: number = 0.046875;      //applied when no horizontal input is detected
        private _MAXRUNSPEED: number = 6;          //should never be more than the size of a single tile, which is 16
        private _TERMINALVELOCITY: number = 16.5;    //should never be more than the size of a single tile, which is 16
        private _SLOPEFACTOR: number = 0.125;      //slowing sonic when he's on a slope
        private _GRAVITY: number = 0.21875;
        private _KBGRAVITY: number = 0.1875;
        private _JUMPVELOCITY: number = 6.5;
        private _SHORTJUMPVELOCITY: number = 4;
        private _invinciFrames: number = 0;

        public rings: number = 0;
        private _isGrounded: boolean = false;
        private _isRolling: boolean = false;
        private _isJumping: boolean = false;
        //private _isDead: boolean = false;
        private _accelerating: boolean = false;
        private _pressedJump: boolean = false;
        private _isStopped: boolean = false;

        /*private _footSensorL : Vector2;
        private _footSensorR : Vector2;
        private _sideSensorL : Vector2;
        private _sideSensorR : Vector2;*/ //already implemented in gameObject
        private _topSensorL: Vector2 = new Vector2;
        private _topSensorR: Vector2 = new Vector2;

        private _footOffset: Vector2 = new Vector2(9, 0);//from center
        private _footSensorLength: number = 35;
        private _curFootDist: number = 20;
        private _headOffset: Vector2 = new Vector2(9, 0);//from center
        private _sideOffset: Vector2 = new Vector2(10, 4);//from center

        private _angleRadians: number = 0;
        public curLayer: number = 0;

        //private _velX : number = 0;
        //private _velY : number = 0;
        private _gSpeed: number = 0;
        private _angle: number = 0;
        private _hcLockTimer: number = 0;

        private _sensorsInAir: number;
        //private _higherGround: number;
        private _lowerGround: number;// = new Vector2(0, 0);
        private _leftMostGround: number;
        private _rightMostGround: number;
        private _mode: number = Quadrant.Floor;
        private _alreadyCollided: boolean = false;
        private _lowerDeathBoundary: number;
        public camOffsetY: number = 0;

        constructor(imageString: string, x: number, y: number, deathBoundary?: number) {
            super(imageString, x, y);
            this._footSensorL = new Vector2(0, 0);
            this._footSensorR = new Vector2(0, 0);
            this._lowerDeathBoundary = deathBoundary;
            this.width = 14;
            this.height = 40;
            this.rings = 0;
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
        }

        private _startRolling(): void {
            if (!this._isRolling) {
                //console.log("gspeed before rolling: " + this._gSpeed);
                this._isRolling = true;
                this.height = 30;
                this._curFootDist = 15;
                this.y += 5;
                this.regY = 15;
                this.camOffsetY = -5;
                this._footOffset.x = 7;
                this.gotoAndPlay("jump");
                //we don't want the animation speed to be below 0 or above 1
                this.spriteSheet.getAnimation("jump").speed = Math.min(1, Math.max(0, 1 / (5 - Math.abs(this._gSpeed))));
                //console.log("gspeed after rolling: " + this._gSpeed);
            }
        }

        private _stopRolling(): void {
            if (this._isRolling) {
                this._isStopped = false;
                this._isJumping = false;
                this._isRolling = false;
                this.height = 40;
                this._curFootDist = 20;
                this.y -= 5;
                this.regY = 20;
                this.camOffsetY = 0;
                this._footOffset.x = 9;
            }
        }

        private _setAirSensor(): void {
            //called when one foot is in the air
            //if both of our feet detect no ground, we're in the air
            this._sensorsInAir++;
            if (this._sensorsInAir >= 2) {
                //console.log(this._sensorsInAir + " sensors in air");
                this._startFalling();
            }
        }

        get rightSideSensor(): Vector2 { return this._sideSensorR; }
        get leftSideSensor(): Vector2 { return this._sideSensorL; }

        get leftFootSensor(): Vector2 { return new Vector2(this._footSensorL.x, this.y + this._curFootDist + 1); }
        get rightFootSensor(): Vector2 { return new Vector2(this._footSensorR.x, this.y + this._curFootDist + 1); }

        get isGrounded(): boolean { return this._isGrounded; }
        get isRolling(): boolean { return this._isRolling; }

        get velY(): number { return this._velY; }
        get velX(): number { return this._velX; }

        get camYPosition(): number { return this.y - 16 + this.camOffsetY; }

        public getHurt(fromX: number): void {
            if (this._invinciFrames <= 0) {
                this._isStopped = false;
                this._startFalling();
                if (this.rings == 0) {
                    this.triggerDeath();
                }
                else {
                    createjs.Sound.play("LoseRingsSnd");
                    //get knocked back
                    this._velY = -4;
                    var a = Math.sign(this.x - fromX);
                    console.log("a is " + a);
                    if (a == 0)
                        a = 1;
                    this._velX = 2 * a;
                    this._invinciFrames = 120;
                    this.gotoAndStop("hurt");
                    //lose all our rings
                    let curRing = 0;
                    let ang = 101.25;
                    let spd = 4;
                    let flip = false;
                    this.rings = Math.min(this.rings, 32);
                    while (curRing < this.rings) {
                        if (flip) {
                            currentScene.addObject(new Ring(true, this.x, this.y, Math.cos(toRadians(ang)) * -spd, Math.sin(toRadians(ang)) * -spd));
                            ang = ang + 22.5;
                        } else
                            currentScene.addObject(new Ring(true, this.x, this.y, Math.cos(toRadians(ang)) * spd, Math.sin(toRadians(ang)) * -spd));
                        flip = !flip;
                        curRing++;

                        if (curRing == 16) { spd = 2; ang = 101.25; }
                    }
                    this.rings = 0;
                }
            }
        }

        public triggerDeath(): void {
            createjs.Sound.play("DeathSnd");
            this._velX = 0;
            this._velY = -7;
            this._isDead = true;
            this.gotoAndStop("dead");
        }

        public addVelocity(x: number, y: number) {
            this.x += x;
            this.y += y;
            //this._gSpeed += x;
            //this._velX += x;
            //this._velY += y;
        }

        public rebound(y: number): void {
            createjs.Sound.play("ReboundSnd");
            if (this.y > y || this._velY < 0) {
                this._velY -= Math.sign(this._velY);
            }
            else if (this.y < y && this._velY > 0) {
                //if we're holding jump or if we rolled off a platform onto the enemy, we bounce a bit higher
                if (this._pressedJump || !this._isJumping)
                    this._velY *= -1;
                else
                    this._velY = Math.max(-this._velY, -1);
            }
        }

        public bounce(x: number, y: number): void {
            createjs.Sound.play("SpringSnd");
            this._isJumping = false;
            if (x != 0)
                this._velX = x;
            if (y != 0)
                this._velY = y;
        }

        public collectRing(amount: number, ring: objects.Ring): void {
            if (this._invinciFrames != 120) {
                createjs.Sound.play("RingSnd", "none", 0, 0, 0, 0.5);
                this.rings += amount;
                ring.destroy();
            }
        }

        public update(): void {
            //console.log("frame advance");
            //super.update(); //reserved for other gameobjects, would just interfere with what we already have here
            if (!this._isDead) {
                this._sensorsInAir = 0;
                this._alreadyCollided = false;
                this._accelerating = false;
                //TODO: rework higherground and lowerground to make more sense
                this._higherGround = 90000;
                this._lowerGround = -90000;
                if (this._invinciFrames != 120) {
                    this._updateControls();
                    this.updateMovement();
                }
                else
                    this._updateKnockedBackMovement();
                this._updateSensors();
            }
            else {
                this.y += this._velY;
                this._velY += this._GRAVITY;
            }
        }

        private _updateKnockedBackMovement() {
            if (this._isGrounded)
                this._invinciFrames--;
            else
                this._velY += this._KBGRAVITY;
            this.x += this._velX;
            this.y += this._velY;
        }

        private _updateControls() {

            if (this._hcLockTimer > 0)
                this._hcLockTimer--;

            if (controls.UP)
                this.lookUp();

            if (controls.LEFT)
                this.moveLeft();
            else if (controls.RIGHT)
                this.moveRight();
            else if (controls.DOWN)
                this.crouch();

            if (controls.JUMP)
                this.jump();
            else {
                //sonic's jump shortens if we let go of the button
                this._pressedJump = false;
                if (!this._isGrounded && this._isJumping && this._velY < -this._SHORTJUMPVELOCITY) {
                    this._velY = -this._SHORTJUMPVELOCITY;
                    console.log("shorthop");
                }
            }
        }

        private _startFalling(): void {
            this._isGrounded = false;
            //TODO: slowly interpolate angles when falling: do not set it directly to 0
            this._mode = Quadrant.Floor;
            this._angle = 0;
            this.rotation = 0;
            //this._gSpeed = 0;
            //this._footRayCastLength = 20;
        }

        protected updateMovement() {
            //check for and apply air movement
            if (this._invinciFrames > 0) {
                this._invinciFrames--;
                if (this._invinciFrames % 4 == 0)
                    this.visible = !this.visible;
            }
            if (!this._isGrounded) {
                this.x += this._velX;
                this.y += this._velY;
                this._velY += this._GRAVITY;
                if (this._velY > this._TERMINALVELOCITY)
                    this._velY = this._TERMINALVELOCITY;
                //the following is left in for future reference in case something goes wrong enough that I must resort back to it
                /*if (this._isJumping || !this._isRolling) {
                    if (Math.abs(this._velX) > this._MAXRUNSPEED)
                        this._velX = this._MAXRUNSPEED * Math.sign(this._velX);
                }
                else
                    if (Math.abs(this._velX) > this._TERMINALVELOCITY)
                        this._velX = this._TERMINALVELOCITY * Math.sign(this._velX);*/
                //weird air drag
                if (this._velY < 0 && this._velY > -4 && Math.abs(this._velX) >= 0.125)
                    this._velX *= this._AIRDRAG;

            }
            else {
                //update animations and their speeds
                if (!this._isRolling) {
                    if (this._gSpeed != 0) {
                        this._isStopped = false;
                        if (Math.abs(this._gSpeed) >= this._MAXRUNSPEED) {
                            if (this.currentAnimation != "run")
                                this.gotoAndPlay("run");
                            this.spriteSheet.getAnimation("run").speed = 1 / Math.max(8 - Math.abs(this._gSpeed), 1);
                            this._gSpeed = this._MAXRUNSPEED * Math.sign(this._gSpeed);
                        }
                        else if (this.currentAnimation != "walk" && this.currentAnimation != "push")
                            this.gotoAndPlay("walk");
                        this.spriteSheet.getAnimation("walk").speed = 1 / Math.max(8 - Math.abs(this._gSpeed), 1);
                    }
                    //updating ground speed based on our slope angle
                    this._angleRadians = toRadians(this._angle);
                    this._gSpeed += this._SLOPEFACTOR * -Math.sin(this._angleRadians);

                    // when we're not accelerating, stop if we're very slow, otherwise slow sonic down
                    if (!this._accelerating) {
                        if (Math.abs(this._gSpeed) < this._FRICTION) {
                            this._gSpeed = 0;
                            if (!this._isStopped) {
                                this.gotoAndPlay("stand");
                                this._isStopped = true;
                            }
                        }
                        else
                            this._gSpeed -= this._FRICTION * Math.sign(this._gSpeed);
                    }
                }
                else {
                    this._angleRadians = toRadians(this._angle);
                    //if we roll downhill, we should go much faster than when rolling uphill
                    if (Math.sign(this._gSpeed) == Math.sign(Math.sin(this._angleRadians))) {
                        this._gSpeed += this._SLOPEFACTOR * 0.625 * -Math.sin(this._angleRadians);
                    }
                    else {
                        this._gSpeed += this._SLOPEFACTOR * 2.5 * -Math.sin(this._angleRadians);
                    }

                    if (Math.abs(this._gSpeed) < this._FRICTION) {
                        this._gSpeed = 0;
                        this.gotoAndPlay("stand");
                        this._isStopped = true;
                        this._stopRolling();
                    }
                    else
                        this._gSpeed -= (this._FRICTION / 2) * Math.sign(this._gSpeed);
                    this.spriteSheet.getAnimation("jump").speed = Math.min(1, Math.max(0, 1 / (5 - Math.abs(this._gSpeed))));
                }

                this._velX = this._gSpeed * Math.cos(this._angleRadians);
                this._velY = this._gSpeed * -Math.sin(this._angleRadians);

                //if we're too slow when running on walls, we fall
                if (this._mode != Quadrant.Floor && Math.abs(this._gSpeed) < 2.5 && this._hcLockTimer <= 0) {
                    this._hcLockTimer = 30;
                    console.log("fell because we're too slow");
                    this._startFalling();
                }

                this.x += this._velX;
                this.y += this._velY;
                if (Math.abs(this._gSpeed) > this._TERMINALVELOCITY) {
                    console.log("reaching terminal velocity at " + this._gSpeed);
                    this._gSpeed = Math.sign(this._gSpeed) * this._TERMINALVELOCITY;
                }
            }
        }

        private _updateSensors(): void {
            //move all sensors to their correct locations relating to sonic
            if (this._angle < 45 && this._angle >= -45 || this._angle > 315) {
                this._mode = Quadrant.Floor;
                //this.rotation = 0;
                this._footSensorL.x = this.x - this._footOffset.x;
                this._footSensorR.x = this.x + this._footOffset.x;
                this._footSensorL.y = this.y + this._footOffset.y;
                this._footSensorR.y = this.y + this._footOffset.y;
            }
            else if (this._angle < 135) {
                this._mode = Quadrant.RightWall;
                //this.rotation = -90;
                this._footSensorL.x = this.x + this._footOffset.y;
                this._footSensorR.x = this.x + this._footOffset.y;
                this._footSensorL.y = this.y + this._footOffset.x;
                this._footSensorR.y = this.y - this._footOffset.x;
            }
            else if (this._angle < 225) {
                this._mode = Quadrant.Ceiling;
                this._footSensorL.x = this.x + this._footOffset.x;
                this._footSensorR.x = this.x - this._footOffset.x;
                this._footSensorL.y = this.y - this._footOffset.y;
                this._footSensorR.y = this.y - this._footOffset.y;
            }
            else {
                this._mode = Quadrant.LeftWall;
                this._footSensorL.x = this.x - this._footOffset.y;
                this._footSensorR.x = this.x - this._footOffset.y;
                this._footSensorL.y = this.y + this._footOffset.x;
                this._footSensorR.y = this.y - this._footOffset.x;
            }
            this._sideSensorL = new Vector2(this.x - this._sideOffset.x, this.y + this._sideOffset.y);
            this._sideSensorR = new Vector2(this.x + this._sideOffset.x, this.y + this._sideOffset.y);
            this._topSensorL = new Vector2(this.x - this._headOffset.x, this.y - this._headOffset.y);
            this._topSensorR = new Vector2(this.x + this._headOffset.x, this.y - this._headOffset.y);
        }

        public checkCollisionWithGrid(tileGrid: Tile[][]) {
            if (!this._isDead) {
                //only do wall collisions if we're moving forwards
                if (this._mode == Quadrant.Floor) {
                    if (this._velX < 0 && tileGrid[Math.floor(this._sideSensorL.x / 16)][Math.floor(this._sideSensorL.y / 16)] != null)
                        tileGrid[Math.floor(this._sideSensorL.x / 16)][Math.floor(this._sideSensorL.y / 16)].onLeftWallCollision(this, this._sideSensorL);
                    else if (this._velX > 0 && tileGrid[Math.floor(this._sideSensorR.x / 16)][Math.floor(this._sideSensorR.y / 16)] != null)
                        tileGrid[Math.floor(this._sideSensorR.x / 16)][Math.floor(this._sideSensorR.y / 16)].onRightWallCollision(this, this._sideSensorR);
                }

                //only check head collision if we're in the air
                if (!this._isGrounded) {
                    this._checkHeadCollision(-this._footSensorLength, this._topSensorR, tileGrid);
                    this._checkHeadCollision(-this._footSensorLength, this._topSensorL, tileGrid);
                }
                else {
                    this._checkTunnelCollision(-10, this._topSensorR, tileGrid);
                    this._checkTunnelCollision(-10, this._topSensorL, tileGrid);
                    //this._checkTunnelCollision(-20, this._topSensorR, tileGrid);
                    //this._checkTunnelCollision(-20, this._topSensorL, tileGrid);
                }

                //always check if our feet would hit something
                if (this._velY >= 0 || this._isGrounded) {
                    this._checkFootCollision(this._footSensorLength, this._footSensorR, tileGrid);
                    this._checkFootCollision(this._footSensorLength, this._footSensorL, tileGrid);
                }

                /*if (this.y > this._lowerDeathBoundary) {
                    this.triggerDeath();
                }*/
            }
        }

        public checkDeathBoundary(boundary: number): void {
            if (this.y > boundary && !this._isDead)
                this.triggerDeath();
        }

        private _checkTunnelCollision(length: number, sensorPos: Vector2, tileGrid: Tile[][]) {
            if (tileGrid[Math.floor(sensorPos.x / 16)][Math.floor((length + sensorPos.y) / 16)] != null) {
                this._pressedJump = true;
                if (!this._isRolling) {
                    if (tileGrid[Math.floor(sensorPos.x / 16)][Math.floor((length + sensorPos.y) / 16)].isTunnel) {
                        createjs.Sound.play("RollSnd", "none", 0, 0, 0, 0.5);
                        this._startRolling();
                        if (this._mode == Quadrant.Floor && Math.abs(this._gSpeed) <= 0.3) {
                            if (this._gSpeed == 0) {
                                this._gSpeed = 3;
                            }
                            else
                                this._gSpeed *= 10;
                        }
                    }
                }
            }
        }

        private _checkFootCollision(length: number, sensorPos: Vector2, tileGrid: Tile[][]) {
            var px = Math.floor(sensorPos.x / 16);
            var py = Math.floor(sensorPos.y / 16);
            //instead of bounding box checks, we already know what tile we're at, so just execute code from there
            //we actually need to check a multiple tiles that extend below us for when we run down a steep slope
            //only execute code from the first tile we detect, though
            if (this._mode == Quadrant.Floor) {
                if (tileGrid[px][Math.floor((sensorPos.y + (this._curFootDist - 1)) / 16)] != null) {
                    tileGrid[px][Math.floor((sensorPos.y + (this._curFootDist - 1)) / 16)].onFloorCollision(this, sensorPos);
                }
                else if (tileGrid[px][Math.floor((sensorPos.y + 28) / 16)] != null) {
                    tileGrid[px][Math.floor((sensorPos.y + 28) / 16)].onFloorCollision(this, sensorPos);
                }
                else if (tileGrid[px][Math.floor((sensorPos.y + length) / 16)] != null) {
                    tileGrid[px][Math.floor((sensorPos.y + length) / 16)].onFloorCollision(this, sensorPos);
                }
                else if (!this._alreadyCollided) //if we detect no tile, then this foot must be in the air 
                    this._setAirSensor();
            }
            else if (this._mode == Quadrant.RightWall) {
                if (tileGrid[Math.floor((sensorPos.x + (this._curFootDist - 1)) / 16)][py] != null)
                    tileGrid[Math.floor((sensorPos.x + (this._curFootDist - 1)) / 16)][py].onFloorCollisionR(this, sensorPos);
                else if (tileGrid[Math.floor((sensorPos.x + 20) / 16)][py] != null)
                    tileGrid[Math.floor((sensorPos.x + 20) / 16)][py].onFloorCollisionR(this, sensorPos);
                else if (tileGrid[Math.floor((sensorPos.x + length) / 16)][py] != null)
                    tileGrid[Math.floor((sensorPos.x + length) / 16)][py].onFloorCollisionR(this, sensorPos);
                else if (!this._alreadyCollided) {
                    this._setAirSensor();
                }
            }
            else if (this._mode == Quadrant.Ceiling) {
                if (tileGrid[px][Math.floor((sensorPos.y - (this._curFootDist - 1)) / 16)] != null)
                    tileGrid[px][Math.floor((sensorPos.y - (this._curFootDist - 1)) / 16)].onFloorCollisionU(this, sensorPos);
                else if (tileGrid[px][Math.floor((sensorPos.y - 20) / 16)] != null)
                    tileGrid[px][Math.floor((sensorPos.y - 20) / 16)].onFloorCollisionU(this, sensorPos);
                else if (this._isGrounded && tileGrid[px][Math.floor((sensorPos.y - length) / 16)] != null)
                    tileGrid[px][Math.floor((sensorPos.y - length) / 16)].onFloorCollisionU(this, sensorPos);
                else if (!this._alreadyCollided)
                    this._setAirSensor();
            }
            else { //quadrant must be left wall
                if (tileGrid[Math.floor((sensorPos.x - (this._curFootDist - 1)) / 16)][py] != null)
                    tileGrid[Math.floor((sensorPos.x - (this._curFootDist - 1)) / 16)][py].onFloorCollisionL(this, sensorPos);
                else if (tileGrid[Math.floor((sensorPos.x - 20) / 16)][py] != null)
                    tileGrid[Math.floor((sensorPos.x - 20) / 16)][py].onFloorCollisionL(this, sensorPos);
                else if (tileGrid[Math.floor((sensorPos.x - length) / 16)][py] != null)
                    tileGrid[Math.floor((sensorPos.x - length) / 16)][py].onFloorCollisionL(this, sensorPos);
                else if (!this._alreadyCollided)
                    this._setAirSensor();
            }
        }

        private _checkHeadCollision(length: number, sensorPos: Vector2, tileGrid: Tile[][]) {
            var px = Math.floor(sensorPos.x / 16);

            //basically the same as foot collision
            if (tileGrid[px][Math.floor((sensorPos.y - 16) / 16)] != null)
                tileGrid[px][Math.floor((sensorPos.y - 16) / 16)].onCeilingCollision(this, sensorPos);
            else if (tileGrid[px][Math.floor((sensorPos.y - 20) / 16)] != null)
                tileGrid[px][Math.floor((sensorPos.y - 20) / 16)].onCeilingCollision(this, sensorPos);
            //we don't want sonic clipping in weird ways, so update his sensors
            this._updateSensors();
        }

        public collideWithRightGround(groundHeight: number, angle: number): void {
            //running up or down the wall on the right
            if (groundHeight < this._higherGround) {
                this._higherGround = groundHeight;
                this._isGrounded = true;
                //this._footRayCastLength = 35;
                this.x = groundHeight - this._curFootDist;
                this._angle = angle;
                this.rotation = -angle;
            }
        }

        public collideWithLeftGround(groundHeight: number, angle: number): void {
            //running up or down the wall on the left
            if (groundHeight > this._lowerGround) {
                this._lowerGround = groundHeight;
                this._isGrounded = true;
                //this._footRayCastLength = 35;
                this.x = groundHeight + this._curFootDist;
                this._angle = angle;
                this.rotation = -angle;
            }
        }

        public collideWithGround(groundHeight: number, angle: number): void {
            //on relatively flat ground

            if (groundHeight < this._higherGround) {
                if (this._isGrounded) {
                    this._alreadyCollided = true;
                    this._higherGround = groundHeight;
                    //this._footRayCastLength = 35;
                    this.y = groundHeight - this._curFootDist;
                    this._angle = angle;
                    this.rotation = -angle;
                }
                else if (this.y > groundHeight - this._curFootDist) { //when we land on the ground 
                    this._stopRolling();
                    this._alreadyCollided = true;
                    this._higherGround = groundHeight;
                    this.y = groundHeight - this._curFootDist;
                    this._angle = angle;
                    this.rotation = -angle;

                    //on very flat surfaces, just carry over X velocity
                    if (this._angle < 22 || this._angle > 338)
                        this._gSpeed = this._velX;
                    //on steeper surfaces:
                    else if (this._angle >= 314 || this._angle <= 45) {
                        if (Math.abs(this._velX) > this._velY)
                            this._gSpeed = this._velX;
                        else {
                            //sonic physics guide says this should be cos, not sin, but only sin works here for some reason
                            this._angleRadians = this._angle * (Math.PI / 180);
                            this._gSpeed = this._velY * 0.5 * -Math.sign(Math.sin(this._angleRadians));
                        }
                    }
                    else if (this._angle <= 90 || this._angle >= 271) {
                        if (Math.abs(this._velX) > this._velY)
                            this._gSpeed = this._velX;
                        else {
                            //same cos/sin phenomenon as above
                            this._angleRadians = this._angle * (Math.PI / 180);
                            this._gSpeed = this._velY * -Math.sign(Math.sin(this._angleRadians));
                        }
                    }
                    this._isGrounded = true;
                    this._velY = 0;
                }
            }
        }

        public collideWithUpperGround(groundHeight: number, angle: number): void {
            //running left or right on the ceiling
            if (groundHeight > this._lowerGround) {
                this._lowerGround = groundHeight;
                this._isGrounded = true;
                //this._footRayCastLength = 35;
                this.y = groundHeight + this._curFootDist;
                this._angle = angle;
                this.rotation = -angle;
            }
        }

        public collideWithCeiling(ceilingHeight: number, angle: number): void {
            //we hit our head on the ceiling
            if (this.y < ceilingHeight + this._curFootDist) {
                this.y = ceilingHeight + this._curFootDist;
                if (this._velY < 0) {
                    //if we jump into a slope, we might be able to reattach if we're fast enough
                    if (angle >= 224 || angle <= 135) {
                        this._gSpeed = this._velY * -Math.sign(Math.sin(toRadians(angle)));
                        if (Math.abs(this._gSpeed) > 2.5) {
                            this._stopRolling();
                            this.collideWithUpperGround(ceilingHeight, angle);
                        }
                        else
                            this._velY = 0;
                    }
                    else
                        this._velY = 0;
                }
            }
        }

        public checkOneMoreCollision(posY: number, posX: number, sensor: Vector2) {
            //console.log("checking one more");
            if (currentScene.getTileGrid(this.curLayer)[posX][posY] != null)
                currentScene.getTileGrid(this.curLayer)[posX][posY].onFloorCollision(this, sensor);
        }

        public collideWithLeftWall(x: number): void {
            //TODO: pushing wall animation
            this._gSpeed = 0;
            this._velX = 0;
            this.x = x + this._sideOffset.x;
            if (this._isGrounded && this.currentAnimation != "push")
                this.gotoAndPlay("push");
            this._updateSensors();
        }

        public collideWithRightWall(x: number): void {
            this._gSpeed = 0;
            this._velX = 0;
            this.x = x - this._sideOffset.x;
            console.log("collided when angle was " + this._angle);
            if (this._isGrounded && this.currentAnimation != "push")
                this.gotoAndPlay("push");
            this._updateSensors();
        }

        public lookUp() {
            //TODO: looking up
        }

        public crouch() {
            if (!this._isRolling && this._isGrounded && Math.abs(this._gSpeed) > 0.53125) {
                createjs.Sound.play("RollSnd", "none", 0, 0, 0, 0.5);
                this._startRolling();
            }
            //TODO: crouching and spindash
        }

        public moveRight() {
            //we move differently depending on whether we're on the ground or in the air
            if (this._isGrounded) {
                if (!this._isRolling) {
                    if (this._hcLockTimer <= 0) {
                        if (this._gSpeed < 0) {
                            //createjs.Sound.play("BrakeSnd", createjs.Sound.INTERRUPT_LATE,);

                            //we use a different (higher) value when turning around so we can stop quickly
                            this._gSpeed += this._DECELERATION;
                            this.gotoAndPlay("walk");//brake
                        }
                        else if (this._gSpeed < this._MAXRUNSPEED) {
                            if (this._gSpeed == 0)
                                this.gotoAndPlay("walk");
                            this._gSpeed += this._GROUNDACCELERATION;
                        }
                        this._accelerating = true;
                        this.scaleX = 1;
                    }
                }
                else if (this._gSpeed < 0)
                    this._gSpeed += 0.125;
            }
            else {
                if (this._velX < this._MAXRUNSPEED) {
                    this._velX += this._AIRACCELERATION;
                    this._gSpeed += this._AIRACCELERATION;
                }
                this._accelerating = true;
                this.scaleX = 1;
            }
        }

        public moveLeft() {
            if (this._isGrounded) {
                if (!this._isRolling) {
                    if (this._hcLockTimer <= 0) {
                        if (this._gSpeed > 0) {
                            this._gSpeed -= this._DECELERATION;
                            this.gotoAndPlay("walk");//brake
                        }
                        else if (this._gSpeed > -this._MAXRUNSPEED) {
                            if (this._gSpeed == 0)
                                this.gotoAndPlay("walk");
                            this._gSpeed -= this._GROUNDACCELERATION;
                        }
                        this._accelerating = true;
                        //we're facing left
                        this.scaleX = -1;
                    }
                }
                else if (this._gSpeed > 0)
                    this._gSpeed -= 0.125;
            }
            else {
                if (this._velX > -this._MAXRUNSPEED) {
                    this._velX -= this._AIRACCELERATION;
                    this._gSpeed -= this._AIRACCELERATION;
                }
                this._accelerating = true;
                this.scaleX = -1;
            }
        }

        public jump() {
            //the player must let go of the button and press it again to jump
            if (this._isGrounded && !this._pressedJump) {
                createjs.Sound.play("JumpSnd");
                this._isJumping = true;
                this._startRolling();
                this._startFalling();
                this._velX -= this._JUMPVELOCITY * Math.sin(this._angleRadians);
                this._velY -= this._JUMPVELOCITY * Math.cos(this._angleRadians);
            }
            this._pressedJump = true;
        }

        private _onKeyDown(event: KeyboardEvent) {
            switch (event.keyCode) {
                case keys.W:
                    //console.log("W key pressed");
                    controls.UP = true;
                    break;
                case keys.S:
                    //console.log("S key pressed");
                    controls.DOWN = true;
                    break;
                case keys.A:
                    //console.log("A key pressed");
                    controls.LEFT = true;
                    break;
                case keys.D:
                    //console.log("D key pressed");
                    controls.RIGHT = true;
                    break;
                case keys.SPACE:
                    //console.log("SPACEBAR pressed");
                    controls.JUMP = true;
                    break;
                case keys.ESC:
                    console.log("ESC key pressed");
                    togglePause();
                    break;
                case keys.F:
                    frameAdvance();
                    break;
            }
        }

        private _onKeyUp(event: KeyboardEvent) {
            switch (event.keyCode) {
                case keys.W:
                    controls.UP = false;
                    break;
                case keys.S:
                    controls.DOWN = false;
                    break;
                case keys.A:
                    controls.LEFT = false;
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    break;
                case keys.SPACE:
                    controls.JUMP = false;
                    break;
            }
        }
    }
}