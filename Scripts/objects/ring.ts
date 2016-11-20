module objects {
    export class Ring extends createjs.Sprite {

        protected _layer : number;

        constructor(imageString : string, angleTop : number, angleBottom : number, angleL : number, angleR : number) {
            super(spriteAtlas, imageString);
            this.start();
        }

        public start():void {}

        public update():void {}
    }
}