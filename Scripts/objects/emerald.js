var objects;
(function (objects) {
    class Emerald extends objects.Tile {
        //private _heightmap : number[];// = [9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16]
        constructor(imageString, angleTop, angleBottom, angleL, angleR) {
            super(imageString, angleTop, angleBottom, angleL, angleR);
            this.isEmpty = false;
            //the following arbitrary values mean nothing, and were initially used for testing purposes
        }
        start() { }
        update() { }
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
            return false;
        }
        onRightWallCollision(player, sensor) {
            this._collect();
            return false;
        }
    }
    objects.Emerald = Emerald;
})(objects || (objects = {}));
//# sourceMappingURL=emerald.js.map