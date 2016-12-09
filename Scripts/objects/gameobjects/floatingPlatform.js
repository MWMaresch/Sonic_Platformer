var objects;
(function (objects) {
    class FloatingPlatform extends objects.GameObject {
        //to make sure our framedata was accurate to the original
        //private _distMoved: number;
        constructor(x, y, moveHorizontally, moveVertically) {
            super("platform", x, y);
            this._maxSpeed = 2;
            this._maxMoveDistance = 128;
            this._movementTimer = 0;
            this._fallOnCollide = false;
            this._didCollide = false;
            if (moveHorizontally) {
                this._velXmodifier = 1 / 32;
                this._velYmodifier = 0;
            }
            else if (moveVertically) {
                this._velYmodifier = 1 / 32;
                this._velXmodifier = 0;
            }
            else {
                this._fallOnCollide = true;
                this._velYmodifier = 0;
                this._velXmodifier = 0;
            }
            this.width -= 4;
            //this._distMoved = 0;
        }
        update() {
            if (!this._fallOnCollide) {
                this._velX += this._velXmodifier;
                this._velY += this._velYmodifier;
                if (Math.abs(this._velX) > this._maxSpeed) {
                    this._velX = Math.sign(this._velX) * this._maxSpeed;
                }
                if (Math.abs(this._velY) > this._maxSpeed) {
                    this._velY = Math.sign(this._velY) * this._maxSpeed;
                }
                this._movementTimer++;
                //turn around every 128 frames
                if (this._movementTimer % this._maxMoveDistance == 0) {
                    //console.log("dist moved: " + this._distMoved);
                    //this._distMoved = 0;
                    this._velXmodifier *= -1;
                    this._velYmodifier *= -1;
                }
            }
            else if (this._didCollide) {
                this._movementTimer++;
                if (this._movementTimer >= 60)
                    this._velY += 0.21;
            }
            this.x += this._velX;
            this.y += this._velY;
        }
        checkCollisionWithPlayer(player) {
            if (player.velY >= 0 && player.y < this.topLine && (collision.sensorBoxCheck(player.leftFootSensor, this)
                || collision.sensorBoxCheck(player.rightFootSensor, this))) {
                player.addVelocity(this._velX, this._velY);
                player.collideWithGround(this.topLine + 4, 0);
                this._didCollide = true;
            }
        }
    }
    objects.FloatingPlatform = FloatingPlatform;
})(objects || (objects = {}));
//# sourceMappingURL=floatingplatform.js.map