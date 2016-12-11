module objects {
    export class Poof extends objects.GameObject {

        protected _deathTimer: number;

        constructor(deathAnimation:string, x: number, y: number, time: number) {
            super(deathAnimation, x, y);
            this._deathTimer = time;
        }

        public update(): void {
            this._deathTimer--;
            if (this._deathTimer <= 0) {
                currentScene.removeObject(this);
            }
        }
    }
}