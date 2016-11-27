module managers {
    export class Collision {
        constructor() {
            this.start();
        }

        public start() {}

        public update() {}

        public boxCheck(obj1:objects.GameObject, obj2:objects.GameObject) : boolean {            
            if(obj1.bottomLine > obj2.topLine && 
                obj1.topLine < obj2.bottomLine &&
                obj1.leftLine < obj2.rightLine &&
                obj1.rightLine > obj2.leftLine) {
                    return true;
                }
            else
                return false;
        }

        public sensorBoxCheck(sensor:objects.Vector2, obj:objects.GameObject) : boolean {            
            if(sensor.y > obj.topLine && 
                sensor.y < obj.bottomLine &&
                sensor.x < obj.rightLine &&
                sensor.x > obj.leftLine) {
                    return true;
                }
            else
                return false;
        }

        public circleCheck(obj1:objects.GameObject, obj2:objects.GameObject) : boolean {
            var x1 = obj1.x;
            var y1 = obj1.y;
            var x2 = obj2.x;
            var y2 = obj2.y;
            var radius1 = obj1.width * 0.5;
            var radius2 = obj2.width * 0.5;;
            let tempDist = Math.sqrt( ( x2-x1 ) * ( x2-x1 )  + ( y2-y1 ) * ( y2-y1 ) );
            if ( tempDist < ( radius1 + radius2 ) )
                return true;       
            else
                return false;     
        }
    }
}