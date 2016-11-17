var objects;
(function (objects) {
    class Vector2 extends createjs.Point {
        constructor(x = 0, y = 0) {
            super(x, y);
        }
        // Standard distance formula between 2 points
        static distance(a, b) {
            return Math.sqrt(Math.pow((b.x - a.x), 2 + Math.pow((b.y - a.y), 2)));
        }
    }
    objects.Vector2 = Vector2;
})(objects || (objects = {}));
//# sourceMappingURL=vector2.js.map