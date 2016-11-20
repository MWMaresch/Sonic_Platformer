module objects {
    export class GameObject extends createjs.Sprite {
        private _width:number;
        private _height:number;

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

        get topLine() : number {
            return this.y - this.height/2;
        }
        get bottomLine() : number {
            return this.y + this.height/2;
        }
        get rightLine() : number {
            return this.x + this.width/2;
        }
        get leftLine() : number {
            return this.x - this.width/2;
        }

        constructor(imageString : string) {
            super(spriteAtlas, imageString);

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