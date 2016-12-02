var objects;
(function (objects) {
    class Ring extends createjs.Sprite {
        constructor(imageString, angleTop, angleBottom, angleL, angleR) {
            super(spriteAtlas, imageString);
            this.start();
        }
        start() { }
        update() { }
    }
    objects.Ring = Ring;
})(objects || (objects = {}));
//# sourceMappingURL=ring.js.map