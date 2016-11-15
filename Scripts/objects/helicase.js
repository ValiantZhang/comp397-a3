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
            this._gravity = 9.81;
            this._maxSpeedX = 10;
            this._isRunning = false;
            this.isColliding = false;
            this.start();
        }
        Helicase.prototype.start = function () {
            this._velocity = new objects.Vector2(0, 0);
            this.position = new objects.Vector2(0, 0);
            this._accelerationX = 0;
        };
        Helicase.prototype.update = function () {
            // Acceleration \
            // Velocity
            if (this._velocity.x > this._maxSpeedX) {
                this._velocity.x = this._maxSpeedX;
            }
            else if (this._velocity.x < -this._maxSpeedX) {
                this._velocity.x = -this._maxSpeedX;
            }
            else {
                this._velocity.x += this._accelerationX;
            }
            if (this._velocity.y > 9.81) {
                this._velocity.y = 5;
            }
            // Position
            this.position.x += this._velocity.x;
            this.position.y += this._velocity.y;
            if (this._velocity.y > 9.81) {
                this._velocity.y = 9.81;
            }
            /*
            if(this._isGrounded) {
                this._friction = 0.75;
                this._velocity.y = 0;
            }
            else {
                this._friction = 0;
            }
            
            // AccelerationX affects Velocity.x

            // Gravity affects Velocity.y
            // MaxSpeed caps Velocity.x
            if(Math.abs(this._velocity.x) < this._maxSpeedX) {
                this._velocity.x += this._accelerationX;
            }

            this._velocity.x *= this._friction;
            this.position.x += this._velocity.x;

            this.position.y += this._velocity.y + this._gravity;

            //
            */
            _super.prototype.update.call(this);
        };
        Helicase.prototype.getVelocity = function () {
            return this._velocity;
        };
        Helicase.prototype.setVelocity = function (newVelocity) {
            this._velocity = newVelocity;
        };
        Helicase.prototype.moveRight = function () {
            this._accelerationX += 0.05;
        };
        Helicase.prototype.resetAcceleration = function () {
            this._accelerationX = 0;
            this._velocity.x = 0;
            this.gotoAndStop("helicase");
        };
        return Helicase;
    }(objects.GameObject));
    objects.Helicase = Helicase;
})(objects || (objects = {}));
//# sourceMappingURL=helicase.js.map