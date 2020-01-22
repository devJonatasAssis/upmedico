const Jimp = require('jimp');

async function readBuffer(buffer) {
  return await Jimp.read(buffer);
}

async function readBase64(base64) {
  const buffer = new Buffer(base64, 'base64');
  return await readBuffer(buffer);
}

async function read(origin, type) {
  if (type === 'base64') {
    return await readBase64(origin);
  }
  return await readBuffer(origin);
}

async function loadFont(font) {
  return await Jimp.loadFont(font);
}

async function print(img, font, x, y, text) {
  img.print(font, x, y, text);
}

function getBuffer(img) {
  return new Promise((resolve, reject) => {
    img.getBuffer(Jimp.AUTO, (err, buff) => {
      if (err) {
        return reject(err);
      }
      resolve(buff);
    });
  }); 
}

exports.read = read;
exports.print = print;
exports.getBuffer = getBuffer;
exports.loadFont = loadFont;
