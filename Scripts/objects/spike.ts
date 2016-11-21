module objects {
    export class Spike extends objects.GameObject { 
        //might be a different class in the future
        protected _layer : number;

        constructor(x : number, y : number) {
            super("spikes");
            this.x = x;
            this.y = y;
            this.start();
        }

        public start():void {}

        public update():void {}
    }
}