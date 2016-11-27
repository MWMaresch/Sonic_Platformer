/*
    Scene  module to group all user-defined scenes  under the same "namespace aka module"
    Game scene that contains all assets and functionality associated with the game itself
*/
var scenes;
(function (scenes) {
    class Game extends objects.Scene {
        constructor() {
            super();
        }
        // PUBLIC FUNCTIONS
        start() {
            // Add objects to the scene
            console.log("Game scene started");
            // Create Label for scene and add to Game Scene container
            this._gameLabel = new objects.Label("PLAY SCENE", "60px Consolar", "#000000", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._gameLabel);
            // Create button for scene and add to Game Scene container. Register for onclick event
            this._gameButton = new objects.Button("Back", config.Screen.CENTER_X, config.Screen.CENTER_Y + 180);
            this.addChild(this._gameButton);
            this._gameButton.on("click", this._onBackButtonClick, this);
            // Add gamescene to main stage container. 
            stage.addChild(this);
        }
        update() {
            // Update objects
        }
        _onBackButtonClick(event) {
            // Set global variable to Menu Scene and call changescene function
            scene = config.Scene.MENU;
            changeScene();
        }
    }
    scenes.Game = Game;
})(scenes || (scenes = {}));
//# sourceMappingURL=game.js.map