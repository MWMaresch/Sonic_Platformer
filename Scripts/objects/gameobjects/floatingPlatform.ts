module objects {
    export class FloatingPlatform extends objects.GameObject {

        private _maxSpeed: number = 2;
        private _maxMoveDistance: number = 128;
        private _movementTimer: number = 0;
        private _velYmodifier: number;
        private _velXmodifier: number;
        private _fallOnCollide: boolean = false;
        private _didCollide: boolean = false;
        //to make sure our framedata was accurate to the original
        //private _distMoved: number;

        constructor(x: number, y: number, moveHorizontally: boolean, moveVertically: boolean) {
            super("platform", x, y);
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

        public update(): void {
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
                //this._distMoved += Math.abs(this._velX);
            }
            else if (this._didCollide){
                this._movementTimer ++;
                if (this._movementTimer >= 60)
                    this._velY += 0.21;
            }
            this.x += this._velX;
            this.y += this._velY;
        }

        public checkCollisionWithPlayer(player: objects.Player) {
            if (player.velY >= 0 && player.y < this.topLine && (collision.sensorBoxCheck(player.leftFootSensor, this)
                || collision.sensorBoxCheck(player.rightFootSensor, this))) {
                player.addVelocity(this._velX, this._velY);
                player.collideWithGround(this.topLine + 4, 0);
                this._didCollide = true;
            }
        }
    }
}