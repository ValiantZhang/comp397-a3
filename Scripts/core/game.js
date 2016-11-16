/// <reference path = "_reference.ts" />
// Global Variables
var assets;
var canvas;
var stage;
var spriteSheetLoader;
var atlas;
var currentScene;
var scene;
// Preload Assets required
var assetData = [
    { id: "bg", src: "../../Assets/images/environment/bg.png" },
    { id: "floor", src: "../../Assets/images/environment/ground.png" },
    { id: "helicase", src: "../../Assets/images/environment/Helicase.png" },
    { id: "atlas", src: "../../Assets/images/characters/atlas.png" },
    { id: "theme", src: "../../Assets/audio/main_theme.mp3" }
];
function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    //assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // Reference to canvas element
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);
    var atlasData = {
        "images": [
            /*
            assets.getResult("player"),
            assets.getResult("block"),
            assets.getResult("pipe1.png"),
            assets.getResult("pipe2.png"),
            assets.getResult("pipe3.png"),
            assets.getResult("qBlock")
            */
            assets.getResult("atlas")
        ],
        "frames": [
            //
            //Parameters:
            //x, y, width, height, imgIndex, regX, regY
            //
            //atom
            [10, 10, 135, 140, 0, 0, 0],
            [145, 10, 135, 140, 0, 0],
            [285.10, 140, 140, 0, 0, 0],
            [420, 10, 140, 140, 0, 0, 0],
            //player
            [13, 285, 120, 90, 0, 0, 0],
            [131, 285, 120, 95, 0, 0, 0],
            [249, 262, 120, 95, 0, 0, 0],
            //npc
            [27, 447, 565, 556, 0, 0, 0],
            [600, 450, 565, 556, 0, 0, 0]
        ],
        "animations": {
            "run": { "frames": [4, 5, 6], speed: 0.2 },
            "player": { "frames": [4] },
            "atom": { "frames": [0] },
            "orbit": { "frames": [0, 1, 2, 3, 2, 1, 2, 0], speed: 0.5 },
            "helicase": { "frames": [7] },
            "ligase": { "frames": [8] }
        },
    };
    atlas = new createjs.SpriteSheet(atlasData);
    scene = config.Scene.GAME;
    changeScene();
}
function gameLoop(event) {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}
function changeScene() {
    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();
            ;
            console.log("Starting MENU scene");
            break;
        case config.Scene.GAME:
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting PLAY scene");
            break;
    }
}
//# sourceMappingURL=game.js.map