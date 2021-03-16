import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";
import {getUrlData, convertToChinese} from "../../util/getUrlData";

import GetCode from "../../components/GetCode";
import Priacy from "../../components/Privacy"
import DataTracking from "../../util/DataStatistics";

const AmbassadorAppointment = (props) => {

    const [loading, setLoading] = useState(true);

    const [iconfont, setIconfont] = useState(false)

    const [AmbassadorAppointmentData, setAmbassadorAppointmentData] = useState([
        {
            date_day: '',    //  预约时间
            week: '',    //  星期
            time_list: [{
                work_time: '',   //  时间
                is_avail: true,  //  选择的状态
                work_time_number: '', //  上午下午区分 > 6 <
                date_day: '',   //  访问时间
            }],
            time_list1: [], //  上午
            time_list2: [], //  下午
            idx: ''  //  下标
        }
    ])

    const [stateDate, setStateDate] = useState({
        postUrl: '',
        postData: '',
        bookingType: ''
    })

    const [tabHide, setTabHide] = useState(true)
    const [tabHide2, setTabHide2] = useState(true)

    const [codeTime, setCodeTime] = useState({
        timeout: false,
        postData: {
            mobile: cookie.load('mobile'),
            store_id: getUrlData('store_id'),
        },
        codeUrl: '/api/v1/ambassador/info/send-code'
    })
    useEffect(() => {
        setCodeTime(codeTime)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeTime])
    const updateCodeTime = (state) => {
        setCodeTime(state)
    }

    const [priacyShow, setPriacyShow] = useState(false)

    useEffect(() => {
        if (loading) {
            if (getUrlData('ambassador_id')) {
                const url = '/ambassador/site/view-time-list?id=' + getUrlData('ambassador_id');
                axios.get(url).then(
                    (res) => {
                        console.log(cookie.load("ambassadorName"))
                        let resData = res.data;
                        if (Number(resData.code) === 200) {
                            resData.data.map((item, index) => {
                                item.time_list1 = [];
                                item.time_list2 = [];
                                item.time_list.forEach((items) => {
                                    if (items.work_time_number < 6)
                                        resData.data[index].time_list1.push(items)
                                    else
                                        resData.data[index].time_list2.push(items)
                                })
                            })

                            setAmbassadorAppointmentData(resData.data)

                            if (getUrlData('is_ambassador')) {
                                setStateDate({
                                    ...stateDate,
                                    postData: {
                                        name: cookie.load('user_name'), //  名字
                                        mobile: cookie.load('mobile'),  //  手机号
                                        date_day: resData.data[0].date_day,
                                        work_time_id: '',
                                        work_time: '',
                                        am_id: Number(getUrlData('ambassador_id')), // 顾问id
                                        code: '',   //  验证码
                                        gender: 1,  //  性别
                                    },
                                    idx: resData.data[0].idx,
                                    postUrl: '/ambassador/site/booking',
                                    bookingType: 4
                                })
                            } else {
                                setStateDate({
                                    ...stateDate,
                                    postData: {
                                        store_event_id: Number(getUrlData('event_id')), // 活动ID
                                        user_name: '',
                                        mobile: '',
                                        gender: '',
                                        code: '',
                                        store_id: Number(getUrlData('store_id')),
                                    },
                                    postUrl: '/event/default/booking',
                                    bookingType: 3
                                })
                            }

                            setLoading(false)
                        }
                        if (Number(resData.code) === 201) {
                            alert("没有可用时间，5秒后自动返回顾问首页")
                            let timeout = setTimeout(() => {
                                if (cookie.load('jordan')) {
                                    props.history.push("/content-ambassador?store_id=" + getUrlData("store_id") + "&jordan=1");
                                } else {
                                    props.history.push("/content-ambassador?store_id=" + getUrlData("store_id"));
                                }

                                clearTimeout(timeout)
                            }, 5000)
                        }
                    }, (error) => {
                        console.log(error)
                        return props.history.push("/500")
                    }
                )
            } else {
                return props.history.push("/404")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    if (loading)
        return (<div>loading</div>)

    return (
        <div
            className={parseInt(cookie.load('jordan')) === 1 ? "AmbassadorAppointment jordan" : "AmbassadorAppointment"}>
            {
                Number(getUrlData('is_ambassador')) === 1 &&
                <div className={'Ambassador'}>
                    <div className={'headers'}>
                        <div className="name">
                            填写预约信息
                            <span onClick={() => {
                                props.history.goBack()
                            }}>返回</span>
                        </div>
                    </div>
                    <div className={'appointment_time'}>
                        <h4>选择预约时间</h4>
                        <ul>
                            {
                                AmbassadorAppointmentData.map((item, index) => {
                                    return <li key={index} onClick={() => {
                                        setStateDate({
                                            ...stateDate,
                                            postData: {
                                                ...stateDate.postData,
                                                date_day: item.date_day,
                                            },
                                            idx: item.idx
                                        })
                                    }}>
                                        <p>周{convertToChinese(item.week)}</p>
                                        <p>{item.date_day}</p>
                                    </li>
                                })
                            }
                        </ul>
                        <ul className={'hr'}>
                            {
                                AmbassadorAppointmentData.map((item, index) => {
                                    return <li key={index}
                                               className={stateDate.postData.date_day === item.date_day ? 'on' : ''}/>
                                })
                            }
                        </ul>
                    </div>
                    {
                        AmbassadorAppointmentData[stateDate.idx].time_list1.length > 0 &&
                        <div className={tabHide ? 'time_list' : 'time_list on'}>
                            <h4>上午
                                <span className={tabHide ? 'iconfont icon-shrink' : 'iconfont icon-spreadOut'}
                                      onClick={() => {
                                          setTabHide(!tabHide)
                                      }}/>
                            </h4>
                            <ul>
                                {
                                    AmbassadorAppointmentData[stateDate.idx].time_list1.map((item, index) => {
                                        return <li key={index}>
                                            <p className={
                                                stateDate.postData.work_time_id === item.work_time_id ? 'ons' : ''
                                            } onClick={() => {
                                                setStateDate({
                                                    ...stateDate,
                                                    postData: {
                                                        ...stateDate.postData,
                                                        work_time_id: item.work_time_id,
                                                        work_time: item.work_time,
                                                    }
                                                })
                                            }}>{item.work_time}</p>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    }
                    {
                        AmbassadorAppointmentData[stateDate.idx].time_list2.length > 0 &&
                        <div className={tabHide2 ? 'time_list' : 'time_list on'}>
                            <h4>下午
                                <span className={tabHide2 ? 'iconfont icon-shrink' : 'iconfont icon-spreadOut'}
                                      onClick={() => {
                                          setTabHide2(!tabHide2)
                                      }}/>
                            </h4>
                            <ul>
                                {
                                    AmbassadorAppointmentData[stateDate.idx].time_list2.map((item, index) => {
                                        return <li key={index}>
                                            <p className={
                                                stateDate.postData.work_time_id === item.work_time_id ? 'ons' : ''
                                            } onClick={() => {
                                                setStateDate({
                                                    ...stateDate,
                                                    postData: {
                                                        ...stateDate.postData,
                                                        work_time_id: item.work_time_id,
                                                        work_time: item.work_time,
                                                    }
                                                })
                                            }}>{item.work_time}</p>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    }
                </div>
            }

            <div className={'headers'}>
                <div className="name">
                    填写个人信息
                    {
                        Number(getUrlData('is_ambassador')) === 1 ?
                            '' :
                            <span>返回</span>
                    }
                </div>
            </div>
            <div className={'addInfo'}>
                <ul>
                    <li>
                        <input type={'text'} placeholder="您的姓名" maxLength={'8'} value={stateDate.postData.name}
                               onChange={(event) => {
                                   setStateDate({
                                       ...stateDate,
                                       postData: {
                                           ...stateDate.postData,
                                           name: event.target.value, //  名字
                                       }
                                   })
                               }}/>
                    </li>
                    <li className={'mobile'}>
                        <input type={'tel'} placeholder="手机号" maxLength={'11'} value={stateDate.postData.mobile}
                               onChange={(event) => {
                                   setStateDate({
                                       ...stateDate,
                                       postData: {
                                           ...stateDate.postData,
                                           mobile: event.target.value,  //  手机号
                                       }
                                   })
                                   setCodeTime({
                                       ...codeTime,
                                       postData: {
                                           ...codeTime.postData,
                                           mobile: event.target.value
                                       }
                                   })
                               }}/>
                        <GetCode {...props} updateCodeTime={updateCodeTime} data={codeTime}/>
                    </li>
                    <li>
                        <input type={'num'} placeholder="请输入验证码" maxLength={'6'} value={stateDate.postData.code}
                               onChange={(event) => {
                                   setStateDate({
                                       ...stateDate,
                                       postData: {
                                           ...stateDate.postData,
                                           code: event.target.value,   //  验证码
                                       }
                                   })
                               }}/>
                    </li>
                </ul>
            </div>
            <div className={'gender'}>
                <h4>称呼</h4>
                <ul>
                    <li className={stateDate.postData.gender === 1 ? 'on' : ''} onClick={() => {
                        setStateDate({
                            ...stateDate,
                            postData: {
                                ...stateDate.postData,
                                gender: 1,
                            }
                        })
                    }}><p>先生</p></li>
                    <li className={stateDate.postData.gender === 2 ? 'on' : ''} onClick={() => {
                        setStateDate({
                            ...stateDate,
                            postData: {
                                ...stateDate.postData,
                                gender: 2,
                            }
                        })
                    }}><p>女士</p></li>
                </ul>
            </div>
            <div className={'tips'}>
                <p>
                    <span onClick={() => {
                        setIconfont(!iconfont)
                    }} className={iconfont ? "iconfont icon-choiceOn" : "iconfont icon-choiceOff"}> 我已仔细阅读并同意</span>
                    《<i onClick={() => {
                    setPriacyShow(true)
                }}>隐私信息授权条款</i>》
                </p>
            </div>
            <div className={'texts'}>如您无法正常收到短信验证码，请点击微信菜单“个人服务-在线客服”留言进行询问</div>
            <div className={'order'}>
                <div className="btn" onClick={() => {
                    if (iconfont)
                        axios({
                            url: stateDate.postUrl,
                            method: "post",
                            data: stateDate.postData,
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
                                let resData = res.data;
                                if (Number(resData.code) === 200) {

                                    DataTracking.GAEvent("专属顾问预约 | " + cookie.load("ambassadorName"), "提交预约");
                                    DataTracking.BDEvent(`专属顾问｜${cookie.load("ambassadorName")}｜提交预约申请`,`提交预约`);

                                    // /success?booking_id=167&is_subscribe=0&status=0&type=4
                                    if (cookie.load('jordan')) {
                                        props.history.push(
                                            '/success?booking_id=' + resData.data.booking_id +
                                            "&is_subscribe=" + resData.data.is_subscribe +
                                            "&status=0&jordan=1&type=" + stateDate.bookingType
                                        )
                                    } else {
                                        props.history.push(
                                            '/success?booking_id=' + resData.data.booking_id +
                                            "&is_subscribe=" + resData.data.is_subscribe +
                                            "&status=0&type=" + stateDate.bookingType
                                        )
                                    }
                                } else {
                                    alert(res.data.message)
                                }
                            }
                        )
                    else
                        alert("请阅读并同意服务与保密协议")
                }}>
                    提交预约申请
                </div>
            </div>
            {
                priacyShow ? <div className={"FollowPop"}>
                    <Priacy/>
                    <div className={"desk"} onClick={()=>{
                        setPriacyShow(!priacyShow)
                    }}/>
                </div> : null
            }

        </div>
    )
}


export default AmbassadorAppointment;
