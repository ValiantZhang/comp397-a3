var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Helicase = (function (_super) {
        __extends(Helicase, _super);
        function Helicase(imgString) {
            _super.call(this, imgString);
            this.isColliding = false;
            this.start();
        }
        Helicase.prototype.start = function () {
        };
        Helicase.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return Helicase;
    }(objects.GameObject));
    objects.Helicase = Helicase;
})(objects || (objects = {}));
//# sourceMappingURL=helicase.js.map