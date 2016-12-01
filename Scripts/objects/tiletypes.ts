module objects {
    var hmFlat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var hmFlatB = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
    var hm45 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    var hm3 = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    var hm11 = [3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0];
    var hm22 = [7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0];

    var tileGroupEmptyStr =
        ["                ",
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

    var tileGroup1Str =
        [".               ",
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
            "024I531100000000",
            "0000000000000000",
            "0000000000000000",
            "0000000000000000"];

    var tileGroup2Str =
        [".               ",
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
    var tileGroup1 = new Array(16);

    export class LinearTile {
        public static FLAT: objects.GroundTile;
        public static PLATFORM: objects.GroundTile;
        public static ANGLE3: objects.GroundTile;
        public static ANGLE11: objects.GroundTile;
        public static ANGLE22: objects.GroundTile;

        public static initialize() {
            this.resetTiles();
            TileGroup.initialize();
        }
        public static resetTiles() {
            hmFlat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            hmFlatB = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
            hm45 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            hm3 = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
            hm11 = [3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0];
            hm22 = [7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0];

            LinearTile.FLAT = new objects.GroundTile("block", 0, 180, 90, 270, false, hmFlat, hmFlatB, hmFlat, hmFlatB, true); //in order: top, bottom, left, right
            LinearTile.PLATFORM = new objects.GroundTile("block", 0, 180, 90, 270, false, hmFlat, hmFlatB, hmFlat, hmFlatB, false); //in order: top, bottom, left, right
            LinearTile.ANGLE3 = new objects.GroundTile("empty", 3, 180, 90, 270, false, hm3, hmFlatB, hmFlat, hmFlatB, true);
            //console.log(hm3);
            LinearTile.ANGLE11 = new objects.GroundTile("empty", 11, 180, 90, 270, false, hm11, hmFlatB, hmFlat, hmFlatB, true);
            LinearTile.ANGLE22 = new objects.GroundTile("empty", 22, 180, 90, 270, false, hm22, hmFlatB, hmFlat, hmFlatB, true);
        }
    }

    //export class curvedtile

    export class TileGroup {
        public static GHZ_1: Array<Array<objects.Tile>>;
        public static GHZ_2: Array<Array<objects.Tile>>;
        public static EMPTY: Array<Array<objects.Tile>>;

        public static initialize() {
            TileGroup.EMPTY = this.generateGroup(TileGroup.EMPTY, tileGroupEmptyStr, "empty");
            TileGroup.GHZ_1 = this.generateGroup(TileGroup.GHZ_1, tileGroup1Str, "ghz1");
            TileGroup.GHZ_2 = this.generateGroup(TileGroup.GHZ_2, tileGroup2Str, "ghz2");
        }

        private static generateGroup(tileGroupArray: Array<Array<objects.Tile>>, tileGroupStr: string[], stringImage: string): Array<Array<objects.Tile>> {
            tileGroupArray = new Array(16);

            for (var x = 0; x < tileGroupStr[0].length; x++) {
                tileGroupArray[x] = new Array(16);
                for (var y = 0; y < tileGroupStr.length; y++) {
                    LinearTile.resetTiles();
                    if (tileGroupStr[y].charAt(x) == ' ') {
                        tileGroupArray[x][y] = null;
                    }
                    else if (tileGroupStr[y].charAt(x) == '.') {
                        tileGroupArray[x][y] = new objects.Tile(stringImage);
                        tileGroupArray[x][y].visible = true;
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
                        else if (tileGroupStr[y].charAt(x) == 'I') {
                            tileGroupArray[x][y] = new objects.GroundTile("");
                            tileGroupArray[x][y].setDataToTile(LinearTile.ANGLE11);
                            tileGroupArray[x][y].offsetHeightmap(4);
                            tileGroupArray[x][y].flipHorizontally();
                        }
                        tileGroupArray[x][y].visible = false;
                    }
                }
            }
            return tileGroupArray;
        }
    }
    //var hmFlat = [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15];
    console.log("loading tile types");
}