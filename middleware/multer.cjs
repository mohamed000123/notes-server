const multer = require("multer");
const path = require("path");
let oneStepBack = path.join(__dirname, "../");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, oneStepBack + "uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const imageUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed."), false);
    }
  },
});

const mediaUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1.7 * 1024 * 1024,
  },
});
module.exports = {
  imageUpload,
  mediaUpload,
};
