var objects;
(function (objects) {
    class Enemy extends createjs.Sprite {
        constructor(imageString, x, y) {
            super(spriteAtlas, imageString);
            this.x = x;
            this.y = y;
            this.start();
        }
        start() { }
        update() { }
    }
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map