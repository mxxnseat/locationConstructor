import axios from "axios";
import Texture from "../../image";

function clearNode(parent){
    while(parent.firstChild){
        parent.removeChild(parent.lastChild);
    }
}

export function collisionElement() {
    const collision = document.querySelector("#landscape-checkbox");
    collision.addEventListener("click", () => {
        collision.firstChild.toggleAttribute("checked");
        this.loadDir = this.loadDir === "landscape" ? "gameObjects" : "landscape";
    });
}
// COLLISON

export function getImages(directory){
    axios.get(`/openDirectory?dir=${directory}`).then(({data})=>{
        const uploadTo = document.querySelector(".uploaded-image");
        const exitUp = document.createElement("img");
        
        clearNode(uploadTo);
        
        exitUp.classList.add("exit-up");
        exitUp.src = "assets/exitUp.png";
        exitUp.addEventListener("click",()=>{
            clearNode(uploadTo);
            this.getDirectories();
        });
        uploadTo.prepend(exitUp);

        data.map(image=>{
            const src = `${directory}/${image}`;
            this.assets.push(new Texture().init(src, this.selectTexture, this));
        });
    });
}
// GET IMAGES

export function getDirectories() {
    axios.get("/directories").then(({ data }) => {
        data.map(directory => {
            const src = `assets/mapTextures/${directory}`;
            const uploadTo = document.querySelector(".uploaded-image");
            const dirHTML = document.createElement("div");
            const img = document.createElement("img");
            const dirNameHTML = document.createElement("span");

            dirNameHTML.classList.add("dir-name");
            dirNameHTML.innerText = directory;

            img.src = "assets/directory.png";
            dirHTML.classList.add("directory");

            dirHTML.append(dirNameHTML);
            dirHTML.append(img);
            dirHTML.addEventListener("click", ()=>{
                this.getImages(src);
                this.objectType = directory; // В какой из 2х массиваов закидывать текстуру
                this.textureParams = null;
            });
            uploadTo.append(dirHTML);
        });
    });
}
// GET DIRECTORIES


export function submitingForm() {
    document.querySelector("form").addEventListener("submit", (e) => {
        const fd = new FormData();
        const filesInput = document.querySelector(".input-upload_images");
        fd.append("flag", this.loadDir);
        for (let i = 0; i < filesInput.files.length; i++) fd.append("images", filesInput.files[i]);
        
        axios.post("/upload", fd)
            .then(({ data }) => {
                let src = `assets/mapTextures/${this.loadDir}/`;
                data.map(image => {

                    this.assets.push(new Texture().init(src+image,this.selectTexture,this));
                });
                this.getImages(src);

            });
        e.preventDefault();
    });
}
// SUBMITING FORM