const Text2svg = require('text2svg');
const sharp = require('sharp');
const images = require("images");
const path = require("path");
// 测试生成水印图
// sharp(roundedCorners).toFile('watermark.png', (err, info) => {
//       console.log(info)
// });
// return new Promise((resolve, reject) => {
//     sharp(roundedCorners).png().toBuffer((err, buffer) => {
//         if (err) return reject(err)
//         resolve(buffer)
//     })
// })

async function convert(bufferSourceImage, text = '测试水印', options = {}, fontPath) {
  const pathd = path.join(__dirname,'./msyh.ttf');
  fontPath = fontPath || pathd;
  const defaultOptions = {fontSize: 14, path: {'fill': 'black'}, position:{x:10,y:10}};

  const text2svg = new Text2svg(fontPath);
  const svg = text2svg.toSVG(text, Object.assign({}, defaultOptions, options));
  // console.log(svg)
  if (!svg.svg) {
    return 'Svg conversion failed'
  }
  const roundedCorners = Buffer.from(svg.svg);

  return new Promise((resolve, reject) => {
    //water转png
    sharp(roundedCorners).png().toBuffer((err, buffer) => {
      if (err) return reject(err)

      const watermarkImg = images(buffer);
      // const sourceImg = images('./example/source.jpeg');
      const sourceImg = images(bufferSourceImage);
      // 比如放置在右下角，先获取原图的尺寸和水印图片尺寸
      const sWidth = sourceImg.width();
      const sHeight = sourceImg.height();
      const wmWidth = watermarkImg.width();
      const wmHeight = watermarkImg.height();
      // 设置绘制的坐标位置，右下角距离 ? px
      // 保存格式会自动识别
      const data = images(sourceImg)
          .draw(watermarkImg, sWidth - wmWidth - defaultOptions.position.x, sHeight - wmHeight - defaultOptions.position.y)
          .encode("png", {})
      // console.log('>>>>>>>>>>>>',data)

      // 测试写入
      // images(sourceImg)
      //     .draw(watermarkImg, sWidth - wmWidth - 10, sHeight - wmHeight - 10)
      //     .save('./example/saveImg.png');
      return resolve(data)
    })
  })
}

module.exports.convert = convert;







