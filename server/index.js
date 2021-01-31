const path = require("path");
const express = require("express");
const server = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");

const publicPath = path.resolve(__dirname, "../app");

server.use(express.static(publicPath));
server.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `/${req.body.flag}`;
        cb(null, path.resolve(__dirname, "../app/assets/mapTextures")+dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

server.post("/upload", (req, res) => {
    const upload = multer({ storage }).array("images");
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
            return;
        }
        const files = req.files.map(file=>file.filename);
        res.send(files);
    });
});

server.get("/", (req, res) => res.sendFile(`/index.html`));

server.get("/openDirectory",(req,res)=>{
    const dir = path.resolve(__dirname, `../app/${req.query.dir}`);
    fs.readdir(dir, (err,file)=>{
        if(err) return;
        res.send(file);
    });
});

server.get("/directories", (req, res) => {
    const dir = path.resolve(__dirname, "../app/assets/mapTextures");
    fs.readdir(dir, (err, file) => {
        if (err) return;

        fs.stat(dir,(err, stats)=>{
            if(err){
                console.log(err);
                return;
            }
            stats.isDirectory() && res.send(file);
        });
    });
})

server.listen(3001, () => {
    console.log(`I live on 3001 port`);
});