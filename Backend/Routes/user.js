const express = require("express")
const router =  express.Router()
const { createDetails,Login} = require('../Controller/Controller')
const { resumeupload } =require ('../Controller/UploadController')
const  upload = require('../Middleware/UploadMiddleware')



router.post('/details',createDetails)
router.post('/login',Login)
router.post('/resume',upload.single("resume"),resumeupload)

module.exports = router;