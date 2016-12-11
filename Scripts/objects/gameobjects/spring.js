var objects;
(function (objects) {
    class Spring extends objects.GameObject {
        constructor(x, y) {
            super("yellowSpring", x, y);
            this.y -= 9;
        }
        get topLine() { return this.y; }
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
                this.gotoAndPlay("yellowSpringAnim1");
                player.bounce(0, -10);
            }
        }
    }
    objects.Spring = Spring;
})(objects || (objects = {}));
//# sourceMappingURL=spring.js.map