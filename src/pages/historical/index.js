import React, {useState, useEffect} from "react";
import axios from "axios";

import {getUrlData} from "../../config/common";

import "../../assets/css/pages/historical/style.css";
import l from "../../assets/images/record/l.png";
import l1 from "../../assets/images/record/l (1).png";
import gou from "../../assets/images/record/gou.png";
import gou1 from "../../assets/images/record/gou1.png";
import loading_gif from "../../assets/images/circle-transparent.gif";

const Historical = (props) => {
    const [data, setData] = useState(
        {
            isAj: false,
            state: 6,
            btnYes: "返回",
            btnNo: "取消",
            btnboolean: true,
            isYzmClick: true,
            testing: "",
            histirucalRecord: "",
            store_id: parseInt(getUrlData('store_id', props.location.search)),
            fans_id: "",
            mobile: "",
            message: "",
            dataList: [{type_name:'类型名称',title:'标题',booking_time:'2020-12-20'}],
        });

    const [time, setTime] = useState({
        testing_txt: "发送验证码",
        count: 61
    })

    if(getUrlData('jordan', props.location.search)){
        data.isAj = true;
        window.document.body.style.backgroundColor = '#000';
    }

    useEffect(() => {
        axios.post(
            '/fans/delete-history',
            {
                store_id: data.store_id
            }).then(res => {
            let resData = res.data;
            resData.data.state = 3;
            resData.data.btnYes = '确定';
            resData.data.btnboolean = true;
            if (Number(resData.code) === 10001) {
                // 请求处理中
                resData.data.state = 2;
                resData.data.btnboolean = false;
            }
            if (Number(resData.code) === 10002) {
                // 无法删除
                resData.data.state = 1;
                resData.data.dataList = resData.data;
                resData.data.btnboolean = false;
            }
            if (Number(resData.code) === 10003) {
                // 暂无历史记录
                resData.data.state = 0;
                resData.data.btnboolean = false;
            }
            setData({...data, ...resData.data});
        });
    }, [data.store_id]);

    function getCode() {
        if (data.isYzmClick) {
            axios.post(
                '/fans/send-code',
                {
                    store_id: data.store_id
                }).then(res => {
                let resData = res.data;
                if (Number(resData.code) === 200) {
                    setTime({...time, testing_txt: '60秒重新发送'});
                    let timer = setInterval(() => {
                        if (time.count > 0) {
                            time.count--
                            setTime({...time, testing_txt: time.count + '秒重新发送', count: time.count});
                        } else {
                            setTime({...time, testing_txt: '发送验证码', count: 61})
                            setData({...data, isYzmClick: true});
                            clearInterval(timer)
                        }
                    }, 1000)
                }else{
                    alert(resData.message);
                }
                data.isYzmClick = true;
            }, error => {
                setData({...data, isYzmClick: true});
                console.log(error)
            })
        }
        setData({...data, isYzmClick: false});
    }

    function btnClick() {
        if (data.state === 3) {
            setData({...data, state: 4, btnYes: '提交'})
        } else if (data.state === 4) {
            console.log(data.testing.length)
            if (data.testing.length === 6 && time.count > 0 && time.count < 61) {
                axios({
                    url: "/fans/delete-history-apply",
                    method: "post",
                    data: {
                        store_id: data.store_id,
                        fans_id: data.fans_id,
                        code: data.testing,
                    },
                    transformRequest: [
                        function(oldData){
                            // console.log(oldData)
                            let newStr = ''
                            for (let item in oldData){
                                newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&'
                            }
                            newStr = newStr.slice(0, -1)
                            return newStr
                        }
                    ],
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }).then(res => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        setData({...data, state: 5, btnYes: '完成', btnboolean: false})
                    }
                    if (Number(resData.code) === 300) {
                        alert("验证码错误");
                    }
                    console.log(res.data);
                })
            }
        }
    }

    return (
        <div className={data.isAj ? 'Historical jordan': 'Historical'}>
            <div className="section">
                {data.state !== 6 ?
                    <div className="histirucal-img">
                        <img className="img" alt={''} src={
                            data.isAj ?
                                data.state !== 5 ? l1 : gou1
                                :
                                data.state !== 5 ? l : gou
                        }/>
                    </div> : null
                }
                {data.state === 0 ?
                    <h1>您暂无历史记录</h1> :
                    data.state === 1 ?
                        <h1>无法删除</h1> :
                        data.state === 2 ?
                            <h1>请求处理中</h1> :
                            data.state === 3 || data.state === 4 ?
                                <h1>历史记录删除请求</h1> :
                                data.state === 5 ?
                                    <h1>申请成功</h1> : null
                }
            </div>
            {data.state === 0 ?
                <div className="histirucal-state0 p-d-t">历史记录包含：您在本门店的预约记录，留言记录，活动参与记录。</div> : null
            }
            {data.state === 3 ?
                <div className="histirucal3">您确认要删除历史记录吗？</div> : null
            }
            {data.state === 3 ?
                <div className="histirucal-state0">
                    历史记录包含：您在本门店的预约记录，留言记录，活动参与记录。此请求一旦完成，不可恢复，请谨慎操作。
                </div> : null
            }
            <div className="histirucal-box">
                {data.state === 1 ?
                    <p>
                        您有如下预约尚未完成
                        <br/>如需删除所有历史记录
                        <br/>请在完成所有预约后再次联系客服人员
                    </p> :
                    data.state === 2 ?
                        <p>
                            您的历史记录删除请求正在处理中
                            <br/>完成后将会以短信的形式通知您
                            <br/>请耐心等待结果
                        </p> :
                        data.state === 4 ?
                            <p className="state4">
                                请确认以下是否为本人手机号
                                <br/>若非本人手机号，则无权限删除该用户的历史记录
                            </p> :
                            data.state === 5 ?
                                <p className="state4">
                                    您的历史记录删除请求已提交
                                    <br/>完成后将会以短信的形式通知您
                                    <br/>请耐心等待结果
                                </p> : null
                }
                {data.state === 1 ?
                    <h2>未完成的预约记录</h2> :
                    data.state === 4 ?
                        <div className="mobile_phone">
                            <span>手机号</span>
                            <span>{data.mobile}</span>
                        </div> : null
                }
                {data.state === 1 ?
                    <ul>
                        {
                            data.dataList.map((item, index) => {
                                return <li key={index}>
                                    <h4>{item.type_name}</h4>
                                    <h3>{item.title}</h3>
                                    <span>{item.booking_time}</span>
                                </li>
                            })
                        }
                    </ul> :
                    data.state === 4 ?
                        <div className="mobile_phone">
                            <span>验证码</span>
                            <span onClick={getCode} className="testing_ck">{time.testing_txt}</span>
                            <input
                                type="text"
                                id="mobile-testing"
                                className="testing"
                                maxLength="6"
                                onChange={(e) => {
                                    setData({...data, testing: e.target.value})
                                }}
                            />
                        </div> : null
                }
            </div>
            {data.state === 4 ?
                <div className="histirucal-state0"
                >历史记录包含：您在本门店的预约记录，留言记录，活动参与记录。此请求一旦完成，不可恢复，请谨慎操作。
                </div> : null
            }
            {
                data.state !== 6 ?
                    <div className="fixbtn-box">
                        <button className="bttn btn-yes" onClick={btnClick}>{data.btnYes}</button>
                        {data.btnboolean ?
                            <button className="bttn btn-no">{data.btnNo}</button> : null
                        }
                    </div> : null
            }
            {
                data.state === 6 ?
                    <div className="loading">
                        <img className="icon" src={loading_gif} alt={''}/>
                        <p className="tip">加载中</p>
                    </div> : null
            }
        </div>
    );
}

export default Historical;
