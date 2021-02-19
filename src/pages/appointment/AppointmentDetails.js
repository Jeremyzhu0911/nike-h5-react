import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import QrPop from "../../components/QrPop";

const AppointmentDetails = (props) => {

    const [loading, setLoading] = useState(true);

    const [showCancel, setShowCancel] = useState(false)
    const [cancelBooking, setCancelBooking] = useState(false)

    const [appointmentDetailsData, setAppointmentDetailsData] = useState({
        // 共有
        book_type: '',   //  0 试穿 1 预留
        status: '',  //  状态

        // 部分共有状态
        mobile: '', //  预留信息手机
        booking_name: '',   //  预留信息名字

        //  专家
        ambassador_headimgurl: '',   //  专家照片
        booking_time: '',    //  时间
        ambassador_info: '',    //  名称

        // 活动
        event_url: '',   //  活动图片
        event_title: '', //  名称
        event_start_date: '',   //  开始
        event_end_date: '', //  结束
        booking_mobile: '', //  预留信息手机
        event_address: '',   //  活动地址

        // 产品
        product_img: '', //  产品图片
        book_day: '',    //  时间
        product_name: '',   //  名称
        prize: '',  //  价钱
        size: '',   //  大小
        store_name: '', //  地址
        user_name: '',  //  预留信息名字
    })

    const [showHide, setShowHide] = useState(false)
    useEffect(() => {
        console.log('超时', showHide)
    }, [showHide])
    const updateShowHide = (state) => {
        setShowHide(state)
    }

    useEffect(() => {
        if (cancelBooking) {
            let getUrl;
            let typeTxt;
            switch (getUrlData('type')) {
                case 'luckydraw':   //  抽签
                    getUrl = '/luckydraw/default/cancel-booking?id=';
                    break;
                case 'ambassador':  //  专属顾问
                    getUrl = '/ambassador/site/cancel-booking?id=';
                    typeTxt = "我的专属顾问预约";
                    break;
                case 'event':   //  活动
                    getUrl = '/event/default/cancel-booking?id=';
                    typeTxt = "我的活动预约";
                    break;
                default:    //  预约试穿    预留产品
                    getUrl = '/product/default/cancel-booking?booking_id=';
                    typeTxt = getUrlData('type') === "product_try" ? "我的预约试穿" : "我的预留产品";
            }
            axios.get(getUrl + getUrlData('booking_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        alert(typeTxt + "已取消")
                        setLoading(true)
                        setShowCancel(false)
                        setCancelBooking(false)
                    }
                },
                (err) => {
                    console.log(err)
                    props.history.push('/500');
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cancelBooking])

    useEffect(() => {
        if (loading) {
            let getUrl;
            switch (getUrlData('type')) {
                case 'luckydraw':   //  抽签
                    getUrl = '/luckydraw/default/view-booking?booking_id=';
                    break;
                case 'ambassador':  //  专属顾问
                    getUrl = '/ambassador/site/view-booking?id=';
                    break;
                case 'event':   //  活动
                    getUrl = '/event/default/view-booking?id=';
                    break;
                default:    //  预约试穿    预留产品
                    getUrl = '/product/default/view-booking?booking_id=';
            }

            axios.get(getUrl + getUrlData('booking_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        if (getUrlData('type') === "ambassador" || getUrlData('type') === "event")
                            setAppointmentDetailsData(
                                resData.data
                            )
                        else {
                            setAppointmentDetailsData(
                                resData.data.data
                            )
                        }
                        setLoading(false)
                    }
                },
                (error) => {
                    console.log(error)
                }
            )

        }
    }, [loading])

    if (loading)
        return (<div>loading</div>)

    return (
        <div className={parseInt(getUrlData("jordan")) === 1 ? "AppointmentDetails jordan" : "AppointmentDetails"}>
            <div className={'headers'}>
                <div className="store-name">
                    {cookie.load('store_name')}
                </div>
            </div>
            <h3>
                {
                    getUrlData('type') === 'ambassador' ?
                        '专属顾问预约' :
                        getUrlData('type') === 'event' ?
                            '活动预约' :
                            getUrlData('type') === 'product_try' ?
                                '预约试穿' :
                                getUrlData('type') === 'product_buy' ?
                                    '预留产品' : null
                }
                <span>
                    {
                        appointmentDetailsData.status === -2 ?
                            "已结束" : appointmentDetailsData.status === -1 ?
                            "已拒绝" : appointmentDetailsData.status === 0 ?
                                "待处理" : appointmentDetailsData.status === 1 ?
                                    "已接受" : appointmentDetailsData.status === 2 ?
                                        "已结束" : appointmentDetailsData.status === 3 ?
                                            "已结束" : appointmentDetailsData.status === 4 ?
                                                "已接受" : null
                    }
                </span>
                {
                    console.log(appointmentDetailsData)
                }
            </h3>
            {
                getUrlData('type') === 'ambassador' || getUrlData('type') === 'event' ?
                    <div className={getUrlData('type') === 'ambassador' ? 'userinfo ambassador' : 'userinfo'}>
                        <div className={'userimg'}>
                            <img alt={''} src={
                                getUrlData('type') === 'ambassador' ?
                                    appointmentDetailsData.ambassador_headimgurl : appointmentDetailsData.event_url
                            }/>
                        </div>
                        <div className={'username'}>
                            <p>
                                {getUrlData('type') === 'ambassador' ? '专属顾问' : '门店活动'}<br/>
                                <span>
                                    {
                                        getUrlData('type') === 'ambassador' ?
                                            appointmentDetailsData.ambassador_info : appointmentDetailsData.event_title

                                    }
                                </span>
                            </p>
                        </div>
                    </div>
                    :
                    <div className={'appointment_content'}>
                        <div className={'appointment_img'}>
                            <img alt={''} src={appointmentDetailsData.product_img}/>
                        </div>
                        <div className={'appointment_info'}>
                            <p>
                                {appointmentDetailsData.product_name}<br/>
                            </p>
                            <p className={'appointment_spit'}>
                                <span>建议零售价&nbsp;&nbsp;&nbsp;¥ {appointmentDetailsData.prize}</span><br/>
                                <span className={'ccc'}>{appointmentDetailsData.size}码</span>
                            </p>
                        </div>
                    </div>
            }

            <div className={'txt'}>
                <p>{getUrlData('type') === 'event' ? '活动时间' : '预约时间'}</p>
                <p>
                    {
                        getUrlData('type') === 'ambassador' ?
                            appointmentDetailsData.booking_time :
                            getUrlData('type') === 'event' ?
                                appointmentDetailsData.event_start_date + ' - ' + appointmentDetailsData.event_end_date : appointmentDetailsData.book_day
                    }
                </p>
            </div>
            <div className={'txt'} onClick={() => {
                props.history.push('/map?lng=' + appointmentDetailsData.store_longitude + '&lat=' + appointmentDetailsData.store_latitude);
            }}>
                <p>{getUrlData('type') === 'event' ? '活动地址' : '门店地址'}</p>
                <p>
                    {
                        getUrlData('type') === 'ambassador' ?
                            appointmentDetailsData.store_address :
                            getUrlData('type') === 'event' ?
                                appointmentDetailsData.event_address : appointmentDetailsData.store_name
                    }
                </p>
                <span className={'iconfont icon-dingwei'}/>
            </div>
            <div className={'txt'}>
                <p>预留信息</p>
                <p>
                    {
                        getUrlData('type') === 'ambassador' ?
                            appointmentDetailsData.booking_name + " " + appointmentDetailsData.mobile :
                            getUrlData('type') === 'event' ?
                                appointmentDetailsData.booking_name + " " + appointmentDetailsData.booking_mobile : appointmentDetailsData.user_name + " " + appointmentDetailsData.mobile
                    }
                </p>
            </div>
            <div className={'order'}>
                {
                    appointmentDetailsData.status === 1 || appointmentDetailsData.status === 4 ?
                        <div className="btn" onClick={() => {
                            setShowHide(true)
                        }
                        }>
                            展示二维码
                        </div> : null
                }
                {
                    appointmentDetailsData.status === 0 || appointmentDetailsData.status === 1 || appointmentDetailsData.status === 4 ?
                        <div className="btn2" onClick={() => {
                            setShowCancel(!showCancel)
                        }}>
                            取消预约
                        </div> : null
                }
            </div>
            {
                showHide ? <QrPop {...props} updateShowHide={updateShowHide}
                                  data={appointmentDetailsData}/> : null
            }
            {
                showCancel ?
                    <div className={'confirm_again'}>
                        <h4>是否继续本次操作</h4>
                        <p>取消后不可撤回，如需恢复预约，请重新提交预约申请，是否继续本次操作</p>
                        <div className={'btn_box'}>
                            <span onClick={() => {
                                setCancelBooking(showCancel)
                            }}>继续</span>
                            <span onClick={() => {
                                setShowCancel(!showCancel)
                            }}>我再想想</span>
                        </div>
                    </div> : null
            }
        </div>
    )

}

export default AppointmentDetails;
