import React, {useState, useEffect} from "react";

import img from "../../assets/images/sp.jpg";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import cookie from "react-cookies";

const ActivitiesContent = (props) => {

    const [loading, setLoading] = useState(true);

    const [dataList, setDataList] = useState({
        data: [
            {
                store_event_id: '',  //  page up
                event_type: '',  //  type
                event_title: '', //  title
                event_time: '',  //  time
                event_img_url: '',   //  img
            }
        ],    //  列表
        prod_list: []    //  推荐
    })

    useEffect(() => {
        if (loading) {
            axios.get("/event/default/get-list?store_id=" + getUrlData('store_id') + "&type=" + getUrlData('type')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        console.log(resData.data)
                        cookie.save('store_name', resData.data.store_info.store_name)
                        setDataList(resData.data)
                        setLoading(false)
                    }
                },
                (error) => {
                    console.log(error)
                    props.history.push("/500")
                }
            )
        }
    }, [loading])

    if (loading) {
        return (<div>正在加载中</div>)
    }

    return (
        <div className="ActivitiesContent">
            <h2>{cookie.load("store_name")}</h2>
            {
                dataList.data.map((item, index) => {
                    return <div className={'content'} key={index}>
                        <h1>{item.event_title}</h1>
                        <p>{item.event_time} {item.event_type}</p>
                        <div className={'big_img'}>
                            <img alt={''} src={item.event_img_url}/>
                        </div>
                        <div className={'btn'} onClick={() => {
                            props.history.push("/details-activities?store_id=" + getUrlData('store_id') + "&store_event=" + item.store_event_id)
                        }}>
                            <span>活动详情</span>
                        </div>
                        {
                            index === 0 ?
                                <div className={'page_top iconfont icon-xiangxia'}/> : null
                        }

                    </div>
                })
            }
        </div>
    )
}

export default ActivitiesContent;
