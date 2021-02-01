export default class GameObject {
    constructor(x, y, { w, h, texture }) {
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
    build(){
        const w = this.size.w;
        const h = this.size.h;
        const x = this.x;
        const y = this.y;
        const textureUrl = this.texture.src;
        const pathToTexture= textureUrl.replace(/^[a-z]{4}\:\/{2}[a-z]+\:[0-9]{1,4}.(.*)/, '$1');
        console.log(pathToTexture);
        return {
            w,h,
            x,y,
            texture: pathToTexture
        }
    }
    getCord() {
        return {
            x: this.x,
            y: this.y
        }
    }
    draw(ctx, camera) {
        const x = this.x - camera.x;
        const y = this.y - camera.y;
        ctx.globalCompositeOperation = "source-over";
        if (this.x >= camera.x-this.size.w &&
            this.y >= camera.y-this.size.h &&
            this.x + this.size.w <= camera.x + innerWidth+this.size.w &&
            this.y + this.size.h <= camera.y + innerHeight+this.size.h)
        {
            ctx.drawImage(this.texture, x, y, this.size.w, this.size.h);
        }

        if (this.selected) {
            ctx.fillStyle = "rgba(0,0,0,.3)";
            ctx.fillRect(x, y, this.size.w, this.size.w);
        }
    }
}