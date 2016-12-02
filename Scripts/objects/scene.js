/*
    Object module to group all user-defined objects under the same "namespace aka module"
    Scene class extends a container object used to store object associated with a particular scene.
*/
var objects;
(function (objects) {
    class Scene extends createjs.Container {
        constructor() {
            super();
            this.start();
        }
        // When this object starts, add it to the current global stage container.
        start() {
            stage.addChild(this);
        }
        update() {
        }
        getTileGrid() { }
    }
    objects.Scene = Scene;
})(objects || (objects = {}));
//# sourceMappingURL=scene.js.map