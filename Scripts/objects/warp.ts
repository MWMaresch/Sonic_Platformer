module objects {
    export class Warp extends Tile {

        constructor(imageString : string, angle : number) {
            super(imageString, 0,0,0,0);
            this.start();
        }

        public start():void {}

        public update():void {}

        //so we don't need to do any bounding box or radius if statements
        public onFloorCollision(player:Player, sensor:Vector2):void {}
        public onFloorCollisionR(player:Player, sensor:Vector2):void {}
        public onFloorCollisionU(player:Player, sensor:Vector2):void {}
        public onFloorCollisionL(player:Player, sensor:Vector2):void {}

        public onCeilingCollision(player:Player):void {}

        public onLeftWallCollision(player:Player, sensor:Vector2):boolean { return false; }

        public onRightWallCollision(player:Player, sensor:Vector2):boolean {
            //player.warpRight(19);
            return false;        
        }

        public isEmpty : boolean = false;
    }
}