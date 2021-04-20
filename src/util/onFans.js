import axios from 'axios';
import cookie from "react-cookies";
import { getUrlData } from "./getUrlData";
import DataTracking from "./DataStatistics"
import WeiXin from "../server/wx.config";

const getOnFansData = (storeId) => {
    let url = window.location.href;
    //store_id  门店
    axios.get('/fans/index?store_id='+storeId).then(
        (res) =>{
            if (Number(res.data.code) !== 200) {
                window.location.href = '/auth/oauth/?redirect_uri=' + encodeURIComponent(url) + '&store_id=' + parseInt(getUrlData('store_id', window.location.search));
            }
            if (Number(res.data.code) === 200) {
                cookie.save('fans_id', res.data.data.id)
                cookie.save('user_name', res.data.data.nickname)
                cookie.save('mobile', res.data.data.mobile)
                cookie.save('jordan',res.data.data.jordan_status)
                cookie.save('openId', res.data.data.openId)
                DataTracking.GAOpenId(res.data.data.openId)

                WeiXin.config()

                // 百度地图地理位置api
                // let BMap = window.BMap;
                // let geoc = new BMap.Geocoder();
                // let geolocation = new BMap.Geolocation();
                // geolocation.getCurrentPosition(function (r) {
                //     geoc.getLocation(r.point, function (rs) {
                //         // console.log(rs)   //具体信息可以打印出来看一下，根据需求取值     经纬度，城市，街道等等
                //         let addComp = rs.addressComponents;
                //         cookie.save('city', addComp.city)
                //         cookie.save('province', addComp.province)
                //     });
                // });

                return res.data.data;
            }
        },
        (err) => {
            return err;
        }
    )

}
export default getOnFansData;