export default class Selection{
    constructor(ctx){
        this.ctx = ctx;
        this.fillStyle = "rgba(0, 17, 204, 0.3)";
        this.activity = false;
        this.init();
    }
    init(){
        const selectionCheckbox = document.querySelector("#turn-select");

        selectionCheckbox.addEventListener("change",()=>{
            this.toggleSelection();
        });
    }
    active(){
        return this.activity;
    }
    toggleSelection(){
        this.activity = !this.activity;
    }
    select({x1,y1,x2,y2}, {x,y}){
        x1+=x;
        x2+=x;
        y1+=y;
        y2+=y;
        return {
            x1,
            y1,
            x2,
            y2
        }
    }
    draw({x1,y1,x2,y2}){
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.fillStyle = this.fillStyle;
        let w = x2-x1;
        let h = y2-y1;
        this.ctx.fillRect(x1,y1,w,h);
    }
}