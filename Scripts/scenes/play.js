var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
            this._scrollTrigger = 350;
            this._jumpDelay = 50;
            this.start();
        }
        Play.prototype.start = function () {
            this._resetControls();
            score = 2600;
            this._score = score;
            this._bg = new createjs.Bitmap(assets.getResult("bg"));
            this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("player");
            this._helicase = new objects.Helicase("helicase");
            this._ligase = new objects.Helicase("ligase");
            this._scoreLabel = new objects.Label("Learn Faster! ", "30px Georgia", "#FFFF00", config.Screen.CENTER_X - 420, config.Screen.CENTER_Y - 250);
            this._scoreLabel.lineWidth = 200;
            this._scoreLabel.lineHeight = 30;
            this.addChild(this._scoreLabel);
            this._learningLabel = new objects.Label("Helicase splits DNA into two strands, this is a laggin strand.", "20px Georgia", "#FFFFFF", config.Screen.CENTER_X, config.Screen.CENTER_Y - 250);
            this._learningLabel.lineWidth = 200;
            this._learningLabel.lineHeight = 30;
            this.addChild(this._learningLabel);
            // this._pipes = [];
            // this._pipes.push(new objects.Pipe(config.PipeSize.SMALL, new objects.Vector2(1208, 450)));
            // this._pipes.push(new objects.Pipe(config.PipeSize.MEDIUM, new objects.Vector2(1640, 408)));
            // this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(1984,363)));
            // this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(2460, 363)));
            // this._blocks = [];
            // this._blocks.push(new objects.Block(new objects.Vector2(861,364)));
            // this._blocks.push(new objects.Block(new objects.Vector2(946,364)));
            // this._blocks.push(new objects.Block(new objects.Vector2(1031,364)));
            // this._qBlocks = [];
            // this._qBlocks.push(new objects.qBlock(new objects.Vector2(688, 364)));
            // this._qBlocks.push(new objects.qBlock(new objects.Vector2(906, 364)));
            // this._qBlocks.push(new objects.qBlock(new objects.Vector2(993, 364)));
            // this._qBlocks.push(new objects.qBlock(new objects.Vector2(948, 191)));
            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            this._scrollableObjContainer.addChild(this._ground);
            this._scrollableObjContainer.addChild(this._helicase);
            this._scrollableObjContainer.addChild(this._ligase);
            this._atoms = [];
            this._atoms.push(new objects.Atom(new objects.Vector2(840, 400)));
            this._atoms.push(new objects.Atom(new objects.Vector2(910, 300)));
            this._atoms.push(new objects.Atom(new objects.Vector2(1200, 200)));
            this._atoms.push(new objects.Atom(new objects.Vector2(1600, 400)));
            this._atoms.push(new objects.Atom(new objects.Vector2(1550, 10)));
            this._atoms.push(new objects.Atom(new objects.Vector2(1850, 200)));
            this._atoms.push(new objects.Atom(new objects.Vector2(2000, 170)));
            this._atoms.push(new objects.Atom(new objects.Vector2(2050, 10)));
            this._atoms.push(new objects.Atom(new objects.Vector2(2200, 400)));
            this._atoms.push(new objects.Atom(new objects.Vector2(500, 200)));
            // for(let pipe of this._pipes) {
            //     this._scrollableObjContainer.addChild(pipe);
            // }
            // for(let block of this._blocks) {
            //     this._scrollableObjContainer.addChild(block);
            // }
            // for(let qBlock of this._qBlocks) {
            //     this._scrollableObjContainer.addChild(qBlock);
            // }
            for (var _i = 0, _a = this._atoms; _i < _a.length; _i++) {
                var atom = _a[_i];
                this._scrollableObjContainer.addChild(atom);
            }
            this._scrollableObjContainer.addChild(this._scoreLabel);
            this._scrollableObjContainer.addChild(this._learningLabel);
            this._ground.y = 537;
            this._helicase.y = 100;
            this._helicase.x = -500;
            this._ligase.x = 2700;
            this._ligase.y = 100;
            this.addChild(this._scrollableObjContainer);
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            createjs.Sound.play("theme");
            stage.addChild(this);
        };
        Play.prototype.update = function () {
            this._checkControls();
            this._checkAtomCol();
            this._checkHelicaseCol();
            this._checkLigaseCol();
            this._updateScore();
            this._checkEducation();
            this._checkPlayerStatus();
            if (!this._player.getIsGrounded())
                this._checkPlayerWithFloor();
            this._player.update();
            if (this.checkScroll()) {
                this._scrollBGForward(this._player.position.x);
            }
        };
        Play.prototype._checkControls = function () {
            if (controls.LEFT) {
                this._player.moveLeft();
            }
            if (controls.RIGHT) {
                this._player.moveRight();
            }
            if (controls.JUMP) {
                this._player.jump();
            }
            if (!controls.RIGHT && !controls.LEFT) {
                this._player.resetAcceleration();
            }
            if (controls.RIGHT || controls.LEFT && !controls.JUMP) {
                this._player.gotoAndPlay("run");
            }
        };
        Play.prototype._checkAtomCol = function () {
            for (var _i = 0, _a = this._atoms; _i < _a.length; _i++) {
                var a = _a[_i];
                if (this.checkCollision(this._player, a)) {
                    this._player.position.x = a.x - this._player.getBounds().width - 0.01;
                    this._player.setVelocity(new objects.Vector2(0, 0));
                    this._player.resetAcceleration();
                    this._player.isColliding = true;
                    this._isPlayerDead = true;
                }
                else {
                    this._player.isColliding = false;
                }
            }
        };
        Play.prototype._checkPlayerStatus = function () {
            if (this._isPlayerDead) {
                scene = config.Scene.MENU;
                changeScene();
                alert("Oh no! Mutation! When high energy radiation particles smash into DNA, it'll cause some damage. Looks like you're dead!");
            }
            if (this._isPlayerWin) {
                if (score > highScore) {
                    highScore = score;
                }
                scene = config.Scene.MENU;
                changeScene();
                alert("You completed the sequence! The organism lives, good job!");
            }
        };
        Play.prototype._checkHelicaseCol = function () {
            if (this.checkCollision(this._player, this._helicase)) {
                this._player.position.x = this._player.x + 5;
                this._player.setVelocity(new objects.Vector2(0, 0));
                this._player.resetAcceleration();
                this._player.isColliding = true;
            }
            else {
                this._player.isColliding = false;
            }
            this._helicase.x += 1;
        };
        Play.prototype._checkLigaseCol = function () {
            if (this.checkCollision(this._player, this._ligase)) {
                this._player.position.x = this._ligase.x - this._player.getBounds().width - 0.01;
                this._player.setVelocity(new objects.Vector2(0, 0));
                this._player.resetAcceleration();
                this._player.isColliding = true;
                this._isPlayerWin = true;
            }
            else {
                this._player.isColliding = false;
            }
        };
        Play.prototype._resetControls = function () {
            controls.UP = false;
            controls.DOWN = false;
            controls.LEFT = false;
            controls.RIGHT = false;
            controls.JUMP = false;
        };
        Play.prototype._onKeyDown = function (event) {
            switch (event.keyCode) {
                case keys.W:
                    console.log("W key pressed");
                    controls.UP = true;
                    break;
                case keys.S:
                    console.log("S key pressed");
                    controls.DOWN = true;
                    break;
                case keys.A:
                    console.log("A key pressed");
                    controls.LEFT = true;
                    break;
                case keys.D:
                    console.log("D key pressed");
                    controls.RIGHT = true;
                    break;
                case keys.SPACE:
                    controls.JUMP = true;
                    break;
            }
        };
        Play.prototype._onKeyUp = function (event) {
            switch (event.keyCode) {
                case keys.W:
                    controls.UP = false;
                    break;
                case keys.S:
                    controls.DOWN = false;
                    break;
                case keys.A:
                    controls.LEFT = false;
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    break;
                case keys.SPACE:
                    controls.JUMP = false;
                    break;
            }
        };
        Play.prototype._scrollBGForward = function (speed) {
            if (this._scrollableObjContainer.regX < 3071 - 815)
                this._scrollableObjContainer.regX = speed - 300;
        };
        Play.prototype._checkPlayerWithFloor = function () {
            if (this._player.y + this._player.getBounds().height > this._ground.y) {
                console.log("HIT GROUND");
                this._player.position.y = this._ground.y - this._player.getBounds().height;
                this._player.setIsGrounded(true);
            }
        };
        Play.prototype.checkScroll = function () {
            if (this._player.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        };
        Play.prototype._checkEducation = function () {
            if (this._player.x > 300) {
                this._learningLabel.x = 500;
                this._learningLabel.text = "Each Strand is made up of 4 chemical bases";
            }
            if (this._player.x > 450) {
                this._learningLabel.x = 600;
                this._learningLabel.text = "Represented by letters A, C, G, and T";
            }
            if (this._player.x > 600) {
                this._learningLabel.x = 800;
                this._learningLabel.text = "Where there is a T, there will be an A";
            }
            if (this._player.x > 800) {
                this._learningLabel.x = 1000;
                this._learningLabel.text = "Where there is a G, there will be a C";
            }
            if (this._player.x > 1000) {
                this._learningLabel.x = 1200;
                this._learningLabel.text = "DNA Polymerase adds DNA bases to the strand";
            }
            if (this._player.x > 1200) {
                this._learningLabel.x = 1500;
                this._learningLabel.text = "Looks like you're DNA Polymerase";
            }
            if (this._player.x > 1400) {
                this._learningLabel.x = 2000;
                this._learningLabel.text = "This process repeats until the strand is complete";
            }
            if (this._player.x > 1900) {
                this._learningLabel.x = 2500;
                this._learningLabel.lineWidth = 400;
                this._learningLabel.text = "DNA Ligase seals up the fragments of DNA to form a continuous double strand";
            }
        };
        Play.prototype._updateScore = function () {
            this._score = score;
            score -= 1;
            this._scoreLabel.x += 1;
            this._scoreLabel.text = "Learn Faster! " + this._score;
        };
        Play.prototype.checkCollision = function (obj1, obj2) {
            if (obj2.x < obj1.x + obj1.getBounds().width - 22 &&
                obj2.x + obj2.getBounds().width > obj1.x + 22 &&
                obj2.y < obj1.y + obj1.getBounds().height - 22 &&
                obj2.y + obj2.getBounds().height > obj1.y + 22) {
                return true;
            }
            return false;
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map