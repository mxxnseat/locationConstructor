export default class Grid {
    constructor(ctx, locSize) {
        this.ctx = ctx;
        this.gridStep = 20;
        this.activity = true;
        this.locSize = locSize;
        
        this.init();
    }
    init(){
        const gridCheckbox = document.querySelector("#turn-grid");
        this.activity && gridCheckbox.setAttribute("checked", '');

        gridCheckbox.addEventListener("change", ()=>{
            this.activity = !this.activity;
            if(this.activity) this.draw();
            else{
                const cols = this.locSize.width / this.gridStep;
                const rows = this.locSize.height / this.gridStep;

                for (let i = 0; i < cols; i++) {
                    for (let j = 0; j < rows; j++) {
                        let x = i*this.gridStep;
                        let y = j*this.gridStep;
        
                        
                        this.ctx.clearRect(x-this.cameraCord.x, y-this.cameraCord.y, this.gridStep, this.gridStep);
                    }
                }
            }
        });
    }
    setCameraCord(camera){
        this.cameraCord = camera; 
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
    draw() {
        const cols = this.locSize.width / this.gridStep;
        const rows = this.locSize.height / this.gridStep;
        this.ctx.strokeStyle = "rgba(0,0,0,.5)";
        this.ctx.lineWidth = .3;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let x = i*this.gridStep;
                let y = j*this.gridStep;

                
                this.ctx.strokeRect(x-this.cameraCord.x, y-this.cameraCord.y, this.gridStep, this.gridStep);
            }
        }
    }
}