import Camera from "../camera";
import Grid from "../tools/grid";
import Selection from "../tools/selection";

//methods
import listeners from "./methods/listeners";
import { collisionElement, getDirectories, submitingForm, getImages } from "./methods/init";
import save from "./methods/save";
import GameObject from "../gameObjects";


export default class LocationConstructor {
    constructor(cnv, ctx, landscapeCnv, landscapeCtx, locSizes) {
        this.cancelLoop = false;

        this.cnv = cnv;
        this.ctx = ctx;
        this.landscapeCnv = landscapeCnv;
        this.landscapeCtx = landscapeCtx;
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
    }
    selectTexture({ image, width, height }) {
        this.textureParams = {
            texture: image,
            w: width,
            h: height
        };
    }
    setCanvasSize() {
        this.cnv.width = this.landscapeCnv.width = innerWidth;
        this.cnv.height = this.landscapeCnv.height = innerHeight;

        window.addEventListener("resize", () => {
            this.cnv.width = this.landscapeCnv.width = innerWidth;
            this.cnv.height = this.landscapeCnv.height = innerHeight;
        })
    }
    init(loaded = null) {
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
        this.grid = new Grid(this.ctx);
        this.camera = new Camera();

        this.setCanvasSize();
        this.loop();
    }
    clear() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
        this.landscapeCtx.clearRect(0, 0, innerWidth, innerHeight);
    }
    draw() {
        this.clear();

        this.landscape.map(piece => piece.draw(this.landscapeCtx, this.camera.getCord()));
        this.gameObjects.map(object => object.draw(this.ctx, this.camera.getCord()));

        this.select && this.selection.draw(this.select);
        this.grid.active() && this.grid.draw(this.locationSize, this.camera.getCord());

        this.textureParams && this.ctx.drawImage(this.textureParams.texture, this.clientCursorPosition.x, this.clientCursorPosition.y, this.textureParams.w, this.textureParams.h);
    }
    loop() {
        this.draw();

        !this.cancelLoop && requestAnimationFrame(() => this.loop());
    }
}