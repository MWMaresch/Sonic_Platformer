var objects;
(function (objects) {
    class Projectile extends objects.GameObject {
        constructor(x, y, velX, velY, useGravity) {
            super("yellowProjectile", x, y);
            this._GRAVITY = 0.21875;
            this._velX = velX;
            this._velY = velY;
            this._useGravity = useGravity;
            if (useGravity)
                this.gotoAndPlay("redProjectile");
        }
        update() {
            if (this._useGravity)
                this._velY += this._GRAVITY;
            super.update();
        }
        checkCollisionWithPlayer(player) {
            if (collision.boxCheck(player, this)) {
                player.getHurt(this.x);
            }
        }
    }
    objects.Projectile = Projectile;
})(objects || (objects = {}));
//# sourceMappingURL=projectile.js.map