module objects {
    export class Player extends objects.GameObject {

        private _keyPressed : number;

        //constant variables
        //if only the const or readonly keywords could be used here
        private _GROUNDACCELERATION : number = 0.046875; //applied when moving left or right
        private _AIRACCELERATION : number = 0.09375; //applied when moving left or right
        private _AIRDRAG : number = 0.96875; //applied when moving left or right
        private _DECELERATION : number = 0.5; //applied when turning around
        private _FRICTION : number = 0.046875; //applied when no horizontal input is detected
        private _MAXRUNSPEED : number = 6; //should never be more than the size of a single tile, which is 16
        private _TERMINALVELOCITY : number = 15; //should never be more than the size of a single tile, which is 16
        private _SLOPEFACTOR : number = 0.125; //should never be more than the size of a single tile, which is 16
        private _GRAVITY : number = 0.21875;
        private _JUMPVELOCITY : number = 6;
        private _SHORTJUMPVELOCITY : number = 4;

        private _isGrounded : boolean = false;
        private _accelerating : boolean = false;
        private _pressedJump : boolean = false;

        private _footSensorL : Vector2;
        private _footSensorR : Vector2;
        private _sideSensorL : Vector2;
        private _sideSensorR : Vector2;
        private _topSensorL : Vector2 = new Vector2;
        private _topSensorR : Vector2 = new Vector2;

        private _footOffset : Vector2 = new Vector2(9,0);//from center
        private _footRayCastLength : number = 36;
        private _headOffset : Vector2 = new Vector2(9,0);//from center
        private _sideOffset : Vector2 = new Vector2(10,4);//from center

        private _angleThreshold : number = 45;
        private _angleRadians : number = 0;
        private _layer : number = 1;

        //other variables
        private _velX : number = 0;
        private _velY : number = 0;
        private _gSpeed : number = 0;
        private _angle : number = 0;
        private _hcLockTimer : number = 0;

        private _sensorsInAir : number;
        private _higherGround : Vector2 = new Vector2(0,0);
        private _lowerGround : Vector2 = new Vector2(0,0);
        private _leftMostGround : number;
        private _rightMostGround : number;
        private _mode : number = Quadrant.Floor;

        constructor(imageString:string, x:number, y:number) {
            super(imageString, "");
            this.x = x;
            this.y = y;

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
        }

        private _setAirSensor() : void {
            this._sensorsInAir ++;
            if (this._sensorsInAir >= 2) {
                //console.log("sensors detected air");
                this._startFalling();
            }
        }

        public isGrounded() : boolean {
            return this._isGrounded;
        }

        public velY() : number {
            return this._velY;
        }

        public update() : void {
            super.update();
            this._sensorsInAir = 0;
            this._accelerating = false;
            this._higherGround.y = 90000;
            this._lowerGround.y = -90000;

            if (this._hcLockTimer > 0)
                this._hcLockTimer --;
            //console.log("frame advance");

            if(controls.UP) 
                this.lookUp();      
                      
            if(controls.DOWN) 
                this.crouch();

            if (this._hcLockTimer <= 0) {
                if(controls.LEFT) 
                    this.moveLeft();
                else if(controls.RIGHT) 
                    this.moveRight();
            }
            if(controls.JUMP)
                this.jump();
            else {
                this._pressedJump = false;
                if (this._velY < -this._SHORTJUMPVELOCITY)
                    this._velY = -this._SHORTJUMPVELOCITY;
            }
            this.updateMovement();
            this._updateSensors();
        }

        private _startFalling():void {
            //console.log("fall");
            this._isGrounded = false;
            //slowly interpolate angles in the future: do not set it directly to 0
            this._mode = Quadrant.Floor;
            this._angle = 0;
            this.rotation = 0;
            this._gSpeed = 0;
            this._footRayCastLength = 20;
        }

        protected updateMovement() {
            //check for and apply air movement
            if (!this._isGrounded) {
                this._velY += this._GRAVITY;
                //we should never go too fast to pass through blocks
                if (Math.abs(this._velX) > this._MAXRUNSPEED)
                    this._velX = this._MAXRUNSPEED * Math.sign(this._velX);
                if (Math.abs(this._velY) > this._TERMINALVELOCITY)
                    this._velY = this._TERMINALVELOCITY * Math.sign(this._velY);
                //weird air drag
                if (this._velY < 0 && this._velY > -4 && Math.abs(this._velX) >= 0.125)
                    this._velX *= this._AIRDRAG;
            }
            else {
                if (!this._accelerating) {
                    if (Math.abs(this._gSpeed) < this._FRICTION)
                        this._gSpeed = 0;
                    else
                        this._gSpeed -= this._FRICTION * Math.sign(this._gSpeed);
                }
                if (this._gSpeed != 0) {
                    if (Math.abs(this._gSpeed) >= this._MAXRUNSPEED) {
                        if (this.currentAnimation!="run")
                            this.gotoAndPlay("run");
                        this.spriteSheet.getAnimation("run").speed = 1 / Math.max(8 - Math.abs(this._gSpeed), 1);
                        this._gSpeed = this._MAXRUNSPEED * Math.sign(this._gSpeed);
                    }
                    else if (this.currentAnimation!="walk")
                        this.gotoAndPlay("walk");
                    this.spriteSheet.getAnimation("walk").speed = 1 / Math.max(8 - Math.abs(this._gSpeed), 1);
                }
                else { //we're standing still if the other check wasn't true
                    if (this.currentAnimation!="stand")
                        this.gotoAndPlay("stand");
                } 
                //updating ground speed based on our slope angle
                this._angleRadians = this._toRadians(this._angle);
                this._gSpeed += this._SLOPEFACTOR * -Math.sin(this._angleRadians);
                this._velX = this._gSpeed*Math.cos(this._angleRadians);
                this._velY = this._gSpeed*-Math.sin(this._angleRadians);
                
                //if we're too slow when running on walls, we fall
                if (this._angle >= 45 && this._angle < 315 && Math.abs(this._gSpeed) < 2.5 && this._hcLockTimer <= 0) {
                    //console.log("start falling off of the wall");
                    this._hcLockTimer = 30;
                    this._startFalling();
                }
            }            
            this.x += this._velX;
            this.y += this._velY;            
        }

        private _toRadians (angle : number){
            return angle * (Math.PI / 180);
        }

        private _updateSensors() : void {
            if (this._angle < this._angleThreshold && this._angle >= -this._angleThreshold || this._angle >= 315) {
                this._mode = Quadrant.Floor;
                this._footSensorL = new Vector2(this.x - this._footOffset.x, this.y + this._footOffset.y);
                this._footSensorR = new Vector2(this.x + this._footOffset.x, this.y + this._footOffset.y);
            }
            else if (this._angle < this._angleThreshold * 3) {
                this._mode = Quadrant.RightWall;
                this._footSensorL = new Vector2(this.x + this._footOffset.y, this.y + this._footOffset.x);
                this._footSensorR = new Vector2(this.x + this._footOffset.y, this.y - this._footOffset.x);
            }
            else if (this._angle < this._angleThreshold * 5) {
                this._mode = Quadrant.Ceiling;
                this._footSensorL = new Vector2(this.x + this._footOffset.x, this.y - this._footOffset.y);
                this._footSensorR = new Vector2(this.x - this._footOffset.x, this.y - this._footOffset.y);
            }
            else {
                this._mode = Quadrant.LeftWall;
                this._footSensorL = new Vector2(this.x - this._footOffset.y, this.y + this._footOffset.x);
                this._footSensorR = new Vector2(this.x - this._footOffset.y, this.y - this._footOffset.x);
            }
            this._sideSensorL = new Vector2(this.x - this._sideOffset.x, this.y + this._sideOffset.y);
            this._sideSensorR = new Vector2(this.x + this._sideOffset.x, this.y + this._sideOffset.y);
            this._topSensorL = new Vector2(this.x - this._headOffset.x, this.y - this._headOffset.y);
            this._topSensorR = new Vector2(this.x + this._headOffset.x, this.y - this._headOffset.y);
        }

        public checkCollisions(tileGrid:Tile[][]) {
            //a lot of the time a sensor's tile will be empty and its method won't even run any code     

            //only do wall collisions if we're moving forwards
            if (this._velX < 0)
                tileGrid[Math.floor(this._sideSensorL.x / 16)][Math.floor(this._sideSensorL.y / 16)].onLeftWallCollision(this, this._sideSensorL);
            else if (this._velX > 0)
                tileGrid[Math.floor(this._sideSensorR.x / 16)][Math.floor(this._sideSensorR.y / 16)].onRightWallCollision(this, this._sideSensorR);

            //only check head collision if we're in the air
            if (!this._isGrounded)
            {
                this._checkHeadCollision(-this._footRayCastLength, this._topSensorR, tileGrid);
                this._checkHeadCollision(-this._footRayCastLength, this._topSensorL, tileGrid);
            }

            //always check if our feet would hit something
            if (this._velY >= 0 || this._isGrounded)
            {
                this._checkFootCollision(this._footRayCastLength, this._footSensorR, tileGrid);
                this._checkFootCollision(this._footRayCastLength, this._footSensorL, tileGrid);
            }
        }

        private _checkFootCollision(length : number, sensorPos : Vector2 , tileGrid:Tile[][]) {
            var px = Math.floor(sensorPos.x / 16);
            var py = Math.floor(sensorPos.y / 16);
            //instead of a real raycast (which I don't really know how to do anyway), check the few tiles where the raycast could return true
            if (this._mode == Quadrant.Floor) {
                if (!tileGrid[px][py].isEmpty)
                    tileGrid[px][py].onFloorCollision(this, sensorPos);
                else if (!tileGrid[px][Math.floor(py + (length * 0.3)/16)].isEmpty)
                    tileGrid[px][Math.floor(py + (length * 0.3)/16)].onFloorCollision(this, sensorPos);
                else if (!tileGrid[px][Math.floor(py + (length * 0.6)/16)].isEmpty)
                    tileGrid[px][Math.floor(py + (length * 0.6)/16)].onFloorCollision(this, sensorPos);
                else if (!tileGrid[px][Math.floor(py + length/16)].isEmpty)
                    tileGrid[px][Math.floor(py + length/16)].onFloorCollision(this, sensorPos);
                else
                    this._setAirSensor();
            }
            else if (this._mode == Quadrant.RightWall) {
                if (!tileGrid[px][py].isEmpty)
                    tileGrid[px][py].onFloorCollisionR(this, sensorPos);
                else if (!tileGrid[Math.floor(px + (length * 0.3)/16)][py].isEmpty)
                    tileGrid[Math.floor(px + (length * 0.3)/16)][py].onFloorCollisionR(this, sensorPos);
                else if (!tileGrid[Math.floor(px + (length * 0.6)/16)][py].isEmpty)
                    tileGrid[Math.floor(px + (length * 0.6)/16)][py].onFloorCollisionR(this, sensorPos);
                else if (!tileGrid[Math.floor(px + (length)/16)][py].isEmpty)
                    tileGrid[Math.floor(px + (length)/16)][py].onFloorCollisionR(this, sensorPos);
                else
                    this._setAirSensor();
            }
            else if (this._mode == Quadrant.Ceiling) {
                length *= -1;
                if (!tileGrid[px][py].isEmpty)
                    tileGrid[px][py].onFloorCollisionU(this, sensorPos);
                else if (!tileGrid[px][Math.floor(py + (length * 0.3)/16)].isEmpty)
                    tileGrid[px][Math.floor(py + (length * 0.3)/16)].onFloorCollisionU(this, sensorPos);
                else if (!tileGrid[px][Math.floor(py + (length * 0.6)/16)].isEmpty)
                    tileGrid[px][Math.floor(py + (length * 0.6)/16)].onFloorCollisionU(this, sensorPos);
                else if (!tileGrid[px][Math.floor(py + length/16)].isEmpty)
                    tileGrid[px][Math.floor(py + length/16)].onFloorCollisionU(this, sensorPos);
                else
                    this._setAirSensor();
            }
            else { //quadrant must be left wall
                length *= -1;
                if (!tileGrid[px][py].isEmpty)
                    tileGrid[px][py].onFloorCollisionL(this, sensorPos);
                else if (!tileGrid[Math.floor(px + (length * 0.3)/16)][py].isEmpty)
                    tileGrid[Math.floor(px + (length * 0.3)/16)][py].onFloorCollisionL(this, sensorPos);
                else if (!tileGrid[Math.floor(px + (length * 0.6)/16)][py].isEmpty)
                    tileGrid[Math.floor(px + (length * 0.6)/16)][py].onFloorCollisionL(this, sensorPos);
                else if (!tileGrid[Math.floor(px + (length)/16)][py].isEmpty)
                    tileGrid[Math.floor(px + (length)/16)][py].onFloorCollisionL(this, sensorPos);
                else
                    this._setAirSensor();
            }
        }

        private _checkHeadCollision(length : number, sensorPos : Vector2 , tileGrid:Tile[][]) {
            var px = Math.floor(sensorPos.x / 16);
            var py = Math.floor(sensorPos.y / 16);

            //instead of a real raycast (which I don't really know how to do anyway), check the few tiles where the raycast could return true
            if (!tileGrid[px][py].isEmpty)
                tileGrid[px][py].onCeilingCollision(this, sensorPos);
            else if (!tileGrid[px][Math.floor(py + (length * 0.3)/16)].isEmpty)
                tileGrid[px][Math.floor(py + (length * 0.3)/16)].onCeilingCollision(this, sensorPos);
            else if (!tileGrid[px][Math.floor(py + (length * 0.6)/16)].isEmpty)
                tileGrid[px][Math.floor(py + (length * 0.6)/16)].onCeilingCollision(this, sensorPos);
            else if (!tileGrid[px][Math.floor(py + length/16)].isEmpty)
                tileGrid[px][Math.floor(py + length/16)].onCeilingCollision(this, sensorPos);
            this._updateSensors();
        }

        public collideWithRightGround(groundHeight : number, angle : number) : void {
            if (groundHeight < this._higherGround.y) {
                this._higherGround.y = groundHeight;
                this._isGrounded = true;
                this._footRayCastLength = 36;
                this.x = groundHeight - 20;
                this._angle = angle;
                this.rotation = -angle;
            }
        }

        public collideWithLeftGround(groundHeight : number, angle : number) : void {
            if (groundHeight > this._lowerGround.y) {
                this._lowerGround.y = groundHeight;
                this._isGrounded = true;
                this._footRayCastLength = 36;
                this.x = groundHeight + 20;
                this._angle = angle;
                this.rotation = -angle;
            }
        }


        public collideWithGround(groundHeight : number, angle : number) : void {
            if (groundHeight < this._higherGround.y) {
                this._higherGround.y = groundHeight;
                this._footRayCastLength = 36;
                this.y = groundHeight - 20;
                this._angle = angle;
                this.rotation = -angle;
            }
            if (!this._isGrounded) { //when we land on the ground 
                //on very flat surfaces, just carry over X velocity
                if (this._angle <= 22 || this._angle >= 338)
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
        
        public collideWithUpperGround(groundHeight : number, angle : number) : void {
            if (groundHeight > this._lowerGround.y) {//this._angle >= this._angleThreshold * 3)
                this._lowerGround.y = groundHeight;
                this._isGrounded = true;
                this._footRayCastLength = 36;
                this.y = groundHeight + 20;
                this._angle = angle;
                this.rotation = -angle;
            }
        }

        public collideWithCeiling(ceilingHeight : number, angle : number) : void {
            if (this.y < ceilingHeight + 16) {
                this.y = ceilingHeight + 16;
                if (this._velY < 0) {
                    if (angle >= 224 || angle <= 135) {
                        this.collideWithUpperGround(ceilingHeight, 180);
                        this._gSpeed = this._velY * -Math.sign(Math.sin(this._toRadians(angle)));
                    }
                    else
                       this._velY = 0;
                }
            }
        }

        public collideWithLeftWall(x : number) : void {
            this._gSpeed = 0;
            this._velX = 0;
            this.x = x + this._sideOffset.x;
            this._updateSensors();
        }

        public collideWithRightWall(x : number) : void {
            this._gSpeed = 0;
            this._velX = 0;
            this.x = x - this._sideOffset.x;
            this._updateSensors();
        }

        public lookUp() {

        }

        public crouch() {

        }

        public moveRight() {
            if (this._isGrounded) {
                if (this._gSpeed < 0)
                    this._gSpeed += this._DECELERATION;
                else
                    this._gSpeed += this._GROUNDACCELERATION;
            }
            else {
                this._velX += this._AIRACCELERATION;
                this._gSpeed += this._AIRACCELERATION;
            }
            this._accelerating = true;
            this.scaleX = 1;
        }

        public moveLeft() {
            if (this._isGrounded) {
                if (this._gSpeed > 0)
                    this._gSpeed -= this._DECELERATION;
                else
                    this._gSpeed -= this._GROUNDACCELERATION;
            }
            else {
                this._velX -= this._AIRACCELERATION;
                this._gSpeed -= this._AIRACCELERATION;
            }
            this._accelerating = true;
            this.scaleX = -1;
        }

        public jump() {
            if (this._isGrounded && !this._pressedJump) {
                this._startFalling();
                this._velX -= this._JUMPVELOCITY * Math.sin(this._angleRadians);
                this._velY -= this._JUMPVELOCITY * Math.cos(this._angleRadians);
                this.gotoAndPlay("jump");
                this.spriteSheet.getAnimation("jump").speed = 1 / (5-Math.abs(this._gSpeed));
            }
            this._pressedJump = true;
        }

        private _onKeyDown(event : KeyboardEvent) {
            switch(event.keyCode) {
                case keys.W:
                    console.log("W key pressed");
                    controls.UP = true;
                    break;
                case keys.S:
                    console.log("S key pressed");
                    controls.DOWN = true;
                    break;
                case keys.A:
                    console.log("A key pressed");
                    controls.LEFT = true;
                    break;
                case keys.D:
                    console.log("D key pressed");
                    controls.RIGHT = true;
                    break;                
                case keys.SPACE:
                    console.log("SPACEBAR pressed");
                    controls.JUMP = true;
                    break;
                case keys.ESC:
                    console.log("ESC key pressed");
                    togglePause();
                    break;
            }
        }

        private _onKeyUp(event : KeyboardEvent) {
             switch(event.keyCode) {
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