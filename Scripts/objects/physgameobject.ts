module objects {
    export class PhysGameObject extends objects.GameObject {

        protected _gravity: number = 0.3;
        protected _isGrounded: boolean = false;
        protected _numAirSensors: number = 0;
        protected _terminalVelocity: number = 16;

        constructor(imageString: string, x?: number, y?: number) {
            super(imageString, x, y);
            this.start();
        }

        public start(): void { super.start(); }

        public update(): void {
            super.update();
            this._numAirSensors = 0;
            if (!this._isGrounded)
                this._velY += this._gravity;
            if (this._velY > this._terminalVelocity)
                this._velY = this._terminalVelocity;
        }
        protected _setAirSensor() {
            this._numAirSensors++;
            if (this._numAirSensors >= 2)
                this._isGrounded = false;
        }

        protected detectLeftLedge() { this._setAirSensor() }

        protected detectRightLedge() { this._setAirSensor() }

        public collideWithGround(groundHeight: number, angle: number): void {
            super.collideWithGround(groundHeight, angle);
            this._isGrounded = true;
        }
    }
}