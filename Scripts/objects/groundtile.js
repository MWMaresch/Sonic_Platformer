var objects;
(function (objects) {
    class GroundTile extends objects.Tile {
        //private _heightmap : number[];// = [9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16]
        constructor(imageString, angleTop, angleBottom, angleL, angleR) {
            super(imageString, angleTop, angleBottom, angleL, angleR);
            this.isEmpty = false;
            //the following arbitrary values mean nothing, and were initially used for testing purposes
            this._topHeightmap = [9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16];
            this._bottomHeightmap = [9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16];
            this._leftHeightmap = [9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16];
            this._rightHeightmap = [9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16];
            this._initializeHeightmaps();
        }
        _initializeHeightmaps() {
            //top heightmap used when player is colliding with it as if it were the floor
            for (var x = 0; x <= this.getBounds().width - 1; x++) {
                for (var y = 0; y <= this.getBounds().height - 1; y++) {
                    if (this.hitTest(x, y)) {
                        this._topHeightmap[x] = y;
                        break;
                    }
                }
            }
            //bottom heightmap used when player runs on it as if it were the ceiling
            for (var x = 0; x <= this.getBounds().width - 1; x++) {
                for (var y = this.getBounds().height - 1; y >= 0; y--) {
                    if (this.hitTest(x, y)) {
                        this._bottomHeightmap[x] = y;
                        break;
                    }
                }
            }
            //left heightmap used when player runs on it when it's the right wall
            for (var y = 0; y <= this.getBounds().height - 1; y++) {
                for (var x = 0; x <= this.getBounds().width - 1; x++) {
                    if (this.hitTest(x, y)) {
                        this._leftHeightmap[y] = x;
                        break;
                    }
                }
            }
            //right heightmap used when player runs on it when it's the left wall
            for (var y = 0; y <= this.getBounds().height - 1; y++) {
                for (var x = this.getBounds().width - 1; x >= 0; x--) {
                    if (this.hitTest(x, y)) {
                        this._rightHeightmap[y] = x;
                        break;
                    }
                }
            }
            //console.log("Tile with right side angle " + this._rSideAngle + " has right heightmap " + this._rightHeightmap);
        }
        reverseHeightMap() {
            this._topHeightmap.reverse();
        }
        reverseSideHeightMap() {
            this._leftHeightmap.reverse();
        }
        start() { }
        update() { }
        //bottom means the bottom of the player, not the bottom of this tile
        //the player is standing on this block
        onFloorCollision(player, sensor) {
            var px = sensor.x / 16;
            var h = (px - Math.floor(px)) * 16;
            player.collideWithGround(this.y + this._topHeightmap[Math.floor(h)], this._topAngle);
        }
        //the player is running on the left side of this block
        onFloorCollisionR(player, sensor) {
            var py = sensor.y / 16;
            var h = (py - Math.floor(py)) * 16;
            player.collideWithRightGround(this.x + this._leftHeightmap[Math.floor(h)], this._lSideAngle);
        }
        //the player is running on the bottom of this block
        onFloorCollisionU(player, sensor) {
            var px = sensor.x / 16;
            var h = (px - Math.floor(px)) * 16;
            player.collideWithUpperGround(this.y + this._bottomHeightmap[Math.floor(h)], this._bottomAngle);
        }
        //the player is running on the left side of this block
        onFloorCollisionL(player, sensor) {
            var py = sensor.y / 16;
            var h = (py - Math.floor(py)) * 16;
            player.collideWithLeftGround(this.x + this._rightHeightmap[Math.floor(h)], this._rSideAngle);
        }
        //the player jumped into this block from below
        onCeilingCollision(player, sensor) {
            var px = sensor.x / 16;
            var h = (px - Math.floor(px)) * 16;
            player.collideWithCeiling(this.y + this._bottomHeightmap[Math.floor(h)], this._bottomAngle);
        }
        //the player moved into this block from the side
        onLeftWallCollision(player, sensor) {
            if (this.hitTest(Math.floor(sensor.x - this.x), Math.floor(sensor.y - this.y))) {
                player.collideWithLeftWall(this.x + this.getBounds().width);
                return true;
            }
            else {
                return false;
            }
        }
        onRightWallCollision(player, sensor) {
            if (this.hitTest(Math.floor(sensor.x - this.x), Math.floor(sensor.y - this.y))) {
                player.collideWithRightWall(this.x);
                return true;
            }
            else {
                return false;
            }
        }
    }
    objects.GroundTile = GroundTile;
})(objects || (objects = {}));
//# sourceMappingURL=groundtile.js.map