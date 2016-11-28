var objects;
(function (objects) {
    class Tile extends createjs.Sprite {
        constructor(imageString, angleTop, angleBottom, angleL, angleR, heightmapTop, heightmapBottom, heightmapLeft, heightmapRight, isSolid) {
            super(spriteAtlas, imageString);
            this.start();
            this._topAngle = angleTop;
            this._rSideAngle = angleR;
            this._lSideAngle = angleL;
            this._bottomAngle = angleBottom;
            this._topHeightmap = heightmapTop;
            this._bottomHeightmap = heightmapBottom;
            this._leftHeightmap = heightmapLeft;
            this._rightHeightmap = heightmapRight;
            if (isSolid != null)
                this._isSolid = isSolid;
            else
                this._isSolid = true;
            this._layer = 1;
            this.tickEnabled = false;
            //console.log([this._topHeightmap, this._bottomHeightmap, this._leftHeightmap, this._rightHeightmap]);
        }
        offsetHeightmap(amount) {
            //when we want this tile to be shorter than it initially was
            //useful for when there are many similar tile types with their only difference being their height
            for (var i = 0; i < 16; i++) {
                this._topHeightmap[i] += amount;
            }
            for (var i = 0; i < amount; i++) {
                this._leftHeightmap[i] = 16;
                this._rightHeightmap[i] = 0;
            }
        }
        get isSolid() {
            return this._isSolid;
        }
        setDataToTile(tile) {
            var otherHeightmaps = tile.getHeightmaps();
            var otherAngles = tile.getAngles();
            this._isSolid = tile.isSolid;
            this._topHeightmap = otherHeightmaps[0];
            this._bottomHeightmap = otherHeightmaps[1];
            this._leftHeightmap = otherHeightmaps[2];
            this._rightHeightmap = otherHeightmaps[3];
            this._topAngle = otherAngles[0];
            this._bottomAngle = otherAngles[1];
            this._lSideAngle = otherAngles[2];
            this._rSideAngle = otherAngles[3];
        }
        getHeightmaps() {
            return [this._topHeightmap, this._bottomHeightmap, this._leftHeightmap, this._rightHeightmap];
        }
        getAngles() {
            return [this._topAngle, this._bottomAngle, this._lSideAngle, this._rSideAngle];
        }
        setHeightmaps(heightmapTop, heightmapBottom, heightmapLeft, heightmapRight) {
            this._topHeightmap = heightmapTop;
            this._bottomHeightmap = heightmapBottom;
            this._leftHeightmap = heightmapLeft;
            this._rightHeightmap = heightmapRight;
        }
        start() { }
        update() { }
        //so we don't need to do any bounding box or radius if statements
        onFloorCollision(other, sensor) { }
        onFloorCollisionR(player, sensor) { }
        onFloorCollisionU(player, sensor) { }
        onFloorCollisionL(player, sensor) { }
        onCeilingCollision(player, sensor) { }
        onLeftWallCollision(other, sensor) { }
        onRightWallCollision(other, sensor) { }
    }
    objects.Tile = Tile;
})(objects || (objects = {}));
//# sourceMappingURL=tile.js.map