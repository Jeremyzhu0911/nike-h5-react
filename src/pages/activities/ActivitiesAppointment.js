import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";

import GetCode from "../../components/GetCode";
import Priacy from "../../components/Privacy";

const ActivitiesAppointment = (props) => {

    const [loading, setLoading] = useState(true);

    const [iconfont, setIconfont] = useState(false)

    const [postData, setPostData] = useState({
        store_event_id: Number(getUrlData("store_event_id")),
        user_name: cookie.load("user_name"),
        mobile: cookie.load("mobile"),
        gender: 1,
        code: "",
        store_id: Number(getUrlData("store_id")),
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

    useEffect(() => {
        if (loading) {
            setLoading(false)
        }
    }, [loading])

    if (loading)
        return (<div>loading</div>)

    return (
        <div className={parseInt(getUrlData("jordan")) === 1 ? "AmbassadorAppointment jordan" : "AmbassadorAppointment"}>
            <div className={'headers'}>
                <div className="name">
                    填写个人信息
                    {
                        Number(getUrlData('is_ambassador')) === 1 ?
                            '' :
                            <span onClick={() => {
                                props.history.goBack()
                            }}>返回</span>
                    }
                </div>
            </div>
            <div className={'addInfo'}>
                <ul>
                    <li>
                        <input type={'text'} placeholder="您的姓名" maxLength={'8'} defaultValue={cookie.load("user_name")}
                               onChange={(event) => {
                                   setPostData({
                                       ...postData,
                                       user_name: event.target.value, //  名字
                                   })
                               }}/>
                    </li>
                    <li className={'mobile'}>
                        <input type={'tel'} placeholder="手机号" maxLength={'11'} defaultValue={cookie.load('mobile')}
                               onChange={(event) => {
                                   setPostData({
                                       ...postData,
                                       mobile: event.target.value,  //  手机号
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
                        <input type={'num'} placeholder="请输入验证码" value={postData.code} maxLength={'6'} onChange={(event) => {
                            setPostData({
                                ...postData,
                                code: event.target.value,   //  验证码
                            })
                        }}/>
                    </li>
                </ul>
            </div>
            <div className={'gender'}>
                <h4>称呼</h4>
                <ul>
                    <li className={postData.gender === 1 ? 'on' : ''} onClick={() => {
                        setPostData({
                            ...postData,
                            gender: 1,
                        })
                    }}><p>先生</p></li>
                    <li className={postData.gender === 2 ? 'on' : ''} onClick={() => {
                        setPostData({
                            ...postData,
                            gender: 2,
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
                    console.log(postData)
                    if (iconfont)
                        axios({
                            url: "/event/default/booking",
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
                                    console.log(resData)
                                    props.history.push("/success-activities" + props.location.search +
                                        "&booking_id=" + resData.data.booking_id +
                                        "&is_subscribe=" + resData.data.is_subscribe +
                                        "&status=0");
                                    // /success-activities?booking_id=285&is_subscribe=0&status=0
                                } else {
                                    alert(res.data.message)
                                }
                            }
                        )
                    else
                        alert("请阅读并同意本店服务与保密协议")
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


export default ActivitiesAppointment;
