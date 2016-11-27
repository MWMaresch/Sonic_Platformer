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
                "..1               ).......[                                         ......                                               ).",
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
            this._obstacles.push(new objects.Motobug("motobug", 86 * 16, 10 * 16));
            this._obstacles.push(new objects.Motobug("motobug", this._player.x + 301, 10 * 16));
            this._obstacles.push(new objects.Spike(33 * 16, 192));
            this._obstacles.push(new objects.Spike(105 * 16, 176));
            //adding all obstacles to spriteContainer
            for (let obj of this._obstacles) {
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