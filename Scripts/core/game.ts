/// <reference path = "_reference.ts" />

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var spriteSheetLoader : createjs.SpriteSheetLoader;
var atlas : createjs.SpriteSheet;

var currentScene : objects.Scene;
var scene: number;
var highScore : number;
var score : number;

// Preload Assets required
var assetData:objects.Asset[] = [
    {id: "bg", src: "../../Assets/images/environment/bg.png"},
    {id: "tutBG", src: "../../Assets/images/environment/tutBG.png"},
    {id: "floor", src: "../../Assets/images/environment/ground.png"},
    {id: "helicase", src: "../../Assets/images/environment/Helicase.png"},
    {id: "atlas", src: "../../Assets/images/characters/atlas.png"},
    {id: "playBTN", src: "../../Assets/images/buttons/PlayBTN.png"},
    {id: "tutBTN", src: "../../Assets/images/buttons/TutBTN.png"},
    {id: "theme", src: "../../Assets/audio/main_theme.mp3"}
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
    highScore = 0;

    let atlasData = {
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
        "frames":[
            //
            //Parameters:
            //x, y, width, height, imgIndex, regX, regY
            //
            //atom
            [10,10,135,140,0,0,0],
            [145,10,135,140,0,0],
            [285.10,140,140,0,0,0],
            [420,10,140,140,0,0,0],
            //player
            [13,285,120,90,0,0,0],
            [131,285,120,95,0,0,0],
            [249,262,120,95,0,0,0],
            //npc
            [27,447,565,556,0,0,0],
            [640,450,565,556,0,0,0]
        ],
        "animations":{
            "run" : { "frames" : [4, 5, 6] , speed : 0.2},
            "player" : { "frames" : [4] },
            "atom" : { "frames" : [0] },
            "orbit" : { "frames" : [0, 1, 1, 3, 3, 1, 1, 0] , speed : 0.2}, 
            "helicase" : { "frames" : [7] },
            "ligase" : { "frames" : [8] }
        }, 
    }

    atlas = new createjs.SpriteSheet(atlasData);

    scene = config.Scene.MENU;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}

function changeScene() : void {
    
    // Simple state machine pattern to define scene swapping.
    switch(scene)
    {
        case config.Scene.MENU :
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
        case config.Scene.GAME :
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting PLAY scene");
            break;
        case config.Scene.TUTORIAL :
        stage.removeAllChildren();
        currentScene = new scenes.Tutorial();
        console.log("Starting TUTORIAL scene");
        break;
    }
    
}