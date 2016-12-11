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
            if (player.curLayer != this._layerSwitch) {
                if (collision.boxCheck(player, this)) {
                    if (this._layerSwitch == 1)
                        currentScene.getSpriteContainer().setChildIndex(player, 1);
                    else
                        currentScene.getSpriteContainer().setChildIndex(player, (currentScene.getSpriteContainer().numChildren - 1));
                    player.curLayer = this._layerSwitch;
                }
            }
        }
    }
    objects.PathSwitcher = PathSwitcher;
})(objects || (objects = {}));
//# sourceMappingURL=pathswitcher.js.map