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
        cb(null, path.resolve(__dirname, "../app/assets/mapTextures"));
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

server.get("/", (req, res) => {
    res.sendFile(`/index.html`);
})
server.get("/images", (req, res) => {
    const textures = fs.readdir(path.resolve(__dirname, "../app/assets/mapTextures"), (err, files) => {
        if (err) return;
        res.send(files);
    });

})

server.listen(3001, () => {
    console.log(`I live on 3001 port`);
});