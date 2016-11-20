module managers {
    export class Collision {
        constructor() {
            this.start();
        }

        public start() {

        }

        public update() {

        }

        public boxCheck(coll:objects.GameObject, objColliding:objects.GameObject) {            
            if(coll.bottomLine > objColliding.topLine && 
                coll.topLine < objColliding.bottomLine &&
                coll.leftLine < objColliding.rightLine &&
                coll.rightLine > objColliding.leftLine) {
                    return true;
                }
        }

        public sensorBoxCheck(sensor:objects.Vector2, objColliding:objects.GameObject) {            
            if(sensor.y > objColliding.topLine && 
                sensor.y < objColliding.bottomLine &&
                sensor.x < objColliding.rightLine &&
                sensor.x > objColliding.leftLine) {
                    return true;
                }
        }

        public circleCheck(obj1:objects.GameObject, obj2:objects.GameObject) {
            var x1 = obj1.x;
            var y1 = obj1.y;
            var x2 = obj2.x;
            var y2 = obj2.y;
            var radius1 = obj1.width * 0.5;
            var radius2 = obj2.width * 0.5;;
            let tempDist = Math.sqrt( ( x2-x1 ) * ( x2-x1 )  + ( y2-y1 ) * ( y2-y1 ) );
            if ( tempDist < ( radius1 + radius2 ) )
                return true;            
        }
    }
}