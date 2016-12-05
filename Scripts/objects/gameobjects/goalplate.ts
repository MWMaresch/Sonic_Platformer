module objects {
    export class GoalPlate extends objects.GameObject {

        private _spinTimer: number;
        private _isSpinning: boolean;
        private _alreadyPassed: boolean;
        constructor(x: number, y: number) {
            super("goal", x, y);
            this._spinTimer = 0;
            this._isSpinning = false;
            this._alreadyPassed = false;
        }

        public update(): void {
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

        public checkCollisionWithPlayer(player: objects.Player) {
            if (player.x > this.x && !this._alreadyPassed) {
                currentScene.stopTimer();
                this.gotoAndPlay("goalSpin1");
                this._spinTimer = 124;
                this._isSpinning = true;
                this._alreadyPassed = true;
            }
        }
    }
}