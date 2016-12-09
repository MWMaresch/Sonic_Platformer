var objects;
(function (objects) {
    class Projectile extends objects.GameObject {
        constructor(x, y, velX, velY, useGravity) {
            super("yellowProjectile", x, y);
            this._GRAVITY = 0.21875;
            this.start();
            this._velX = velX;
            this._velY = velY;
            this._useGravity = useGravity;
            if (useGravity)
                this.gotoAndPlay("redProjectile");
        }
        update() {
            super.update();
            if (this._useGravity)
                this._velY += this._GRAVITY;
        }
        checkCollisionWithPlayer(player) {
            if (collision.boxCheck(player, this)) {
                player.getHurt();
            }
        }
    }
    objects.Projectile = Projectile;
})(objects || (objects = {}));
//# sourceMappingURL=projectile.js.map