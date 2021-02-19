import axios from "axios";
import {getUrlData} from "../util/getUrlData";
import wx from 'weixin-js-sdk'

const wxconfig = () => {
    console.log(window.location.href)
    axios.get('/auth/wx-share?url=' + encodeURIComponent(window.location.href) + '&store_id=' + getUrlData("store_id")).then(
        (res) => {
            let resData = res.data;
            if (Number(resData.code) === 200) {
                wx.config({
                    debug: false,
                    appId: resData.data.appId,
                    timestamp: resData.data.timestamp,
                    nonceStr: resData.data.noncestr,
                    signature: resData.data.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuangelQQ',
                        'onMenuShareWeibo',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'closeWindow',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'openLocation',
                        'getLocation'
                    ]
                })
                wx.ready(function () {
                    wx.checkJsApi({
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuangelQQ',
                            'onMenuShareWeibo',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'closeWindow',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'getLocation'
                        ],
                        success: function (res) {
                            if (res.checkResult.getLocation === false) {
                                alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                                return;
                            }
                        }
                    });
                })
            }
        }
    )
}

export default wxconfig

