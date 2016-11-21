var objects;
(function (objects) {
    class Tile extends createjs.Sprite {
        constructor(imageString, angleTop, angleBottom, angleL, angleR) {
            super(spriteAtlas, imageString);
            this.start();
            this._topAngle = angleTop;
            this._rSideAngle = angleR;
            this._lSideAngle = angleL;
            this._bottomAngle = angleBottom;
            this._layer = 1;
            this.tickEnabled = false;
        }
        start() { }
        update() { }
        //so we don't need to do any bounding box or radius if statements
        onFloorCollision(player, sensor) { }
        onFloorCollisionR(player, sensor) { }
        onFloorCollisionU(player, sensor) { }
        onFloorCollisionL(player, sensor) { }
        onCeilingCollision(player, sensor) { }
        onLeftWallCollision(player, sensor) { }
        onRightWallCollision(player, sensor) { }
    }
    objects.Tile = Tile;
})(objects || (objects = {}));
//# sourceMappingURL=tile.js.map