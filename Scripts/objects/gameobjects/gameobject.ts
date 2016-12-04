module objects {
    export class GameObject extends createjs.Sprite {
        private _width: number;
        private _height: number;
        protected _isDead: boolean = false;
        protected _footSensorL: Vector2;
        protected _footSensorR: Vector2;
        protected _sideSensorL: Vector2;
        protected _sideSensorR: Vector2;
        protected _velX: number = 0;
        protected _velY: number = 0;
        protected _higherGround: number;

        // PUBLIC PROPERTIES
        get width(): number { return this._width }
        set width(w: number) { this._width = w; }

        get height(): number { return this._height }
        set height(h: number) { this._height = h; }

        get isDead(): boolean { return this._isDead; }

        //to make the collision class more readable
        get topLine(): number {
            return this.y - this.height / 2;
        }
        get bottomLine(): number {
            return this.y + this.height / 2;
        }
        get rightLine(): number {
            return this.x + this.width / 2;
        }
        get leftLine(): number {
            return this.x - this.width / 2;
        }

        constructor(imageString: string, x?: number, y?: number) {
            super(spriteAtlas, imageString);
            this._initialize(imageString);
            this.x = x;
            this.y = y;
            this.start();
        }

        private _initialize(imageString: string): void {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width / 2;
            this.regY = this.height / 2;
        }

        public start(): void {
            this._sideSensorL = new Vector2(this.x - this.width / 2, (this.y + this.height / 2) - 14);
            this._sideSensorR = new Vector2(this.x + this.width / 2, (this.y + this.height / 2) - 14);
            this._footSensorL = new Vector2(this._sideSensorL.x + 2, (this.y + this.height / 2) - 2)
            this._footSensorR = new Vector2(this._sideSensorR.x - 2, (this.y + this.height / 2) - 2)
        }

        public update(): void {
            //updating position
            this.x += this._velX;
            this.y += this._velY;

            //updating sensor positions
            this._sideSensorL.x = this.x - this.width / 2;
            this._sideSensorR.x = this.x + this.width / 2;
            this._sideSensorL.y = (this.y + this.height / 2) - 14;
            this._sideSensorR.y = (this.y + this.height / 2) - 14;

            this._footSensorL.x = this._sideSensorL.x + 2;
            this._footSensorR.x = this._sideSensorR.x - 2;
            this._footSensorL.y = (this.y + this.height / 2) - 2;
            this._footSensorR.y = (this.y + this.height / 2) - 2;
        }

        public checkCollisionWithGrid(tileGrid: Tile[][]) { }
        public checkCollisionWithPlayer(player: objects.Player) { }
        protected detectLeftLedge() { }
        protected detectRightLedge() { }
        public collideWithGround(groundHeight: number, angle: number): void { }
        public collideWithRightWall(x: number) { }
        public collideWithLeftWall(x: number) { }
        public checkOneMoreCollision(posY:number, posX:number, sensor:Vector2) { }
    }
}