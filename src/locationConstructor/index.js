import Camera from "../camera";
import Grid from "../tools/grid";
import Selection from "../tools/selection";

//methods
import listeners from "./methods/listeners";
import { collisionElement, getDirectories, submitingForm, getImages } from "./methods/init";


export default class LocationConstructor {
    constructor(cnv, ctx, locSizes) {
        this.cnv = cnv;
        this.ctx = ctx;
        this.locationSize = locSizes;
        this.loadDir = "landscape"; 

        this.listeners = listeners.bind(this);
        this.collisionElement = collisionElement.bind(this);
        this.getDirectories = getDirectories.bind(this);
        this.getImages = getImages.bind(this);
        this.submitingForm = submitingForm.bind(this);
        
        this.assets = [];
        this.selectedObjects = [];
        this.gameObjects = [];
        this.landscape = [];
        this.keydown = {};

        this.init();
    }
    selectTexture({ image, width, height }) {
        this.textureParams = {
            texture: image,
            w: width,
            h: height
        };
    }
    setCanvasSize() {
        this.cnv.width = innerWidth;
        this.cnv.height = innerHeight;

        window.addEventListener("resize", () => {
            this.cnv.width = innerWidth;
            this.cnv.height = innerHeight;
        })
    }
    init() {
        this.getDirectories()
        this.collisionElement();
        this.submitingForm();
        this.listeners();

        this.selection = new Selection(this.ctx);
        this.grid = new Grid(this.ctx);
        this.camera = new Camera();

        this.setCanvasSize();
        this.loop();
    }
    draw() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);

        this.landscape.map(piece=>piece.draw(this.camera.getCord()));
        this.gameObjects.map(object => object.draw(this.camera.getCord()));

        this.select && this.selection.draw(this.select);
        this.grid.active() && this.grid.draw(this.locationSize, this.camera.getCord());

        this.textureParams && this.ctx.drawImage(this.textureParams.texture, this.clientCursorPosition.x, this.clientCursorPosition.y, this.textureParams.w, this.textureParams.h);
    }

    save() {
        const map = this.gameObjects.map(obj => {
            return obj.getCord();
        });
        return JSON.stringify(map);
    }

    loop() {
        this.draw();

        requestAnimationFrame(() => this.loop());
    }
}