var objects;
(function (objects) {
    class GoalPlate extends objects.GameObject {
        constructor(x, y) {
            super("goal", x, y);
            this._spinTimer = 0;
            this._isSpinning = false;
            this._alreadyPassed = false;
            this._updateDistance = 1000;
        }
        update() {
            if (this._isSpinning) {
                if (this._spinTimer == 0) {
                    this._isSpinning = false;
                    this.gotoAndStop("goalEnd");
                    currentScene.endLevel();
                }
                else {
                    this._spinTimer--;
                    if (this._spinTimer == 62) {
                        this.gotoAndPlay("goalSpin2");
                    }
                }
            }
        }
        checkCollisionWithPlayer(player) {
            if (player.x > this.x && !this._alreadyPassed) {
                createjs.Sound.play("GoalSnd");
                currentScene.stopTimer();
                this.gotoAndPlay("goalSpin1");
                this._spinTimer = 124;
                this._isSpinning = true;
                this._alreadyPassed = true;
            }
        }
    }
    objects.GoalPlate = GoalPlate;
})(objects || (objects = {}));
//# sourceMappingURL=goalplate.js.map