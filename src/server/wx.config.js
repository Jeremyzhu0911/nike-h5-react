import axios from "axios";
import {getUrlData} from "../util/getUrlData";
import wx from 'weixin-js-sdk'
import DataTracking from "../util/DataStatistics";

const WeiXin = {
    config: () => {
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
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'openLocation',
                            'getLocation'
                        ]
                    })
                }
            }
        )
    },
    hideMenus: () => {
        wx.ready(function () {
            wx.checkJsApi({
                jsApiList: [
                    'checkJsApi',
                    'hideOptionMenu',
                ],
                success: function (res) {
                    if (res.checkResult.getLocation === false) {
                        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                        return;
                    }
                }
            });
            wx.hideOptionMenu()
        })
    },
    share: (title,link,imgUrl,desc) => {
        wx.ready(function () {
            wx.checkJsApi({
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuangelQQ',
                    'onMenuShareWeibo'
                ],
                success: function (res) {
                    if (res.checkResult.getLocation === false) {
                        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                        return;
                    }
                }
            });

            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: link, // 分享链接
                imgUrl: imgUrl,
                desc: desc,
                success: function () {
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            })

            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                link: link, // 分享链接
                imgUrl: imgUrl,
                desc: desc,
                success: function () {

                    // DataTracking.GAEvent('最新上市', item.image_path)
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            })

            wx.onMenuShareQQ({
                title: title, // 分享标题
                link: link, // 分享链接
                imgUrl: imgUrl,
                desc: desc,
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareWeibo({
                title: title, // 分享标题
                link: link, // 分享链接
                imgUrl: imgUrl,
                desc: desc,
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        })
    }
}

export default WeiXin

