module objects {
    export class Spike extends createjs.Sprite {

        protected _layer : number;

        constructor(imageString : string, x : number, y : number) {
            super(spriteAtlas, imageString);
            this.x = x;
            this.y = y;
            this.start();
        }

        public start():void {}

        public update():void {}
    }
}