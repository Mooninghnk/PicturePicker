var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
const fs = require('fs');
const path = require("path");
  let pic = [];
  let pathTo = path.join(__dirname, "../public/img/picturesFolders");
  fs.readdir(pathTo, (error, files) => {
    if (error) {console.log("can't read folder");}
    files.shift();
    for (let i = 0; i < files.length; i++) {
      let dir = files[i].toString();
      fs.readdir(pathTo+"/" + dir, (error, file) => {
        if (error) {console.log("can't read the file2");}
        pic.push("img/picturesFolders/" + dir +"/" + file[1]);
        if (pic.length == files.length) {
            res.render('index', {
              title: 'Web App',
              pic


            });
          console.log(pic);}
    })
    }
  })
});

module.exports = router