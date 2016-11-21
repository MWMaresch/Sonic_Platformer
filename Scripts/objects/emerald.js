var objects;
(function (objects) {
    class Emerald extends objects.Tile {
        constructor(imageString, angleTop, angleBottom, angleL, angleR) {
            super(imageString, angleTop, angleBottom, angleL, angleR);
            this.isEmpty = false;
        }
        start() { }
        update() { }
        //no matter how the player collides with us, we do the same thing
        _collect() {
            gameWon = true;
        }
        onFloorCollision(player, sensor) {
            this._collect();
        }
        onFloorCollisionR(player, sensor) {
            this._collect();
        }
        onFloorCollisionU(player, sensor) {
            this._collect();
        }
        onFloorCollisionL(player, sensor) {
            this._collect();
        }
        onCeilingCollision(player, sensor) {
            this._collect();
        }
        onLeftWallCollision(player, sensor) {
            this._collect();
        }
        onRightWallCollision(player, sensor) {
            this._collect();
        }
    }
    objects.Emerald = Emerald;
})(objects || (objects = {}));
//# sourceMappingURL=emerald.js.map