var objects;
(function (objects) {
    class Player extends objects.GameObject {
        constructor(imageString, x, y) {
            super(imageString, "");
            //constant variables
            //if only the const or readonly keywords could be used here
            this._GROUNDACCELERATION = 0.046875; //applied when moving left or right
            this._AIRACCELERATION = 0.09375; //applied when moving left or right
            this._DECELERATION = 0.5; //applied when turning around
            this._FRICTION = 0.046875; //applied when no horizontal input is detected
            this._MAXRUNSPEED = 6; //should never be more than the size of a single tile, which is 16
            this._TERMINALVELOCITY = 15; //should never be more than the size of a single tile, which is 16
            this._SLOPEFACTOR = 0.125; //should never be more than the size of a single tile, which is 16
            this._GRAVITY = 0.21875;
            this._JUMPVELOCITY = 6;
            this._SHORTJUMPVELOCITY = 4;
            this._isGrounded = false;
            this._accelerating = false;
            this._pressedJump = false;
            this._topSensorL = new objects.Vector2;
            this._topSensorR = new objects.Vector2;
            this._footOffset = new objects.Vector2(9, 0); //from center
            this._footRayCastLength = 36;
            this._headOffset = new objects.Vector2(9, 0); //from center
            this._sideOffset = new objects.Vector2(10, 4); //from center
            this._angleThreshold = 45;
            this._angleRadians = 0;
            this._layer = 1;
            //other variables
            this._velX = 0;
            this._velY = 0;
            this._gSpeed = 0;
            this._angle = 0;
            this._hcLockTimer = 0;
            this._higherGround = new objects.Vector2(0, 0);
            this._lowerGround = new objects.Vector2(0, 0);
            this.x = x;
            this.y = y;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
        }
        _setAirSensor() {
            this._sensorsInAir++;
            if (this._sensorsInAir >= 2) {
                console.log("sensors detected air");
                this._startFalling();
            }
        }
        update() {
            super.update();
            this._sensorsInAir = 0;
            this._accelerating = false;
            this._higherGround.y = 90000;
            this._lowerGround.y = -90000;
            if (this._hcLockTimer > 0)
                this._hcLockTimer--;
            console.log("frame advance");
            if (controls.UP)
                this.lookUp();
            if (controls.DOWN)
                this.crouch();
            if (this._hcLockTimer <= 0) {
                if (controls.LEFT)
                    this.moveLeft();
                else if (controls.RIGHT)
                    this.moveRight();
            }
            if (controls.JUMP)
                this.jump();
            else {
                this._pressedJump = false;
                if (this._velY < -this._SHORTJUMPVELOCITY)
                    this._velY = -this._SHORTJUMPVELOCITY;
            }
            this.updateMovement();
        }
        _startFalling() {
            console.log("fall");
            this._isGrounded = false;
            //slowly interpolate angles in the future: do not set it directly to 0
            this._angle = 0;
            this.rotation = 0;
            this._gSpeed = 0;
            this._footRayCastLength = 20;
        }
        updateMovement() {
            //check for and apply air movement
            if (!this._isGrounded) {
                this._velY += this._GRAVITY;
                if (Math.abs(this._velX) >= this._MAXRUNSPEED)
                    this._velX = this._MAXRUNSPEED * Math.sign(this._velX);
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
                        if (this.currentAnimation != "run")
                            this.gotoAndPlay("run");
                        this.spriteSheet.getAnimation("run").speed = 1 / Math.max(8 - Math.abs(this._gSpeed), 1);
                        this._gSpeed = this._MAXRUNSPEED * Math.sign(this._gSpeed);
                    }
                    else if (this.currentAnimation != "walk")
                        this.gotoAndPlay("walk");
                    this.spriteSheet.getAnimation("walk").speed = 1 / Math.max(8 - Math.abs(this._gSpeed), 1);
                }
                else {
                    if (this.currentAnimation != "stand")
                        this.gotoAndPlay("stand");
                }
                //updating ground speed based on our slope angle
                this._angleRadians = this._angle * (Math.PI / 180);
                this._gSpeed += this._SLOPEFACTOR * -Math.sin(this._angleRadians);
                this._velX = this._gSpeed * Math.cos(this._angleRadians);
                this._velY = this._gSpeed * -Math.sin(this._angleRadians);
                //if we're too slow when running on walls, we fall
                if (this._angle >= 45 && this._angle < 315 && Math.abs(this._gSpeed) < 2.5 && this._hcLockTimer <= 0) {
                    console.log("start falling off of the wall");
                    this._hcLockTimer = 30;
                }
            }
            if (Math.abs(this._velY) > this._TERMINALVELOCITY) {
                this._velY = this._TERMINALVELOCITY * Math.sign(this._velY);
            }
            this.x += this._velX;
            this.y += this._velY;
            this._updateSensors();
        }
        _updateSensors() {
            if (this._angle < this._angleThreshold && this._angle >= -this._angleThreshold || this._angle >= 315) {
                this._footSensorL = new objects.Vector2(this.x - this._footOffset.x, this.y + this._footOffset.y);
                this._footSensorR = new objects.Vector2(this.x + this._footOffset.x, this.y + this._footOffset.y);
            }
            else if (this._angle < this._angleThreshold * 3) {
                this._footSensorL = new objects.Vector2(this.x + this._footOffset.y, this.y + this._footOffset.x);
                this._footSensorR = new objects.Vector2(this.x + this._footOffset.y, this.y - this._footOffset.x);
            }
            else if (this._angle < this._angleThreshold * 5) {
                this._footSensorL = new objects.Vector2(this.x + this._footOffset.x, this.y - this._footOffset.y);
                this._footSensorR = new objects.Vector2(this.x - this._footOffset.x, this.y - this._footOffset.y);
            }
            else {
                this._footSensorL = new objects.Vector2(this.x - this._footOffset.y, this.y + this._footOffset.x);
                this._footSensorR = new objects.Vector2(this.x - this._footOffset.y, this.y - this._footOffset.x);
            }
            this._sideSensorL = new objects.Vector2(this.x - this._sideOffset.x, this.y + this._sideOffset.y);
            this._sideSensorR = new objects.Vector2(this.x + this._sideOffset.x, this.y + this._sideOffset.y);
            this._topSensorL = new objects.Vector2(this.x - this._headOffset.x, this.y - this._headOffset.y);
            this._topSensorR = new objects.Vector2(this.x + this._headOffset.x, this.y - this._headOffset.y);
        }
        checkCollisions(tileGrid) {
            //a lot of the time a sensor's tile will be empty and its method won't even run any code     
            //only do wall collisions if we're moving forwards
            if (this._velX < 0)
                tileGrid[Math.floor(this._sideSensorL.x / 16)][Math.floor(this._sideSensorL.y / 16)].onLeftWallCollision(this, this._sideSensorL);
            else if (this._velX > 0)
                tileGrid[Math.floor(this._sideSensorR.x / 16)][Math.floor(this._sideSensorR.y / 16)].onRightWallCollision(this, this._sideSensorR);
            //only check head collision if we're in the air
            if (!this._isGrounded) {
                this._checkHeadCollision(-this._footRayCastLength, this._topSensorR, tileGrid);
                this._checkHeadCollision(-this._footRayCastLength, this._topSensorL, tileGrid);
            }
            //always check if our feet would hit something
            if (this._velY >= 0 || this._isGrounded) {
                this._checkFootCollision(this._footRayCastLength, this._footSensorR, tileGrid);
                this._checkFootCollision(this._footRayCastLength, this._footSensorL, tileGrid);
            }
        }
        _checkFootCollision(length, sensorPos, tileGrid) {
            var px = Math.floor(sensorPos.x / 16);
            var py = Math.floor(sensorPos.y / 16);
            //instead of a real raycast (which I don't really know how to do anyway), check the few tiles where the raycast could return true
            //I should remove brackets to save lines
            if (this._angle < this._angleThreshold && this._angle >= -this._angleThreshold || this._angle >= 315) {
                if (!tileGrid[px][py].isEmpty) {
                    tileGrid[px][py].onFloorCollision(this, sensorPos);
                }
                else if (!tileGrid[px][Math.floor(py + (length * 0.3) / 16)].isEmpty) {
                    tileGrid[px][Math.floor(py + (length * 0.3) / 16)].onFloorCollision(this, sensorPos);
                }
                else if (!tileGrid[px][Math.floor(py + (length * 0.6) / 16)].isEmpty) {
                    tileGrid[px][Math.floor(py + (length * 0.6) / 16)].onFloorCollision(this, sensorPos);
                }
                else if (!tileGrid[px][Math.floor(py + length / 16)].isEmpty) {
                    tileGrid[px][Math.floor(py + length / 16)].onFloorCollision(this, sensorPos);
                }
                else {
                    this._setAirSensor();
                }
            }
            else if (this._angle < this._angleThreshold * 3) {
                if (!tileGrid[px][py].isEmpty) {
                    tileGrid[px][py].onFloorCollisionR(this, sensorPos);
                }
                else if (!tileGrid[Math.floor(px + (length * 0.3) / 16)][py].isEmpty) {
                    tileGrid[Math.floor(px + (length * 0.3) / 16)][py].onFloorCollisionR(this, sensorPos);
                }
                else if (!tileGrid[Math.floor(px + (length * 0.6) / 16)][py].isEmpty) {
                    tileGrid[Math.floor(px + (length * 0.6) / 16)][py].onFloorCollisionR(this, sensorPos);
                }
                else if (!tileGrid[Math.floor(px + (length) / 16)][py].isEmpty) {
                    tileGrid[Math.floor(px + (length) / 16)][py].onFloorCollisionR(this, sensorPos);
                }
                else {
                    this._setAirSensor();
                }
            }
            else if (this._angle < this._angleThreshold * 5) {
                length *= -1;
                if (!tileGrid[px][py].isEmpty) {
                    tileGrid[px][py].onFloorCollisionU(this, sensorPos);
                }
                else if (!tileGrid[px][Math.floor(py + (length * 0.3) / 16)].isEmpty) {
                    tileGrid[px][Math.floor(py + (length * 0.3) / 16)].onFloorCollisionU(this, sensorPos);
                }
                else if (!tileGrid[px][Math.floor(py + (length * 0.6) / 16)].isEmpty) {
                    tileGrid[px][Math.floor(py + (length * 0.6) / 16)].onFloorCollisionU(this, sensorPos);
                }
                else if (!tileGrid[px][Math.floor(py + length / 16)].isEmpty) {
                    tileGrid[px][Math.floor(py + length / 16)].onFloorCollisionU(this, sensorPos);
                }
                else {
                    this._setAirSensor();
                }
            }
            else {
                length *= -1;
                if (!tileGrid[px][py].isEmpty) {
                    tileGrid[px][py].onFloorCollisionL(this, sensorPos);
                }
                else if (!tileGrid[Math.floor(px + (length * 0.3) / 16)][py].isEmpty) {
                    tileGrid[Math.floor(px + (length * 0.3) / 16)][py].onFloorCollisionL(this, sensorPos);
                }
                else if (!tileGrid[Math.floor(px + (length * 0.6) / 16)][py].isEmpty) {
                    tileGrid[Math.floor(px + (length * 0.6) / 16)][py].onFloorCollisionL(this, sensorPos);
                }
                else if (!tileGrid[Math.floor(px + (length) / 16)][py].isEmpty) {
                    tileGrid[Math.floor(px + (length) / 16)][py].onFloorCollisionL(this, sensorPos);
                }
                else {
                    this._setAirSensor();
                }
            }
        }
        _checkHeadCollision(length, sensorPos, tileGrid) {
            var px = Math.floor(sensorPos.x / 16);
            var py = Math.floor(sensorPos.y / 16);
            //instead of a real raycast (which I don't really know how to do anyway), check the few tiles where the raycast could return true
            //I should remove brackets to save lines
            if (!tileGrid[px][py].isEmpty) {
                tileGrid[px][py].onCeilingCollision(this, sensorPos);
            }
            else if (!tileGrid[px][Math.floor(py + (length * 0.3) / 16)].isEmpty) {
                tileGrid[px][Math.floor(py + (length * 0.3) / 16)].onCeilingCollision(this, sensorPos);
            }
            else if (!tileGrid[px][Math.floor(py + (length * 0.6) / 16)].isEmpty) {
                tileGrid[px][Math.floor(py + (length * 0.6) / 16)].onCeilingCollision(this, sensorPos);
            }
            else if (!tileGrid[px][Math.floor(py + length / 16)].isEmpty) {
                tileGrid[px][Math.floor(py + length / 16)].onCeilingCollision(this, sensorPos);
            }
            this._updateSensors();
        }
        //this is hardcoded only for now
        warpRight(distance) {
            this.x += distance * 16;
        }
        collideWithRightGround(groundHeight, angle) {
            if (groundHeight < this._higherGround.y) {
                this._higherGround.y = groundHeight;
                this._isGrounded = true;
                this._footRayCastLength = 36;
                this.x = groundHeight - 20;
                this._angle = angle;
                this.rotation = -angle;
            }
        }
        collideWithLeftGround(groundHeight, angle) {
            if (groundHeight > this._lowerGround.y) {
                this._lowerGround.y = groundHeight;
                this._isGrounded = true;
                this._footRayCastLength = 36;
                this.x = groundHeight + 20;
                this._angle = angle;
                this.rotation = -angle;
            }
        }
        collideWithUpperGround(groundHeight, angle) {
            if (groundHeight > this._lowerGround.y) {
                this._lowerGround.y = groundHeight;
                this._isGrounded = true;
                this._footRayCastLength = 36;
                this.y = groundHeight + 20;
                this._angle = angle;
                this.rotation = -angle;
            }
        }
        collideWithGround(groundHeight, angle) {
            if (groundHeight < this._higherGround.y) {
                this._higherGround.y = groundHeight;
                this._footRayCastLength = 36;
                this.y = groundHeight - 20;
                this._angle = angle;
                this.rotation = -angle;
            }
            if (!this._isGrounded) {
                if (this._angle <= 22 || this._angle >= 338) {
                    this._gSpeed = this._velX;
                }
                else if (this._angle >= 314 || this._angle <= 45) {
                    if (Math.abs(this._velX) > this._velY) {
                        this._gSpeed = this._velX;
                    }
                    else {
                        this._angleRadians = this._angle * (Math.PI / 180);
                        this._gSpeed = this._velY * 0.5 * -Math.sign(Math.sin(this._angleRadians));
                    }
                }
                this._isGrounded = true;
            }
        }
        collideWithCeiling(ceilingHeight) {
            if (this.y < ceilingHeight + 16) {
                this.y = ceilingHeight + 16;
                if (this._velY < 0)
                    this._velY = 0;
            }
        }
        collideWithLeftWall(x) {
            this._gSpeed = 0;
            this._velX = 0;
            this.x = x + this._sideOffset.x;
            this._updateSensors();
        }
        collideWithRightWall(x) {
            this._gSpeed = 0;
            this._velX = 0;
            this.x = x - this._sideOffset.x;
            this._updateSensors();
        }
        lookUp() {
        }
        crouch() {
        }
        moveRight() {
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
        moveLeft() {
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
        jump() {
            if (this._isGrounded && !this._pressedJump) {
                this._startFalling();
                this._velX -= this._JUMPVELOCITY * Math.sin(this._angleRadians);
                this._velY -= this._JUMPVELOCITY * Math.cos(this._angleRadians);
                this.gotoAndPlay("jump");
            }
            this._pressedJump = true;
        }
        _onKeyDown(event) {
            switch (event.keyCode) {
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
        _onKeyUp(event) {
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
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map