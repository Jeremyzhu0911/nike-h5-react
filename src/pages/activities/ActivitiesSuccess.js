import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import {getUrlData} from "../../util/getUrlData";
import axios from "axios";
import FollowPop from "../../components/FollowPop";
import DataTracking from "../../util/DataStatistics";

const ActivitiesSuccess = (props) => {

    const [loading, setLoading] = useState(true);

    const [stateData, setStateData] = useState({
        event_url: "",
        event_title: "",
        event_owner_type:"",
        event_start_date: "",
        event_end_date: "",
        longitude: "",
        latitude: "",
        event_address: "",
        booking_name: "",
        booking_mobile: "",
        qrcode: "",
    })

    const [showHide, setShowHide] = useState(false)
    useEffect(() => {
        console.log('超时', showHide)
    }, [showHide])
    const updateShowHide = (state) => {
        setShowHide(state)
    }

    useEffect(() => {
        if (loading) {
            axios.get("/event/default/view-booking?id=" + getUrlData('booking_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        console.log(resData)
                        setStateData({
                            ...resData.data
                        })
                    }
                }
            )
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    if (loading)
        return (<div>loading</div>)

    return (
        <div className={parseInt(cookie.load('jordan')) === 1 ? "AmbassadorSuccess jordan" : "AmbassadorSuccess"}>
            <div className={'headers'}>
                <div className="name">
                    {cookie.load('store_name')}
                </div>
            </div>
            <h3>
                活动预约成功
            </h3>
            <div className={'userinfo'}>
                <div className={'activitiesimg'}>
                    <img alt={''} src={stateData.event_url}/>
                </div>
                <div className={'username'}>
                    <p>
                        {stateData.event_owner_type}<br/>
                        {stateData.event_title}
                    </p>
                </div>
            </div>
            <div className={'txt'}>
                <p>活动开始时间</p>
                <p>{stateData.event_start_date}</p>
            </div>
            <div className={'txt'}>
                <p>活动结束时间</p>
                <p>{stateData.event_end_date}</p>
            </div>
            <div className={'txt'} onClick={() => {
                props.history.push('/map?lng=' + stateData.longitude + '&lat=' + stateData.latitude);
            }}>
                <p>门店地址</p>
                <p>{stateData.event_address}</p>
                <span className={'iconfont icon-dingwei'}/>
            </div>
            <div className={'txt'}>
                <p>预留信息</p>
                <p>{stateData.booking_name + ' ' + stateData.booking_mobile}</p>
            </div>
            <div className={'order'}>
                <div className="btn" onClick={() => {
                    DataTracking.BDEvent(`门店活动｜${cookie.load("event_title")}｜预约成功`,`查看我的预约`);
                    if (Number(getUrlData('is_subscribe')) === 0) {   //  是否关注公众号
                        setShowHide(true)
                    } else {
                        if (cookie.load('jordan')) {
                            props.history.push('/appointment/index?jordan=1&store_id=' + stateData.store_id);
                        } else {
                            props.history.push("/appointment/index?store_id=" + stateData.store_id);
                        }
                    }
                }}>
                    查看我的预约
                </div>
                <div className="btn2" onClick={() => {
                    DataTracking.BDEvent(`门店活动｜${cookie.load("event_title")}｜预约成功`,`返回活动`);
                    if(cookie.load('jordan'))
                        props.history.push("/details-activities?store_id=" + getUrlData("store_id") +
                            "&store_event_id=" + getUrlData("store_event_id") + "&jordan=1")
                    else{
                        props.history.push("/details-activities?store_id=" + getUrlData("store_id") +
                            "&store_event_id=" + getUrlData("store_event_id"))
                    }
                }}>
                    返回活动
                </div>
            </div>
            {
                showHide ? <FollowPop {...props} updateShowHide={updateShowHide}
                                      data={stateData.qrcode}/> : null
            }

        </div>
    )

}

export default ActivitiesSuccess;
