/*
    Object module to group all user-defined objects under the same "namespace aka module"
    Scene class extends a container object used to store object associated with a particular scene. 
*/

module objects {
    export class Scene extends createjs.Container {
        constructor() {
            super();
            this.start();
        }

        // When this object starts, add it to the current global stage container.
        public start() : void {
            stage.addChild(this);
        }

        public update() : void {
            
        }

        public getTileGrid(layer : number) { }

        public setObjectIndex(obj: objects.GameObject, container: createjs.SpriteContainer, index : number) {
            container.setChildIndex(obj, index);
        }
        public getSpriteContainer() : createjs.SpriteContainer{
            return null;
        }
        public stopTimer() : void {}
        public endLevel(): void{}
        public showScore(): void{}
    }
}