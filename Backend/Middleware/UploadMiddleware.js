const Resume = require('../Modal/Resume')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"Upload/")

    },
    filename:(req,file,cb)=>
        {
            cb(null, Date.now() +"-"+file.originalname);
        }


})
const fileFilter = (req,file,cb)=>{
    if(file.mimetype==="application/pdf"){
        cb(null,true)
    }
    else{
        cb( new Error("only pdf is allowed"),false)
    }
}

const upload = multer({
    storage,
    fileFilter,
}
)
module.exports = upload