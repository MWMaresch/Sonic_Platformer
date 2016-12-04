module objects {
    export class Crabmeat extends objects.PhysGameObject {

        protected _velX: number = 0;
        protected _velY: number = 0;
        private _speed: number = 0.5;

        private _idle_timer: number = 120;
        private _isMoving: boolean = true;

        constructor(x: number, y: number) {
            super("crabmeat_move", x, y);
            this.start();
        }

        public start(): void {
            super.start();
            this._velX = -this._speed;
        }

        public update(): void {
            super.update();

            if(!this._isMoving){
                this._idle_timer -= 1;
                this.stopAndWait();
            }
        }

        protected detectLeftLedge() {
            super.detectLeftLedge();
            this._isMoving = false;
        }

        protected detectRightLedge() {
            super.detectRightLedge();
            this._isMoving = false;
        }

        public collideWithRightWall(x: number) {
            this._isMoving = false;
        }

        public collideWithLeftWall(x: number) {
            this._isMoving = false;
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
        
        // Sorry about this
        private stopAndWait(){
            if(this._idle_timer > 0){
                this.gotoAndPlay("crabmeat_idle");
                this._velX = 0;

                if(this._idle_timer <= 60){
                    this.gotoAndPlay("crabmeat_shoot");
                    // this.shoot(); method implemented here
                }
            }
            else{
                this._isMoving = true;
                this._idle_timer = 120;
                this.gotoAndPlay("crabmeat_move");
                this._velX = this._speed;
            }
        }
    }
}