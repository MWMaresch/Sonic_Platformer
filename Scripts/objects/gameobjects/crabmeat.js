var objects;
(function (objects) {
    class Crabmeat extends objects.PhysGameObject {
        constructor(x, y) {
            super("crabmeat_move", x, y);
            this._velX = 0;
            this._velY = 0;
            this._speed = 0.5;
            this._idle_timer = 120;
            this._isMoving = true;
            this.start();
        }
        start() {
            super.start();
            this._velX = -this._speed;
        }
        update() {
            super.update();
            if (!this._isMoving) {
                this._idle_timer -= 1;
                this.stopAndWait();
            }
        }
        detectLeftLedge() {
            super.detectLeftLedge();
            this._isMoving = false;
        }
        detectRightLedge() {
            super.detectRightLedge();
            this._isMoving = false;
        }
        collideWithRightWall(x) {
            this._isMoving = false;
        }
        collideWithLeftWall(x) {
            this._isMoving = false;
        }
        checkCollisionWithPlayer(player) {
            if (collision.boxCheck(player, this)) {
                if (player.isRolling) {
                    player.bounce();
                    this._isDead = true;
                    return true;
                }
                else
                    player.getHurt();
            }
        }
        // Sorry about this
        stopAndWait() {
            if (this._idle_timer > 0) {
                this.gotoAndPlay("crabmeat_idle");
                this._velX = 0;
                if (this._idle_timer <= 60) {
                    this.gotoAndPlay("crabmeat_shoot");
                }
            }
            else {
                this._isMoving = true;
                this._idle_timer = 120;
                this.gotoAndPlay("crabmeat_move");
                this._velX = this._speed;
            }
        }
    }
    objects.Crabmeat = Crabmeat;
})(objects || (objects = {}));
//# sourceMappingURL=crabmeat.js.map