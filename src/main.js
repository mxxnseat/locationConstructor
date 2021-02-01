import "./scss/index.scss";

import LocationConstructor from "./locationConstructor";
import axios from "axios";

const cnv = document.querySelector("#main");
const ctx = cnv.getContext("2d");

const landscape = document.querySelector("#landscape");
const landscapeCtx = landscape.getContext("2d");

function toggleMenu() {
    const openBtn = document.querySelector(".open");
    const menu = document.querySelector(".menu-wrapper");

    openBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
        openBtn.classList.toggle("active");
    });
}
function modalRender() {
    const modal = document.createElement("div");
    modal.classList.add("canvas-size-wrapper");
    let formHTML = `
        <input type="text" class="canvas-size-input" value="5000" id="width" placeholder="Canvas Width">
        <input type="text" class="canvas-size-input" value="5000" id="height" placeholder="Canvas Height">
        <button class="button canvas-size">Set canvas size</button>

        <input type="file" id="load-map" name="map-loader">
        <button id="load">load</load>
    `;
    modal.innerHTML = formHTML;
    document.querySelector("body").prepend(modal);
}
function canvasInit() {
    const inputs = document.querySelectorAll(".canvas-size-input");
    const btn = document.querySelector(".canvas-size");
    const loadBtn = document.querySelector("#load");
    
    for (let input of inputs) {
        input.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    loadBtn.addEventListener("click",(e)=>{
        const file = document.querySelector("#load-map");
        const data = {filename:file.files[0].name};
        axios.post("/loadMap", JSON.stringify(data),{
            headers:{
                "Content-Type":"application/json"
            }
        }).then(({data})=>{
            console.log(data);
            const sizes = {
                width: data.locSize.width,
                height: data.locSize.height
            };
            const readyLandscape = data.landscape;
            console.log(sizes);
            toggleMenu();
            document.querySelector(".canvas-size-wrapper").remove();
            new LocationConstructor(cnv,ctx,landscape,landscapeCtx, sizes, readyLandscape);
        });
    });
    btn.addEventListener("click",() => {
        let sizes = {};
        for (let input of inputs) {
            if (input.value > 50000 || input.value < 1000) {
                alert("Enter canvas size in range: [1000;50000]");
                return;
            }
            sizes[input.getAttribute("id")] = Math.floor(+input.value);
        }
        document.querySelector(".canvas-size-wrapper").remove();
        toggleMenu();
        new LocationConstructor(cnv, ctx, landscape, landscapeCtx, sizes);
    });
}
function preloader() {
    return new Promise((resolve, reject) => {
        if (document.readyState || document.body.readyState === "complete") {
            modalRender();
            resolve();
        }
    });
}

preloader()
    .then(() => {
        document.querySelector("body").oncontextmenu = () => false;
        canvasInit();
        document.querySelector(".loader").remove();
    });