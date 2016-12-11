module objects {
    export class Ring extends objects.GameObject {

        protected _useGravity: boolean;
        protected _gravity: number = 0.09375;
        private _gridX: number;
        private _gridY: number;
        private _removeTimer: number;

        constructor(useGravity: boolean, x: number, y: number, velX?: number, velY?: number) {
            super("ringSpin", x, y);
            this._useGravity = useGravity;
            this._removeTimer = 256;
            if (velX != undefined && velY != undefined) {
                this._velX = velX;
                this._velY = velY;
            } else {
                this._velX = 0;
                this._velY = 0;
            }
            this._deathAnim = "ringSpark";
            this._deathTimer = 24;
        }

        public update(): void {
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

        public checkCollisionWithPlayer(player: objects.Player) {
            if (collision.boxCheck(player, this)) {
                player.collectRing(1, this);
            }
        }

        public collideWithGround(groundHeight: number, angle: number): void {
            this._velY *= -0.75;
        }

        public checkCollisionWithGrid(tileGrid: Tile[][]) {
            if (this._gridX < 0 || this._gridX >= tileGrid.length || this._gridY < 0 || this._gridY >= tileGrid[0].length)
                currentScene.removeObject(this);
            else if (this._velY > 0 && tileGrid[this._gridX][this._gridY] != null)
                tileGrid[this._gridX][this._gridY].onFloorCollision(this, new Vector2(this.x, this.y));
        }
    }
}