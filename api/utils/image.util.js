const fs = require('fs');
const path = require('path');

const imageStorage = path.join(__dirname + '../../../storage/images/');
// const articlePath = imageStorage + 'articles';

exports.rmPrevImage = function (imagePath, cb) {
  const fullPath = (imageStorage + imagePath).toString();

  return fs.unlink(fullPath, cb);
};

// let imagePath = `${imageStorage}/${fetchedArticle.image}`;

// fs.unlink(imagePath, (err) => {
//   if (err) return res.status(200);
// });

// req.body.image = req.file.filename;
