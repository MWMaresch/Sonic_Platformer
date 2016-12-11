module objects {
    export class Spring extends objects.GameObject {

        constructor(x: number, y: number) {
            super("yellowSpring", x, y);
            this.y -= 9;
        }

        get topLine(): number { return this.y; }

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
                this.gotoAndPlay("yellowSpringAnim1");
                player.bounce(0, -10);
            }
        }
    }
}