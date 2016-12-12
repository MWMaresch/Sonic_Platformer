module objects {
    export class BlueNewtron extends objects.PhysGameObject {

        private _speed: number = 2;
        private _actionTimer: number = 120;
        private _isFullyVisible: boolean = false;
        private _gravityEnabled: boolean = false;

        constructor(x: number, y: number) {
            super("bNewtronAppear", x, y);
            this.visible = false;
        }

        public update(): void {
            if (this.visible) {
                this._actionTimer++;
                if (this._actionTimer == 20)
                    this._isFullyVisible = true;
                else if (this._actionTimer == 60) {
                    console.log("enabled gravity");
                    this._gravityEnabled = true;
                    this.height = 16;
                }
            }
            if (this._gravityEnabled) 
                super.update();
        }

        public collideWithGround(groundHeight: number, angle: number): void {
            if (this.currentAnimation != "bNewtronMove") {
                this.gotoAndPlay("bNewtronMove");
                this._velX = -this._speed;
            }
            super.collideWithGround(groundHeight, angle);
        }

        public checkCollisionWithPlayer(player: objects.Player) {
            if (!this.visible && Math.abs(this.x - player.x) < 128) {
                this.visible = true;
                this.gotoAndPlay("bNewtronAppear");
                this._actionTimer = 0;
            }
            else if (this._isFullyVisible) {
                if (collision.boxCheck(player, this)) {
                    if (player.isRolling) {
                        player.rebound(this.y);
                        this.destroy();
                    }
                    else
                        player.getHurt(this.x);
                }
            }
        }
        
        //we don't want to fall off of ledges or stop at walls
        protected _setAirSensor() { }
        protected detectLeftLedge() { }
        protected detectRightLedge() { }
        public collideWithRightWall(x: number) { }
        public collideWithLeftWall(x: number) { }
    }
}