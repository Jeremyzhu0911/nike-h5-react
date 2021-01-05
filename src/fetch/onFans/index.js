import { get } from '../get';
import { getUrlData } from "../../server/config";

export function getOnFansData(storeId){
    let url = window.location.href;
    const result = get('/fans/index?store_id='+storeId).then(
        (res) =>{
            let resData = res.body;
            if (Number(resData.code) !== 200) {
                console.log(getUrlData('store_id', window.location.search));
                window.location.href = '/auth/oauth/?redirect_uri=' + encodeURIComponent(url) + '&store_id=' + getUrlData('store_id', window.location.search);
            }
            if (Number(resData.code) === 200) {
                // this.onLoadData();
                // this.$cookies.set('user_name', resData.data.user_name);
                // this.$cookies.set('mobile', resData.data.mobile);
                console.log('user_name', resData.data.user_name)
                console.log('user_name', resData.data.mobile)
                return resData.data;
            }
        },
        (err) => {
            return err;
        }
    )
    return result
}