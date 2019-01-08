var express = require('express')
const fs = require('fs')
const path = require('path')
var router = express.Router();

function readdir (dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (error, paths) => {
      if (error) {
        console.log(error, "can't read the path");
        reject("can't read the path");
      }
      resolve(paths);
    });
  });
}

/* GET home page. */
router.get('/', async function (req, res, next) {
  let pic = [];
  let pathTo = path.join(__dirname, '/../public/img/picturesFolders');
  let files = await readdir(pathTo);
  files.shift();
  files.map(async file => {
    let file2 = await readdir(pathTo + '/' + file);
    file2.shift();
    pic.push('img/picturesFolders/' + file + '/' + file2[0]);
    if (pic.length == files.length) {
      res.render('index', {
        title: 'Web App',
        pic
      });
    }
  });
});

router.post('/api/upload', (req, res) => {
  console.log(req);
  res.end("ok");
})

module.exports = router
