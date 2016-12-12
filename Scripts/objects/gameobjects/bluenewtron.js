var objects;
(function (objects) {
    class BlueNewtron extends objects.PhysGameObject {
        constructor(x, y) {
            super("bNewtronAppear", x, y);
            this._speed = 2;
            this._actionTimer = 120;
            this._isFullyVisible = false;
            this._gravityEnabled = false;
            this.visible = false;
        }
        update() {
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
        collideWithGround(groundHeight, angle) {
            if (this.currentAnimation != "bNewtronMove") {
                this.gotoAndPlay("bNewtronMove");
                this._velX = -this._speed;
            }
            super.collideWithGround(groundHeight, angle);
        }
        checkCollisionWithPlayer(player) {
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
        _setAirSensor() { }
        detectLeftLedge() { }
        detectRightLedge() { }
        collideWithRightWall(x) { }
        collideWithLeftWall(x) { }
    }
    objects.BlueNewtron = BlueNewtron;
})(objects || (objects = {}));
//# sourceMappingURL=bluenewtron.js.map