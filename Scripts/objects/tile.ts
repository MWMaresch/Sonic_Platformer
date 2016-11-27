module objects {
    export class Tile extends createjs.Sprite {
        protected _topHeightmap: number[];
        protected _bottomHeightmap: number[];
        protected _leftHeightmap: number[];
        protected _rightHeightmap: number[];
        protected _topAngle: number;
        protected _bottomAngle: number;
        protected _rSideAngle: number;
        protected _lSideAngle: number;
        protected _isSolid : boolean;

        protected _layer: number;

        constructor(imageString: string, angleTop?: number, angleBottom?: number, angleL?: number, angleR?: number, heightmapTop?: number[], heightmapBottom?: number[], heightmapLeft?: number[], heightmapRight?: number[], isSolid?: boolean) {
            super(spriteAtlas, imageString);
            this.start();
            this._topAngle = angleTop;
            this._rSideAngle = angleR;
            this._lSideAngle = angleL;
            this._bottomAngle = angleBottom;
            this._topHeightmap = heightmapTop;
            this._bottomHeightmap = heightmapBottom;
            this._leftHeightmap = heightmapLeft;
            this._rightHeightmap = heightmapRight;
            if (isSolid != null)
                this._isSolid = isSolid;
            else
                this._isSolid = true;
            this._layer = 1;
            this.tickEnabled = false;
            //console.log([this._topHeightmap, this._bottomHeightmap, this._leftHeightmap, this._rightHeightmap]);
        }

        public getSolidType() : boolean {
            return this._isSolid;
        }

        public setDataToTile(tile: Tile) {
            var otherHeightmaps = tile.getHeightmaps();
            var otherAngles = tile.getAngles();
            this._isSolid = tile.getSolidType();
            this._topHeightmap = otherHeightmaps[0];
            this._bottomHeightmap = otherHeightmaps[1];
            this._leftHeightmap = otherHeightmaps[2];
            this._rightHeightmap = otherHeightmaps[3];
            this._topAngle = otherAngles[0];
            this._bottomAngle = otherAngles[1];
            this._lSideAngle = otherAngles[2];
            this._rSideAngle = otherAngles[3];
        }

        public getHeightmaps() {
            return [this._topHeightmap, this._bottomHeightmap, this._leftHeightmap, this._rightHeightmap];
        }

        public getAngles() {
            return [this._topAngle, this._bottomAngle, this._lSideAngle, this._rSideAngle];
        }

        public setHeightmaps(heightmapTop: number[], heightmapBottom?: number[], heightmapLeft?: number[], heightmapRight?: number[]) {
            this._topHeightmap = heightmapTop;
            this._bottomHeightmap = heightmapBottom;
            this._leftHeightmap = heightmapLeft;
            this._rightHeightmap = heightmapRight;
        }

        public start(): void { }

        public update(): void { }

        //so we don't need to do any bounding box or radius if statements
        public onFloorCollision(other: GameObject, sensor: Vector2): void { }
        public onFloorCollisionR(player: Player, sensor: Vector2): void { }
        public onFloorCollisionU(player: Player, sensor: Vector2): void { }
        public onFloorCollisionL(player: Player, sensor: Vector2): void { }
        public onCeilingCollision(player: Player, sensor: Vector2): void { }
        public onLeftWallCollision(other: GameObject, sensor: Vector2): void { }
        public onRightWallCollision(other: GameObject, sensor: Vector2): void { }
    }
}