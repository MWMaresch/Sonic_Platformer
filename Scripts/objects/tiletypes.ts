module objects {
    var hmFlat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var hmFlatB = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
    var hm45 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    var hm45b = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    var tileGroup1Str =
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
            "              00",
            "0000000000000000"];
    var tileGroup1 = new Array(16);

    export class LinearTile {
        public static FLAT: objects.GroundTile;
        public static ANGLE45: objects.GroundTile;
        public static ANGLE44: objects.GroundTile;
        public static ANGLE3: objects.GroundTile;

        public static initialize() {
            LinearTile.FLAT = new objects.GroundTile("block", 0, 180, 90, 270, hmFlat, hmFlatB, hmFlat, hmFlatB);
            LinearTile.ANGLE45 = new objects.GroundTile("ramp45", 45, 180, 45, 270, hm45b, hmFlatB, hm45b, hmFlatB);
            LinearTile.ANGLE44 = new objects.GroundTile("ramp45", 44, 180, 44, 270, hm45b, hmFlatB, hm45b, hmFlatB);
            LinearTile.ANGLE3 = new objects.GroundTile("empty", 45, 180, 45, 270, hm45b, hmFlatB, hm45, hmFlatB);
            TileGroup.initialize();
        }
    }

    //export class curvedtile

    export class TileGroup {
        public static GHZ_1: Array<Array<objects.Tile>>;

        public static initialize() {
            TileGroup.GHZ_1 = new Array(16);

            for (var x = 0; x < tileGroup1Str[0].length; x++) {
                TileGroup.GHZ_1[x] = new Array(16);
                for (var y = 0; y < tileGroup1Str.length; y++) {
                    if (tileGroup1Str[y].charAt(x) == ' ') {
                        TileGroup.GHZ_1[x][y] = null;
                    }
                    else if (tileGroup1Str[y].charAt(x) == '0') {
                        TileGroup.GHZ_1[x][y] = new objects.GroundTile("");
                        TileGroup.GHZ_1[x][y].setDataToTile(LinearTile.FLAT);
                    }
                }
            }
        }
    }
    //var hmFlat = [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15];
    console.log("loading tile types");
}