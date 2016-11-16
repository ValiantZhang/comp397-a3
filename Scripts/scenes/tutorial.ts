/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Tutorial extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        // Button 
        private _playButton : objects.Button;
        private _tutButton : objects.Button;
        
        private _bg: createjs.Bitmap;
        
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            // Add menu scene to global stage container
            stage.addChild(this);
            
            this._bg = new createjs.Bitmap(assets.getResult("tutBG"));
            this.addChild(this._bg);
            
            this._playButton = new objects.Button("playBTN", config.Screen.CENTER_X + 50, config.Screen.CENTER_Y - 70);
            this.addChild(this._playButton);
            this._playButton.on("click", this._playButtonClick, this);
            
        }

        public update() : void {

        }

        private _playButtonClick(event : createjs.MouseEvent) {
            // Change global scene variable to GAME. Call global changeScene() function
            scene = config.Scene.GAME;
            changeScene();
        }
    }
}