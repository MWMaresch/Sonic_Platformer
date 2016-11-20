var objects;
(function (objects) {
    class Spike extends objects.GameObject {
        constructor(x, y) {
            super("spikes");
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