/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // Menu Class Contructor
        function Menu() {
            _super.call(this);
        }
        Menu.prototype.start = function () {
            // Add menu scene to global stage container
            stage.addChild(this);
            this._menuLabel = new objects.Label("Learn. You!", "70px Georgia", "#FFFFFF", config.Screen.CENTER_X, config.Screen.CENTER_Y - 20);
            this.addChild(this._menuLabel);
            this._playButton = new objects.Button("playBTN", config.Screen.CENTER_X - 190, config.Screen.CENTER_Y - 325);
            this.addChild(this._playButton);
            this._playButton.on("click", this._playButtonClick, this);
            this._tutButton = new objects.Button("tutBTN", config.Screen.CENTER_X - 190, config.Screen.CENTER_Y + 25);
            this.addChild(this._tutButton);
            this._tutButton.on("click", this._tutButtonClick, this);
        };
        Menu.prototype.update = function () {
        };
        Menu.prototype._playButtonClick = function (event) {
            // Change global scene variable to GAME. Call global changeScene() function
            scene = config.Scene.GAME;
            changeScene();
        };
        Menu.prototype._tutButtonClick = function (event) {
            // Change global scene variable to GAME. Call global changeScene() function
            scene = config.Scene.TUTORIAL;
            changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map