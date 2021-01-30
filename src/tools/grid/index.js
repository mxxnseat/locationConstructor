export default class Grid {
    constructor(ctx) {
        this.ctx = ctx;
        this.gridStep = 20;
        this.activity = true;
        
        this.init();
    }
    init(){
        const gridCheckbox = document.querySelector("#turn-grid");
        this.activity && gridCheckbox.setAttribute("checked", '');

        gridCheckbox.addEventListener("change", ()=>{
            this.toggleGrid();
        });
    }
    toggleGrid(){
        this.activity = !this.activity;
    }
    active(){
        return this.activity;
    }
    attraction(locationX, locationY) {
        if(!this.activity) return {x: locationX, y: locationY};

        const calcGridCellX = Math.floor(locationX / this.gridStep);
        const calcGridCellY = Math.floor(locationY / this.gridStep);

        const cellCord = {
            x: this.gridStep*calcGridCellX,
            y: this.gridStep*calcGridCellY
        }
        return cellCord;
    }
    draw(locSize, cameraCord) {
        const cols = locSize.width / this.gridStep;
        const rows = locSize.height / this.gridStep;
        this.ctx.strokeStyle = "rgba(0,0,0,.5)";
        this.ctx.lineWidth = .3;
        this.ctx.globalCompositeOperation = "source-over";

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let x = i*this.gridStep;
                let y = j*this.gridStep;

                if(
                    x+this.gridStep<=cameraCord.x+innerWidth+this.gridStep && x>=cameraCord.x-this.gridStep &&
                    y+this.gridStep<=cameraCord.y+innerWidth+this.gridStep && y>=cameraCord.y-this.gridStep
                ){
                    this.ctx.strokeRect(x-cameraCord.x, y-cameraCord.y, this.gridStep, this.gridStep);
                }
            }
        }
    }
}