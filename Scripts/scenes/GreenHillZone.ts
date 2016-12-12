module scenes {
    export class GreenHillZone1 extends scenes.Level {

        private _returnBtn: objects.Button;
        private _act1Grids: number[][][];

        constructor() {
            super();
            //an array of 2d arrays
            this._act1Grids = new Array<Array<Array<number>>>();
            this._act1Grids.push(
                [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 28, 28, 28, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 14, 0, 0, 27, 19, 13, 13, 29, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 14, 16, 18, 8, 20, 15, 1, 24, 19, 13, 29, 12, 30, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17, 19, 13, 21, 22, 23, 26, 12, 12, 30, 13, 29, 31, 0, 28, 9, 10, 35, 6, 2, 38, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 30, 15, 7, 32, 33, 34, 36, 37, 13, 15, 1, 1, 1, 1]],

                [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
            this.createBackground();

            this.createGridsFromTileGroups(this._act1Grids);//, objects.TileGroup.GHZ_1);

            for (var t = 1; t < 5; t++) {
                this._tileGrids[0][192][43 + t] = new objects.GroundTile("");
                this._tileGrids[0][192][43 + t].setDataToTile(objects.LinearTile.FLAT);
                this._tileGrids[0][192][43 + t].x = 192 * 16;
                this._tileGrids[0][192][43 + t].y = (43 + t) * 16;
            }
            //this._tileGrids[0][176][48] = null;

            //push whatever you want into the objects list here and it will automatically be updated every frame
            //enemies, rings, springs and other things
            this._objects.push(new objects.Spike(3368, 883));
            this._objects.push(new objects.Spike(3416, 886)); this._objects.push(new objects.Spike(3464, 887));
            this._objects.push(new objects.Spike(3544, 880)); this._objects.push(new objects.Spike(3926, 947));
            this._objects.push(new objects.Spike(4012, 951)); this._objects.push(new objects.Spike(4464, 887));
            this._objects.push(new objects.Spike(4564, 880)); this._objects.push(new objects.Spike(4660, 883));
            this._objects.push(new objects.Spike(5328, 820)); this._objects.push(new objects.Spike(5376, 817));
            this._objects.push(new objects.Spike(5424, 816)); this._objects.push(new objects.Spike(7712, 1204));
            this._objects.push(new objects.Spike(8224, 1200)); this._objects.push(new objects.Rock(2509, 765));
            this._objects.push(new objects.Rock(2967, 766)); this._objects.push(new objects.Rock(4000, 513));
            this._objects.push(new objects.Rock(4056, 626)); this._objects.push(new objects.Rock(7544, 1142));
            this._objects.push(new objects.Rock(8400, 880)); this._objects.push(new objects.Motobug(813, 925));
            this._objects.push(new objects.Crabmeat(2208, 831)); this._objects.push(new objects.Crabmeat(2400, 752));
            this._objects.push(new objects.Ring(false, 324, 864)); this._objects.push(new objects.Ring(false, 348, 864));
            this._objects.push(new objects.Ring(false, 372, 864)); this._objects.push(new objects.Ring(false, 820, 556));
            this._objects.push(new objects.Ring(false, 820, 580)); this._objects.push(new objects.Ring(false, 820, 604));
            this._objects.push(new objects.Ring(false, 820, 628)); this._objects.push(new objects.Ring(false, 820, 652));
            this._objects.push(new objects.Ring(false, 820, 676)); this._objects.push(new objects.Spring(820, 808));
            this._objects.push(new objects.Ring(false, 1132, 800)); this._objects.push(new objects.Ring(false, 1156, 800));
            this._objects.push(new objects.Ring(false, 1180, 800)); this._objects.push(new objects.Ring(false, 1204, 800));
            this._objects.push(new objects.Ring(false, 1228, 800)); this._objects.push(new objects.Ring(false, 1664, 903));
            this._objects.push(new objects.Ring(false, 1696, 919)); this._objects.push(new objects.Ring(false, 1156, 800));
            this._objects.push(new objects.Ring(false, 1728, 933)); this._objects.push(new objects.Ring(false, 1763, 944));
            this._objects.push(new objects.Ring(false, 1803, 947)); this._objects.push(new objects.Ring(false, 1847, 943));
            this._objects.push(new objects.Ring(false, 1883, 914)); this._objects.push(new objects.Ring(false, 2500, 704));
            this._objects.push(new objects.Ring(false, 2524, 704)); this._objects.push(new objects.Ring(false, 2964, 720));
            this._objects.push(new objects.Ring(false, 2988, 720)); this._objects.push(new objects.Ring(false, 3408, 694));
            this._objects.push(new objects.Ring(false, 3440, 681)); this._objects.push(new objects.Ring(false, 3474, 663));
            this._objects.push(new objects.Ring(false, 3508, 647)); this._objects.push(new objects.Ring(false, 3546, 631));
            this._objects.push(new objects.Spring(3628, 632)); this._objects.push(new objects.Spring(3504, 891));
            this._objects.push(new objects.Spring(3968, 959)); this._objects.push(new objects.Ring(false, 3761, 529));
            this._objects.push(new objects.Ring(false, 3794, 522)); this._objects.push(new objects.Ring(false, 3829, 515));
            this._objects.push(new objects.Ring(false, 3866, 517)); this._objects.push(new objects.Ring(false, 3903, 521));
            this._objects.push(new objects.Ring(false, 3942, 520)); this._objects.push(new objects.Ring(false, 3976, 728));
            this._objects.push(new objects.Ring(false, 4000, 728)); this._objects.push(new objects.Ring(false, 4024, 728));
            this._objects.push(new objects.Ring(false, 4440, 812)); this._objects.push(new objects.Ring(false, 4464, 812));
            this._objects.push(new objects.Ring(false, 4488, 812)); this._objects.push(new objects.Ring(false, 4640, 812));
            this._objects.push(new objects.Ring(false, 4664, 812)); this._objects.push(new objects.Ring(false, 4688, 812));
            this._objects.push(new objects.Ring(false, 4700, 574)); this._objects.push(new objects.Ring(false, 4736, 585));
            this._objects.push(new objects.Ring(false, 4770, 601)); this._objects.push(new objects.Ring(false, 4803, 617));
            this._objects.push(new objects.Ring(false, 4842, 625)); this._objects.push(new objects.Motobug(5192, 773));
            this._objects.push(new objects.Ring(false, 5436, 608)); this._objects.push(new objects.Ring(false, 5454, 560));
            this._objects.push(new objects.Ring(false, 5504, 541)); this._objects.push(new objects.Ring(false, 5551, 560));
            this._objects.push(new objects.Ring(false, 5571, 608)); this._objects.push(new objects.Ring(false, 5860, 437));
            this._objects.push(new objects.Ring(false, 5900, 437)); this._objects.push(new objects.Ring(false, 5940, 427));
            this._objects.push(new objects.Ring(false, 5979, 412)); this._objects.push(new objects.Ring(false, 6020, 393));
            this._objects.push(new objects.Ring(false, 6054, 377)); this._objects.push(new objects.Ring(false, 6112, 372));
            this._objects.push(new objects.Ring(false, 6156, 372)); this._objects.push(new objects.Ring(false, 6204, 374));
            this._objects.push(new objects.Ring(false, 6252, 376)); this._objects.push(new objects.Ring(false, 6300, 378));
            this._objects.push(new objects.Ring(false, 6348, 372)); this._objects.push(new objects.Ring(false, 6396, 372));
            this._objects.push(new objects.Ring(false, 6444, 373)); this._objects.push(new objects.Ring(false, 6492, 378));
            this._objects.push(new objects.Ring(false, 6540, 379)); this._objects.push(new objects.Ring(false, 6588, 374));
            this._objects.push(new objects.Ring(false, 6636, 372)); this._objects.push(new objects.Ring(false, 6176, 116));
            this._objects.push(new objects.Ring(false, 6200, 116)); this._objects.push(new objects.Ring(false, 6224, 116));
            this._objects.push(new objects.Ring(false, 6248, 116)); this._objects.push(new objects.Ring(false, 6272, 116));
            this._objects.push(new objects.Ring(false, 6296, 116)); this._objects.push(new objects.Ring(false, 6320, 116));
            this._objects.push(new objects.Ring(false, 6344, 116)); this._objects.push(new objects.Ring(false, 6368, 116));
            this._objects.push(new objects.Ring(false, 6392, 116)); this._objects.push(new objects.Ring(false, 6416, 116));
            this._objects.push(new objects.Ring(false, 6440, 116)); this._objects.push(new objects.Ring(false, 6464, 116));
            this._objects.push(new objects.Ring(false, 6488, 116)); this._objects.push(new objects.Ring(false, 6512, 116));
            this._objects.push(new objects.Ring(false, 6536, 116)); this._objects.push(new objects.Ring(false, 6560, 116));
            this._objects.push(new objects.Ring(false, 6584, 116)); this._objects.push(new objects.Ring(false, 6608, 116));
            this._objects.push(new objects.Ring(false, 6632, 116)); this._objects.push(new objects.Ring(false, 6480, 880));
            this._objects.push(new objects.Ring(false, 6504, 880)); this._objects.push(new objects.Ring(false, 6528, 880));
            this._objects.push(new objects.Ring(false, 6552, 880)); this._objects.push(new objects.Ring(false, 6576, 880));
            this._objects.push(new objects.Rock(7896, 767)); this._objects.push(new objects.Ring(false, 7512, 616));
            this._objects.push(new objects.Ring(false, 7536, 616)); this._objects.push(new objects.Ring(false, 7560, 616));
            this._objects.push(new objects.Ring(false, 7584, 616)); this._objects.push(new objects.Ring(false, 7608, 616));
            this._objects.push(new objects.Ring(false, 7632, 616)); this._objects.push(new objects.Ring(false, 7656, 616));
            this._objects.push(new objects.Ring(false, 7680, 616)); this._objects.push(new objects.Ring(false, 7536, 584));
            this._objects.push(new objects.Ring(false, 7560, 584)); this._objects.push(new objects.Ring(false, 7584, 584));
            this._objects.push(new objects.Ring(false, 7608, 584)); this._objects.push(new objects.Ring(false, 7632, 584));
            this._objects.push(new objects.Ring(false, 7656, 584)); this._objects.push(new objects.Ring(false, 7560, 552));
            this._objects.push(new objects.Ring(false, 7584, 552)); this._objects.push(new objects.Ring(false, 7608, 552));
            this._objects.push(new objects.Ring(false, 7632, 552)); this._objects.push(new objects.Ring(false, 7524, 600));
            this._objects.push(new objects.Ring(false, 7548, 600)); this._objects.push(new objects.Ring(false, 7572, 600));
            this._objects.push(new objects.Ring(false, 7596, 600)); this._objects.push(new objects.Ring(false, 7620, 600));
            this._objects.push(new objects.Ring(false, 7644, 600)); this._objects.push(new objects.Ring(false, 7668, 600));
            this._objects.push(new objects.Ring(false, 7548, 568)); this._objects.push(new objects.Ring(false, 7572, 568));
            this._objects.push(new objects.Ring(false, 7596, 568)); this._objects.push(new objects.Ring(false, 7620, 568));
            this._objects.push(new objects.Ring(false, 7644, 568)); this._objects.push(new objects.Ring(false, 8048, 692));
            this._objects.push(new objects.Ring(false, 8072, 692)); this._objects.push(new objects.Ring(false, 8096, 692));
            this._objects.push(new objects.Ring(false, 8120, 692)); this._objects.push(new objects.Ring(false, 8144, 692));
            this._objects.push(new objects.Ring(false, 8036, 1152)); this._objects.push(new objects.Ring(false, 8060, 1152));
            this._objects.push(new objects.Ring(false, 8084, 1152)); this._objects.push(new objects.Ring(false, 8108, 1152));
            this._objects.push(new objects.Ring(false, 8132, 1152)); this._objects.push(new objects.Ring(false, 8156, 1152));
            this._objects.push(new objects.Ring(false, 8501, 884)); this._objects.push(new objects.Ring(false, 8536, 893));
            this._objects.push(new objects.Ring(false, 8570, 904)); this._objects.push(new objects.Ring(false, 8604, 919));
            this._objects.push(new objects.Ring(false, 8638, 936)); this._objects.push(new objects.Ring(false, 8674, 945));
            this._objects.push(new objects.Ring(false, 9026, 1141)); this._objects.push(new objects.Ring(false, 9063, 1150));
            this._objects.push(new objects.Ring(false, 9094, 1165)); this._objects.push(new objects.Ring(false, 9125, 1181));
            this._objects.push(new objects.Ring(false, 9158, 1198)); this._objects.push(new objects.Ring(false, 9196, 1206));
            this._objects.push(new objects.Ring(false, 9236, 1206)); this._objects.push(new objects.Ring(false, 9274, 1206));
            this._objects.push(new objects.Ring(false, 9313, 1206)); this._objects.push(new objects.Ring(false, 9350, 1205));
            this._objects.push(new objects.BlueNewtron(4856, 568)); this._objects.push(new objects.BlueNewtron(6272, 312));
            this._objects.push(new objects.BlueNewtron(6464, 312)); this._objects.push(new objects.BlueNewtron(6400, 320));
            this._objects.push(new objects.BlueNewtron(6528, 352)); this._objects.push(new objects.GreenNewtron(7704, 872));
            this._objects.push(new objects.GreenNewtron(7776, 816)); this._objects.push(new objects.GreenNewtron(7744, 1104));
            this._objects.push(new objects.GreenNewtron(7776, 1072)); this._objects.push(new objects.BlueNewtron(8320, 848));
            this._objects.push(new objects.Crabmeat(8576, 1171));
            //pathswitchers for foreground and background layers
            //whenever we detect a loop in the grid, put pathswitchers around it
            for (var ix = 0; ix < this._act1Grids[0][0].length; ix++) {
                for (var iy = 0; iy < this._act1Grids[0].length; iy++) {
                    if (this._act1Grids[0][iy][ix] == 24) {
                        this._objects.push(new objects.PathSwitcher(ix * 256, iy * 256, 32, 192, 0));
                        this._objects.push(new objects.PathSwitcher((ix + 1) * 256, iy * 256, 32, 192, 0));
                        this._objects.push(new objects.PathSwitcher(((ix + 1) * 256) - 32, iy * 256, 32, 192, 1));
                        this._objects.push(new objects.PathSwitcher((ix * 256) + 128, (iy * 256) + 16, 16, 16, 0));
                        this._objects.push(new objects.PathSwitcher((ix * 256) + 112, (iy * 256) + 16, 16, 16, 1));
                    }
                }
            }

            this._objects.push(new objects.GoalPlate(9568, 1194));

            //adding all obstacles to spriteContainer
            for (let obj of this._objects)
                this._spriteContainer.addChild(obj);
            this._spriteContainer.setChildIndex(this._objects[32], 1);


            //adding everything to a single sprite container reduces the amount of times we need to draw things to the stage, therefore drastically increasing performance
            this._player = new objects.Player("stand", 80, 940);//, this._act1Grids[0].length * 16 * 16);
            //in front of tunnel
            //this._player = new objects.Player("stand", 5900, 620);
            //end of level
            //this._player = new objects.Player("stand", 9000, 188);
            //top of level
            //this._player = new objects.Player("stand", 6448, 48);
            this._spriteContainer.addChild(this._player);

            stage.addChild(this._spriteContainer);

            this.createHUD();

            //this._spriteContainer.setChildIndex(this._player, 0);
            console.log(this._spriteContainer.numChildren);
        }

        public update(): void {
            if (!gameWon) {
                //the main loop
                this._player.checkCollisionWithGrid(this._tileGrids[this._player.curLayer]);
                this._player.update();
                if (!this._finished)
                    this.updateHUD();
                this.updateCamera();
                this.updateObjects();
                this._player.checkDeathBoundary(-this._camBottomBoundary + config.Screen.HEIGHT);
            }
            else if (!this._alreadyWon) {
                //we only want this to execute once when sonic wins, so we do a check first
                this._timeText.text = "YOU WON IN " + Math.floor((this._timer / 1000) / 60).toString() + ":" + Math.floor(((this._timer / 1000) % 60)) + "\n PRESS ESC TO \nPAUSE AND EXIT";
                this._timeText.scaleX = 1.5;
                this._timeText.scaleY = 1.5;
                this._timeText.regX = this._timeText.getBounds().width / 2;
                this._timeText.regY = this._timeText.getBounds().height / 2;
                this._timeText.x = config.Screen.WIDTH / 2;
                this._timeText.y = config.Screen.HEIGHT / 2;
            }
        }

        private _returnBtnClick(event: createjs.MouseEvent) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
        public endLevel(): void {
            this.removeAllChildren();
            scene = config.Scene.GHZ2;
            changeScene();

        }
    }

    export class GreenHillZone2 extends scenes.Level {
        private _returnBtn: objects.Button;

        private _act2Grids: number[][][];

        constructor() {
            super();
            //an array of 2d arrays
            this._act2Grids = new Array<Array<Array<number>>>();
            this._act2Grids.push(

                [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [11, 10, 39, 41, 9, 10, 39, 6, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 2, 0, 0, 0, 0, 27, 3, 14, 0, 0, 0],
                [33, 34, 40, 33, 12, 34, 36, 13, 15, 42, 10, 43, 1, 24, 1, 7, 14, 44, 18, 14, 1, 19, 21, 9, 10, 43, 27, 19, 29, 31, 0, 0, 0],
                [12, 12, 12, 12, 23, 26, 12, 12, 33, 33, 34, 37, 13, 21, 26, 12, 12, 12, 12, 12, 12, 12, 12, 45, 34, 21, 20, 13, 30, 15, 1, 1, 1],
                [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 0, 0, 0, 0, 12, 12, 23, 26, 12, 13, 21, 46, 22, 12, 12, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0]],

                [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [11, 10, 0, 0, 9, 10, 39, 6, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 2, 0, 0, 0, 0, 27, 3, 14, 0, 0, 0],
                [33, 34, 0, 33, 12, 34, 36, 13, 15, 0, 10, 0, 1, 25, 1, 7, 14, 0, 18, 14, 1, 19, 21, 9, 10, 0, 27, 19, 29, 31, 0, 0, 0],
                [12, 12, 12, 12, 23, 26, 12, 12, 33, 33, 34, 37, 13, 21, 26, 12, 12, 12, 12, 12, 12, 12, 12, 0, 34, 21, 20, 13, 30, 15, 1, 1, 1],
                [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 0, 0, 0, 0, 12, 12, 23, 26, 12, 13, 21, 0, 22, 12, 12, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0]]);

            this.createBackground();
            this.createGridsFromTileGroups(this._act2Grids);//, objects.TileGroup.GHZ_1);

            //push whatever you want into the objects list here and it will automatically be updated every frame
            //enemies
            this._objects.push(new objects.Rock(230, 255)); this._objects.push(new objects.Ring(false, 384, 191));
            this._objects.push(new objects.Ring(false, 408, 191)); this._objects.push(new objects.Ring(false, 432, 191));
            this._objects.push(new objects.Ring(false, 456, 191)); this._objects.push(new objects.Spike(28, 690));
            this._objects.push(new objects.Spike(100, 690)); this._objects.push(new objects.Rock(752, 368));
            this._objects.push(new objects.Spring(752, 344)); this._objects.push(new objects.Ring(false, 752, 184));
            this._objects.push(new objects.Ring(false, 752, 160)); this._objects.push(new objects.Ring(false, 752, 136));
            this._objects.push(new objects.Ring(false, 752, 112)); this._objects.push(new objects.Ring(false, 752, 88));
            this._objects.push(new objects.Crabmeat(1136, 253)); this._objects.push(new objects.Motobug(1088, 774));
            this._objects.push(new objects.Rock(1272, 818)); this._objects.push(new objects.Ring(false, 1392, 256));
            this._objects.push(new objects.Ring(false, 1416, 256)); this._objects.push(new objects.Ring(false, 1440, 256));
            this._objects.push(new objects.Ring(false, 1464, 256)); this._objects.push(new objects.Ring(false, 1488, 256));
            this._objects.push(new objects.Ring(false, 1380, 616)); this._objects.push(new objects.Ring(false, 1404, 616));
            this._objects.push(new objects.Ring(false, 1428, 616)); this._objects.push(new objects.Ring(false, 1452, 616));
            this._objects.push(new objects.Ring(false, 1476, 616)); this._objects.push(new objects.Ring(false, 1500, 616));
            this._objects.push(new objects.Motobug(1456, 689)); this._objects.push(new objects.Motobug(1680, 689));
            this._objects.push(new objects.Spike(1388, 976)); this._objects.push(new objects.Spike(1388, 976));
            this._objects.push(new objects.Spike(1460, 976)); this._objects.push(new objects.Spike(1532, 976));
            this._objects.push(new objects.Spike(1604, 976)); this._objects.push(new objects.Spike(1676, 976));
            this._objects.push(new objects.Spike(1748, 976)); this._objects.push(new objects.Spike(1820, 976));
            this._objects.push(new objects.Spike(1892, 976)); this._objects.push(new objects.Spike(1964, 976));
            this._objects.push(new objects.Spike(2012, 976)); this._objects.push(new objects.Rock(1776, 368));
            this._objects.push(new objects.Rock(2048, 432)); this._objects.push(new objects.Rock(2164, 944));
            this._objects.push(new objects.Ring(false, 2164, 844)); this._objects.push(new objects.Ring(false, 2164, 868));
            this._objects.push(new objects.Ring(false, 2247, 685)); this._objects.push(new objects.Ring(false, 2282, 695));
            this._objects.push(new objects.Ring(false, 2322, 693)); this._objects.push(new objects.Ring(false, 2365, 686));
            this._objects.push(new objects.Ring(false, 2395, 659)); this._objects.push(new objects.Ring(false, 2400, 619));
            this._objects.push(new objects.Ring(false, 2400, 576)); this._objects.push(new objects.Spike(2484, 508));
            this._objects.push(new objects.BlueNewtron(2360, 904)); this._objects.push(new objects.BlueNewtron(2440, 856));
            this._objects.push(new objects.BlueNewtron(2504, 888)); this._objects.push(new objects.BlueNewtron(2584, 840));
            this._objects.push(new objects.Ring(false, 2960, 536)); this._objects.push(new objects.Ring(false, 2960, 576));
            this._objects.push(new objects.Ring(false, 2961, 616)); this._objects.push(new objects.Ring(false, 2968, 656));
            this._objects.push(new objects.Ring(false, 3000, 686)); this._objects.push(new objects.Ring(false, 3048, 693));
            this._objects.push(new objects.Ring(false, 3097, 693)); this._objects.push(new objects.Rock(3104, 880));
            this._objects.push(new objects.BlueNewtron(3176, 848)); this._objects.push(new objects.BlueNewtron(3252, 806));
            this._objects.push(new objects.BlueNewtron(3328, 856)); this._objects.push(new objects.Crabmeat(3456, 847));
            this._objects.push(new objects.Spring(3632, 824)); this._objects.push(new objects.Ring(false, 3352, 496));
            this._objects.push(new objects.Ring(false, 3376, 496)); this._objects.push(new objects.Ring(false, 3400, 496));
            this._objects.push(new objects.Ring(false, 3424, 496)); this._objects.push(new objects.Ring(false, 3376, 464));
            this._objects.push(new objects.Ring(false, 3400, 464)); this._objects.push(new objects.Ring(false, 3488, 496));
            this._objects.push(new objects.Ring(false, 3512, 496)); this._objects.push(new objects.Ring(false, 3536, 496));
            this._objects.push(new objects.Ring(false, 3560, 496)); this._objects.push(new objects.Ring(false, 3512, 464));
            this._objects.push(new objects.Ring(false, 3536, 464)); this._objects.push(new objects.Ring(false, 3364, 480));
            this._objects.push(new objects.Ring(false, 3388, 480)); this._objects.push(new objects.Ring(false, 3412, 480));
            this._objects.push(new objects.Ring(false, 3388, 448)); this._objects.push(new objects.Ring(false, 3500, 480));
            this._objects.push(new objects.Ring(false, 3524, 480)); this._objects.push(new objects.Ring(false, 3548, 480));
            this._objects.push(new objects.Ring(false, 3524, 448)); this._objects.push(new objects.Ring(false, 3456, 540));
            this._objects.push(new objects.Ring(false, 3420, 547)); this._objects.push(new objects.Ring(false, 3488, 547));
            this._objects.push(new objects.Ring(false, 3396, 574)); this._objects.push(new objects.Ring(false, 3516, 574));
            this._objects.push(new objects.Ring(false, 3389, 608)); this._objects.push(new objects.Ring(false, 3524, 608));
            this._objects.push(new objects.Ring(false, 3396, 642)); this._objects.push(new objects.Ring(false, 3516, 642));
            this._objects.push(new objects.Ring(false, 3840, 692)); this._objects.push(new objects.Ring(false, 3880, 692));
            this._objects.push(new objects.Ring(false, 3840, 692)); this._objects.push(new objects.Ring(false, 3917, 678));
            this._objects.push(new objects.Ring(false, 3938, 646)); this._objects.push(new objects.Ring(false, 3943, 609));
            this._objects.push(new objects.Rock(4080, 624)); this._objects.push(new objects.Ring(false, 4180, 560));
            this._objects.push(new objects.Ring(false, 4204, 560)); this._objects.push(new objects.Ring(false, 4500, 560));
            this._objects.push(new objects.Ring(false, 4524, 560)); this._objects.push(new objects.Ring(false, 5076, 560));
            this._objects.push(new objects.Ring(false, 5100, 560)); this._objects.push(new objects.Ring(false, 4308, 528));
            this._objects.push(new objects.Ring(false, 4308, 528)); this._objects.push(new objects.Ring(false, 4332, 528));
            this._objects.push(new objects.Ring(false, 4628, 536)); this._objects.push(new objects.Ring(false, 4652, 536));
            this._objects.push(new objects.Ring(false, 4756, 536)); this._objects.push(new objects.Ring(false, 4780, 536));
            this._objects.push(new objects.Ring(false, 4948, 536)); this._objects.push(new objects.Ring(false, 4972, 536));
            this._objects.push(new objects.Spike(4192, 720)); this._objects.push(new objects.Spike(4320, 720));
            this._objects.push(new objects.Spike(4512, 720)); this._objects.push(new objects.Spike(4640, 720));
            this._objects.push(new objects.Spike(4768, 720)); this._objects.push(new objects.Spike(4960, 720));
            this._objects.push(new objects.Spike(5088, 720)); this._objects.push(new objects.FloatingPlatform(4256, 416, false, true));
            this._objects.push(new objects.FloatingPlatform(4576, 416, false, true)); this._objects.push(new objects.FloatingPlatform(4704, 416, false, true));
            this._objects.push(new objects.FloatingPlatform(5024, 416, false, true)); this._objects.push(new objects.Motobug(5408, 689));
            this._objects.push(new objects.Ring(false, 5400, 692)); this._objects.push(new objects.Ring(false, 5442, 682));
            this._objects.push(new objects.Ring(false, 5480, 664)); this._objects.push(new objects.Ring(false, 5518, 646));
            this._objects.push(new objects.Ring(false, 5563, 631)); this._objects.push(new objects.Motobug(5792, 439));
            this._objects.push(new objects.GreenNewtron(5808, 416)); this._objects.push(new objects.GreenNewtron(5984, 568));
            this._objects.push(new objects.Crabmeat(6048, 511)); this._objects.push(new objects.Rock(6096, 510));
            this._objects.push(new objects.BlueNewtron(6160, 880)); this._objects.push(new objects.Rock(6184, 1072));
            this._objects.push(new objects.Motobug(6304, 945)); this._objects.push(new objects.Ring(false, 6244, 448));
            this._objects.push(new objects.Ring(false, 6268, 448)); this._objects.push(new objects.Ring(false, 6292, 448));
            this._objects.push(new objects.Ring(false, 6316, 448)); this._objects.push(new objects.Ring(false, 6340, 448));
            this._objects.push(new objects.Ring(false, 6364, 448)); this._objects.push(new objects.Ring(false, 6543, 536));
            this._objects.push(new objects.Ring(false, 6543, 576)); this._objects.push(new objects.Ring(false, 6543, 616));
            this._objects.push(new objects.Ring(false, 6548, 656)); this._objects.push(new objects.Ring(false, 6567, 686));
            this._objects.push(new objects.Ring(false, 6600, 693)); this._objects.push(new objects.Ring(false, 6644, 693));
            this._objects.push(new objects.Ring(false, 6685, 693)); this._objects.push(new objects.Rock(6784, 1143));
            this._objects.push(new objects.Spike(7060, 887)); this._objects.push(new objects.Spike(7132, 882));
            this._objects.push(new objects.Spike(7652, 1027)); this._objects.push(new objects.FloatingPlatform(6100, 1152, true, false));
            this._objects.push(new objects.FloatingPlatform(6300, 1152, true, false)); this._objects.push(new objects.GoalPlate(7776, 937));

            //pathswitchers for foreground and background layers
            //whenever we detect a loop in the grid, put pathswitchers around it
            for (var ix = 0; ix < this._act2Grids[0][0].length; ix++) {
                for (var iy = 0; iy < this._act2Grids[0].length; iy++) {
                    if (this._act2Grids[0][iy][ix] == 24) {
                        this._objects.push(new objects.PathSwitcher(ix * 256, iy * 256, 32, 192, 0));
                        this._objects.push(new objects.PathSwitcher((ix + 1) * 256, iy * 256, 32, 192, 0));
                        this._objects.push(new objects.PathSwitcher(((ix + 1) * 256) - 32, iy * 256, 32, 192, 1));
                        this._objects.push(new objects.PathSwitcher((ix * 256) + 128, (iy * 256) + 16, 16, 16, 0));
                        this._objects.push(new objects.PathSwitcher((ix * 256) + 112, (iy * 256) + 16, 16, 16, 1));
                    }
                }
            }

            this._objects.push(new objects.GoalPlate(9568, 1194));

            //adding all obstacles to spriteContainer
            for (let obj of this._objects)
                this._spriteContainer.addChild(obj);

            //adding everything to a single sprite container reduces the amount of times we need to draw things to the stage, therefore drastically increasing performance
            this._player = new objects.Player("stand", 79, 251, this._act2Grids[0].length * 16 * 16);
            //this._player = new objects.Player("stand", 5311, 672);
            this._spriteContainer.addChild(this._player);

            stage.addChild(this._spriteContainer);

            this.createHUD();

            //this._spriteContainer.setChildIndex(this._player, 0);
            console.log(this._spriteContainer.numChildren);
        }

        public update(): void {
            if (!gameWon) {
                //the main loop
                this._player.update();
                if (!this._finished)
                    this.updateHUD();
                this.updateCamera();
                this.updateObjects();
                this._player.checkCollisionWithGrid(this._tileGrids[this._player.curLayer]);
                this._player.checkDeathBoundary(-this._camBottomBoundary + config.Screen.HEIGHT);
            }
            else if (!this._alreadyWon) {
                //we only want this to execute once when sonic wins, so we do a check first
                this._timeText.text = "YOU WON IN " + Math.floor((this._timer / 1000) / 60).toString() + ":" + Math.floor(((this._timer / 1000) % 60)) + "\n PRESS ESC TO \nPAUSE AND EXIT";
                this._timeText.scaleX = 1.5;
                this._timeText.scaleY = 1.5;
                this._timeText.regX = this._timeText.getBounds().width / 2;
                this._timeText.regY = this._timeText.getBounds().height / 2;
                this._timeText.x = config.Screen.WIDTH / 2;
                this._timeText.y = config.Screen.HEIGHT / 2;
            }
        }

        private _returnBtnClick(event: createjs.MouseEvent) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
        public endLevel(): void {
            this.removeAllChildren();
            scene = config.Scene.GHZ3;
            changeScene();
        }
    }
    export class GreenHillZone3 extends scenes.Level {
        private _returnBtn: objects.Button;

        private _act3Grids: number[][][];

        constructor() {
            super();
            //an array of 2d arrays
            this._act3Grids = new Array<Array<Array<number>>>();
            this._act3Grids.push(

                [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 18, 45, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 47, 18, 14, 16, 0, 47, 18, 49, 6, 17, 19, 29, 31, 0, 0, 16, 27, 1, 0, 0, 0, 47, 50, 50, 5, 14, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 38, 39, 48, 20, 15, 17, 2, 40, 19, 29, 12, 12, 12, 30, 15, 24, 3, 48, 20, 13, 50, 50, 6, 17, 51, 51, 37, 15, 40, 3, 49, 0, 39, 6, 7, 6, 1, 1, 1],
                [12, 31, 36, 12, 12, 12, 12, 12, 12, 12, 30, 29, 12, 12, 12, 12, 12, 12, 33, 13, 22, 51, 51, 13, 12, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 30, 13, 21, 22, 23, 46, 22, 12, 12, 12, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],

                [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

            this.createBackground();
            this.createGridsFromTileGroups(this._act3Grids);//, objects.TileGroup.GHZ_1);

            //push whatever you want into the objects list here and it will automatically be updated every frame
            //enemies
            this._objects.push(new objects.Spring(296,952));
            this._objects.push(new objects.Spike(364,992));
            this._objects.push(new objects.Spike(436,992));
            this._objects.push(new objects.Spike(484,992));
            this._objects.push(new objects.Spike(556,992));
            this._objects.push(new objects.FloatingPlatform(276,968,true));
            this._objects.push(new objects.Motobug(592,776));
            this._objects.push(new objects.Spring(632,780));
            this._objects.push(new objects.BlueNewtron(912,592));
            this._objects.push(new objects.Ring(false, 848,882));
            this._objects.push(new objects.Ring(false, 884,874));
            this._objects.push(new objects.Ring(false, 920,862));
            this._objects.push(new objects.Ring(false, 956,845));
            this._objects.push(new objects.Ring(false, 992,826));
            this._objects.push(new objects.Ring(false, 1032,820));
            this._objects.push(new objects.Ring(false, 1056,600));
            this._objects.push(new objects.Ring(false, 1080,600));
            this._objects.push(new objects.Ring(false, 1104,600));
            this._objects.push(new objects.Ring(false, 1128,600));
            this._objects.push(new objects.Ring(false, 1152,600));
            this._objects.push(new objects.Ring(false, 1176,600));
            this._objects.push(new objects.Spring(1328,632));
            this._objects.push(new objects.Ring(false, 1382,893));
            this._objects.push(new objects.Ring(false, 1412,908));
            this._objects.push(new objects.Ring(false, 1442,924));
            this._objects.push(new objects.Ring(false, 1476,940));
            this._objects.push(new objects.Ring(false, 1512,950));
            this._objects.push(new objects.Motobug(1616,520));
            this._objects.push(new objects.Ring(false, 1608,660));
            this._objects.push(new objects.Ring(false, 1644,652));
            this._objects.push(new objects.Ring(false, 1680,642));
            this._objects.push(new objects.Ring(false, 1720,628));
            this._objects.push(new objects.Ring(false, 1768,626));
            this._objects.push(new objects.Ring(false, 1814,628));
            this._objects.push(new objects.Ring(false, 1861,638));
            this._objects.push(new objects.Spring(1984,856));
            this._objects.push(new objects.GreenNewtron(2080,832));
            this._objects.push(new objects.Ring(false, 2088,513));
            this._objects.push(new objects.Ring(false, 2088,513));
            this._objects.push(new objects.Ring(false, 2112,513));
            this._objects.push(new objects.Ring(false, 2136,513));
            this._objects.push(new objects.Ring(false, 2160,513));
            this._objects.push(new objects.Ring(false, 2184,513));
            this._objects.push(new objects.Ring(false, 2208,513));
            this._objects.push(new objects.Ring(false, 2336,592));
            this._objects.push(new objects.Ring(false, 2360,592));
            this._objects.push(new objects.Ring(false, 2384,592));
            this._objects.push(new objects.Ring(false, 2408,592));
            this._objects.push(new objects.Ring(false, 2432,592));
            this._objects.push(new objects.Ring(false, 2456,592));
            this._objects.push(new objects.Ring(false, 2872,626));
            this._objects.push(new objects.Ring(false, 2912,638));
            this._objects.push(new objects.Ring(false, 2954,654));
            this._objects.push(new objects.Ring(false, 2992,672));
            this._objects.push(new objects.Ring(false, 3034,685));
            this._objects.push(new objects.Ring(false, 3081,691));
            this._objects.push(new objects.BlueNewtron(3200,640));
            this._objects.push(new objects.BlueNewtron(3280,608));
            this._objects.push(new objects.Ring(false, 3128,1392));
            this._objects.push(new objects.Ring(false, 3152,1392));
            this._objects.push(new objects.Ring(false, 3176,1392));
            this._objects.push(new objects.Ring(false, 3200,1392));
            this._objects.push(new objects.Ring(false, 3224,1392));
            this._objects.push(new objects.Ring(false, 3248,1392));
            this._objects.push(new objects.Ring(false, 3272,1392));
            this._objects.push(new objects.Ring(false, 3296,1392));
            this._objects.push(new objects.Ring(false, 3320,1392));
            this._objects.push(new objects.Ring(false, 3344,1392));
            this._objects.push(new objects.Ring(false, 3360,688));
            this._objects.push(new objects.Ring(false, 3399,679));
            this._objects.push(new objects.Ring(false, 3432,663));
            this._objects.push(new objects.Ring(false, 3469,644));
            this._objects.push(new objects.Ring(false, 3516,629));
            this._objects.push(new objects.Ring(false, 3560,628));
            this._objects.push(new objects.Rock(3536,1329));
            this._objects.push(new objects.Crabmeat(3616,1327));
            this._objects.push(new objects.BlueNewtron(3744,1216));
            this._objects.push(new objects.BlueNewtron(3808,1248));
            this._objects.push(new objects.BlueNewtron(3936,1200));
            this._objects.push(new objects.Ring(false, 3912,1168));
            this._objects.push(new objects.Ring(false, 3912,1192));
            this._objects.push(new objects.Ring(false, 3912,1216));
            this._objects.push(new objects.Rock(3912,1285));
            this._objects.push(new objects.Spike(3992,1331));
            this._objects.push(new objects.Ring(false, 4222,796));
            this._objects.push(new objects.Ring(false, 4196,800));
            this._objects.push(new objects.Ring(false, 4248,800));
            this._objects.push(new objects.Ring(false, 4175,815));
            this._objects.push(new objects.Ring(false, 4217,815));
            this._objects.push(new objects.Ring(false, 4160,837));
            this._objects.push(new objects.Ring(false, 4288,837));
            this._objects.push(new objects.Ring(false, 4156,864));
            this._objects.push(new objects.Ring(false, 4292,864));
            this._objects.push(new objects.Ring(false, 4160,892));
            this._objects.push(new objects.Ring(false, 4288,892));
            this._objects.push(new objects.Rock(4496,1287));
            this._objects.push(new objects.Ring(false, 4688,882));
            this._objects.push(new objects.Ring(false, 4724,874));
            this._objects.push(new objects.Ring(false, 4760,862));
            this._objects.push(new objects.Ring(false, 4792,846));
            this._objects.push(new objects.Ring(false, 4824,830));
            this._objects.push(new objects.BlueNewtron(4672,1152));
            this._objects.push(new objects.BlueNewtron(4752,1104));
            this._objects.push(new objects.Spike(4832,1201));
            this._objects.push(new objects.Spike(4984,1144));
            this._objects.push(new objects.Crabmeat(5157,1071));
            this._objects.push(new objects.Spring(5232,1037));
            this._objects.push(new objects.Spike(5336,1027));
            this._objects.push(new objects.Spring(5936,1145));
            this._objects.push(new objects.Spike(6008,1142));
            this._objects.push(new objects.Spike(6056,1141));
            this._objects.push(new objects.Spike(6104,1136));
            this._objects.push(new objects.Ring(false, 5980,895));
            this._objects.push(new objects.Ring(false, 6014,906));
            this._objects.push(new objects.Ring(false, 6047,923));
            this._objects.push(new objects.Ring(false, 6080,937));
            this._objects.push(new objects.Ring(false, 6118,947));
            this._objects.push(new objects.BlueNewtron(6256,864));
            this._objects.push(new objects.BlueNewtron(6336,912));
            this._objects.push(new objects.Ring(false, 6476,920));
            this._objects.push(new objects.Ring(false, 6500,920));
            this._objects.push(new objects.Ring(false, 6524,920));
            this._objects.push(new objects.Ring(false, 6548,920));
            this._objects.push(new objects.Ring(false, 6572,920));
            this._objects.push(new objects.Ring(false, 6596,920));
            this._objects.push(new objects.Ring(false, 6596,900));
            this._objects.push(new objects.Ring(false, 6620,900));
            this._objects.push(new objects.Ring(false, 6644,900));
            this._objects.push(new objects.Ring(false, 6668,900));
            this._objects.push(new objects.Ring(false, 6692,900));
            this._objects.push(new objects.Ring(false, 6716,900));
            this._objects.push(new objects.Ring(false, 6716,920));
            this._objects.push(new objects.Ring(false, 6740,920));
            this._objects.push(new objects.Ring(false, 6764,920));
            this._objects.push(new objects.Ring(false, 6788,920));
            this._objects.push(new objects.Ring(false, 6812,920));
            this._objects.push(new objects.Ring(false, 6836,920));
            this._objects.push(new objects.Crabmeat(7072,914));
            this._objects.push(new objects.Ring(false, 7712,952));
            this._objects.push(new objects.Ring(false, 7752,953));
            this._objects.push(new objects.Ring(false, 7792,938));
            this._objects.push(new objects.Ring(false, 7832,919));
            this._objects.push(new objects.Ring(false, 7872,900));
            this._objects.push(new objects.Ring(false, 7910,888));
            this._objects.push(new objects.Ring(false, 7953,885));
            this._objects.push(new objects.Spike(8236,976));
            this._objects.push(new objects.Spike(8308,976));
            this._objects.push(new objects.Spike(8380,976));
            this._objects.push(new objects.Spike(8452,976));
            this._objects.push(new objects.Ring(false, 8932,943));
            this._objects.push(new objects.Ring(false, 8960,949));
            this._objects.push(new objects.Ring(false, 9000,948));
            this._objects.push(new objects.Ring(false, 9036,934));
            this._objects.push(new objects.Ring(false, 9059,901));
            this._objects.push(new objects.Spike(9572,1008));
            this._objects.push(new objects.Spike(9644,1008));
            this._objects.push(new objects.Spike(9692,1008));
            this._objects.push(new objects.GoalPlate(9615,935));

            //pathswitchers for foreground and background layers
            //whenever we detect a loop in the grid, put pathswitchers around it
            for (var ix = 0; ix < this._act3Grids[0][0].length; ix++) {
                for (var iy = 0; iy < this._act3Grids[0].length; iy++) {
                    if (this._act3Grids[0][iy][ix] == 24) {
                        this._objects.push(new objects.PathSwitcher(ix * 256, iy * 256, 32, 192, 0));
                        this._objects.push(new objects.PathSwitcher((ix + 1) * 256, iy * 256, 32, 192, 0));
                        this._objects.push(new objects.PathSwitcher(((ix + 1) * 256) - 32, iy * 256, 32, 192, 1));
                        this._objects.push(new objects.PathSwitcher((ix * 256) + 128, (iy * 256) + 16, 16, 16, 0));
                        this._objects.push(new objects.PathSwitcher((ix * 256) + 112, (iy * 256) + 16, 16, 16, 1));
                    }
                }
            }

            //this._objects.push(new objects.GoalPlate(9568, 1194));

            //adding all obstacles to spriteContainer
            for (let obj of this._objects)
                this._spriteContainer.addChild(obj);

            //adding everything to a single sprite container reduces the amount of times we need to draw things to the stage, therefore drastically increasing performance
            this._player = new objects.Player("stand", 79, 940, this._act3Grids[0].length * 16 * 16);
            //this._player = new objects.Player("stand", 8000, 848, this._act3Grids[0].length * 16 * 16);
            this._spriteContainer.addChild(this._player);

            stage.addChild(this._spriteContainer);

            this.createHUD();

            //this._spriteContainer.setChildIndex(this._player, 0);
            console.log(this._spriteContainer.numChildren);
        }

        public update(): void {
            if (!gameWon) {
                //the main loop
                this._player.update();
                if (!this._finished)
                    this.updateHUD();
                this.updateCamera();
                this.updateObjects();
                this._player.checkCollisionWithGrid(this._tileGrids[this._player.curLayer]);
                this._player.checkDeathBoundary(-this._camBottomBoundary + config.Screen.HEIGHT);
            }
            else if (!this._alreadyWon) {
                //we only want this to execute once when sonic wins, so we do a check first
                this._timeText.text = "YOU WON IN " + Math.floor((this._timer / 1000) / 60).toString() + ":" + Math.floor(((this._timer / 1000) % 60)) + "\n PRESS ESC TO \nPAUSE AND EXIT";
                this._timeText.scaleX = 1.5;
                this._timeText.scaleY = 1.5;
                this._timeText.regX = this._timeText.getBounds().width / 2;
                this._timeText.regY = this._timeText.getBounds().height / 2;
                this._timeText.x = config.Screen.WIDTH / 2;
                this._timeText.y = config.Screen.HEIGHT / 2;
            }
        }

        private _returnBtnClick(event: createjs.MouseEvent) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
        public endLevel(): void {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}


//custom level from second last project
                /*[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [6, 1, 3, 5, 6, 2, 9, 16, 6,24,24,24,24,24, 3,29,31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,30,15,24,24,24,38,0, 0, 0, 0, 16, 6, 3, 6,24,38, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,12,12,12,12,12,31,0 ,11,11,10,17,37,22,23,26,31, 9,35,28, 6, 3, 6, 1, 1, 1]],

                [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [6, 1, 3, 5, 6, 2, 9, 16, 6,25,25,25,25,25, 3,29,31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,30,15,25,25,25,38,0, 0, 0, 0, 16, 6, 3, 6,25,38, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,12, 0, 0, 0, 0, 0,18,3, 9, 10,17,37,22,12,12,31, 9, 35, 28, 6, 3, 6, 1, 1, 1]]),*/