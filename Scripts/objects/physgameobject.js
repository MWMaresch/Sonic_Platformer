var objects;
(function (objects) {
    class PhysGameObject extends objects.GameObject {
        constructor(imageString, x, y) {
            super(imageString, x, y);
            this._gravity = 0.3;
            this._isGrounded = false;
            this._numAirSensors = 0;
            this._terminalVelocity = 16;
            this.start();
        }
        start() { super.start(); }
        update() {
            super.update();
            this._numAirSensors = 0;
            if (!this._isGrounded)
                this._velY += this._gravity;
            if (this._velY > this._terminalVelocity)
                this._velY = this._terminalVelocity;
        }
        _setAirSensor() {
            this._numAirSensors++;
            if (this._numAirSensors >= 2)
                this._isGrounded = false;
        }
        detectLeftLedge() { this._setAirSensor(); }
        detectRightLedge() { this._setAirSensor(); }
        collideWithGround(groundHeight, angle) {
            super.collideWithGround(groundHeight, angle);
            this._isGrounded = true;
        }
    }
    objects.PhysGameObject = PhysGameObject;
})(objects || (objects = {}));
//# sourceMappingURL=physgameobject.js.map