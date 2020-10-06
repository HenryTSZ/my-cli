# tiny-pic

> `tiny-pic` 是一个压缩图像的脚手架, 提供 **JPG** 和 **PNG** 的压缩功能

基于 [tinyimg-webpack-plugin](https://github.com/JowayYoung/tinyimg-webpack-plugin) 改造而成, 大佬封装思路: [嗯，手搓一个TinyPng压缩图片的WebpackPlugin也SoEasy啦_JowayYoung谈前端 - SegmentFault 思否](https://segmentfault.com/a/1190000023564439?utm_source=tag-newest)

## 安装

`npm i tiny-pic -g`

## 使用

在需要压缩图片的文件夹下执行 `tiny t` 即可, 默认覆盖源文件; 如需要保留源文件, 请传入路径, 如: `tiny t path`
