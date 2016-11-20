var objects;
(function (objects) {
    class GameObject extends createjs.Sprite {
        constructor(imageString) {
            super(spriteAtlas, imageString);
            this._initialize(imageString);
            this.start();
        }
        // PUBLIC PROPERTIES
        get width() {
            return this._width;
        }
        set width(w) {
            this._width = w;
        }
        get height() {
            return this._height;
        }
        set height(h) {
            this._height = h;
        }
        get topLine() {
            return this.y - this.height / 2;
        }
        get bottomLine() {
            return this.y + this.height / 2;
        }
        get rightLine() {
            return this.x + this.width / 2;
        }
        get leftLine() {
            return this.x - this.width / 2;
        }
        _initialize(imageString) {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width / 2;
            this.regY = this.height / 2;
        }
        start() { }
        update() { }
    }
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map