/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Menu extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        // Button 
        private _playButton : objects.Button;
        private _tutButton : objects.Button;
        private _menuLabel : objects.Label;
        
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            // Add menu scene to global stage container
            stage.addChild(this);
            
            this._menuLabel = new objects.Label("Lear-N.A.", "70px Georgia", "#FFFFFF", config.Screen.CENTER_X, config.Screen.CENTER_Y - 20);
            this.addChild(this._menuLabel);
            
            this._playButton = new objects.Button("playBTN", config.Screen.CENTER_X - 190, config.Screen.CENTER_Y - 325);
            this.addChild(this._playButton);
            this._playButton.on("click", this._playButtonClick, this);
            
            this._tutButton = new objects.Button("tutBTN", config.Screen.CENTER_X - 190, config.Screen.CENTER_Y + 25);
            this.addChild(this._tutButton);
            this._tutButton.on("click", this._tutButtonClick, this);
        }

        public update() : void {

        }

        private _playButtonClick(event : createjs.MouseEvent) {
            // Change global scene variable to GAME. Call global changeScene() function
            scene = config.Scene.GAME;
            changeScene();
        }
        
        private _tutButtonClick(event : createjs.MouseEvent) {
            // Change global scene variable to GAME. Call global changeScene() function
            scene = config.Scene.TUTORIAL;
            changeScene();
        }
    }
}