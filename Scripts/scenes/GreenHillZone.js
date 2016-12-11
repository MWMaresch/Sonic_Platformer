var scenes;
(function (scenes) {
    class GreenHillZone1 extends scenes.Level {
        constructor() {
            super();
            //an array of 2d arrays
            this._act1Grids = new Array();
            this._act1Grids.push([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 28, 28, 28, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 14, 0, 0, 27, 19, 13, 13, 29, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 14, 16, 18, 8, 20, 15, 1, 24, 19, 13, 29, 12, 30, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17, 19, 13, 21, 22, 23, 26, 12, 12, 30, 13, 29, 31, 0, 28, 9, 10, 35, 6, 2, 38, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 30, 15, 7, 32, 33, 34, 36, 37, 13, 15, 1, 1, 1, 1]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
            this.createBackground();
            this.createGridsFromTileGroups(this._act1Grids); //, objects.TileGroup.GHZ_1);
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
            this._objects.push(new objects.Spike(3416, 886));
            this._objects.push(new objects.Spike(3464, 887));
            this._objects.push(new objects.Spike(3544, 880));
            this._objects.push(new objects.Spike(3926, 947));
            this._objects.push(new objects.Spike(4012, 951));
            this._objects.push(new objects.Spike(4464, 887));
            this._objects.push(new objects.Spike(4564, 880));
            this._objects.push(new objects.Spike(4660, 883));
            this._objects.push(new objects.Spike(5328, 820));
            this._objects.push(new objects.Spike(5376, 817));
            this._objects.push(new objects.Spike(5424, 816));
            this._objects.push(new objects.Spike(7712, 1204));
            this._objects.push(new objects.Spike(8224, 1200));
            this._objects.push(new objects.Rock(2509, 765));
            this._objects.push(new objects.Rock(2967, 766));
            this._objects.push(new objects.Rock(4000, 513));
            this._objects.push(new objects.Rock(4056, 626));
            this._objects.push(new objects.Rock(7544, 1142));
            this._objects.push(new objects.Rock(8400, 880));
            this._objects.push(new objects.Motobug(813, 925));
            this._objects.push(new objects.Crabmeat(2208, 831));
            this._objects.push(new objects.Crabmeat(2400, 752));
            this._objects.push(new objects.Ring(false, 324, 864));
            this._objects.push(new objects.Ring(false, 348, 864));
            this._objects.push(new objects.Ring(false, 372, 864));
            this._objects.push(new objects.Ring(false, 820, 556));
            this._objects.push(new objects.Ring(false, 820, 580));
            this._objects.push(new objects.Ring(false, 820, 604));
            this._objects.push(new objects.Ring(false, 820, 628));
            this._objects.push(new objects.Ring(false, 820, 652));
            this._objects.push(new objects.Ring(false, 820, 676));
            this._objects.push(new objects.Spring(820, 808));
            this._objects.push(new objects.Ring(false, 1132, 800));
            this._objects.push(new objects.Ring(false, 1156, 800));
            this._objects.push(new objects.Ring(false, 1180, 800));
            this._objects.push(new objects.Ring(false, 1204, 800));
            this._objects.push(new objects.Ring(false, 1228, 800));
            this._objects.push(new objects.Ring(false, 1664, 903));
            this._objects.push(new objects.Ring(false, 1696, 919));
            this._objects.push(new objects.Ring(false, 1156, 800));
            this._objects.push(new objects.Ring(false, 1728, 933));
            this._objects.push(new objects.Ring(false, 1763, 944));
            this._objects.push(new objects.Ring(false, 1803, 947));
            this._objects.push(new objects.Ring(false, 1847, 943));
            this._objects.push(new objects.Ring(false, 1883, 914));
            this._objects.push(new objects.Ring(false, 2500, 704));
            this._objects.push(new objects.Ring(false, 2524, 704));
            this._objects.push(new objects.Ring(false, 2964, 720));
            this._objects.push(new objects.Ring(false, 2988, 720));
            this._objects.push(new objects.Ring(false, 3408, 694));
            this._objects.push(new objects.Ring(false, 3440, 681));
            this._objects.push(new objects.Ring(false, 3474, 663));
            this._objects.push(new objects.Ring(false, 3508, 647));
            this._objects.push(new objects.Ring(false, 3546, 631));
            this._objects.push(new objects.Spring(3628, 632));
            this._objects.push(new objects.Spring(3504, 891));
            this._objects.push(new objects.Spring(3968, 959));
            this._objects.push(new objects.Ring(false, 3761, 529));
            this._objects.push(new objects.Ring(false, 3794, 522));
            this._objects.push(new objects.Ring(false, 3829, 515));
            this._objects.push(new objects.Ring(false, 3866, 517));
            this._objects.push(new objects.Ring(false, 3903, 521));
            this._objects.push(new objects.Ring(false, 3942, 520));
            this._objects.push(new objects.Ring(false, 3976, 728));
            this._objects.push(new objects.Ring(false, 4000, 728));
            this._objects.push(new objects.Ring(false, 4024, 728));
            this._objects.push(new objects.Ring(false, 4440, 812));
            this._objects.push(new objects.Ring(false, 4464, 812));
            this._objects.push(new objects.Ring(false, 4488, 812));
            this._objects.push(new objects.Ring(false, 4640, 812));
            this._objects.push(new objects.Ring(false, 4664, 812));
            this._objects.push(new objects.Ring(false, 4688, 812));
            this._objects.push(new objects.Ring(false, 4700, 574));
            this._objects.push(new objects.Ring(false, 4736, 585));
            this._objects.push(new objects.Ring(false, 4770, 601));
            this._objects.push(new objects.Ring(false, 4803, 617));
            this._objects.push(new objects.Ring(false, 4842, 625));
            this._objects.push(new objects.Motobug(5192, 773));
            this._objects.push(new objects.Ring(false, 5436, 608));
            this._objects.push(new objects.Ring(false, 5454, 560));
            this._objects.push(new objects.Ring(false, 5504, 541));
            this._objects.push(new objects.Ring(false, 5551, 560));
            this._objects.push(new objects.Ring(false, 5571, 608));
            this._objects.push(new objects.Ring(false, 5860, 437));
            this._objects.push(new objects.Ring(false, 5900, 437));
            this._objects.push(new objects.Ring(false, 5940, 427));
            this._objects.push(new objects.Ring(false, 5979, 412));
            this._objects.push(new objects.Ring(false, 6020, 393));
            this._objects.push(new objects.Ring(false, 6054, 377));
            this._objects.push(new objects.Ring(false, 6112, 372));
            this._objects.push(new objects.Ring(false, 6156, 372));
            this._objects.push(new objects.Ring(false, 6204, 374));
            this._objects.push(new objects.Ring(false, 6252, 376));
            this._objects.push(new objects.Ring(false, 6300, 378));
            this._objects.push(new objects.Ring(false, 6348, 372));
            this._objects.push(new objects.Ring(false, 6396, 372));
            this._objects.push(new objects.Ring(false, 6444, 373));
            this._objects.push(new objects.Ring(false, 6492, 378));
            this._objects.push(new objects.Ring(false, 6540, 379));
            this._objects.push(new objects.Ring(false, 6588, 374));
            this._objects.push(new objects.Ring(false, 6636, 372));
            this._objects.push(new objects.Ring(false, 6176, 116));
            this._objects.push(new objects.Ring(false, 6200, 116));
            this._objects.push(new objects.Ring(false, 6224, 116));
            this._objects.push(new objects.Ring(false, 6248, 116));
            this._objects.push(new objects.Ring(false, 6272, 116));
            this._objects.push(new objects.Ring(false, 6296, 116));
            this._objects.push(new objects.Ring(false, 6320, 116));
            this._objects.push(new objects.Ring(false, 6344, 116));
            this._objects.push(new objects.Ring(false, 6368, 116));
            this._objects.push(new objects.Ring(false, 6392, 116));
            this._objects.push(new objects.Ring(false, 6416, 116));
            this._objects.push(new objects.Ring(false, 6440, 116));
            this._objects.push(new objects.Ring(false, 6464, 116));
            this._objects.push(new objects.Ring(false, 6488, 116));
            this._objects.push(new objects.Ring(false, 6512, 116));
            this._objects.push(new objects.Ring(false, 6536, 116));
            this._objects.push(new objects.Ring(false, 6560, 116));
            this._objects.push(new objects.Ring(false, 6584, 116));
            this._objects.push(new objects.Ring(false, 6608, 116));
            this._objects.push(new objects.Ring(false, 6632, 116));
            this._objects.push(new objects.Ring(false, 6480, 880));
            this._objects.push(new objects.Ring(false, 6504, 880));
            this._objects.push(new objects.Ring(false, 6528, 880));
            this._objects.push(new objects.Ring(false, 6552, 880));
            this._objects.push(new objects.Ring(false, 6576, 880));
            this._objects.push(new objects.Rock(7896, 767));
            this._objects.push(new objects.Ring(false, 7512, 616));
            this._objects.push(new objects.Ring(false, 7536, 616));
            this._objects.push(new objects.Ring(false, 7560, 616));
            this._objects.push(new objects.Ring(false, 7584, 616));
            this._objects.push(new objects.Ring(false, 7608, 616));
            this._objects.push(new objects.Ring(false, 7632, 616));
            this._objects.push(new objects.Ring(false, 7656, 616));
            this._objects.push(new objects.Ring(false, 7680, 616));
            this._objects.push(new objects.Ring(false, 7536, 584));
            this._objects.push(new objects.Ring(false, 7560, 584));
            this._objects.push(new objects.Ring(false, 7584, 584));
            this._objects.push(new objects.Ring(false, 7608, 584));
            this._objects.push(new objects.Ring(false, 7632, 584));
            this._objects.push(new objects.Ring(false, 7656, 584));
            this._objects.push(new objects.Ring(false, 7560, 552));
            this._objects.push(new objects.Ring(false, 7584, 552));
            this._objects.push(new objects.Ring(false, 7608, 552));
            this._objects.push(new objects.Ring(false, 7632, 552));
            this._objects.push(new objects.Ring(false, 7524, 600));
            this._objects.push(new objects.Ring(false, 7548, 600));
            this._objects.push(new objects.Ring(false, 7572, 600));
            this._objects.push(new objects.Ring(false, 7596, 600));
            this._objects.push(new objects.Ring(false, 7620, 600));
            this._objects.push(new objects.Ring(false, 7644, 600));
            this._objects.push(new objects.Ring(false, 7668, 600));
            this._objects.push(new objects.Ring(false, 7548, 568));
            this._objects.push(new objects.Ring(false, 7572, 568));
            this._objects.push(new objects.Ring(false, 7596, 568));
            this._objects.push(new objects.Ring(false, 7620, 568));
            this._objects.push(new objects.Ring(false, 7644, 568));
            this._objects.push(new objects.Ring(false, 8048, 692));
            this._objects.push(new objects.Ring(false, 8072, 692));
            this._objects.push(new objects.Ring(false, 8096, 692));
            this._objects.push(new objects.Ring(false, 8120, 692));
            this._objects.push(new objects.Ring(false, 8144, 692));
            this._objects.push(new objects.Ring(false, 8036, 1152));
            this._objects.push(new objects.Ring(false, 8060, 1152));
            this._objects.push(new objects.Ring(false, 8084, 1152));
            this._objects.push(new objects.Ring(false, 8108, 1152));
            this._objects.push(new objects.Ring(false, 8132, 1152));
            this._objects.push(new objects.Ring(false, 8156, 1152));
            this._objects.push(new objects.Ring(false, 8501, 884));
            this._objects.push(new objects.Ring(false, 8536, 893));
            this._objects.push(new objects.Ring(false, 8570, 904));
            this._objects.push(new objects.Ring(false, 8604, 919));
            this._objects.push(new objects.Ring(false, 8638, 936));
            this._objects.push(new objects.Ring(false, 8674, 945));
            this._objects.push(new objects.Ring(false, 9026, 1141));
            this._objects.push(new objects.Ring(false, 9063, 1150));
            this._objects.push(new objects.Ring(false, 9094, 1165));
            this._objects.push(new objects.Ring(false, 9125, 1181));
            this._objects.push(new objects.Ring(false, 9158, 1198));
            this._objects.push(new objects.Ring(false, 9196, 1206));
            this._objects.push(new objects.Ring(false, 9236, 1206));
            this._objects.push(new objects.Ring(false, 9274, 1206));
            this._objects.push(new objects.Ring(false, 9313, 1206));
            this._objects.push(new objects.Ring(false, 9350, 1205));
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
            this._player = new objects.Player("stand", 80, 940, this._act1Grids[0].length * 16 * 16);
            //in front of tunnel
            //this._player = new objects.Player("stand", 5800, 588);
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
        update() {
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
        _returnBtnClick(event) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
        endLevel() {
            this.removeAllChildren();
            scene = config.Scene.GHZ2;
            changeScene();
        }
    }
    scenes.GreenHillZone1 = GreenHillZone1;
    class GreenHillZone2 extends scenes.Level {
        constructor() {
            super();
            //an array of 2d arrays
            this._act2Grids = new Array();
            this._act2Grids.push(
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
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [11, 10, 39, 41, 9, 10, 39, 6, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 2, 0, 0, 0, 0, 27, 3, 14, 0, 0, 0],
                [33, 34, 40, 33, 12, 34, 36, 13, 15, 42, 10, 43, 1, 24, 1, 7, 14, 44, 18, 14, 1, 19, 21, 9, 10, 43, 27, 19, 29, 31, 0, 0, 0],
                [12, 12, 12, 12, 23, 26, 12, 12, 33, 33, 34, 37, 13, 21, 26, 12, 12, 12, 12, 12, 12, 12, 12, 45, 34, 21, 20, 13, 30, 15, 1, 1, 1],
                [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 0, 0, 0, 0, 12, 12, 23, 26, 12, 13, 21, 46, 22, 12, 12, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [11, 10, 0, 0, 9, 10, 39, 6, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 2, 0, 0, 0, 0, 27, 3, 14, 0, 0, 0],
                [33, 34, 0, 33, 12, 34, 36, 13, 15, 0, 10, 0, 1, 25, 1, 7, 14, 0, 18, 14, 1, 19, 21, 9, 10, 0, 27, 19, 29, 31, 0, 0, 0],
                [12, 12, 12, 12, 23, 26, 12, 12, 33, 33, 34, 37, 13, 21, 26, 12, 12, 12, 12, 12, 12, 12, 12, 0, 34, 21, 20, 13, 30, 15, 1, 1, 1],
                [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 0, 0, 0, 0, 12, 12, 23, 26, 12, 13, 21, 0, 22, 12, 12, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0]]);
            this.createBackground();
            this.createGridsFromTileGroups(this._act2Grids); //, objects.TileGroup.GHZ_1);
            //push whatever you want into the objects list here and it will automatically be updated every frame
            //enemies
            this._objects.push(new objects.FloatingPlatform(200, 630, true, false));
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
            //this._player = new objects.Player("stand", 6944, 848, this._act2Grids[0].length * 16 * 16);
            this._spriteContainer.addChild(this._player);
            stage.addChild(this._spriteContainer);
            this.createHUD();
            //this._spriteContainer.setChildIndex(this._player, 0);
            console.log(this._spriteContainer.numChildren);
        }
        update() {
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
        _returnBtnClick(event) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
        endLevel() {
            this.removeAllChildren();
            scene = config.Scene.GHZ1;
            changeScene();
        }
    }
    scenes.GreenHillZone2 = GreenHillZone2;
})(scenes || (scenes = {}));
//# sourceMappingURL=greenhillzone.js.map