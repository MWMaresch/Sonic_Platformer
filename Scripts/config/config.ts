/*
    Module to store globally accessible values and states for the game.
*/
module config {
    export class Scene {
        public static MENU : number = 0;
        public static LEVEL1 : number = 1;
        public static INSTRUCTIONS : number = 2;
    }

    export class Screen {
        public static SCALE_X : number = 3;
        public static SCALE_Y : number = 3;
        public static WIDTH : number = 320;
        public static HEIGHT : number = 240;
        public static CENTER_X : number = 160;
        public static CENTER_Y : number = 120;
        //used back when the stage was scaled up instead of the canvas
        public static REAL_WIDTH : number = 320;
        public static REAL_HEIGHT : number = 240;
    }
    
    export class Game {
        public static FPS : number = 60;
    }
}