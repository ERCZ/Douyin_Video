#!/usr/bin/env node
const fs = require('fs')
const DouyinVideo = require('../index.js');

dyd()

async function dyd() {
    let video = new DouyinVideo(process.argv[2].trim())
    await video.parse()
    console.log('即将开始下载，下载时长将根据视频时长与网络环境决定，请耐心等待，下载期间请不要关闭控制台')
    console.log('正在下载，请稍后...')
    let file = fs.createWriteStream(`${video.videoID}.mp4`)
    let data = await video.downloadVideo()
    data.pipe(file)
}
