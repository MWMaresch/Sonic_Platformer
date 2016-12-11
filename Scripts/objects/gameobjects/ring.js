var objects;
(function (objects) {
    class Ring extends objects.GameObject {
        constructor(useGravity, x, y, velX, velY) {
            super("ringSpin", x, y);
            this._gravity = 0.09375;
            this._useGravity = useGravity;
            this._removeTimer = 256;
            if (velX != undefined && velY != undefined) {
                this._velX = velX;
                this._velY = velY;
            }
            else {
                this._velX = 0;
                this._velY = 0;
            }
            this._deathAnim = "ringSpark";
            this._deathTimer = 24;
        }
        update() {
            if (this._useGravity) {
                this._removeTimer--;
                if (this._removeTimer <= 0) {
                    currentScene.removeObject(this);
                }
                this._velY += this._gravity;
                this._gridX = Math.floor(this.x / 16);
                this._gridY = Math.floor(this.y / 16);
            }
            super.update();
        }
        checkCollisionWithPlayer(player) {
            if (collision.boxCheck(player, this)) {
                player.collectRing(1, this);
            }
        }
        collideWithGround(groundHeight, angle) {
            this._velY *= -0.75;
        }
        checkCollisionWithGrid(tileGrid) {
            if (this._gridX < 0 || this._gridX >= tileGrid.length || this._gridY < 0 || this._gridY >= tileGrid[0].length)
                currentScene.removeObject(this);
            else if (this._velY > 0 && tileGrid[this._gridX][this._gridY] != null)
                tileGrid[this._gridX][this._gridY].onFloorCollision(this, new objects.Vector2(this.x, this.y));
        }
    }
    objects.Ring = Ring;
})(objects || (objects = {}));
//# sourceMappingURL=ring.js.map