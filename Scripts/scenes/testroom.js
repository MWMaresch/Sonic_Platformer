var scenes;
(function (scenes) {
    class TestRoom extends scenes.Level {
        constructor() {
            super();
            this._stringGrid = ["..........................................................................   ..............................................",
                "....(                                    ]...(                                                                            .",
                "...[                                      ].(                                                                             .",
                "..[                                                                                                                       .",
                ".[                 ,.....1                                                                                              E .",
                ".                 /.......`                                         ...             .....       .....        ...       ....",
                ".                 .........                                         ...                                                ....",
                ".`                .........                                         ......    ...                                       ]..",
                "..1               ) ..... [                                         ......                                               ).",
                "...1               ].....(                                          ......                                                .",
                "....1                                                               ......                                                .",
                ".....1                                   ,...1                      ......`                                              /.",
                "......1                                 ,.....1                     .......1                         ,.......1          ,..",
                "...........................................................................................................................",
                "..........................................................................................................................."];
            console.log(this._stringGrid);
            super.start();
            this.createBackground();
            this.createGridFromTiles(this._stringGrid);
            this.setInitialTilesVisible();
            //creating player
            this._player = new objects.Player("stand", 9 * 16, 12 * 16);
            this._spriteContainer.addChild(this._player);
            //creating obstacles
            this._objects.push(new objects.Motobug(86 * 16, 10 * 16));
            this._objects.push(new objects.Motobug(this._player.x + 301, 10 * 16));
            this._objects.push(new objects.Spike(33 * 16, 192));
            this._objects.push(new objects.Spike(105 * 16, 176));
            //adding all obstacles to spriteContainer
            for (let obj of this._objects) {
                this._spriteContainer.addChild(obj);
            }
            stage.addChild(this._spriteContainer);
            this.createHUD();
        }
        update() {
            super.update();
        }
        _returnBtnClick(event) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
    scenes.TestRoom = TestRoom;
})(scenes || (scenes = {}));
//# sourceMappingURL=testroom.js.map