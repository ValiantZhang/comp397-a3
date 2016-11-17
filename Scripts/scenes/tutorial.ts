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
        private _highScoreLabel : objects.Label;
        
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            // Add menu scene to global stage container
            stage.addChild(this);
            
            this._bg = new createjs.Bitmap(assets.getResult("tutBG"));
            this.addChild(this._bg);
            
            if (highScore == null){
                highScore = 0;
            }
            
            this._highScoreLabel = new objects.Label("Fastest Learning: " + highScore, "30px Georgia", "#FFFF00", config.Screen.CENTER_X + 200, config.Screen.CENTER_Y - 250);
            this.addChild(this._highScoreLabel);
            
            this._playButton = new objects.Button("playBTN", config.Screen.CENTER_X + 50, config.Screen.CENTER_Y - 40);
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