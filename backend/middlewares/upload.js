const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null , "uploads/")
    },
    filename : (req,file,cb) => {
        const uniqueName = Date.now() +"-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null ,uniqueName)
    }
});

const fileFilter = (req,file,cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);

    if(extname && mimetype) {
        cb(null,true);
    }else{
        cb(new Error("فقط فایل عکس مجاز است"))
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits :{fileSize: 5 * 1024 * 1024}
});

module.exports = upload;