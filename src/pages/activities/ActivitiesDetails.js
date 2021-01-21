import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";


const ActivitiesDetails = (props) => {

    const [loading, setLoading] = useState(true);

    const [dataList, setDataList] = useState({
        event_url: "",   //  img
        event_type: "",  //  type
        event_title: "", //  title
        event_start_time: "",    //  time
        event_end_time: "",
        event_content: "",   //  介绍
        event_address: "",   //  地址
        event_allow_count: "",   //  人数限制
        longitude: "",   //坐标
        latitude: "",
        is_avail_booking:"",
    })
    // let isStatus;

    useEffect(() => {
        if (loading) {
            axios.get("/event/default/view-info?store_event_id=" + getUrlData('store_event_id') + "&type=" + getUrlData('type')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        console.log(resData)

                        setDataList({
                            ...resData.data
                        })
                        setLoading(false)
                    }
                },
                (error) => {
                    console.log(error)
                    props.history.push("/500")
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    if (loading) {
        return (<div>正在加载中</div>)
    }

    return (
        <div className="ActivitiesDetails">
            <h2>{cookie.load('store_name')}</h2>
            <div className={'content'}>
                <div className={'big_img'}>
                    <img alt={''} src={dataList.event_url}/>
                </div>
                <p>{dataList.event_type}</p>
                <h1>{dataList.event_title}</h1>
                <p className={'time'}>门店活动时间：{
                    dataList.event_end_time ?
                        dataList.event_start_time + " 至 " + dataList.event_end_time : dataList.event_start_time}</p>
            </div>
            <div className={'const'}>
                <h3>活动介绍</h3>
                <div className={'details_content'} dangerouslySetInnerHTML={{__html: dataList.event_content}}/>
                <div className={'tips'}>
                    活动时间：{
                    dataList.event_end_time ?
                        dataList.event_start_time + " 至 " + dataList.event_end_time : dataList.event_start_time} <br/>
                    活动地点：{dataList.event_address} <br/>
                    还不爱来报名
                </div>
                <h3>活动信息</h3>
                <div className={'txt'}>
                    <p>活动时间</p>
                    <p>
                        {
                            dataList.event_end_time ?
                                dataList.event_start_time + " 至 " + dataList.event_end_time : dataList.event_start_time}
                        <br/>
                    </p>
                </div>
                <div className={'txt'}>
                    <p>门店地址</p>
                    <p>{dataList.event_address} </p>
                    <span className={'iconfont icon-dingwei'}/>
                </div>
                <div className={'txt'}>
                    <p>报名开始时间</p>
                    <p>{dataList.event_start_time}</p>
                </div>
                <div className={'txt'}>
                    <p>报名截止时间</p>
                    <p>{dataList.event_end_time}</p>
                </div>
                <div className={'txt'}>
                    <p>报名人数限制</p>
                    <p>{dataList.event_allow_count}</p>
                </div>
            </div>
            <div className={'order'}>
                <div className="btn" onClick={() => {
                    props.history.push("/appointment"+ props.location.search)
                }}>
                    预约活动
                </div>
            </div>
        </div>
    )
}

export default ActivitiesDetails;
