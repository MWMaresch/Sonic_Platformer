var objects;
(function (objects) {
    class Motobug extends objects.PhysGameObject {
        constructor(x, y) {
            super("motobug", x, y);
            this._velX = 0;
            this._velY = 0;
            this._speed = 1;
            this._velX = -this._speed;
        }
        update() {
            super.update();
        }
        detectLeftLedge() {
            super.detectLeftLedge();
            this._velX = this._speed;
            this.scaleX = -1;
        }
        detectRightLedge() {
            super.detectRightLedge();
            this._velX = -this._speed;
            this.scaleX = 1;
        }
        collideWithRightWall(x) {
            this.x = x - this.width / 2;
            this._velX = -this._speed;
            this.scaleX = 1;
            this.updateSensors();
        }
        collideWithLeftWall(x) {
            this.x = x + this.width / 2;
            this._velX = this._speed;
            this.scaleX = -1;
            this.updateSensors();
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
    objects.Motobug = Motobug;
})(objects || (objects = {}));
//# sourceMappingURL=motobug.js.map