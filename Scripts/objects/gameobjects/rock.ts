module objects {
    export class Rock extends objects.GameObject {

        constructor(x: number, y: number) {
            super("rock", x, y);
            this.width = 32;
        }

        public start(): void { }

        public update(): void { }

        public checkCollisionWithPlayer(player: objects.Player) {
            if (collision.sensorBoxCheck(player.leftSideSensor, this)) {
                player.collideWithLeftWall(this.rightLine);
            }
            else if (collision.sensorBoxCheck(player.rightSideSensor, this)) {
                player.collideWithRightWall(this.leftLine);
            }
            else if (player.velY >= 0 && (collision.sensorBoxCheck(player.leftFootSensor, this)
                || collision.sensorBoxCheck(player.rightFootSensor, this))) {
                    console.log("collided with rock");
                player.collideWithGround(this.topLine, 0);
            }
            else if (player.velY < 0) {
                console.log("player velY < 0");
            }
            else {
                console.log("did not collide");
            }
        }
    }
}