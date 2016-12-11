var objects;
(function (objects) {
    class Poof extends objects.GameObject {
        constructor(deathAnimation, x, y, time) {
            super(deathAnimation, x, y);
            this._deathTimer = time;
        }
        update() {
            this._deathTimer--;
            if (this._deathTimer <= 0) {
                currentScene.removeObject(this);
            }
        }
    }
    objects.Poof = Poof;
})(objects || (objects = {}));
//# sourceMappingURL=poof.js.map