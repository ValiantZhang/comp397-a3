module objects {
    export class Atom extends objects.GameObject {
        constructor(defaultPosition : objects.Vector2) {
            super("orbit");
            this.x = defaultPosition.x;
            this.y = defaultPosition.y;
        }
    }
}