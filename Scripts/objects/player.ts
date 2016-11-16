module objects {
    export class Player extends objects.GameObject {
        private _gravity : number = 2;

        private _maxSpeedX : number = 3;
        private _velocity : objects.Vector2;
        private _accelerationX : number;
        private _jumpSpeed : number = 2;
        private _friction : number = -1;

        private _isStar : boolean = false;
        private _isDead : boolean = false;
        private _isGrounded : boolean = false;
        private _isJumping : boolean = false;
        private _isRunning : boolean = false;
        
        public isColliding : boolean = false;

        constructor(imgString : string) {
            super(imgString);
            this.start();
        }

        public start() : void {
            this._velocity = new objects.Vector2(0,0);
            this.position = new objects.Vector2(200, 0);
            this._accelerationX = 0;
        }

        public update() : void {
            // Acceleration \
            // Velocity
            if(this._velocity.x > this._maxSpeedX) {
                this._velocity.x = this._maxSpeedX;
            } else if (this._velocity.x < -this._maxSpeedX) {
                this._velocity.x = -this._maxSpeedX;
            } 
            else {
                this._velocity.x += this._accelerationX;
            }

            if(this._velocity.y > this._gravity) {
                this._velocity.y = 2;
            }
            
            if (this.position.y < 150){
                this.position.y = 150;
            }


            if(this._isGrounded) {
                this._velocity.y = 0;
            } else {
                this._velocity.y += this._gravity;
            }


            
            // Position
            this.position.x += this._velocity.x;
            this.position.y += this._velocity.y;

            if(this._velocity.y > 9.81) {
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
            console.log("Position" + this.position + " Vel: " + this._velocity + " Acc: " + this._accelerationX);
            super.update();
        }

        public getVelocity() : objects.Vector2 {
            return this._velocity;
        }

        public setVelocity(newVelocity : objects.Vector2) {
            this._velocity = newVelocity;
        }

        public getIsGrounded() : boolean {
            return this._isGrounded;
        }

        public setIsGrounded(b : boolean) : void {
            this._isGrounded = b;
        }

        public moveRight() : void {
            this._accelerationX += 0.05;
        }
        public moveLeft() : void {
            this._accelerationX += -0.05;
        }
        public resetAcceleration() : void {
            this._accelerationX = 0;
            this._velocity.x = 0;
            this.gotoAndStop("player");
        }
        public jump() : void {
            this.setIsGrounded(false);
            
            this._velocity.y = -25;
            
            this._isJumping = true;
        }
    }
}