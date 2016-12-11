var objects;
(function (objects) {
    class Spike extends objects.GameObject {
        constructor(x, y) {
            super("spikes", x, y);
        }
        update() { }
        checkCollisionWithPlayer(player) {
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
                player.collideWithGround(this.topLine, 0);
                player.getHurt(this.x);
            }
        }
    }
    objects.Spike = Spike;
})(objects || (objects = {}));
//# sourceMappingURL=spike.js.map