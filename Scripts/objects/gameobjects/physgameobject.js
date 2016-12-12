var objects;
(function (objects) {
    class PhysGameObject extends objects.GameObject {
        constructor(imageString, x, y) {
            super(imageString, x, y);
            this._gravity = 0.2;
            this._isGrounded = false;
            this._numAirSensors = 0;
            this._terminalVelocity = 16;
            this._sideSensorL = new objects.Vector2(this.x - this.width / 2, (this.y + this.height / 2) - 14);
            this._sideSensorR = new objects.Vector2(this.x + this.width / 2, (this.y + this.height / 2) - 14);
            this._footSensorL = new objects.Vector2(this._sideSensorL.x + 2, (this.y + this.height / 2) - 2);
            this._footSensorR = new objects.Vector2(this._sideSensorR.x - 2, (this.y + this.height / 2) - 2);
        }
        update() {
            this._numAirSensors = 0;
            if (!this._isGrounded) {
                this._velY += this._gravity;
                if (this._velY > this._terminalVelocity)
                    this._velY = this._terminalVelocity;
            }
            this.updateSensors();
            super.update();
        }
        updateSensors() {
            //updating sensor positions
            this._sideSensorL.x = this.x - this.width / 2;
            this._sideSensorR.x = this.x + this.width / 2;
            this._sideSensorL.y = (this.y + this.height / 2) - 14;
            this._sideSensorR.y = (this.y + this.height / 2) - 14;
            this._footSensorL.x = this._sideSensorL.x + 1;
            this._footSensorR.x = this._sideSensorR.x - 1;
            this._footSensorL.y = (this.y + this.height / 2);
            this._footSensorR.y = (this.y + this.height / 2);
        }
        _setAirSensor() {
            this._numAirSensors++;
            if (this._numAirSensors >= 2)
                this._isGrounded = false;
        }
        detectLeftLedge() { this._setAirSensor(); }
        detectRightLedge() { this._setAirSensor(); }
        collideWithGround(groundHeight, angle) {
            if (groundHeight < this._higherGround) {
                this._higherGround = groundHeight;
                this.y = groundHeight - this.height / 2;
            }
            this._isGrounded = true;
            this._velY = 0;
        }
        checkCollisionWithGrid(tileGrid) {
            if (this.x > 100) {
                //only do wall collisions if we're moving forwards
                if (this._velX < 0 && tileGrid[Math.floor(this._sideSensorL.x / 16)][Math.floor(this._sideSensorL.y / 16)] != null)
                    tileGrid[Math.floor(this._sideSensorL.x / 16)][Math.floor(this._sideSensorL.y / 16)].onLeftWallCollision(this, this._sideSensorL);
                else if (this._velX > 0 && tileGrid[Math.floor(this._sideSensorR.x / 16)][Math.floor(this._sideSensorR.y / 16)] != null)
                    tileGrid[Math.floor(this._sideSensorR.x / 16)][Math.floor(this._sideSensorR.y / 16)].onRightWallCollision(this, this._sideSensorR);
                this._higherGround = 90000;
                //always check if our feet would hit something
                //left foot
                if (tileGrid[Math.floor(this._footSensorL.x / 16)][Math.floor((this._footSensorL.y - 1) / 16)] != null)
                    tileGrid[Math.floor(this._footSensorL.x / 16)][Math.floor((this._footSensorL.y - 1) / 16)].onFloorCollision(this, this._footSensorL);
                else if (tileGrid[Math.floor(this._footSensorL.x / 16)][Math.floor((this._footSensorL.y + 15) / 16)] != null)
                    tileGrid[Math.floor(this._footSensorL.x / 16)][Math.floor((this._footSensorL.y + 15) / 16)].onFloorCollision(this, this._footSensorL);
                else
                    this.detectLeftLedge();
                //right foot
                if (tileGrid[Math.floor(this._footSensorR.x / 16)][Math.floor((this._footSensorR.y - 1) / 16)] != null)
                    tileGrid[Math.floor(this._footSensorR.x / 16)][Math.floor((this._footSensorR.y - 1) / 16)].onFloorCollision(this, this._footSensorR);
                else if (tileGrid[Math.floor(this._footSensorR.x / 16)][Math.floor((this._footSensorR.y + 15) / 16)] != null)
                    tileGrid[Math.floor(this._footSensorR.x / 16)][Math.floor((this._footSensorR.y + 15) / 16)].onFloorCollision(this, this._footSensorR);
                else
                    this.detectRightLedge();
            }
        }
    }
    objects.PhysGameObject = PhysGameObject;
})(objects || (objects = {}));
//# sourceMappingURL=physgameobject.js.map