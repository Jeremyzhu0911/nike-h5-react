import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";


const ActivitiesDetails = (props) => {

    const [loading, setLoading] = useState(true);

    const [showHide, setShowHide] = useState(false)

    const [dataList, setDataList] = useState({
        event_url: "",   //  img
        event_type: "",  //  type
        event_title: "", //  title
        event_start_time: "",    //  time
        event_booking_count: "",
        event_end_time: "",
        event_content: "",   //  介绍
        event_address: "",   //  地址
        event_allow_count: "",   //  人数限制
        longitude: "",   //坐标
        latitude: "",
        is_start_booking: "",   // 已经到了报名开始时间
        is_avail_booking: "", // 是否已经报名  true 未报名 false 已报名
        is_end_booking: '', // 报名结束
        is_booking: "", // 活动是否需要报名
        booking_id:"",  //  已报名 id   0
    })
    // let isStatus;

    useEffect(() => {
        if (loading) {
            axios.get("/event/default/view-info?store_event_id=" + getUrlData('store_event_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        console.log(resData)

                        setDataList({
                            ...dataList,
                            ...resData.data,
                        })
                        setLoading(false)
                    }
                    if (Number(resData.code) === 206) {
                        props.history.push('/Off?type=activities');
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
        <div className={getUrlData("jordan") ? "ActivitiesDetails jordan" : "ActivitiesDetails"}>
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
                {
                    dataList.is_booking ?
                        <div className={'txt'}>
                            <p>活动时间</p>
                            <p>
                                {
                                    dataList.event_end_time ?
                                        dataList.event_start_time + " 至 " + dataList.event_end_time : dataList.event_start_time}
                                <br/>
                            </p>
                        </div> : null
                }

                <div className={'txt'}>
                    <p>门店地址</p>
                    <p>{dataList.event_address} </p>
                    <span className={'iconfont icon-dingwei'}/>
                </div>
                {
                    dataList.is_booking ?
                        <div className={'txt'}>
                            <p>报名开始时间</p>
                            <p>{dataList.event_start_time}</p>
                        </div> : null
                }
                {
                    dataList.is_booking ?
                        <div className={'txt'}>
                            <p>报名截止时间</p>
                            <p>{dataList.event_end_time}</p>
                        </div> : null
                }
                {
                    dataList.is_booking ?
                        <div className={'txt'}>
                            <p>报名人数限制</p>
                            <p>{dataList.event_allow_count === 0 ? "不限制人数" : dataList.event_allow_count}</p>
                        </div> : null
                }
            </div>
            {
                dataList.is_booking ?
                    <div className={'order'}>
                        <div className="btn" onClick={() => {
                            setShowHide(true)
                        }}>
                            {
                                dataList.is_end_booking ? "报名已结束" :
                                    !dataList.is_avail_booking ? "已报名" :
                                        dataList.is_start_booking ? "报名中" : "报名未开始"

                            }
                        </div>
                    </div> : null
            }
            {
                showHide ?
                    <div className={'FollowPop'}>
                        <div className={'box'}>
                            <p className="txt">&nbsp;</p>
                            <p className="txt">
                                {
                                    dataList.is_end_booking ? "十分遗憾活动预约时间已过。您可以尝试了解其他活动，进行预约！" :
                                        !dataList.is_start_booking ? "还未到活动预约时间，请在可报名时间内再次尝试！" :
                                            Number(dataList.event_allow_count) <= Number(dataList.event_booking_count) ? "此活动预约人数已满，无法报名。您可以尝试了解其他活动，进行预约！" :
                                                !dataList.is_avail_booking ? props.history.push("/appointment/details" + props.location.search +"&type=event&booking_id=" + dataList.booking_id) :
                                                    props.history.push("/appointment-activities" + props.location.search)

                                }
                            </p>
                            <button className="close" onClick={() => {
                                setShowHide(false)
                            }}>确定
                            </button>
                        </div>
                        <div className={'desk'} onClick={() => {
                            setShowHide(false)
                        }}/>
                    </div> : null
            }

        </div>
    )
}

export default ActivitiesDetails;
