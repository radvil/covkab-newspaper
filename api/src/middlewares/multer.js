const multer = require('multer');
const path = require('path');
const imageDir = path.join(__dirname + '../../../' + 'storage/images');

// set timestamps to filename.
const filename = function (req, file, cb) {
  cb(null, new Date().getTime().toString() + '-' + file.originalname);
};

// images format filter.
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  mimeType && extName ? cb(null, true) : cb(`Error: Only images accepted!`);
};

// articles images storage.
const articleImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${imageDir}/articles`);
  },
  filename,
});

// portfolio images storage.
const portfolioImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${imageDir}/portfolios`);
  },
  filename,
});

// user images storage.
const userImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${imageDir}/users`);
  },
  filename,
});

// patient images storage.
const patientImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${imageDir}/patients`);
  },
  filename,
});

// residence images storage.
const residenceImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${imageDir}/residences`);
  },
  filename,
});

// ===================

// config article image upload.
const articleImageConfig = multer({
  storage: articleImagesStorage,
  limits: { fileSize: 2048 * 2048 },
  fileFilter,
});

// config portfolio image upload.
const portfolioImageConfig = multer({
  storage: portfolioImagesStorage,
  limits: { fileSize: 2048 * 2048 },
  fileFilter,
});

// config user image upload.
const userImageConfig = multer({
  storage: userImagesStorage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

// config patient image upload.
const patientImageConfig = multer({
  storage: patientImagesStorage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

// config residence image upload.
const residenceImageConfig = multer({
  storage: residenceImagesStorage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

const uploadArticleImage = articleImageConfig.single('articleImage');
const uploadPortfolioImage = portfolioImageConfig.single('image');
const uploadUserPhoto = userImageConfig.single('userPhoto');
const uploadPatientPhoto = patientImageConfig.single('patientPhoto');
const uploadResidencePhoto = residenceImageConfig.single('image');

module.exports = {
  uploadArticleImage,
  uploadPortfolioImage,
  uploadUserPhoto,
  uploadPatientPhoto,
  uploadResidencePhoto
};

// TODO: try to make uploaded directory automatically!
