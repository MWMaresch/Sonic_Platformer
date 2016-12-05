/*
    Module to store globally accessible values and states for the game.
*/
var config;
(function (config) {
    class Scene {
    }
    Scene.MENU = 0;
    Scene.INSTRUCTIONS = 1;
    Scene.GHZ1 = 2;
    Scene.GHZ2 = 3;
    config.Scene = Scene;
    class Screen {
    }
    Screen.SCALE_X = 3;
    Screen.SCALE_Y = 3;
    Screen.WIDTH = 320;
    Screen.HEIGHT = 240;
    Screen.CENTER_X = 160;
    Screen.CENTER_Y = 120;
    //used back when the stage was scaled up instead of the canvas
    Screen.REAL_WIDTH = 320;
    Screen.REAL_HEIGHT = 240;
    config.Screen = Screen;
    class Game {
    }
    Game.FPS = 60;
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=config.js.map