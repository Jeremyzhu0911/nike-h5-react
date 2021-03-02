import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import WeiXin from "../../server/wx.config";
import DataTracking from "../../util/DataStatistics";

const AppointmentAdviser = (props) => {
    // /adviser?store_id=57&booking_id=26
    const [loading, setLoading] = useState(true);

    const [isShow, setIsShow] = useState(true);
    const [ratingSuccess, setRatingSuccess] = useState(true)

    const [stars] = useState([
        1, 2, 3, 4, 5
    ])

    const [postData, setPostData] = useState({
        id: getUrlData("booking_id"),
        rating: 5,  //星级
        is_self: 1, // 0 1 服务
        tags: ''
    })

    const [stateData, setStateData] = useState({
        ambassador_headimgurl: "",
        ambassador_info: "",
        booking_name: "",
        booking_time: "",
        checkin_qrcode: "",
        checkin_status: "",
        is_rating: "",
        is_self: "",
        mobile: "",
        qrcode: "",
        rating: "",
        status: "",
        store_address: "",
        store_id: "",
        store_info: {store_name: "", shop_unique_id: "", share_img: ""},
        store_latitude: "",
        store_longitude: "",
    });

    useEffect(() => {
        if (loading) {
            axios.get("/ambassador/site/view-booking?id=" + getUrlData("booking_id")).then(
                (res) => {
                    let restData = res.data;
                    if (Number(restData.code) === 200) {
                        cookie.save("store_name", restData.data.store_info.store_name)
                        setPostData({
                            ...postData,
                            tags: restData.data.tags
                        })
                        setStateData({
                            ...stateData,
                            ...restData.data
                        })

                        DataTracking.GAPage(' | 顾问评价 | ' + restData.data.ambassador_info);

                        WeiXin.share("不可错过的Nike尖货，我正在看", window.location.protocol + '//' + window.location.host + '/nike-h5-vue/dist/#/commodity/limitlist' + props.location.search, window.location.protocol + '//' + window.location.host + '/nike-h5-vue/nike.png', "点击获取Nike最新资讯")

                        setLoading(false)

                    } else {
                        props.history.push("/404")
                    }
                },
                (error) => {
                    console.log(error)
                    props.history.push("/500")
                }
            )
        }
    }, [loading])

    if (loading)
        return (<div>loading</div>)

    return (
        <div className={parseInt(getUrlData("jordan")) === 1 ? "AppointmentAdviser jordan" : "AppointmentAdviser"}>
            <div className={'headers'}>
                <div className="store-name">
                    {cookie.load('store_name')}
                </div>
            </div>
            <h3>
                专属顾问预约
                <span>已结束</span>
            </h3>
            <div className={'appointment_content'}>
                <div className={'appointment_img'}>
                    <img alt={''} src={stateData.ambassador_headimgurl}/>
                </div>
                <div className={'appointment_info'}>
                    <p>
                        <span>专属顾问</span><br/>
                        {stateData.ambassador_info}
                    </p>
                </div>
            </div>
            <div className={'txt'}>
                <p>预约时间</p>
                <p>{stateData.booking_time}</p>
            </div>
            {
                ratingSuccess ?
                    isShow ?
                        <div className={'txt'} onClick={() => {
                            props.history.push('/map?lng=' + stateData.store_longitude + '&lat=' + stateData.store_latitude);
                        }}>
                            <p>门店地址</p>
                            <p>{stateData.store_address}</p>
                            <span className={'iconfont icon-dingwei'}/>
                        </div> :
                        <div className={"evaluate"}>
                            <h4>特点评价</h4>
                            <h4>星级评价</h4>
                            <p className={"stars"}>
                                {
                                    stars.map((item, index) => {
                                        return <span key={index} onClick={() => {
                                            setPostData({
                                                ...postData,
                                                rating: index + 1
                                            })
                                        }}
                                                     className={item <= postData.rating ? "iconfont icon-starsOn" : "iconfont icon-starsOff"}/>
                                    })
                                }
                                <span>{postData.rating}分</span>
                            </p>
                            <h4>服务情况</h4>
                            <div className={"serves"}>
                                是否顾问本人服务
                                <div className={'isNo'}><span onClick={() => {
                                    setPostData({
                                        ...postData,
                                        is_self: 0
                                    })
                                }} className={postData.is_self === 0 ? 'on' : null}>否</span><span onClick={() => {
                                    setPostData({
                                        ...postData,
                                        is_self: 1
                                    })
                                }} className={postData.is_self === 1 ? 'on' : null}>是</span></div>
                            </div>
                        </div> :
                    <div className={"page-info"}>
                        <p className={"iconfont icon-choiceOn"}></p>
                        顾问评价成功
                    </div>

            }
            {
                ratingSuccess ?
                    isShow ?

                        <div className={'order'} onClick={() => {
                            setIsShow(false)
                        }}>
                            <div className={'btn'}>评价服务</div>
                        </div> :
                        <div className={'order'} onClick={() => {
                            axios.post("/ambassador/site/rating", postData).then(
                                (res) => {
                                    let restData = res.data;
                                    if (Number(restData.code) === 200) {
                                        DataTracking.GAEvent('顾问评价 | ' + stateData.ambassador_info, '提交评价')
                                        setRatingSuccess(false)
                                    }else{
                                        alert('操作失败，请稍后重试');
                                    }
                                },
                                (error) => {
                                    console.log(error)
                                    props.history.push("/500")
                                }
                            )
                        }}>
                            <div className={'btn'}>提交</div>
                        </div> : null
            }
        </div>
    )
}

export default AppointmentAdviser;
