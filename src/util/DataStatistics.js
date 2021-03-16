import ReactGA from 'react-ga';
import cookie from "react-cookies";

const GAid = "UA-137909240-1";

const BAIDU_CODE = process.env.NODE_ENV === 'development' ? "2a053a59dede574ad1207b0645e186ef" : "9e8bb2bf15981e07af08e0c793b5a555";

let hm = document.createElement("script");
hm.src = `https://hm.baidu.com/hm.js?${BAIDU_CODE}`;
let s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(hm, s);

const DataTracking = {
    BDEvent: (action, label) =>{
        window._hmt.push(['_trackEvent', cookie.load("store_name"), action, label]);
    },
    GAEvent: (action, label) => {
        ReactGA.initialize(GAid, {
            debug: true,
            gaOptions: {
                send: {
                    hitType: 'event', // Required
                    eventCategory: cookie.load("store_name"), // 门店名称.
                    eventAction: action, // 哪个页面点击的
                    eventLabel: label, // 来源
                    eventValue: 1
                }
            }
        })
    },
    GAPage: (pageTitle) => {
        ReactGA.initialize(GAid, {
            debug:true,
            gaOptions: {
                page_title: cookie.load("store_name") + " | " + pageTitle
            }
        })
    },
    GAOpenId: (openId) => {
        ReactGA.initialize(GAid, {
            // debug:true,
            gaOptions: {
                user_id: openId
            }
        })
    }
}

export default DataTracking;