export default class GameObject {
    constructor(ctx, x, y, { w, h, texture }) {
        this.ctx = ctx;
        this.size = {
            w,
            h
        };
        this.x = x;
        this.y = y;
        this.texture = texture;
    }
    select() {
        this.selected = true;
    }
    selectCancel() {
        this.selected = false;
    }
    getSize() {
        return this.size;
    }
    getCord() {
        return {
            x: this.x,
            y: this.y
        }
    }
    draw(camera) {
        const x = this.x - camera.x;
        const y = this.y - camera.y;
        this.ctx.globalCompositeOperation = "source-over";
        if (this.x >= camera.x-this.size.w &&
            this.y >= camera.y-this.size.h &&
            this.x + this.size.w <= camera.x + innerWidth+this.size.w &&
            this.y + this.size.h <= camera.y + innerHeight+this.size.h)
        {
            this.ctx.drawImage(this.texture, x, y, this.size.w, this.size.h);
        }

        if (this.selected) {
            this.ctx.fillStyle = "rgba(0,0,0,.3)";
            this.ctx.fillRect(x, y, this.size.w, this.size.w);
        }
    }
}