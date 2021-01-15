import axios from 'axios';
import cookie from "react-cookies";
import { getUrlData } from "./getUrlData";

const getOnFansData = (storeId) => {
    let url = window.location.href;
    //store_id  门店
    axios.get('/fans/index?store_id='+storeId).then(
        (res) =>{
            if (Number(res.data.code) !== 200) {
                window.location.href = '/auth/oauth/?redirect_uri=' + encodeURIComponent(url) + '&store_id=' + parseInt(getUrlData('store_id', window.location.search));
            }
            if (Number(res.data.code) === 200) {
                cookie.save('user_name', res.data.data.user_name)
                cookie.save('mobile', res.data.data.mobile)
                cookie.save('openId', res.data.data.openId)
                return res.data.data;
            }
        },
        (err) => {
            return err;
        }
    )

}
export default getOnFansData;