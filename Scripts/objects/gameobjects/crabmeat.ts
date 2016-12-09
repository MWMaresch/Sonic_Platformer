module objects {
    export class Crabmeat extends objects.PhysGameObject {

        private _speed: number = 0.5;
        private _direction: number = -1;
        private _idleTimer: number = 120;
        private _numshots: number = 0;

        constructor(x: number, y: number) {
            super("crabmeat_move", x, y);
            this.start();
            this.width = 35;
        }

        public start(): void {
            super.start();
            this._velX = -this._speed;
        }

        public update(): void {
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

        private _stopAndWait(direction: number) {
            if (this._direction != direction) {
                this._velX = 0;
                this._idleTimer = 120;
                this._direction = direction;
                this.gotoAndStop("crabmeat_idle");
            }
        }

        protected detectLeftLedge() {
            super.detectLeftLedge();
            this._stopAndWait(1);
        }

        protected detectRightLedge() {
            super.detectRightLedge();
            this._stopAndWait(-1);
        }

        public collideWithRightWall(x: number) {
            this._stopAndWait(-1);
        }

        public collideWithLeftWall(x: number) {
            this._stopAndWait(1);
        }

        public checkCollisionWithPlayer(player: objects.Player) {
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
}