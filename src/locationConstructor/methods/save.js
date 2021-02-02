import axios from "axios";

export default function () {
    const saveBtn = document.querySelector(".save");
    saveBtn.addEventListener("click", () => {
        
        
        const locName = prompt("Enter location name");
        
        if(locName.length){
            this.cancelLoop = true;
            const map = {
                locSize: this.locationSize,
                landscape: this.landscape.map(piece=>{
                    return piece.build();
                }),
                gameObjects: this.gameObjects.map(piece=>{
                    return piece.build();
                })
            };
    
            axios.post(`/save?locname=${locName}`, JSON.stringify(map), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(({data})=>{
                alert(data);
            })
        }

        this.cancelLoop = false;
    });

}