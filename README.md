Node.js 图片添加文字水印库

## Installation 安装
	$ npm install text2watermark


## Demo 例子
``` javascript
const text2watermark = require('text2watermark')
const watermarkBuffer = await = text2watermark.convert(buffer,'测试水印')                 
```

## Features 功能特性

* 基于images库,实现了添加文字做水印的功能
* 内置了微软雅黑字体,可以调用时传入其他字库
* 方便node接口调用,输入输出图像都是Buffer类型

## Installation 安装
	$ npm install images

## API 接口


### convert(buffer, text, options, font)
从Buffer数据中解码图像,添加文字水印

#### :options
配置项[非必要]
```$xslt
{
    fontSize: 14, 
    path: {'fill': 'black'}, // 文字颜色
    position:{x:10,y:10} // 相对原图右下角位置的偏移
} 
```
#### :font[path/to/xxx.ttf]
外部字体库[非必要]
