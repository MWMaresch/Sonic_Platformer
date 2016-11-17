module objects {
    export class GameObject extends createjs.Sprite {
        private _width:number;
        private _height:number;

        private _TRCorner:Vector2;
        private _TLCorner:Vector2;
        private _BRCorner:Vector2;
        private _BLCorner:Vector2

        private _deathAnim:string;

        // PUBLIC PROPERTIES
        get width() : number {
            return this._width
        }
        set width(w:number) {
            this._width = w;
        }
        get height() : number {
            return this._height
        }
        set height(h:number) {
            this._height = h;
        }

        get tr_corner() : Vector2 {
            return new objects.Vector2(this.x + this.width * 0.5, this.y - this.height * 0.5);
        }
        get tl_corner() : Vector2 {
            return new objects.Vector2(this.x - this.width * 0.5, this.y - this.height * 0.5);
        }
        get br_corner() : Vector2 {
            return new objects.Vector2(this.x + this.width * 0.5, this.y + this.height * 0.5);
        }
        get bl_corner() : Vector2 {
            return new objects.Vector2(this.x - this.width * 0.5, this.y + this.height * 0.5);
        }

        constructor(imageString : string, deathAnimString) {
            super(shipAtlas, imageString);

            this._initialize(imageString);
            this.start();
        }

        private _initialize(imageString:string):void {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width / 2;
            this.regY = this.height / 2;
        }

        public start():void {}

        public update():void {}
    }
}