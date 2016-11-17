var objects;
(function (objects) {
    class Warp extends objects.Tile {
        constructor(imageString, angle) {
            super(imageString, 0);
            this.isEmpty = false;
            this.start();
        }
        start() { }
        update() { }
        //so we don't need to do any bounding box or radius if statements
        onFloorCollision(player, sensor) { }
        onFloorCollisionR(player, sensor) { }
        onFloorCollisionU(player, sensor) { }
        onFloorCollisionL(player, sensor) { }
        onCeilingCollision(player) { }
        onLeftWallCollision(player, sensor) { return false; }
        onRightWallCollision(player, sensor) {
            player.warpRight(19);
            return false;
        }
    }
    objects.Warp = Warp;
})(objects || (objects = {}));
//# sourceMappingURL=warp.js.map