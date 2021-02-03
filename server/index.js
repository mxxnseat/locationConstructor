const path = require("path");
const express = require("express");
const server = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");

const publicPath = path.resolve(__dirname, "../app");

server.use(express.static(publicPath));
server.use(bodyParser.json({ limit: '100mb', parameterLimit: 1000000,extended: true }))
server.use(bodyParser.urlencoded({ limit: '100mb',parameterLimit: 1000000, extended: true }))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `/${req.body.flag}`;
        cb(null, path.resolve(publicPath, "assets/mapTextures") + dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

server.post("/upload", (req, res) => {
    const upload = multer({ storage }).array("images");
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        const files = req.files.map(file => file.filename);
        res.send(files);
    });
});

server.get("/", (req, res) => res.sendFile(`/index.html`));

server.get("/openDirectory", (req, res) => {
    const dir = path.resolve(publicPath, `${req.query.dir}`);
    fs.readdir(dir, (err, file) => {
        if (err) return;
        res.send(file);
    });
});

server.get("/directories", (req, res) => {
    const dir = path.resolve(publicPath, "assets/mapTextures");
    fs.readdir(dir, (err, file) => {
        if (err) return;

        fs.stat(dir, (err, stats) => {
            if (err) {
                console.log(err);
                return;
            }
            stats.isDirectory() && res.send(file);
        });
    });
});

server.post("/save", (req, res) => {
    const mapsStorage = path.join(publicPath, 'maps');
    const createDirName = req.query.locname;
    const dir = path.join(mapsStorage, createDirName);

    const map = req.body;
    
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    !fs.existsSync(path.join(dir,"assets")) && fs.mkdirSync(path.join(dir,"assets"));
    fs.writeFileSync(dir+"/map.json", JSON.stringify(map));
    for(let piece in map){
        if(piece !== "locSize"){
            map[piece].map(item=>{
                let imageName = item.texture.match(/([a-z]+\/){3}(.+\.png)/i)[2];
                if(!fs.existsSync(path.join(dir,`assets/${imageName}`))){
                    console.log(path.join(dir,`assets/${imageName}`));
                    fs.copyFileSync(path.join(publicPath,item.texture), path.join(dir,`assets/${imageName}`));
                }
            });
        }
    }
    res.send("Saving successfully");
});

server.post("/loadMap", (req, res) => {
    const filename = req.body.filename;
    const filePath = path.join(publicPath, `maps/main/${filename}`);

    res.send(fs.readFileSync(filePath));
});

server.listen(3001, () => {
    console.log(`I live on 3001 port`);
});