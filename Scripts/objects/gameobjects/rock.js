var objects;
(function (objects) {
    class Rock extends objects.GameObject {
        constructor(x, y) {
            super("rock", x, y);
            this.width = 32;
        }
        start() { }
        update() { }
        checkCollisionWithPlayer(player) {
            if (collision.sensorBoxCheck(player.leftSideSensor, this)) {
                player.collideWithLeftWall(this.rightLine);
            }
            else if (collision.sensorBoxCheck(player.rightSideSensor, this)) {
                player.collideWithRightWall(this.leftLine);
            }
            else if (player.velY >= 0 && (collision.sensorBoxCheck(player.leftFootSensor, this)
                || collision.sensorBoxCheck(player.rightFootSensor, this))) {
                player.collideWithGround(this.topLine, 0);
            }
        }
    }
    objects.Rock = Rock;
})(objects || (objects = {}));
//# sourceMappingURL=rock.js.map