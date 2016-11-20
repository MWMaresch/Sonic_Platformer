var objects;
(function (objects) {
    class Spike extends createjs.Sprite {
        constructor(imageString, x, y) {
            super(spriteAtlas, imageString);
            this.x = x;
            this.y = y;
            this.start();
        }
        start() { }
        update() { }
    }
    objects.Spike = Spike;
})(objects || (objects = {}));
//# sourceMappingURL=spike.js.map