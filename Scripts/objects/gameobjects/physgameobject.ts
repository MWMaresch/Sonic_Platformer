module objects {
    export class PhysGameObject extends objects.GameObject {

        protected _gravity: number = 0.3;
        protected _isGrounded: boolean = false;
        protected _numAirSensors: number = 0;
        protected _terminalVelocity: number = 16;

        constructor(imageString: string, x?: number, y?: number) {
            super(imageString, x, y);
            this._sideSensorL = new Vector2(this.x - this.width / 2, (this.y + this.height / 2) - 14);
            this._sideSensorR = new Vector2(this.x + this.width / 2, (this.y + this.height / 2) - 14);
            this._footSensorL = new Vector2(this._sideSensorL.x + 2, (this.y + this.height / 2) - 2)
            this._footSensorR = new Vector2(this._sideSensorR.x - 2, (this.y + this.height / 2) - 2)
        }

        public update(): void {
            this._numAirSensors = 0;
            if (!this._isGrounded) {
                this._velY += this._gravity;
                if (this._velY > this._terminalVelocity)
                    this._velY = this._terminalVelocity;
            }
            //updating sensor positions
            this._sideSensorL.x = this.x - this.width / 2;
            this._sideSensorR.x = this.x + this.width / 2;
            this._sideSensorL.y = (this.y + this.height / 2) - 14;
            this._sideSensorR.y = (this.y + this.height / 2) - 14;

            this._footSensorL.x = this._sideSensorL.x + 2;
            this._footSensorR.x = this._sideSensorR.x - 2;
            this._footSensorL.y = (this.y + this.height / 2) + 1;
            this._footSensorR.y = (this.y + this.height / 2) + 1;
            super.update();
        }

        protected _setAirSensor() {
            this._numAirSensors++;
            if (this._numAirSensors >= 2)
                this._isGrounded = false;
        }

        protected detectLeftLedge() { this._setAirSensor(); }

        protected detectRightLedge() { this._setAirSensor(); }

        public collideWithGround(groundHeight: number, angle: number): void {
            if (groundHeight < this._higherGround) {
                this._higherGround = groundHeight;
                this.y = groundHeight - this.height / 2;
                //some objects might want to set their angle to the ground angle, others don't have to
            } this._isGrounded = true;
        }

        public checkCollisionWithGrid(tileGrid: Tile[][]) {
            //only do wall collisions if we're moving forwards
            if (this._velX < 0 && tileGrid[Math.floor(this._sideSensorL.x / 16)][Math.floor(this._sideSensorL.y / 16)] != null)
                tileGrid[Math.floor(this._sideSensorL.x / 16)][Math.floor(this._sideSensorL.y / 16)].onLeftWallCollision(this, this._sideSensorL);
            else if (this._velX > 0 && tileGrid[Math.floor(this._sideSensorR.x / 16)][Math.floor(this._sideSensorR.y / 16)] != null)
                tileGrid[Math.floor(this._sideSensorR.x / 16)][Math.floor(this._sideSensorR.y / 16)].onRightWallCollision(this, this._sideSensorR);

            this._higherGround = 90000;
            //always check if our feet would hit something
            //left foot
            if (tileGrid[Math.floor(this._footSensorL.x / 16)][Math.floor(this._footSensorL.y / 16)] != null)
                tileGrid[Math.floor(this._footSensorL.x / 16)][Math.floor(this._footSensorL.y / 16)].onFloorCollision(this, this._footSensorL);
            else
                this.detectLeftLedge();
            //right foot
            if (tileGrid[Math.floor(this._footSensorR.x / 16)][Math.floor(this._footSensorR.y / 16)] != null)
                tileGrid[Math.floor(this._footSensorR.x / 16)][Math.floor(this._footSensorR.y / 16)].onFloorCollision(this, this._footSensorR);
            else
                this.detectRightLedge();
        }
    }
}