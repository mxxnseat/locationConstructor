export default class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    getCord() {
        return {
            x: this.x,
            y: this.y
        }
    }
    moveCamera(locationSize, x, y) {
        if(this.x + x > 0 && this.x + x < locationSize.width-innerWidth){
            this.x += x;
        }
        if(this.y + y > 0 && this.y + y < locationSize.height-innerHeight){
            this.y += y;
        }
    }
}