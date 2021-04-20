import React, {useState, useEffect} from "react";
import axios from "axios";
import cookie from "react-cookies";
import {getUrlData} from "../../util/getUrlData";
import DataTracking from "../../util/DataStatistics";
import WeiXin from "../../server/wx.config";

const AppointmentLuckydraw = (props) => {

    const [loading, setLoading] = useState(true);

    const [showCancel, setShowCancel] = useState(false)
    const [cancelBooking, setCancelBooking] = useState(false)

    const [resultBtn, setResultBtn] = useState(false)
    const [resultList, setResultList] = useState([
        {
            username: '',
            mobile: ''
        }
    ])

    const [luckydraw, setLuckydraw] = useState({
        kv: '',  //  图片
        title: '',   //  标题
        product_size: '',    //  鞋码
        status: '',  //  状态  -1 ？  取消:报名成功   0 结果未公布 1 未中选 2 恭喜中选 4 已签到
        luckydraw_type: '', //  0 ？抽号:抽鞋
        address: '',    //  地址
        result_time: '',    //  结果公布时间
        consume_time: '',    //  签到开始时间
        checkin_qrcode: '',    //  二维码
        luckydraw_id: '',    //  查看中奖名单用到的id
        product_sku: '',
    })

    useEffect(() => {
        if (cancelBooking) {
            axios.get('/luckydraw/default/cancel-booking?id=' + getUrlData('booking_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        alert('取消报名成功')
                        setLuckydraw({
                            ...luckydraw,
                            status: -1
                        })
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
        if (resultBtn) {
            axios.get('/luckydraw/default/result?luckydraw_id=' + luckydraw.luckydraw_id).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        setResultList(resData.data)
                    } else {
                        props.history.push('/404');
                    }
                },
                (err) => {
                    console.log(err)
                    props.history.push('/500');
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultBtn])

    useEffect(() => {
        if (loading) {
            axios.get('/luckydraw/default/view-booking?booking_id=' + getUrlData('booking_id')).then(
                (res) => {
                    let restData = res.data;
                    if (Number(restData.code) === 200) {

                        setLuckydraw({
                            ...restData.data
                        })

                        DataTracking.GAPage(' | 我的抽签活动报名 | ' + restData.data.product_sku);

                        WeiXin.share("不可错过的Nike尖货，我正在看", window.location.protocol + '//' + window.location.host + '/nike-h5-vue/dist/#/commodity/limitlist' + props.location.search, window.location.protocol + '//' + window.location.host + '/nike-h5-vue/nike.png', "点击获取Nike最新资讯");


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
        <div className={parseInt(cookie.load('jordan')) === 1 ? "AppointmentLuckydraw jordan" : "AppointmentLuckydraw"}>
            <div className={'luckydraw_box'}>
                <h4 onClick={() => {
                    DataTracking.BDEvent(`我的抽鞋活动｜${luckydraw.title}`,`查看活动详情页`)
                    props.history.push("/commodity/Limitdetails" + props.location.search + "&luckydraw_id=" + luckydraw.luckydraw_id)
                }}>查看活动详情页 ></h4>
                <div className={'luckydraw_img'}>
                    <img alt={''} src={luckydraw.kv}/>
                </div>
                <div className={'luckydraw_txt'}>
                    <h3>{luckydraw.title}</h3>
                    <p>
                        {luckydraw.product_size}码
                        {
                            luckydraw.status === -1 ?
                                <span>取消报名</span> : <span>报名成功</span>
                        }
                    </p>
                </div>
            </div>
            <ul className="info-ul">
                <li>
                    <label>门店地址</label>
                    <span>{luckydraw.address}</span>
                </li>
                {/*如果是已取消的，那么如下都没有*/}
                {
                    luckydraw.status === 0 ?
                        <li>
                            <label>结果公布时间</label>
                            <span>{luckydraw.result_time}</span>
                        </li> : null
                }
                {
                    luckydraw.status === 2 || luckydraw.status === 4 ?
                        <li>
                            <label>签到开始时间</label>
                            <span>{luckydraw.consume_time}</span>
                        </li> : null
                }
            </ul>
            {
                luckydraw.status === 0 ?
                    <div className={'end_show'}>结果未公布</div> :
                    luckydraw.status === 1 ?
                        <div className={'end_show'}>未中选</div> :
                        luckydraw.status === 2 ?
                            <div className={'end_show on'}>恭喜您中选</div> :
                            luckydraw.status === 4 ?
                                <div className={'end_show'}>已签到</div> : null
            }

            {
                luckydraw.status === 1 || luckydraw.status === 2 || luckydraw.status === 4 ?
                    <div className="btn_normal" onClick={() => {
                        setResultBtn(!resultBtn)
                    }}>查看中选资格名单</div> : null
            }
            {
                luckydraw.status === 2 || luckydraw.status === 4 ?
                    <div className="hasQrcode">
                        <img className="qrcode" alt={''} src={luckydraw.checkin_qrcode}/>
                        <p>恭喜您中选<span>签到二维码仅限签到时间当日有效<br/>该二维码仅限于本人使用，且仅能使用1次</span></p>
                    </div> : null
            }

            {
                luckydraw.status === 0 ?
                    <div className={'order'}>
                        <div className={'btn'} onClick={() => {
                            DataTracking.BDEvent(`我的抽鞋活动｜${luckydraw.title}`,`取消报名`)
                            setShowCancel(!showCancel)
                        }}>取消报名
                        </div>
                    </div> : null
            }
            {
                showCancel ?
                    <div className={'confirm_again'}>
                        <h4>是否继续本次操作</h4>
                        <p>取消后不可撤回，如需恢复预约，请重新提交预约申请，是否继续本次操作</p>
                        <div className={'btn_box'}>
                            <span onClick={() => {
                                DataTracking.BDEvent(`我的抽鞋活动｜${luckydraw.title}`,`继续`)
                                DataTracking.GAEvent('我的抽签活动报名 | ' + luckydraw.product_sku, '取消报名')
                                setCancelBooking(showCancel)
                            }}>继续</span>
                            <span onClick={() => {
                                DataTracking.BDEvent(`我的抽鞋活动｜${luckydraw.title}`,`我再想想`)
                                setShowCancel(!showCancel)
                            }}>我再想想</span>
                        </div>
                    </div> : null
            }
            {
                resultBtn ?
                    <div className={'pop_up'}>
                        <div className="pop_up_box">
                            <h2>获得资格名单</h2>
                            <p><span className="tc">姓名</span><span className="tc">手机</span></p>
                            {
                                resultList.map((item, index) => {
                                    return <p key={index}>
                                        <span>{item.username}</span><span>{item.mobile}</span>
                                    </p>
                                })
                            }
                            <button onClick={() => {
                                setResultBtn(!resultBtn)
                            }}>关闭
                            </button>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default AppointmentLuckydraw;
