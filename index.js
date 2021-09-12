const qs = require('querystring')
const axios = require('axios').default;

module.exports = class DouyinVideo{

    constructor(url) {
        this._sharedLink = url
    }

    async _getVideoID() {
        let res = await axios.get(this._sharedLink)
        let id = /\/(\d*)\//.exec(res.request.path)[1]
        return id
    }

    async _getVideoInfo() {
        let res = await axios.get(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${this.videoID}`)
        return res.data.item_list[0]
    }

    async parse() {
        this.videoID = await this._getVideoID()
        this._videoInfo = await this._getVideoInfo()
        this.videoTitle = this._videoInfo.cha_list?this._videoInfo.cha_list[0].cha_name:''
        this.videoDesc = this._videoInfo.desc
        this.videoDuration = this._videoInfo.duration
        this.bgMusicUrl = this._videoInfo.music?.play_url.uri
        this.videoCoverUrl = this._videoInfo.video.origin_cover.url_list[0]
        this.videoHeight = this._videoInfo.video.height
        this.videoWidth = this._videoInfo.video.width
        this.videoUrl = this._videoInfo.video.play_addr.url_list[0]
        this.videoNoWaterMaskUrl = this.videoUrl.replace('/playwm/', '/play/')
    }

    async _download(url) {
        let res = await axios.get(url, {
            responseType: 'stream',
            headers: {
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
            }
        })
        return res.data
    }

    async downloadVideo() {
        let res = await this._download(this.videoNoWaterMaskUrl)
        return res    
    }

    async downloadAudio() {
        let res = await this._download(this.bgMusicUrl)
        return res
    }

    async downloadCover() {
        let res = await this._download(this.videoCoverUrl)
        return res
    }

}
