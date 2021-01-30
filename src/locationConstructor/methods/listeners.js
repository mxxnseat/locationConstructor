import GameObject from "../../gameObjects";

export default function () {
    window.addEventListener("mousemove", (e) => {
        this.clientCursorPosition = {
            x: e.clientX,
            y: e.clientY
        };
    });
    window.addEventListener("keydown", (e) => {
        this.keydown[e.key] = true;

        if(e.key === "Escape") delete this.textureParams;
        if (e.key === "Delete" && this.selectedObjects.length) {
            this.gameObjects = this.gameObjects.filter(obj => {
                return this.selectedObjects.indexOf(obj) == -1;
            });
            this.landscape = this.landscape.filter(obj => {
                return this.selectedObjects.indexOf(obj) == -1;
            });
            this.selectedObjects = [];
        }
        if (this.keydown['Control'] && this.keydown['v']) {
            if (this.textureParams && this.selectedArea) {
                const w = this.selectedArea.x2 - this.selectedArea.x1;
                const h = this.selectedArea.y2 - this.selectedArea.y1;

                for (let i = 0; i < w / 60; i++) {
                    for (let j = 0; j < h / 60; j++) {
                        const { x, y } = this.grid.attraction(this.selectedArea.x1, this.selectedArea.y1);

                        let gameObject = new GameObject(
                            this.ctx,
                            x + (i * 60),
                            y + (j * 60),
                            this.textureParams
                        );

                        this.landscape ? this.landscape.push(gameObject)
                            : this.gameObjects.push(gameObject);
                    }
                }
            }
        }
        if (this.keydown['Control'] && this.keydown['a']) {
            this.selectedArea = this.selection.select({ x1: 0, y1: 0, x2: this.locationSize.width, y2: this.locationSize.height }, this.camera.getCord());

        }
    });
    window.addEventListener("keyup", (e) => {
        delete this.keydown[e.key];
    });
    this.cnv.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        if (this.select !== undefined) {
            this.select.x2 = clientX;
            this.select.y2 = clientY;
        }
        if (this.moveCamera !== undefined) {

            this.moveCamera.endPointX = clientX;
            this.moveCamera.endPointY = clientY;

            const { startPointX, startPointY, endPointX, endPointY } = this.moveCamera;

            let offsetX = (startPointX - endPointX),
                offsetY = (startPointY - endPointY);

            this.camera.moveCamera(this.locationSize, offsetX, offsetY);


            this.moveCamera.startPointX = clientX;
            this.moveCamera.startPointY = clientY;
        }
    });
    this.cnv.addEventListener("mousedown", (e) => {
        this.selectedObjects.length && this.selectedObjects.map(i => i.selectCancel());
        switch (e.button) {
            case 0:
                const x = e.clientX + this.camera.getCord().x;
                const y = e.clientY + this.camera.getCord().y;
                if (this.selection.active()) {
                    this.select = {
                        x1: e.clientX,
                        y1: e.clientY
                    }
                    return;
                }
                if (this.textureParams) {
                    const gridCellCord = this.grid.attraction(x, y);
                    const gameObject = new GameObject(this.ctx, gridCellCord.x, gridCellCord.y, this.textureParams);

                    this.landscape ? this.landscape.push(gameObject) : this.gameObjects.push(gameObject);
                }
                break;
            case 2:
                this.moveCamera = {
                    startPointX: e.clientX,
                    startPointY: e.clientY
                };
                break;
        }
    });
    this.cnv.addEventListener("mouseup", (e) => {
        e.button == 2 && delete this.moveCamera;
        if (e.button == 0) {
            if (this.select) {
                this.selectedArea = this.selection.select(this.select, this.camera.getCord());
                const { x1, y1, x2, y2 } = this.selectedArea;

                this.selectedObjects = this.gameObjects.filter(object => {
                    const { w, h } = object.getSize();
                    const { y, x } = object.getCord();

                    return y < y2 && y + h > y1 &&
                        x < x2 && x + w > x1;
                });
                this.selectedObjects = [...this.selectedObjects, ...this.landscape.filter(piece=>{
                    const { w, h } = piece.getSize();
                    const { y, x } = piece.getCord();

                    return y < y2 && y + h > y1 &&
                        x < x2 && x + w > x1;
                })]

                this.selectedObjects.map(i => i.select());
                delete this.select;
            }
        }

    })
}