module objects {
    export class Helicase extends objects.GameObject {
        public isColliding : boolean = false;

        constructor(imgString : string) {
            super(imgString);
            this.start();
        }

        public start() : void {
        }

        public update() : void {

            super.update();
        }

    }
}