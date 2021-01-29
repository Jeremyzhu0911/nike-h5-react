import axios from "axios";
import cookie from "react-cookies";
import {getUrlData} from "./getUrlData";

const addTag = (relation_id) => {
    if (Number(relation_id) !== 0)
        axios({
            url: "/tag/add-tag",
            method: "post",
            data: {
                fans_id: cookie.load("fans_id"),
                store_id: getUrlData("store_id"),
                relation_id: relation_id
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