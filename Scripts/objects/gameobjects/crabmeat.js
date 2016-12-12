var objects;
(function (objects) {
    class Crabmeat extends objects.PhysGameObject {
        constructor(x, y) {
            super("crabmeat_move", x, y);
            this._speed = 0.5;
            this._direction = -1;
            this._idleTimer = 120;
            this._numshots = 0;
            this._velX = -this._speed;
            this.width = 32;
        }
        update() {
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
            super.update();
        }
        _stopAndTurn(direction) {
            if (this._direction != direction) {
                this._velX = 0;
                this._idleTimer = 120;
                this._direction = direction;
                this.gotoAndStop("crabmeat_idle");
            }
        }
        detectLeftLedge() {
            super.detectLeftLedge();
            this._stopAndTurn(1);
        }
        detectRightLedge() {
            super.detectRightLedge();
            this._stopAndTurn(-1);
        }
        collideWithRightWall(x) {
            this._stopAndTurn(-1);
        }
        collideWithLeftWall(x) {
            this._stopAndTurn(1);
        }
        checkCollisionWithPlayer(player) {
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
    objects.Crabmeat = Crabmeat;
})(objects || (objects = {}));
//# sourceMappingURL=crabmeat.js.map