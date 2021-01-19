import React, {useState, useEffect} from "react";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import cookie from "react-cookies";
import GetCode from "../../components/GetCode";

const LimitAppointment = (props) => {

    const [loading, setLoading] = useState(true);

    const [sizeList, setSizeList] = useState(0);    //  尺码切换

    const [isModalVisible, setIsModalVisible] = useState(false);    //  提交状态

    const [exemption, setExemption] = useState(false);

    const [limitAppointment, setLimitAppointment] = useState({
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

    if (getUrlData('jordan')) {
        window.document.body.style.backgroundColor = '#000';
    }

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
    }, [codeTime])
    const updateCodeTime = (state) => {
        setCodeTime(state)
    }

    const [postDate, setPostDate] = useState({
        luckydraw_id: '',   // limitAppointment.luckydraw_id
        user_name: cookie.load('user_name'),
        mobile: cookie.load('mobile'),
        code: '',   //  验证码
        product_id: '',   // size id
        identity_code: ''   //  身份证后4位
    });    //  提交数据

    useEffect(() => {
        if (loading) {
            axios.get("/luckydraw/default/detail?luckydraw_id=" + getUrlData('luckydraw_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {

                        cookie.save('store_name', resData.data.store_info.store_name)
                        console.log(resData.data);
                        setLimitAppointment(resData.data);
                        setPostDate({
                            ...postDate,
                            product_id: limitAppointment.product_sizes[0].id,
                            luckydraw_id: limitAppointment.luckydraw_id
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
    }, [loading])

    if (loading) {
        return (<div>loading...</div>)
    }

    return (
        <div className="LimitAppointment">
            <h2>{cookie.load('store_name')}</h2>
            <div className="InforDetails">
                <div className="InforTitle">
                    {limitAppointment.title}
                </div>
                <div className="sellingPrice">
                    发售价 ¥1599
                </div>
                <div className="selectSize">
                    <p>选择尺寸</p>
                    <ul className="Size">
                        {
                            limitAppointment.product_sizes.map((item, index) => {
                                return <li key={index} className={sizeList === index ? 'active' : null} onClick={() => {
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
                            <input type="text" id="code" name="code" onChange={(event) => {
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
                <div className="exemption" onClick={() => {
                    setExemption(!exemption)
                }}>
                    <div className="exemption-left">
                        <i className={exemption ? "iconfont icon-BAI-danxuankuangs" : "iconfont icon-BAI-danxuankuang"}/>
                    </div>
                    <div className="exemption-right">
                        我已仔细阅读并同意《<span>隐私信息授权条款</span>》及《<span>免责声明</span>》内容
                    </div>
                </div>
                <div className={'Infobtn'}>
                    <div className="btn" onClick={() => {
                        if (exemption) {
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
                                className="product-title">{limitAppointment.title}</span></p>
                            <p>姓名：<span>{postDate.user_name}</span></p>
                            <p>身份证后四位：<span>{postDate.identity_code}</span></p>
                            <p>手机号：<span>{postDate.mobile}</span></p>
                            <p className="tc">信息提交后不可更改</p>
                            <button>确认</button>
                            <button className="close">取消</button>
                        </div>
                    </div> : null
            }

        </div>
    )

}

export default LimitAppointment;
