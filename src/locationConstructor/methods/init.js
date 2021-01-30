import axios from "axios";

import Texture from "../../image";

export function collisionElement() {
    const collision = document.querySelector("#landscape-checkbox");
    collision.addEventListener("click", () => {
        collision.children[0].toggleAttribute("checked");
        this.collision = !this.collisionObject;
    });
}
// COLLISON

export function getImages() {
    axios.get("/images").then(({ data }) => {
        this.assets = [];

        data.map(texture => {
            const src = `assets/mapTextures/${texture}`;

            this.assets.push(new Texture().init(src, this.selectTexture, this));
        });
    });
}
// GET IMAGES


export function submitingForm() {
    document.querySelector("form").addEventListener("submit", (e) => {
        const data = new FormData();
        const filesInput = document.querySelector(".input-upload_images");

        for (let i = 0; i < filesInput.files.length; i++) data.append("images", filesInput.files[i]);

        axios.post("/upload", data)
            .then(({ data }) => {
                const uploadTo = document.querySelector(".uploaded-image");
                data.map(image => {
                    const imgElement = document.createElement("img");
                    const src = `assets/mapTextures/${image}`;

                    imgElement.classList.add("uploaded-image_item");
                    imgElement.src = src;
                    imgElement.addEventListener("click", (e) => this.selectTexture(src));

                    uploadTo.append(
                        imgElement
                    );
                })

            });
        e.preventDefault();
    });
}
// SUBMITING FORM