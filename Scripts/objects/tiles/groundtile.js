var objects;
(function (objects) {
    class GroundTile extends objects.Tile {
        constructor(imageString, angleTop, angleBottom, angleL, angleR, autoCalc, heightmapTop, heightmapBottom, heightmapLeft, heightmapRight, isSolid, isTunnel) {
            super(imageString, angleTop, angleBottom, angleL, angleR, autoCalc, heightmapTop, heightmapBottom, heightmapLeft, heightmapRight, isSolid, isTunnel);
            if (autoCalc) {
                this._calculateHeightmaps();
                console.log("calculated heightmaps for a tile");
            }
        }
        _calculateHeightmaps() {
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
        start() { }
        update() { }
        //bottom means the bottom of the player, not the bottom of this tile
        //the player is standing on this block
        onFloorCollision(other, sensor) {
            var px = sensor.x / 16;
            var h = (px - Math.floor(px)) * 16;
            //console.log("running on ground at (" + this.x + ", " + this.y + "), angles are " + this.getAngles());
            if (this._topHeightmap[Math.floor(h)] < 16)
                other.collideWithGround(this.y + this._topHeightmap[Math.floor(h)], this._topAngle);
            else {
                other.checkOneMoreCollision(1 + Math.floor(this.y / 16), Math.floor(px), sensor);
            }
        }
        //the player is running on the left side of this block
        onFloorCollisionR(player, sensor) {
            var py = sensor.y / 16;
            var h = (py - Math.floor(py)) * 16;
            //console.log("running on right wall at (" + this.x + ", " + this.y + "), angles are " + this.getAngles());
            player.collideWithRightGround(this.x + this._leftHeightmap[Math.floor(h)], this._lSideAngle);
        }
        //the player is running on the bottom of this block
        onFloorCollisionU(player, sensor) {
            var px = sensor.x / 16;
            var h = (px - Math.floor(px)) * 16;
            //console.log("running on upper wall at (" + this.x + ", " + this.y + "), angles are " + this.getAngles());
            player.collideWithUpperGround(this.y + this._bottomHeightmap[Math.floor(h)], this._bottomAngle);
        }
        //the player is running on the left side of this block
        onFloorCollisionL(player, sensor) {
            var py = sensor.y / 16;
            var h = (py - Math.floor(py)) * 16;
            //console.log("running on left wall at (" + this.x + ", " + this.y + "), angles are " + this.getAngles());
            player.collideWithLeftGround(this.x + this._rightHeightmap[Math.floor(h)], this._rSideAngle);
        }
        //TODO: if the heightmap returned is at the very far edge, tell the player to check below the tile
        //the player jumped into this block from below
        onCeilingCollision(player, sensor) {
            if (this._isSolid) {
                var px = sensor.x / 16;
                var h = (px - Math.floor(px)) * 16;
                player.collideWithCeiling(this.y + this._bottomHeightmap[Math.floor(h)], this._bottomAngle);
            }
        }
        //the player moved into this block from the side
        onLeftWallCollision(other, sensor) {
            if (this._isSolid) {
                //var arrayIndex = Math.floor(sensor.y - this.y);
                var hmVal = this._rightHeightmap[Math.floor(sensor.y - this.y)];
                if (hmVal > 0 && sensor.x - this.x < hmVal) {
                    //console.log("colliding with left wall at (" + this.x + ", " + this.y + "), index is " + arrayIndex + ", value is " + hmVal + ", angles are " + this.getAngles());
                    other.collideWithLeftWall(this.x + hmVal);
                }
            }
        }
        onRightWallCollision(other, sensor) {
            if (this._isSolid) {
                //var arrayIndex = Math.floor(sensor.y - this.y);
                var hmVal = this._leftHeightmap[Math.floor(sensor.y - this.y)];
                if (hmVal < 16 && sensor.x - this.x > hmVal) {
                    //console.log("colliding with right wall at (" + this.x + ", " + this.y + "), index is " + arrayIndex + ", value is " + hmVal + ", angles are " + this.getAngles());
                    other.collideWithRightWall(this.x + hmVal);
                }
            }
            /*
            if (this._isSolid) {
                if (this._topHeightmap[0] <= 4)
                    other.collideWithRightWall(this.x);
            }*/
        }
    }
    objects.GroundTile = GroundTile;
})(objects || (objects = {}));
//# sourceMappingURL=groundtile.js.map