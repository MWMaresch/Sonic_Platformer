module objects {
    export class PathSwitcher extends objects.GameObject {

        private _layerSwitch: number;
        constructor(x: number, y: number, width: number, height: number, layer: number) {
            super("empty", x, y);
            this.width = width;
            this.height = height;
            this.x += width / 2;
            this.y += height / 2;
            this._layerSwitch = layer;
            this.visible = false;
        }

        public start(): void { }

        public update(): void { }

        public checkCollisionWithPlayer(player: objects.Player) {
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
}