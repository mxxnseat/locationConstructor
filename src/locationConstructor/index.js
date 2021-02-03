import Camera from "../camera";
import Grid from "../tools/grid";
import Selection from "../tools/selection";

//methods
import listeners from "./methods/listeners";
import { collisionElement, getDirectories, submitingForm, getImages } from "./methods/init";
import save from "./methods/save";
import GameObject from "../gameObjects";


export default class LocationConstructor {
    constructor(locSizes) {
        this.locationSize = locSizes;
        this.loadDir = "landscape";

        this.listeners = listeners.bind(this);
        this.collisionElement = collisionElement.bind(this);
        this.getDirectories = getDirectories.bind(this);
        this.getImages = getImages.bind(this);
        this.submitingForm = submitingForm.bind(this);
        this.save = save.bind(this);

        this.assets = [];
        this.selectedObjects = [];
        this.gameObjects = [];
        this.landscape = [];
        this.keydown = {};
        this.mouseDown = {};
    }
    selectTexture({ image, width, height }) {
        this.textureParams = {
            texture: image,
            w: width,
            h: height
        };
    }
    setCanvasSize() {
        this.cnv.width = this.backgroundCnv.width = innerWidth;
        this.cnv.height = this.backgroundCnv.height = innerHeight;

        window.addEventListener("resize", () => {
            this.cnv.width = this.backgroundCnv.width = innerWidth;
            this.cnv.height = this.backgroundCnv.height = innerHeight;
            this.draw();
        })
    }
    init(loaded = null) {
        this.cnv = document.createElement("canvas");
        this.backgroundCnv = document.createElement("canvas");
        this.cnv.setAttribute("id", "main");
        this.backgroundCnv.setAttribute("id", "background");
        document.querySelector("body").prepend(this.cnv);
        document.querySelector("body").prepend(this.backgroundCnv);
        this.ctx = this.cnv.getContext("2d");
        this.backgroundCtx = this.backgroundCnv.getContext("2d");

        if (loaded) {
            loaded.landscape.map(i => {
                new Promise(resolve => {
                    const texture = new Image();
                    texture.src = i.texture;
                    texture.onload = () => resolve(texture);
                }).then(texture=>{
                   this.landscape.push(new GameObject(i.x, i.y, { w: i.w, h: i.h, texture }));
                });
            });
            loaded.gameObjects.map(i => {
                new Promise(resolve => {
                    const texture = new Image();
                    texture.src = i.texture;
                    texture.onload = () => resolve(texture);
                }).then(texture=>{
                   this.gameObjects.push(new GameObject(i.x, i.y, { w: i.w, h: i.h, texture }));
                });
            });
        }

        this.getDirectories();
        this.collisionElement();
        this.submitingForm();
        this.listeners();
        this.save();

        this.selection = new Selection(this.ctx);
        this.grid = new Grid(this.ctx, this.locationSize);
        this.camera = new Camera();

        this.grid.setCameraCord({x:0,y:0});
        this.setCanvasSize();
        this.draw();
        this.loop();
    }
    draw() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
        this.landscape.map(piece => piece.draw(this.ctx, this.camera.getCord()));
        this.gameObjects.map(object => object.draw(this.ctx, this.camera.getCord()));

        this.select && this.selection.draw(this.select);
        this.grid.active() && this.grid.draw(this.locationSize, this.camera.getCord());
    }
    selectedTextureDraw(){
        this.backgroundCtx.clearRect(0, 0, innerWidth, innerHeight);
        
        if(this.textureParams){
            const {x,y} = this.grid.attraction(this.clientCursorPosition.x+this.camera.getCord().x, this.clientCursorPosition.y+this.camera.getCord().y);
            this.textureParams && this.backgroundCtx.drawImage(this.textureParams.texture, x-this.camera.getCord().x, y-this.camera.getCord().y, this.textureParams.w, this.textureParams.h);
        }
    }
    loop() {
        this.selectedTextureDraw();
        this.grid.setCameraCord(this.camera.getCord());
        (Object.keys(this.mouseDown).length || Object.keys(this.keydown).length) && this.draw();

        requestAnimationFrame(() => this.loop());
    }
}