module objects {
    export class Tile extends createjs.Sprite {
        protected _topHeightmap : number[];
        protected _bottomHeightmap : number[];
        protected _leftHeightmap : number[];
        protected _rightHeightmap : number[];

        protected _topAngle : number;
        protected _bottomAngle : number;
        protected _rSideAngle : number;
        protected _lSideAngle : number;

        protected _layer : number;

        constructor(imageString : string, angleTop : number, angleBottom : number, angleL : number, angleR : number) {
            super(spriteAtlas, imageString);
            this.start();
            this._topAngle = angleTop;
            this._rSideAngle = angleR;
            this._lSideAngle = angleL;
            this._bottomAngle = angleBottom;
            this._layer = 1;
            this.tickEnabled = false;
        }

        public start():void {}

        public update():void {}

        //so we don't need to do any bounding box or radius if statements
        public onFloorCollision(player:Player, sensor:Vector2):void {}
        public onFloorCollisionR(player:Player, sensor:Vector2):void {}
        public onFloorCollisionU(player:Player, sensor:Vector2):void {}
        public onFloorCollisionL(player:Player, sensor:Vector2):void {}
        public onCeilingCollision(player:Player, sensor:Vector2):void {}        
        public onLeftWallCollision(player:Player, sensor:Vector2):void {} 
        public onRightWallCollision(player:Player, sensor:Vector2):void {} 
    }
}