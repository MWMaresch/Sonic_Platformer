var managers;
(function (managers) {
    class Collision {
        constructor() {
            this.start();
        }
        start() { }
        update() { }
        boxCheck(obj1, obj2) {
            if (obj1.bottomLine > obj2.topLine &&
                obj1.topLine < obj2.bottomLine &&
                obj1.leftLine < obj2.rightLine &&
                obj1.rightLine > obj2.leftLine) {
                return true;
            }
            else
                return false;
        }
        sensorBoxCheck(sensor, obj) {
            if (sensor.y > obj.topLine &&
                sensor.y < obj.bottomLine &&
                sensor.x < obj.rightLine &&
                sensor.x > obj.leftLine) {
                return true;
            }
            else
                return false;
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
            else
                return false;
        }
    }
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map