/*
    Object module to group all user-defined objects under the same "namespace aka module"
    Button class extends the createjs bitmap class and provides a clean interface for creating clickable objects
*/
var objects;
(function (objects) {
    class Button extends createjs.Bitmap {
        constructor(pathString, x, y, width, height) {
            super(assets.getResult(pathString));
            // Set the position of the button
            this.x = x;
            this.y = y;
            // Set the size of the button
            this.width = width;
            this.height = height;
            // Set the registration point of the button. This is used for transformations
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            // Register mouseover and mouseout event listeners. 
            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }
        // Modify the bitmaps alpha value when hovering over the button
        overButton(event) {
            event.currentTarget.alpha = 0.7;
        }
        // Modify the bitmaps alphave when mouse is not hovering
        outButton(event) {
            event.currentTarget.alpha = 1.0;
        }
    }
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map