import textureParamsModalCreator from "./methods/paramsModalCreator";

export default class Texture{
    constructor(){
        this.sizes = {
            w: 60,
            h: 60
        }

        this.textureParamsModalCreator = textureParamsModalCreator.bind(this);
    }
    getParams(){
        return {
            image: this.image,
            width: this.sizes.w,
            height: this.sizes.h
        }
    }
    setSize(w, h){
        this.sizes.w = w;
        this.sizes.h = h;
    }
    init(src, selectTexture, context){
        this.src = src;
        this.image = new Image();
        this.image.src = this.src;
        this.selectTexture = selectTexture;
        this.mainContext = context;

        this.image.onload = ()=>{
            const uploadTo = document.querySelector(".uploaded-image");
            const imgElement = document.createElement("img");

            imgElement.classList.add("uploaded-image_item");
            imgElement.src = this.src;
            imgElement.addEventListener("click", (e) => this.selectTexture.call(this.mainContext, this.getParams()));

            this.textureParamsModalCreator(imgElement);

            uploadTo.append(imgElement);
        }
    }
}