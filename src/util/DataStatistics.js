import ReactGA from 'react-ga';
import cookie from "react-cookies";

const GAid = "UA-137909240-1";

const DataTracking = {
    GAEvent:(action, label)=>{
        ReactGA.initialize(GAid,{
            debug:true,
            gaOptions: {
                send: {
                    hitType: 'event', // Required.
                    eventCategory: cookie.load("store_name"), // 门店名称.
                    eventAction: action, // 哪个页面点击的
                    eventLabel:  label, // 来源
                    eventValue: 1
                }
            }
        })
    },
    GAPage: (pageTitle)=>{
        ReactGA.initialize(GAid,{
            debug:true,
            gaOptions: {
                page_title: cookie.load("store_name") + " | " + pageTitle
            }
        })
    },
    GAOpenId:(openId)=>{
        ReactGA.initialize(GAid,{
            debug:true,
            gaOptions: {
                user_id: openId
            }
        })
    }
}

export default DataTracking;