var managers;
(function (managers) {
    class Collision {
        constructor() {
            this.start();
        }
        start() {
        }
        update() {
        }
        boxCheck(coll, objColliding) {
            if (coll.tr_corner.x > objColliding.tl_corner.x &&
                coll.tl_corner.x < objColliding.tr_corner.x &&
                coll.tr_corner.y < objColliding.bl_corner.y &&
                coll.br_corner.y > objColliding.tl_corner.y) {
                return true;
            }
        }
        circleCheck(obj1, obj2) {
            var x1 = obj1.x;
            var y1 = obj1.y;
            var x2 = obj2.x;
            var y2 = obj2.y;
            var radius1 = obj1.width * 0.5;
            var radius2 = obj2.width * 0.5;
            ;
            let tempDist = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            if (tempDist < (radius1 + radius2))
                return true;
        }
    }
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map