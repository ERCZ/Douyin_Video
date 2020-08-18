# DouyinVideo

DouyinVideo是一个通过抖音客户端的分享链接解析该视频的视频下载链接、背景音乐下载链接、视频封面下载链接、无抖音水印视频下载链接的抖音视频解析库。

## Usage

```javascript
const fs = require('fs')
const DouyinVideo = require('./index')

async function run() {
    // 使用从抖音客户端得到的分享文本中的链接new一个DouyinVideo对象
    let video = new DouyinVideo('https://v.douyin.com/Jj8eXXu/')
    // 调用对象的parse方法解析该链接
    await video.parse()
    // 调用parse方法解析后通过对象属性访问相应解析结果
    console.log(video.videoID)
    console.log(video.videoTitle)
    console.log(video.videoDesc)
    console.log(video.videoDuration)
    console.log(video.videoCoverUrl)
    console.log(video.videoHeight)
    console.log(video.videoWidth)
    console.log(video.videoUrl)
    console.log(video.videoNoWaterMaskUrl)
    console.log(video.bgMusicUrl)
    // 调用相应的下载方法可以得到相应资源的文件流
    let data = await video.downloadAudio()
    let file = fs.createWriteStream(`${video.videoID}.mp3`)
    data.pipe(file)
}
run()
```

如果只是想下载视频，可以全局安装该模块，使用dyd命令加从抖音客户端得到的分享文本中的链接即可下载视频

```bash
npm i -g douyin_video
dyd https://v.douyin.com/Jj8eXXu/
```

## API

### Constructor

```javascript
// url:从抖音客户端得到的分享文本中的链接
DouyinVideo(url)
```

### Field

|field|type|desc|
|---|---|---|
|videoID|string|视频ID|
|videoTitle|string|视频标题|
|videoDesc|string|视频描述|
|videoDuration|number|视频时长ms|
|videoCoverUrl|string|视频封面链接|
|videoHeight|number|视频高度|
|videoWidth|number|视频宽度|
|videoUrl|string|视频链接|
|videoNoWaterMaskUrl|string|无抖音logo视频链接，需通过手机端UA访问|
|bgMusicUrl|string|视频背景音乐链接|
|_sharedLink|string|从抖音客户端得到的分享文本中的链接|
|_videoInfo|object|服务端获取的原始视频信息|

### Method

async parse()
解析视频信息

async downloadVideo()
下载无水印视频，返回文件流

async downloadAudio()
下载背景音乐，返回文件流

async downloadCover()
下载视频封面，返回文件流

## Others

由于抖音的接口会发生变化因此不能保证该解析库长期有效，如果失效请联系2995347790@qq.com
