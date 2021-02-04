import cookie from "react-cookies";
import {getUrlData} from "./getUrlData";
import axios from 'axios';

const addTag = (relation_id) => {
    if (Number(relation_id) !== 0)
        axios({
            url: process.env.NODE_ENV === 'development' ? "/tag/add-tag" : process.env.REACT_APP_PROXY_TAG_SK + "/tag/add-tag",
            method: "post",
            data: {
                fans_id: cookie.load("fans_id"),
                store_id: getUrlData("store_id"),
                relation_id: relation_id,
                province:'',
                city:''
            },
            transformRequest: [
                function (data) {
                    let ret = "";
                    for (let it in data) {
                        ret +=
                            encodeURIComponent(it) +
                            "=" +
                            encodeURIComponent(data[it]) +
                            "&";
                    }
                    return ret;
                },
            ],
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then(
            (res) => {
                console.log(res)
            },
            (error) => {
                console.log(error)
            }
        )
    console.log(relation_id)
}

export default addTag