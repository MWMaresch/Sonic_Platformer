module objects {
    export class Motobug extends objects.PhysGameObject {

        protected _velX: number = 0;
        protected _velY: number = 0;
        private _speed: number = 1;

        constructor(x: number, y: number) {
            super("motobug", x, y);
            this.start();
        }

        public start(): void {
            super.start();
            this._velX = -this._speed;
        }

        public update(): void {
            super.update();
        }

        protected detectLeftLedge() {
            super.detectLeftLedge();
            this._velX = this._speed;
            this.scaleX = -1;
        }
        protected detectRightLedge() {
            super.detectRightLedge();
            this._velX = - this._speed;
            this.scaleX = 1;
        }

        public collideWithRightWall(x: number) {
            this._velX = - this._speed;
            this.scaleX = 1;
        }
        public collideWithLeftWall(x: number) {
            this._velX = this._speed;
            this.scaleX = -1;
        }
        public checkCollisionWithPlayer(player: objects.Player) {
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
    }
}