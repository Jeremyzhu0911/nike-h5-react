import React, {useState, useEffect} from "react";
import cookie from 'react-cookies';
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import DateApi from "../../util/DateApi";
import GetCode from "../../components/GetCode";
import Priacy from "../../components/Privacy";
import DataTracking from "../../util/DataStatistics";

const CommodityAppointment = (props) => {

    const [loading, setLoading] = useState(true);

    const [isPageShow, setIsPageShow] = useState(true);

    const [iconfont, setIconfont] = useState(false)

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

    const [optDateTime] = useState({
        time: [
            DateApi.getDate(1, "yyyy-MM-dd"),
            DateApi.getDate(2, "yyyy-MM-dd"),
            DateApi.getDate(3, "yyyy-MM-dd")
        ],
        isTimeIdx: DateApi.getDate(2, "yyyy-MM-dd")
    })

    const [postData, setPostData] = useState({
        product_code: getUrlData("product_code"),
        user_name: cookie.load("user_name"),
        mobile: cookie.load("mobile"),
        gender: 1,
        store_id: getUrlData("store_id"),
        code: "",
        sku: "",    // default
        size: "",
        book_type: getUrlData("type"),
        color_index: "",
        book_day: DateApi.getDate(1, "yyyy-MM-dd"),
    })

    const [stateData, setStateData] = useState({
        product_color: [
            {
                size_list: [],
                product_store_id: '',
                sku: '',
                color_image: [
                    {
                        img: ''
                    }
                ]
            }
        ],
        product_name: '',
        status: '',
        product_description: '',
        product_code: '',
        gaBookingType: Number(getUrlData("type")) === 0 ? "预约试穿" : "预留产品",
        price: ''
    })

    useEffect(() => {
        if (loading) {
            let url = "/product/default/view-product?store_id=" + getUrlData("store_id") +
                "&product_code=" + getUrlData("product_code");
            const GetData = axios.get(url);
            GetData.then(
                (res) => {
                    let restDate = res.data;
                    if (Number(restDate.code) === 200) {
                        setPostData({
                            ...postData,
                            isLackStock: restDate.data.product_color[0].lack_stock,
                            sku: restDate.data.product_color[0].sku,
                            color_index: restDate.data.product_color[0].color_index
                        })
                        setStateData(restDate.data)
                        setLoading(false)
                    }
                },
                (error) => {
                    console.log(error)
                    props.history.push('/500');
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    if (loading)
        return <div>正在加载</div>

    return (
        <div className={parseInt(cookie.load('jordan')) === 1 ? "CommodityAppointment jordan" : "CommodityAppointment"}>
            {
                isPageShow ? <div className={'information'}>
                    <div className={"big_title"}>
                        填写预约信息
                        <span onClick={() => {
                            DataTracking.BDEvent(stateData.gaBookingType + ' | ' + getUrlData("product_code") + '填写预约信息','取消');
                            props.history.goBack()
                        }}>取消</span>
                    </div>
                    <div className={'content'}>
                        <h3>选择颜色</h3>
                        <p>已选：{postData.sku}</p>
                        <div className={'content_img'}>
                            {
                                stateData.product_color.map((item, index) => {
                                    if (item.color_image[0])
                                        return <img className={postData.sku === item.sku ? 'on':' '} key={index} onClick={() => {
                                            setPostData({
                                                ...postData,
                                                sku: item.sku
                                            })
                                            console.log("sku")
                                            console.log(item.sku)
                                        }} alt={''} src={item.color_image[0].img}/>
                                })
                            }
                        </div>
                    </div>
                    <div className={'footage'}>
                        <h3>选择尺码</h3>
                        <ul>
                            {
                                stateData.product_color[0].size_list.map((item, index) => {
                                    return <li className={item.size === postData.size ? "on" : null} key={index}
                                               onClick={() => {
                                                   setPostData({
                                                       ...postData,
                                                       size: item.size
                                                   })
                                               }}>{item.size}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className={'choice_time'}>
                        <h3>选择来店日期</h3>
                        <select className="opt-datetime" defaultValue={postData.book_day} onChange={(event) => {
                            setPostData({
                                ...postData,
                                book_day: event.target.value
                            })
                        }}>
                            {
                                optDateTime.time.map((item, index) => {
                                    return <option key={index} value={item}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className={'btn_box'}>
                        <div className={'btn'} onClick={() => {
                            if (postData.size) {
                                DataTracking.BDEvent(stateData.gaBookingType + ' | ' + getUrlData("product_code") + '填写预约信息','下一步');
                                DataTracking.GAEvent(stateData.gaBookingType + getUrlData("product_code"), "下一步：" + "sku：" + postData.sku + "，size：" + postData.size + "，日期：" + postData.book_day);
                                DataTracking.GAPage(stateData.gaBookingType + " | 个人信息")
                                setIsPageShow(!isPageShow)
                            } else {
                                alert("请选择尺码或日期")
                            }
                        }}>
                            下一步
                        </div>
                    </div>
                </div> : <div className={'infoForm'}>
                    <div className={"big_title"}>
                        完善个人信息
                        <span onClick={() => {
                            DataTracking.BDEvent(stateData.gaBookingType + ' | ' + getUrlData("product_code") + '提交预约申请','上一步');
                            setIsPageShow(!isPageShow)
                        }}>上一步</span>
                    </div>
                    <h6>如您无法正常收到短信验证码，请点击微信菜单“个人服务-在线客服”留言进行询问</h6>
                    <div className={'addInfo'}>
                        <ul>
                            <li>
                                <input type={'text'} onChange={(event) => {
                                    setPostData({
                                        ...postData,
                                        user_name: event.target.value
                                    })
                                }} placeholder="您的姓名" defaultValue={postData.user_name}/>
                            </li>
                            <li className={'mobile'}>
                                <input type={'tel'} onChange={(event) => {
                                    setPostData({
                                        ...postData,
                                        mobile: event.target.value
                                    })
                                }} placeholder="手机号" defaultValue={postData.mobile}/>
                                <GetCode {...props} updateCodeTime={updateCodeTime} data={codeTime}/>
                            </li>
                            <li>
                                <input type={'num'} maxLength={'6'} onChange={(event) => {
                                    setPostData({
                                        ...postData,
                                        code: event.target.value
                                    })
                                }} placeholder="请输入验证码"/>
                            </li>
                        </ul>
                    </div>
                    <div className={'gender'}>
                        <h4>称呼</h4>
                        <ul>
                            <li onClick={() => {
                                setPostData({
                                    ...postData,
                                    gender: 1
                                })
                            }} className={postData.gender === 1 ? 'on' : null}><p>先生</p></li>
                            <li onClick={() => {
                                setPostData({
                                    ...postData,
                                    gender: 2
                                })
                            }} className={postData.gender === 2 ? 'on' : null}><p>女士</p></li>
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
                    <div className={'order'}>
                        <div className="btn" onClick={() => {
                            if (postData.code) {
                                if (iconfont) {
                                    axios({
                                        url: "/product/default/booking",
                                        method: "post",
                                        data: postData,
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
                                                // /success?type=2&booking_id=177&status=0&is_subscribe=0

                                                DataTracking.GAEvent(stateData.gaBookingType + " | 个人信息", stateData.gaBookingType + getUrlData("product_code") + "提交");
                                                DataTracking.BDEvent(stateData.gaBookingType + ' | ' + getUrlData("product_code") + '提交预约申请','提交预约');
                                                let url;
                                                if (cookie.load('jordan')) {
                                                    url = "/commodity/success?type=" +
                                                        (Number(postData.book_type) + 1) +
                                                        "&booking_id=" +
                                                        resData.data.booking_id +
                                                        "&is_subscribe=" +
                                                        resData.data.is_subscribe +
                                                        "&status=0" +
                                                        "&jordan=1";
                                                } else {
                                                    url = "/commodity/success?type=" +
                                                        (Number(postData.book_type) + 1) +
                                                        "&booking_id=" +
                                                        resData.data.booking_id +
                                                        "&is_subscribe=" +
                                                        resData.data.is_subscribe +
                                                        "&status=0";
                                                }
                                                console.log(url)
                                                props.history.push(url)
                                            } else {
                                                alert(resData.message);
                                            }
                                        }
                                    )
                                } else {
                                    alert("请阅读并同意服务与保密协议")
                                }
                            } else {
                                alert("请输入验证码")
                            }

                        }}>
                            提交预约申请
                        </div>
                    </div>
                    <div className={'texts'}>预约信息提交后将无法更改，请确认信息内容后进行提交。</div>
                </div>
            }
            {
                priacyShow ? <div className={"FollowPop"}>
                    <Priacy/>
                    <div className={"desk"} onClick={() => {
                        setPriacyShow(!priacyShow)
                    }}/>
                </div> : null
            }
        </div>
    )
}

export default CommodityAppointment;