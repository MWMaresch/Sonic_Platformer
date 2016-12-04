var objects;
(function (objects) {
    class PathSwitcher extends objects.GameObject {
        constructor(x, y, width, height, layer) {
            super("empty", x, y);
            this.width = width;
            this.height = height;
            this.x += width / 2;
            this.y += height / 2;
            this._layerSwitch = layer;
            this.visible = false;
        }
        start() { }
        update() { }
        checkCollisionWithPlayer(player) {
            if (collision.boxCheck(player, this)) {
                currentScene.getSpriteContainer().setChildIndex(player, (currentScene.getSpriteContainer().numChildren - 1) - ((currentScene.getSpriteContainer().numChildren - 1) * this._layerSwitch));
                player.curLayer = this._layerSwitch;
            }
        }
    }
    objects.PathSwitcher = PathSwitcher;
})(objects || (objects = {}));
//# sourceMappingURL=pathswitcher.js.map