var express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
var router = express.Router();
let touploads = path.join(__dirname, '/../public/uploads/');

function readdir(dir) {
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
//removes the files 1 by one
/* GET home page. */
// router.get('/', async function (req, res, next) {
//   let pic = [];
//   let pathTo = path.join(__dirname, '/../public/img/picturesFolders');
//   let files = await readdir(pathTo);
//   files.shift();
//   files.map(async file => {
//     let file2 = await readdir(pathTo + '/' + file);
//     file2.shift();
//     pic.push('img/picturesFolders/' + file + '/' + file2[0]);
//     if (pic.length == files.length) {
//       res.render('index', {
//         title: 'Web App',
//         pic
//       });
//     }
//   });
// });
router.get('/', async function (req, res, ) {
  try {
    let files = await readdir(touploads);
    let imges = files.map((name) => {
      let extension = name.split('.')[1];
      if (extension == "jpg") {
        return name;
      }
    });
    res.render('index', {
      title: "web App",
      pic: imges
    });

  } catch (error) {
    console.log(error);
  }

});


router.use(bodyParser.text());

router.all('*', (req, res, next) => {
  req.body = JSON.parse(req.body);
  next();
})

router.post('/api/upload', (req, res) => {
  console.log(req.body);
  if (req.body.binary) fs.appendFile(touploads + req.body.filename, req.body.chunk, 'binary', append)
  else fs.appendFile(touploads + req.body.filename, req.body.chunk, append);

  function append(error, data) {
    if (error) console.log(error);
    else {
      console.log("chunk written");
    }
  }

  res.end('ok');
})


module.exports = router