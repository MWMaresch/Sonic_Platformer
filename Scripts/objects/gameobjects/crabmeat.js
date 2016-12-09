var objects;
(function (objects) {
    class Crabmeat extends objects.PhysGameObject {
        constructor(x, y) {
            super("crabmeat_move", x, y);
            this._speed = 0.5;
            this._direction = -1;
            this._idleTimer = 120;
            this._numshots = 0;
            this.start();
            this.width = 35;
        }
        start() {
            super.start();
            this._velX = -this._speed;
        }
        update() {
            super.update();
            this._idleTimer--;
            if (this._idleTimer == 60) {
                //if we shoot the first time, it would be very hard to speedrun the game
                if (this._numshots > 0) {
                    currentScene.addObject(new objects.Projectile(this.x - 15, this.y - 10, -1, -4, true));
                    currentScene.addObject(new objects.Projectile(this.x + 15, this.y - 10, 1, -4, true));
                }
                else
                    this._numshots++;
                this.gotoAndStop("crabmeat_shoot");
            }
            else if (this._idleTimer == 0) {
                this.gotoAndPlay("crabmeat_move");
                this._velX = this._speed * this._direction;
            }
        }
        _stopAndWait(direction) {
            if (this._direction != direction) {
                this._velX = 0;
                this._idleTimer = 120;
                this._direction = direction;
                this.gotoAndStop("crabmeat_idle");
            }
        }
        detectLeftLedge() {
            super.detectLeftLedge();
            this._stopAndWait(1);
        }
        detectRightLedge() {
            super.detectRightLedge();
            this._stopAndWait(-1);
        }
        collideWithRightWall(x) {
            this._stopAndWait(-1);
        }
        collideWithLeftWall(x) {
            this._stopAndWait(1);
        }
        checkCollisionWithPlayer(player) {
            if (collision.boxCheck(player, this)) {
                if (player.isRolling) {
                    player.rebound(this.y);
                    this._isDead = true;
                    return true;
                }
                else
                    player.getHurt();
            }
        }
    }
    objects.Crabmeat = Crabmeat;
})(objects || (objects = {}));
//# sourceMappingURL=crabmeat.js.map