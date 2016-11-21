module objects {
    export class Emerald extends Tile {

        constructor(imageString : string, angleTop : number,angleBottom : number,angleL : number,angleR : number,) {
            super(imageString, angleTop, angleBottom, angleL, angleR);
        }
        public start():void {}

        public update():void {}

        //no matter how the player collides with us, we do the same thing
        private _collect() : void{
            gameWon = true;
        }

        public onFloorCollision(player:Player, sensor:Vector2):void {
            this._collect();
        }

        public onFloorCollisionR(player:Player, sensor:Vector2):void {            
            this._collect();
        }

        public onFloorCollisionU(player:Player, sensor:Vector2):void {
            this._collect();
        }

        public onFloorCollisionL(player:Player, sensor:Vector2):void {
            this._collect();
        }

        public onCeilingCollision(player:Player, sensor:Vector2):void {
            this._collect();
        }
        
        public onLeftWallCollision(player:Player, sensor:Vector2) {
            this._collect();
        }

        public onRightWallCollision(player:Player, sensor:Vector2) {
            this._collect();
        }
        public isEmpty : boolean = false;
    }
}