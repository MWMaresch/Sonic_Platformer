module objects {
    export class Emerald extends Tile {
        //private _heightmap : number[];// = [9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16]

        constructor(imageString : string, angleTop : number,angleBottom : number,angleL : number,angleR : number,) {
            super(imageString, angleTop, angleBottom, angleL, angleR);
            //the following arbitrary values mean nothing, and were initially used for testing purposes
        }
        public start():void {}

        public update():void {}

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
        
        public onLeftWallCollision(player:Player, sensor:Vector2):boolean {
            this._collect();
            return false;
        }

        public onRightWallCollision(player:Player, sensor:Vector2):boolean {
            this._collect();
            return false;
        }
        public isEmpty : boolean = false;
    }
}