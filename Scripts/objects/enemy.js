var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(imageString, life) {
            _super.call(this, imageString, "orbit");
            this._life = life;
        }
        Object.defineProperty(Enemy.prototype, "life", {
            get: function () {
                return this._life;
            },
            enumerable: true,
            configurable: true
        });
        Enemy.prototype.update = function () {
        };
        Enemy.prototype.setPosition = function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        };
        Enemy.prototype.getPosition = function () {
            return new objects.Vector2(this.x, this.y);
        };
        Enemy.prototype.shot = function () {
            this._life--;
        };
        Enemy.prototype._dead = function () {
            currentScene.removeChild(this);
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map