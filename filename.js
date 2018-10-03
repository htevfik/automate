module.exports = filename;

const fs = require('fs'), path = require('path');


function filename() {
  let output, images = path.join(__dirname, "images");

  if (!fs.existsSync(images)) {
    fs.mkdirSync(images);
  }

  do {
    output = path.join(images, unique() + ".png");
  } while (fs.exists(output));

  return output;
}

function unique() {
  return Number(Math.random().toString().split('').reverse().join('')).toString(32);
}