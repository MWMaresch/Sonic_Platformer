module objects {
    export class Projectile extends objects.GameObject {

        private _useGravity: boolean;
        private _GRAVITY: number = 0.21875;


        constructor(x: number, y: number, velX: number, velY: number, useGravity: boolean) {
            super("yellowProjectile", x, y);
            this.start();
            this._velX = velX;
            this._velY = velY;
            this._useGravity = useGravity;
            if (useGravity)
                this.gotoAndPlay("redProjectile");
        }

        public update(): void {
            super.update();
            if (this._useGravity)
                this._velY += this._GRAVITY;
        }

        public checkCollisionWithPlayer(player: objects.Player) {
            if (collision.boxCheck(player, this)) {
                player.getHurt();
            }
        }
    }
}  