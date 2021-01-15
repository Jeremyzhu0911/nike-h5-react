import axios from "axios";
import LocalStore from '../util/localStore';
import {getUrlData} from "../util/getUrlData";

const Api = {
    AmbassadorContent: (props) => {
        // console.log(props)
        if(getUrlData('store_id')){
            const url = '/ambassador/site/get-ambassador-list?store_id=' + getUrlData('store_id')
            axios.get(url).then(
                (res) => {
                    let resData = res.data;
                    if(Number(resData.code) === 200){
                        // console.log(resData.data);
                        return resData.data;
                    }
                }, (error) => {
                    console.log(error)
                    return 500
                }
            )
        }else{
            return 404
        }
    },
    CommodityIndexData: () => {
        if(getUrlData('store_id')){
            const url = '/ambassador/site/get-ambassador-list?store_id=' + getUrlData('store_id')
            axios.get(url).then(
                (res) => {
                    let resData = res.data;
                    if(Number(resData.code) === 200){
                        console.log(resData.data);
                        return resData.data;
                    }
                }, (error) => {
                    console.log(error)
                    return 500
                }
            )
        }else{
            return 404
        }
    },
    CommodityListData: () => {

    },
    CommodityDetailsData: () => {

    },
}
export default Api;