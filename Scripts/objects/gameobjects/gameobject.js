var objects;
(function (objects) {
    class GameObject extends createjs.Sprite {
        constructor(imageString, x, y) {
            super(spriteAtlas, imageString);
            this._isDead = false;
            this._velX = 0;
            this._velY = 0;
            this._initialize(imageString);
            this.x = x;
            this.y = y;
            this.start();
        }
        // PUBLIC PROPERTIES
        get width() { return this._width; }
        set width(w) { this._width = w; }
        get height() { return this._height; }
        set height(h) { this._height = h; }
        get isDead() { return this._isDead; }
        //to make the collision class more readable
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
        start() {
            this._sideSensorL = new objects.Vector2(this.x - this.width / 2, (this.y + this.height / 2) - 14);
            this._sideSensorR = new objects.Vector2(this.x + this.width / 2, (this.y + this.height / 2) - 14);
            this._footSensorL = new objects.Vector2(this._sideSensorL.x + 2, (this.y + this.height / 2) - 2);
            this._footSensorR = new objects.Vector2(this._sideSensorR.x - 2, (this.y + this.height / 2) - 2);
        }
        update() {
            //updating position
            this.x += this._velX;
            this.y += this._velY;
            //updating sensor positions
            this._sideSensorL.x = this.x - this.width / 2;
            this._sideSensorR.x = this.x + this.width / 2;
            this._sideSensorL.y = (this.y + this.height / 2) - 14;
            this._sideSensorR.y = (this.y + this.height / 2) - 14;
            this._footSensorL.x = this._sideSensorL.x + 2;
            this._footSensorR.x = this._sideSensorR.x - 2;
            this._footSensorL.y = (this.y + this.height / 2) - 2;
            this._footSensorR.y = (this.y + this.height / 2) - 2;
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