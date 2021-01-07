import instance from '../server';
import { getUrlData } from "./common";

const getOnFansData = (storeId) => {
    let url = window.location.href;
    //store_id  门店
    instance.get('/fans/index?store_id='+storeId).then(
        (res) =>{
            let resData = res.data;
            if (Number(resData.code) !== 200) {
                console.log(getUrlData('store_id', window.location.search));
                window.location.href = '/auth/oauth/?redirect_uri=' + encodeURIComponent(url) + '&store_id=' + parseInt(getUrlData('store_id', window.location.search));
            }
            if (Number(resData.code) === 200) {
                // this.onLoadData();
                // this.$cookies.set('user_name', resData.data.user_name);
                // this.$cookies.set('mobile', resData.data.mobile);
                // this.openId = resData.data.openid;
                // console.log('user_name', resData.body.user_name)
                // console.log('user_name', resData.body.mobile)
                return resData.data;
            }
        },
        (err) => {
            return err;
        }
    )

}
export default getOnFansData;