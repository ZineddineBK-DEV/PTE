const multer = require("multer");
module.exports.fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, "./src/static/images");
   
    } else if (file.mimetype === "application/pdf") 
               {
                cb(null, "./src/uploads/plans/");
               }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

 
});
