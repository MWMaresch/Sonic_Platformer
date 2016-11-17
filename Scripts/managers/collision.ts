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
            if(coll.tr_corner.x > objColliding.tl_corner.x && 
                coll.tl_corner.x < objColliding.tr_corner.x &&
                coll.tr_corner.y < objColliding.bl_corner.y &&
                coll.br_corner.y > objColliding.tl_corner.y) {
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