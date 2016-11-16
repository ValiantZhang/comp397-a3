var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Atom = (function (_super) {
        __extends(Atom, _super);
        function Atom(defaultPosition) {
            _super.call(this, "orbit");
            this.x = defaultPosition.x;
            this.y = defaultPosition.y;
        }
        return Atom;
    }(objects.GameObject));
    objects.Atom = Atom;
})(objects || (objects = {}));
//# sourceMappingURL=atom.js.map