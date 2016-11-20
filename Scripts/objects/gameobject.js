var objects;
(function (objects) {
    class GameObject extends createjs.Sprite {
        constructor(imageString, deathAnimString) {
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
        get tr_corner() {
            return new objects.Vector2(this.x + this.width * 0.5, this.y - this.height * 0.5);
        }
        get tl_corner() {
            return new objects.Vector2(this.x - this.width * 0.5, this.y - this.height * 0.5);
        }
        get br_corner() {
            return new objects.Vector2(this.x + this.width * 0.5, this.y + this.height * 0.5);
        }
        get bl_corner() {
            return new objects.Vector2(this.x - this.width * 0.5, this.y + this.height * 0.5);
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