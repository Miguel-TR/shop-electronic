const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathFolder = path.join(__dirname, '..','..','public', 'img', 'user');
        cb(null, pathFolder);
    },
    filename: (req, file, cb) =>{
        const newFileName = 'user-' + Date.now() + path.extname(file.originalname) ;
        cb(null, newFileName)
    }
})

const upload = multer({ storage });

module.exports  = upload;