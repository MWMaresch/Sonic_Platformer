var objects;
(function (objects) {
    class GreenNewtron extends objects.GameObject {
        constructor(x, y) {
            super("gNewtronAppear", x, y);
            this._actionTimer = 120;
            this._isFullyVisible = false;
            this._isGone = false;
            this.visible = false;
        }
        update() {
            if (this.visible) {
                this._actionTimer++;
                if (this._actionTimer == 20) {
                    this.gotoAndPlay("gNewtronAppear");
                }
                else if (this._actionTimer == 40) {
                    this.gotoAndPlay("gNewtronIdle");
                    this._isFullyVisible = true;
                }
                else if (this._actionTimer == 80) {
                    this.gotoAndPlay("gNewtronShoot");
                }
                else if (this._actionTimer == 83) {
                    currentScene.addObject(new objects.Projectile(this.x - 15, this.y - 7, -2, 0, false));
                }
                else if (this._actionTimer == 100) {
                    this.gotoAndPlay("gNewtronIdle");
                }
                else if (this._actionTimer == 140) {
                    this.gotoAndPlay("gNewtronAppear");
                    this._isFullyVisible = false;
                }
                else if (this._actionTimer == 160) {
                    this.visible = false;
                    this._isGone = true;
                }
            }
        }
        checkCollisionWithPlayer(player) {
            if (!this.visible && Math.abs(this.x - player.x) < 128 && !this._isGone) {
                this.visible = true;
                this.gotoAndPlay("gNewtronAppear");
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
    }
    objects.GreenNewtron = GreenNewtron;
})(objects || (objects = {}));
//# sourceMappingURL=greennewtron.js.map