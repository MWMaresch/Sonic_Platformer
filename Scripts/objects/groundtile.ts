module objects {
    export class GroundTile extends Tile {

        constructor(imageString: string, angleTop?: number, angleBottom?: number, angleL?: number, angleR?: number, heightmapTop?: number[], heightmapBottom?: number[], heightmapLeft?: number[], heightmapRight?: number[]) {
            super(imageString, angleTop, angleBottom, angleL, angleR, heightmapTop, heightmapBottom, heightmapLeft, heightmapRight);
            if (this._topHeightmap == null)
            {
                this._calculateHeightmaps();
            }
        }

        private _calculateHeightmaps(): void {
            this._topHeightmap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this._bottomHeightmap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this._leftHeightmap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this._rightHeightmap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            //top heightmap used when player is colliding with it as if it were the floor
            for (var x = 0; x <= 15; x++) {
                for (var y = 0; y <= 15; y++) {
                    if (this.hitTest(x, y)) {
                        this._topHeightmap[x] = y;
                        break;
                    }
                }
            }
            //bottom heightmap used when player runs on it as if it were the ceiling
            for (var x = 0; x <= 15; x++) {
                for (var y = 15; y >= 0; y--) {
                    if (this.hitTest(x, y)) {
                        this._bottomHeightmap[x] = y;
                        break;
                    }
                }
            }
            //left heightmap used when player runs on it when it's the right wall
            for (var y = 0; y <= 15; y++) {
                for (var x = 0; x <= 15; x++) {
                    if (this.hitTest(x, y)) {
                        this._leftHeightmap[y] = x;
                        break;
                    }
                }
            }
            //right heightmap used when player runs on it when it's the left wall
            for (var y = 0; y <= 15; y++) {
                for (var x = 15; x >= 0; x--) {
                    if (this.hitTest(x, y)) {
                        this._rightHeightmap[y] = x;
                        break;
                    }
                }
            }
        }

        public start(): void { }

        public update(): void { }

        //bottom means the bottom of the player, not the bottom of this tile
        //the player is standing on this block
        public onFloorCollision(other: GameObject, sensor: Vector2): void {
            var px = sensor.x / 16;
            var h = (px - Math.floor(px)) * 16;
            other.collideWithGround(this.y + this._topHeightmap[Math.floor(h)], this._topAngle);
        }

        //the player is running on the left side of this block
        public onFloorCollisionR(player: Player, sensor: Vector2): void {
            var py = sensor.y / 16;
            var h = (py - Math.floor(py)) * 16;
            player.collideWithRightGround(this.x + this._leftHeightmap[Math.floor(h)], this._lSideAngle);
        }

        //the player is running on the bottom of this block
        public onFloorCollisionU(player: Player, sensor: Vector2): void {
            var px = sensor.x / 16;
            var h = (px - Math.floor(px)) * 16;
            player.collideWithUpperGround(this.y + this._bottomHeightmap[Math.floor(h)], this._bottomAngle);
        }

        //the player is running on the left side of this block
        public onFloorCollisionL(player: Player, sensor: Vector2): void {
            var py = sensor.y / 16;
            var h = (py - Math.floor(py)) * 16;
            player.collideWithLeftGround(this.x + this._rightHeightmap[Math.floor(h)], this._rSideAngle);
        }

        //the player jumped into this block from below
        public onCeilingCollision(player: Player, sensor: Vector2): void {
            if (this._isSolid) {
                var px = sensor.x / 16;
                var h = (px - Math.floor(px)) * 16;
                player.collideWithCeiling(this.y + this._bottomHeightmap[Math.floor(h)], this._bottomAngle);
            }
        }

        //the player moved into this block from the side
        //TODO: create and use a more accurate detection method using the sensor and side heightmaps
        public onLeftWallCollision(other: GameObject, sensor: Vector2) {
            if (this._isSolid) {
                if (this._topHeightmap[15] <= 4)
                    other.collideWithLeftWall(this.x + 16);
            }
        }

        public onRightWallCollision(other: GameObject, sensor: Vector2) {
            if (this._isSolid) {
                if (this._topHeightmap[0] <= 4)
                    other.collideWithRightWall(this.x);
            }
        }
    }
}