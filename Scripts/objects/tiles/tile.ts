module objects {
    export class Tile extends createjs.Sprite {
        public _topHeightmap: number[];
        protected _bottomHeightmap: number[];
        protected _leftHeightmap: number[];
        protected _rightHeightmap: number[];
        protected _topAngle: number;
        protected _bottomAngle: number;
        protected _rSideAngle: number;
        protected _lSideAngle: number;
        protected _isSolid: boolean;
        protected _isTunnel: boolean;

        constructor(imageString: string, angleTop?: number, angleBottom?: number, angleL?: number, angleR?: number, autoCalc?: boolean, heightmapTop?: number[], heightmapBottom?: number[], heightmapLeft?: number[], heightmapRight?: number[], isSolid?: boolean, isTunnel?: boolean) {
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
            this._isSolid = isSolid;
            this.tickEnabled = false;
            if (isSolid == null) {
                this._isSolid = true;
            }
            if (this._topAngle == undefined) {
                this._topAngle = 0;
                this._lSideAngle = 0;
                this._rSideAngle = 0;
                this._bottomAngle = 0;
            }
            if (this._topHeightmap == undefined) {
                this._topHeightmap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this._bottomHeightmap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this._leftHeightmap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this._rightHeightmap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
            if (isTunnel == undefined)
                this._isTunnel = false;
            else
                this._isTunnel = isTunnel;
            //console.log([this._topHeightmap, this._bottomHeightmap, this._leftHeightmap, this._rightHeightmap]);
        }

        get isSolid(): boolean { return this._isSolid; }

        get isTunnel(): boolean { return this._isTunnel; }

        set isSolid(b: boolean) { this._isSolid = b; }

        public setDataToTile(tile: Tile): void {
            let otherHeightmaps = tile.getHeightmaps();
            let otherAngles = tile.getAngles();
            this._isSolid = tile.isSolid;
            //console.log("using hm " + tile._topHeightmap);
            this._topHeightmap = new Array<number>(16);
            this._topHeightmap = otherHeightmaps[0];
            this._bottomHeightmap = otherHeightmaps[1];
            this._leftHeightmap = otherHeightmaps[2];
            this._rightHeightmap = otherHeightmaps[3];
            this._topAngle = otherAngles[0];
            this._bottomAngle = otherAngles[1];
            this._lSideAngle = otherAngles[2];
            this._rSideAngle = otherAngles[3];
            this.visible = tile.visible;
            this._isTunnel = tile.isTunnel;
        }

        public getHeightmaps(): Array<number[]> {
            //console.log("fetching hm " + this._topHeightmap);
            return new Array<number[]>(this._topHeightmap, this._bottomHeightmap, this._leftHeightmap, this._rightHeightmap);
        }

        public getAngles(): Array<number> {
            return [this._topAngle, this._bottomAngle, this._lSideAngle, this._rSideAngle];
        }

        public setHeightmaps(heightmapTop: number[], heightmapBottom?: number[], heightmapLeft?: number[], heightmapRight?: number[]): void {
            this._topHeightmap = heightmapTop;
            this._bottomHeightmap = heightmapBottom;
            this._leftHeightmap = heightmapLeft;
            this._rightHeightmap = heightmapRight;
        }

        public offsetAndCopy(amount: number): Tile {
            var rhm: Array<number> = new Array<number>();
            var lhm: Array<number> = new Array<number>();
            var thm: Array<number> = new Array<number>();
            var bhm: Array<number> = new Array<number>();

            for (var i = 0; i < 16; i++) {
                thm.push(this._topHeightmap[i]);
                lhm.push(this._leftHeightmap[i]);
                rhm.push(this._rightHeightmap[i]);
                bhm.push(this._bottomHeightmap[i]);
            }

            for (var i = 0; i < thm.length; i++)
                thm[i] += amount;

            for (var i = 0; i < amount; i++) {
                lhm[i] = 16;
                rhm[i] = 0;
            }
            if (this instanceof objects.GroundTile)
                return new GroundTile(this.currentAnimation, this._topAngle, this._bottomAngle, this._lSideAngle, this._rSideAngle, false, thm, bhm, lhm, rhm, this.isSolid, this.isTunnel);
            else
                return new Tile(this.currentAnimation, this._topAngle, this._bottomAngle, this._lSideAngle, this._rSideAngle, false, thm, bhm, lhm, rhm, this.isSolid, this.isTunnel);
        }

        public flipXAndCopy(): Tile { //horizontally

            var rhm: Array<number> = new Array<number>();
            var lhm: Array<number> = new Array<number>();
            var thm: Array<number> = new Array<number>();
            var bhm: Array<number> = new Array<number>();

            for (var i = 0; i < 16; i++) {
                thm.push(this._topHeightmap[i]);
                lhm.push(this._leftHeightmap[i]);
                rhm.push(this._rightHeightmap[i]);
                bhm.push(this._bottomHeightmap[i]);
            }
            thm.reverse();
            bhm.reverse();

            //swap the two side heightmaps
            var tempLeftHeightmap = lhm;
            lhm = rhm;
            rhm = tempLeftHeightmap;

            //correct their values to work with their new sides
            for (var i = 0; i < 16; i++) {
                lhm[i] = 16 - lhm[i];
                rhm[i] = 16 - rhm[i];
            }

            if (this instanceof objects.GroundTile)
                return new objects.GroundTile(this.currentAnimation, 360 - this._topAngle, 360 - this._bottomAngle, 360 - this._rSideAngle, 360 - this._lSideAngle, false, thm, bhm, lhm, rhm, this.isSolid, this.isTunnel);
            else
                return new objects.Tile(this.currentAnimation, 360 - this._topAngle, 360 - this._bottomAngle, 360 - this._rSideAngle, 360 - this._lSideAngle, false, thm, bhm, lhm, rhm, this.isSolid, this.isTunnel);
        }

        public flipYAndCopy(): Tile {

            var rhm: Array<number> = new Array<number>();
            var lhm: Array<number> = new Array<number>();
            var thm: Array<number> = new Array<number>();
            var bhm: Array<number> = new Array<number>();

            for (var i = 0; i < 16; i++) {
                thm.push(this._topHeightmap[i]);
                lhm.push(this._leftHeightmap[i]);
                rhm.push(this._rightHeightmap[i]);
                bhm.push(this._bottomHeightmap[i]);
            }
            lhm.reverse();
            rhm.reverse();

            var tempTopHeightmap = thm;
            thm = bhm;
            bhm = tempTopHeightmap;

            for (var i = 0; i < 16; i++) {
                thm[i] = 16 - thm[i];
                bhm[i] = 16 - bhm[i];
            }

            if (this instanceof objects.GroundTile)
                return new objects.GroundTile(this.currentAnimation, 180 - this._bottomAngle, 180 - this._topAngle, 180 - this._lSideAngle, 180 - this._rSideAngle, false, thm, bhm, lhm, rhm, this.isSolid, this.isTunnel);
            else
                return new objects.Tile(this.currentAnimation, 180 - this._bottomAngle, 180 - this._topAngle, 180 - this._lSideAngle, 180 - this._rSideAngle, false, thm, bhm, lhm, rhm, this.isSolid, this.isTunnel);

        }

        public copy(): Tile {
            var rhm: Array<number> = new Array<number>();
            var lhm: Array<number> = new Array<number>();
            var thm: Array<number> = new Array<number>();
            var bhm: Array<number> = new Array<number>();

            for (var i = 0; i < 16; i++) {
                thm.push(this._topHeightmap[i]);
                lhm.push(this._leftHeightmap[i]);
                rhm.push(this._rightHeightmap[i]);
                bhm.push(this._bottomHeightmap[i]);
            }

            if (this instanceof objects.GroundTile)
                return new GroundTile(this.currentAnimation, this._topAngle, this._bottomAngle, this._lSideAngle, this._rSideAngle, false, thm, bhm, lhm, rhm, this.isSolid, this.isTunnel);
            else
                return new Tile(this.currentAnimation, this._topAngle, this._bottomAngle, this._lSideAngle, this._rSideAngle, false, thm, bhm, lhm, rhm, this.isSolid, this.isTunnel);
        }

        public start(): void { }

        public update(): void { }

        //so we don't need to do any bounding box or radius if statements
        public onFloorCollision(other: GameObject, sensor: Vector2): void {
        }
        public onFloorCollisionR(player: Player, sensor: Vector2): void { }
        public onFloorCollisionU(player: Player, sensor: Vector2): void { }
        public onFloorCollisionL(player: Player, sensor: Vector2): void { }
        public onCeilingCollision(player: Player, sensor: Vector2): void { }
        public onLeftWallCollision(other: GameObject, sensor: Vector2): void {
        }
        public onRightWallCollision(other: GameObject, sensor: Vector2): void {
        }
    }
}