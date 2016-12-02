var objects;
(function (objects) {
    var tileGroupEmptyStr = ["                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                "];
    var tileGroup1Str = [".               ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "024M531100000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000"];
    var tileGroup2Str = [".               ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "  ------------  ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "0002468997531000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000"];
    var tileGroup3Str = [".               ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "            P510",
        "          PR0000",
        "        PR000000",
        "      PR00000000",
        "02M9LN0000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000"];
    var tileGroup4Str = [".               ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            "];
    var tileGroup5Str = [".               ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "0246531002466930",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000"];
    var tileGroup6Str = [".               ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "0D0OMKI         ",
        "0000000SQ       ",
        "000000000SQ     ",
        "00000000000OMKI ",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000"];
    var tileGroup7Str = [".               ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "                ",
        "      r024310000",
        "      p000000000",
        "     n0000000000",
        "  Vdj00000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000"];
    var tileGroup8Str = [".               ",
        "                ",
        "                ",
        "                ",
        "            0000",
        "            0000",
        "        00000000",
        "        00000000",
        "0221000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000"];
    var tileGroup9Str = [".     DE   DBCE ",
        "    000000000000",
        "    000000000000",
        "    000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000"];
    var tileGroup10Str = [".DE             ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            ",
        "0000            "];
    var tileGroup11Str = [". DE   DBCE  DDD",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000"];
    var hmFlat = [];
    var hmFlatB = [];
    var hm45 = [];
    var hm3 = [];
    var hm11 = [];
    var hm22 = [];
    class LinearTile {
        static resetTiles() {
            hmFlat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            hmFlatB = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
            hm45 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            hm3 = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
            hm11 = [3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0];
            hm22 = [7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0];
            LinearTile.FLAT = new objects.GroundTile("empty", 0, 180, 90, 270, false, hmFlat, hmFlatB, hmFlat, hmFlatB, true); //in order: top, bottom, left, right
            LinearTile.PLATFORM = new objects.GroundTile("empty", 0, 180, 90, 270, false, hmFlat, hmFlatB, hmFlat, hmFlatB, false); //in order: top, bottom, left, right
            LinearTile.ANGLE3 = new objects.GroundTile("empty", 3, 180, 90, 270, false, hm3, hmFlatB, hmFlat, hmFlatB, true);
            LinearTile.ANGLE11 = new objects.GroundTile("empty", 11, 180, 90, 270, false, hm11, hmFlatB, hmFlat, hmFlatB, true);
            LinearTile.ANGLE22 = new objects.GroundTile("empty", 22, 180, 90, 270, false, hm22, hmFlatB, hmFlat, hmFlatB, true);
        }
    }
    objects.LinearTile = LinearTile;
    var hm3c = [];
    var hm3cB = [];
    var hm7c = [];
    var hm11c = [];
    var hm15c = [];
    var hm20c = [];
    var hm26c = [];
    var hm28c = [];
    var hm36c = [];
    var hm45c = [];
    var hm62c = [];
    var hm75c = [];
    var hm86c = [];
    var hm7cS = [];
    var hm11cS = [];
    var hm15cS = [];
    var hm20cS = [];
    var hm26cS = [];
    var hm28cS = [];
    var hm36cS = [];
    var hm45cS = [];
    var hm62cS = [];
    var hm75cS = [];
    var hm86cS = [];
    class CurvedTile {
        static resetTiles() {
            hmFlat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            hmFlatB = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
            hm3c = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
            hm3cB = [16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
            hm7c = [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0];
            hm11c = [3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0];
            hm15c = [4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0];
            hm20c = [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            hm26c = [16, 16, 16, 16, 16, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11];
            hm28c = [8, 8, 7, 7, 6, 6, 5, 5, 4, 4, 3, 2, 2, 1, 0, 0];
            hm36c = [11, 10, 10, 9, 8, 8, 7, 6, 6, 5, 4, 3, 3, 2, 1, 0];
            hm45c = [15, 14, 13, 12, 12, 11, 10, 9, 8, 7, 6, 5, 3, 2, 1, 0];
            hm62c = [14, 13, 11, 10, 8, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0];
            hm75c = [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 0, 0, 0];
            hm86c = [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 0];
            hm7cS = [13, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            hm11cS = [12, 7, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            hm15cS = [14, 11, 8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            hm20cS = [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            hm26cS = [15, 13, 11, 9, 7, 5, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0];
            hm28cS = [14, 13, 11, 10, 8, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0];
            hm36cS = [15, 14, 13, 11, 10, 9, 7, 6, 4, 3, 1, 0, 0, 0, 0, 0];
            hm45cS = [15, 14, 13, 12, 12, 11, 10, 9, 8, 7, 6, 5, 3, 2, 1, 0];
            hm62cS = [8, 8, 7, 7, 6, 6, 5, 5, 4, 4, 3, 2, 2, 1, 0, 0];
            hm75cS = [13, 13, 13, 13, 12, 12, 12, 12, 11, 11, 11, 10, 10, 10, 9, 9];
            hm86cS = [15, 15, 15, 15, 15, 15, 15, 15, 15, 14, 14, 14, 14, 14, 14, 14];
            CurvedTile.ANGLE3 = new objects.GroundTile("empty", 3, 180, 90, 270, false, hm3c, hmFlatB, hmFlat, hmFlatB, true); //in order: top, bottom, left, right
            CurvedTile.ANGLE3_B = new objects.GroundTile("empty", 3, 180, 90, 270, false, hm3cB, hmFlatB, hmFlat, hmFlatB, true); //in order: top, bottom, left, right
            CurvedTile.ANGLE7 = new objects.GroundTile("empty", 7, 180, 7, 270, false, hm7c, hmFlatB, hm7cS, hmFlatB, true);
            CurvedTile.ANGLE11 = new objects.GroundTile("empty", 11, 180, 11, 270, false, hm11c, hmFlatB, hm11cS, hmFlatB, true);
            CurvedTile.ANGLE15 = new objects.GroundTile("empty", 15, 180, 15, 270, false, hm15c, hmFlatB, hm15cS, hmFlatB, true);
            CurvedTile.ANGLE20 = new objects.GroundTile("empty", 20, 180, 20, 270, false, hm20c, hmFlatB, hm20cS, hmFlatB, true);
            CurvedTile.ANGLE26 = new objects.GroundTile("empty", 26, 180, 26, 270, false, hm26c, hmFlatB, hm26cS, hmFlatB, true);
            CurvedTile.ANGLE28 = new objects.GroundTile("empty", 28, 180, 28, 270, false, hm28c, hmFlatB, hm28cS, hmFlatB, true);
            CurvedTile.ANGLE36 = new objects.GroundTile("empty", 36, 180, 36, 270, false, hm36c, hmFlatB, hm36cS, hmFlatB, true);
            CurvedTile.ANGLE45 = new objects.GroundTile("empty", 45, 180, 45, 270, false, hm45c, hmFlatB, hm45cS, hmFlatB, true);
            CurvedTile.ANGLE62 = new objects.GroundTile("empty", 62, 180, 62, 270, false, hm62c, hmFlatB, hm62cS, hmFlatB, true);
            CurvedTile.ANGLE75 = new objects.GroundTile("empty", 0, 180, 75, 270, false, hm75c, hmFlatB, hm75cS, hmFlatB, true);
            CurvedTile.ANGLE86 = new objects.GroundTile("empty", 86, 180, 86, 270, false, hm86c, hmFlatB, hm86cS, hmFlatB, true);
        }
    }
    objects.CurvedTile = CurvedTile;
    class TileGroup {
        static initialize() {
            LinearTile.resetTiles();
            CurvedTile.resetTiles();
            TileGroup.EMPTY = this.generateGroup(TileGroup.EMPTY, tileGroupEmptyStr, "empty");
            TileGroup.GHZ_1 = this.generateGroup(TileGroup.GHZ_1, tileGroup1Str, "ghz1");
            TileGroup.GHZ_2 = this.generateGroup(TileGroup.GHZ_2, tileGroup2Str, "ghz2");
            TileGroup.GHZ_3 = this.generateGroup(TileGroup.GHZ_3, tileGroup3Str, "ghz3");
            TileGroup.GHZ_4 = this.generateGroup(TileGroup.GHZ_4, tileGroup4Str, "ghz4");
            TileGroup.GHZ_5 = this.generateGroup(TileGroup.GHZ_5, tileGroup5Str, "ghz5");
            TileGroup.GHZ_6 = this.generateGroup(TileGroup.GHZ_6, tileGroup6Str, "ghz6");
            TileGroup.GHZ_7 = this.generateGroup(TileGroup.GHZ_7, tileGroup7Str, "ghz7");
            TileGroup.GHZ_8 = this.generateGroup(TileGroup.GHZ_8, tileGroup8Str, "ghz8");
            TileGroup.GHZ_9 = this.generateGroup(TileGroup.GHZ_9, tileGroup9Str, "ghz9");
            TileGroup.GHZ_10 = this.generateGroup(TileGroup.GHZ_10, tileGroup10Str, "ghz10");
            TileGroup.GHZ_11 = this.generateGroup(TileGroup.GHZ_11, tileGroup11Str, "ghz11");
        }
        static generateGroup(tileGroupArray, tileGroupStr, stringImage) {
            tileGroupArray = new Array(16);
            for (var x = 0; x < tileGroupStr[0].length; x++) {
                tileGroupArray[x] = new Array(16);
                for (var y = 0; y < tileGroupStr.length; y++) {
                    LinearTile.resetTiles();
                    CurvedTile.resetTiles();
                    if (tileGroupStr[y].charAt(x) == ' ') {
                        tileGroupArray[x][y] = null;
                    }
                    else if (tileGroupStr[y].charAt(x) == '.') {
                        tileGroupArray[x][y] = new objects.Tile(stringImage);
                        tileGroupArray[x][y].visible = true;
                        tileGroupArray[x][y].isSolid = false;
                    }
                    else {
                        if (tileGroupStr[y].charAt(x) == '0') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.FLAT);
                        }
                        else if (tileGroupStr[y].charAt(x) == '-') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.PLATFORM);
                        }
                        else if (tileGroupStr[y].charAt(x) == '1') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(1);
                        }
                        else if (tileGroupStr[y].charAt(x) == '2') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(1);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == '3') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(3);
                        }
                        else if (tileGroupStr[y].charAt(x) == '4') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(3);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == '5') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(5);
                        }
                        else if (tileGroupStr[y].charAt(x) == '6') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(5);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == '7') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(6);
                        }
                        else if (tileGroupStr[y].charAt(x) == '8') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(6);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == '9') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(7);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'A') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(7);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'B') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(11);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'C') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(11);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'D') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(13);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'E') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(13);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'F') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(14);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'G') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(14);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'H') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE11);
                            tileGroupArray[x][y].offsetHeightmap(12);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'I') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE11);
                            tileGroupArray[x][y].offsetHeightmap(12);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'J') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE11);
                            tileGroupArray[x][y].offsetHeightmap(8);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'K') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE11);
                            tileGroupArray[x][y].offsetHeightmap(8);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'L') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE11);
                            tileGroupArray[x][y].offsetHeightmap(4);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'M') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE11);
                            tileGroupArray[x][y].offsetHeightmap(4);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'N') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE11);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'O') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE11);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'P') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE22);
                            tileGroupArray[x][y].offsetHeightmap(8);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'Q') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE22);
                            tileGroupArray[x][y].offsetHeightmap(8);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'R') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE22);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'S') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE22);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'T') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(13);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'U') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(13);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'V') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(14);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'W') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE3);
                            tileGroupArray[x][y].offsetHeightmap(14);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'X') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE3_B);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'Y') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE3_B);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'Z') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE7);
                            tileGroupArray[x][y].offsetHeightmap(10);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'a') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE7);
                            tileGroupArray[x][y].offsetHeightmap(10);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'b') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE11);
                            tileGroupArray[x][y].offsetHeightmap(7);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'c') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE11);
                            tileGroupArray[x][y].offsetHeightmap(7);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'd') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE15);
                            tileGroupArray[x][y].offsetHeightmap(9);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'e') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE15);
                            tileGroupArray[x][y].offsetHeightmap(9);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'f') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE20);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'g') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE20);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'h') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE26);
                            tileGroupArray[x][y].offsetHeightmap(11);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'i') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE26);
                            tileGroupArray[x][y].offsetHeightmap(11);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'j') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE28);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'k') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE28);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'l') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE36);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'm') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE36);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'n') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE45);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'o') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE45);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'p') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE62);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'q') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE62);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 'r') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE75);
                        }
                        else if (tileGroupStr[y].charAt(x) == 's') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE75);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        else if (tileGroupStr[y].charAt(x) == 't') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE86);
                        }
                        else if (tileGroupStr[y].charAt(x) == 'u') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(CurvedTile.ANGLE86);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        tileGroupArray[x][y].visible = false;
                    }
                }
            }
            return tileGroupArray;
        }
    }
    objects.TileGroup = TileGroup;
    //var hmFlat = [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15];
    console.log("loading tile types");
})(objects || (objects = {}));
//# sourceMappingURL=tiletypes.js.map