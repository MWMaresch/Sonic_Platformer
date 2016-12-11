var objects;
(function (objects) {
    class GameObject extends createjs.Sprite {
        constructor(imageString, x, y) {
            super(spriteAtlas, imageString);
            this._updateDistance = 450;
            this._isDead = false;
            this._velX = 0;
            this._velY = 0;
            this._deathAnim = "poof";
            this._deathTimer = 40;
            this._initialize(imageString);
            this.x = x;
            this.y = y;
        }
        // PUBLIC PROPERTIES
        get width() { return this._width; }
        set width(w) { this._width = w; }
        get height() { return this._height; }
        set height(h) { this._height = h; }
        get isDead() { return this._isDead; }
        get updateDistance() { return this._updateDistance; }
        //to make the collision class more readable
        get topLine() { return this.y - this.height / 2; }
        get bottomLine() { return this.y + this.height / 2; }
        get rightLine() { return this.x + this.width / 2; }
        get leftLine() { return this.x - this.width / 2; }
        _initialize(imageString) {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width / 2;
            this.regY = this.height / 2;
        }
        update() {
            this.x += this._velX;
            this.y += this._velY;
        }
        destroy() {
            currentScene.addObject(new objects.Poof(this._deathAnim, this.x, this.y, this._deathTimer));
            currentScene.removeObject(this);
        }
        checkCollisionWithGrid(tileGrid) { }
        checkCollisionWithPlayer(player) { }
        detectLeftLedge() { }
        detectRightLedge() { }
        collideWithGround(groundHeight, angle) { }
        collideWithRightWall(x) { }
        collideWithLeftWall(x) { }
        checkOneMoreCollision(posY, posX, sensor) { }
    }
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map