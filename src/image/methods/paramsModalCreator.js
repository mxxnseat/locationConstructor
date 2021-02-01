export default function (imgElement) {
    const body = document.querySelector("body");
    const imageParamModalHTML = `<ul class="options">
                                    <li class="option-item" id="set-size">Set size</li>
                                    <li class="option-item" id="delete">Delete</li>
                                 </ul>`;
    const setSizeModalHTML = `
        <span>
            Width: <input type="text" class="size-input" id="width">px
        </span>
        <span>
            Height: <input type="text" class="size-input" id="height">px
        </span>
        <button class="set-size_btn">Apply</button>
    `;

    imgElement.addEventListener("mousedown", (e) => {
        if (e.button === 2) {
            document.querySelector(".image-settings-wrap") && document.querySelector(".image-settings-wrap").remove();

            const imageParamModal = document.createElement("div");
            window.addEventListener("click", (e) => {
                if (!document.querySelector(".image-settings-wrap")) return;
                const optionsWrapper = document.querySelector(".options");
                const { target } = e;

                if (target != imageParamModal && !imageParamModal.contains(target) && !optionsWrapper.contains(target)) {
                    imageParamModal.remove();
                }
            });


            imageParamModal.classList.add("image-settings-wrap");
            imageParamModal.classList.add("image-settings-modal");
            imageParamModal.innerHTML = imageParamModalHTML;

            imageParamModal.style.left = `${e.clientX}px`;
            imageParamModal.style.top = `${e.clientY}px`;

            body.prepend(imageParamModal);

            const optionSetSize = document.querySelector("#set-size");
            const optionDelete = document.querySelector("#delete");

            optionSetSize.addEventListener("click", (e) => {
                const setSizeModal = document.createElement("div");
                setSizeModal.classList.add("image-settings-modal");
                setSizeModal.classList.add("set-size_wrap");
                setSizeModal.innerHTML = setSizeModalHTML;
                imageParamModal.prepend(setSizeModal);
                const setBtn = document.querySelector(".set-size_btn");
                setBtn.addEventListener("click", ()=>{
                    const width = +document.querySelector("#width").value;
                    const height = +document.querySelector("#height").value;

                    if(width<20 || width>60 || height<20 || height>60) {
                        setTimeout(()=>alert("Enter width and height in range from 20 to 60 px"), 0);
                        return;
                    };

                    this.setSize(width, height);
                    this.selectTexture.call(this.mainContext, this.getParams());
                    imageParamModal.remove();
                })

                
            });

            optionDelete.addEventListener("click", () => {
                console.log("delete image from list");
            });
        }
    });
}