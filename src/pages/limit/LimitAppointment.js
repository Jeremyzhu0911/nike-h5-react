import React, {useState, useEffect} from "react";
import axios from "axios";
import cookie from "react-cookies";

import GetCode from "../../components/GetCode";
//本地缓存配置 & 工具类
import {getUrlData} from "../../util/getUrlData";
import Priacy from "../../components/Privacy";
import Relief from "../../components/Relief";
import DataTracking from "../../util/DataStatistics";

const LimitAppointment = (props) => {

    const [loading, setLoading] = useState(true);

    const [sizeList, setSizeList] = useState(0);    //  尺码切换

    const [isModalVisible, setIsModalVisible] = useState(false);    //  提交状态

    const [iconfont, setIconfont] = useState(false)

    const [stateData, setStateData] = useState({
        luckydraw_id: "",
        product_sku: "",
        title: '', // 标题
        kv: '', //  图片
        product_desc: '',   // 描述
        content: '', //  简介
        enroll_begin_time: '',  // 开始
        enroll_end_time: '',    // 结束
        result_time: '',    //  结果
        consume_time: '',   //  签到
        is_avail_booking: false,    //  已报名
        is_booking: true,   // ？
        is_end_booking: true,   // 报名结束
        is_start_booking: false,    // 报名开始

        product_sizes: [
            {
                id: '',
                size: '',
            }
        ],   //  尺码
    })

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
    const [reliefShow, setReliefShow] = useState(false)

    const [postDate, setPostDate] = useState({
        luckydraw_id: '',   // stateData.luckydraw_id
        user_name: cookie.load('user_name'),
        mobile: cookie.load('mobile'),
        code: '',   //  验证码
        product_id: '',   // size id
        identity_code: '',   //  身份证后4位
    });    //  提交数据

    useEffect(() => {
        if (loading) {
            axios.get("/luckydraw/default/detail?luckydraw_id=" + getUrlData('luckydraw_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {

                        cookie.save('store_name', resData.data.store_info.store_name)
                        setStateData(resData.data);
                        setPostDate({
                            ...postDate,
                            product_id: resData.data.product_sizes[0].id,
                            luckydraw_id: resData.data.luckydraw_id
                        })
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

    if (loading) {
        return (<div>loading...</div>)
    }

    return (
        <div className={parseInt(cookie.load('jordan')) === 1 ? "LimitAppointment jordan" : "LimitAppointment"}>
            <div className={"StoreName"}>{cookie.load('store_name')}</div>
            <div className="infoDetails">
                <div className="infoTitle">
                    {stateData.title}
                </div>
                <div className="sellingImg">
                    <img alt={''} src={stateData.kv}/>
                </div>
                <div className="selectSize">
                    <p>选择尺寸</p>
                    <ul className="Size">
                        {
                            stateData.product_sizes.map((item, index) => {
                                return <li key={index} className={sizeList === index ? 'active' : null}
                                           onClick={() => {
                                               setSizeList(index)
                                               setPostDate({
                                                   ...postDate,
                                                   product_id: item.id
                                               })
                                           }}>{item.size}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="InfoEnter">
                    <div className="items">
                        <label htmlFor="name">姓名</label>
                        <input type="text" id="name" name="name" defaultValue={cookie.load('user_name')}
                               onChange={(event) => {
                                   setPostDate({
                                       ...postDate,
                                       user_name: event.target.value
                                   })
                               }}/>
                    </div>
                    <div className="items">
                        <label htmlFor="ID">身份证号码</label>
                        <input type="tel" id="ID" name="ID" placeholder="输入后四位" maxLength="4" onChange={(event) => {
                            setPostDate({
                                ...postDate,
                                identity_code: event.target.value
                            })
                        }}/>
                    </div>
                    <div className="items">
                        <label htmlFor="phone">电话</label>
                        <input type="tel" id="phone" name="phone" defaultValue={cookie.load('mobile')}
                               onChange={(event) => {
                                   setPostDate({
                                       ...postDate,
                                       mobile: event.target.value
                                   })
                               }}/>
                    </div>
                    <div className="items">
                        <label htmlFor="code">验证码</label>
                        <div className="itemsRight">

                            <div className="getCodeBtn">
                                <GetCode {...props} updateCodeTime={updateCodeTime} data={codeTime}/>
                            </div>
                            <input type="text" className="code" name="code" maxLength={'6'} onChange={(event) => {
                                setPostDate({
                                    ...postDate,
                                    code: event.target.value
                                })
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="warning">
                    如您无法正常收到短信验证码，请点击微信菜单“个人服务-在线客服”留言进行询问。
                </div>
                <div className={'tips'}>

                    <p>
                        <span onClick={() => {
                            setIconfont(!iconfont)
                        }} className={iconfont ? "iconfont icon-choiceOn" : "iconfont icon-choiceOff"}> 我已仔细阅读并同意</span>
                        《<i onClick={() => {
                        setPriacyShow(true)
                    }}>隐私信息授权条款</i>》及《<i onClick={() => {
                        setReliefShow(true)
                    }}>免责声明</i>》内容
                    </p>
                </div>
                <div className={'infoBtn'}>
                    <div className="btn" onClick={() => {
                        if (iconfont) {
                            DataTracking.BDEvent(`限量发售｜${stateData.luckydraw_type === 0 ? '抽号':'抽鞋'}｜${stateData.title}｜提交预约申请`,'提交')
                            setIsModalVisible(true)
                        } else {
                            alert("仔细阅读并同意《隐私信息授权条款》及《免责声明》")
                        }
                    }}>
                        提交
                    </div>
                </div>
            </div>
            {
                isModalVisible ?
                    <div className="pop_up">
                        <div className="pop_up_box">
                            <h2>核对信息</h2>
                            <p className="product-p"><span className="product-name">活动名称：</span><span
                                className="product-title">{stateData.title}</span></p>
                            <p>姓名：<span>{postDate.user_name}</span></p>
                            <p>身份证后四位：<span>{postDate.identity_code}</span></p>
                            <p>手机号：<span>{postDate.mobile}</span></p>
                            <p className="tc">信息提交后不可更改</p>
                            <button onClick={() => {
                                axios({
                                    url: '/luckydraw/default/booking',
                                    method: 'post',
                                    data: postDate,
                                    transformRequest: [function (data) {
                                        let ret = ''
                                        for (let it in data) {
                                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                        }
                                        return ret
                                    }],
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                }).then((res) => {
                                        let resData = res.data;
                                        if (Number(resData.code) === 200) {
                                            cookie.save("result_time", stateData.result_time)
                                            cookie.save("qrcode_url", resData.data.qrcode_url)
                                            DataTracking.GAEvent("抽签活动 | 确认信息 | " + stateData.luckydraw_id + ' | ' + stateData.product_sku, '确认')
                                            DataTracking.GAPage(" | 抽签活动 | 报名成功 | " + stateData.luckydraw_id + ' | ' + stateData.product_sku)
                                            DataTracking.BDEvent(`限量发售｜${stateData.luckydraw_type === 0 ? '抽号':'抽鞋'}｜${stateData.title}｜确认预约信息`,'确认')
                                            props.history.push("/commodity/limitSuccess" + props.location.search)
                                        } else {
                                            alert(resData.message);
                                        }
                                    },
                                    (err) => {
                                        alert(err);
                                    }
                                );
                            }}>确认
                            </button>
                            <button onClick={() => {
                                DataTracking.BDEvent(`限量发售｜${stateData.luckydraw_type === 0 ? '抽号':'抽鞋'}｜${stateData.title}｜确认预约信息`,'取消')
                                setIsModalVisible(false)
                            }} className="close">取消
                            </button>
                        </div>
                    </div> : null
            }
            {
                priacyShow ? <div className={"FollowPop"}>
                    <Priacy/>
                    <div className={"desk"} onClick={() => {
                        setPriacyShow(!priacyShow)
                    }}/>
                </div> : null
            }
            {
                reliefShow ? <div className={"FollowPop"}>
                    <Relief/>
                    <div className={"desk"} onClick={() => {
                        setReliefShow(!reliefShow)
                    }}/>
                </div> : null
            }
        </div>
    )
}

export default LimitAppointment;
