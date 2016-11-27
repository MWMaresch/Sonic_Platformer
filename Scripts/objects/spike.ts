module objects {
    export class Spike extends objects.GameObject {
        //might be a different class in the future
        protected _layer: number;

        constructor(x: number, y: number) {
            super("spikes", x, y);
        }

        public start(): void { }

        public update(): void { }

        //spikes never need to collide with the grid, so override the method with an empty one
        public checkCollisionWithGrid(tileGrid: Tile[][]) { }

        public checkCollisionWithPlayer(player: objects.Player) {
            //otherwise, check if he's colliding with any spikes
            //sonic only gets hurt if he's on top of the spikes: from the side they should act like solid walls
            if (collision.sensorBoxCheck(player.leftSideSensor, this)) {
                player.collideWithLeftWall(this.rightLine);
            }
            else if (collision.sensorBoxCheck(player.rightSideSensor, this)) {
                player.collideWithRightWall(this.leftLine);
            }
            else if (player.velY > 0 && (collision.sensorBoxCheck(player.leftFootSensor, this)
                || collision.sensorBoxCheck(player.rightFootSensor, this))) {
                player.getHurt();
            }
        }

    }
}