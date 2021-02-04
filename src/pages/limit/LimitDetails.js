import React, {useState, useEffect} from "react";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import cookie from "react-cookies";
import addTag from "../../util/addTag";

const LimitDetails = (props) => {
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState(false);

    const [limitDetails, setLimitDetails] = useState({
        title: '', // 标题
        kv: '', //  图片
        product_desc: '',   // 描述
        content: '', //  简介
        enroll_begin_time: '',  // 开始
        enroll_end_time: '',    // 结束
        result_time: '',    //  结果
        consume_time: '',   //  签到
        is_start_booking: "",   // 已经到了报名开始时间
        is_avail_booking: "", // 是否已经报名  true 未报名 false 已报名
        is_end_booking: '', // 报名结束
        is_booking: "", // 活动是否需要报名
    })

    if (getUrlData('jordan')) {
        window.document.body.style.backgroundColor = '#000';
    }

    useEffect(() => {
        if (loading) {
            let getUrl = "/luckydraw/default/detail?luckydraw_id=" + getUrlData('luckydraw_id');
            if (getUrlData('code')) {
                getUrl = "/luckydraw/default/preview?preview_code=" + getUrlData('code') + "&luckydraw_id=" + getUrlData('luckydraw_id');
            }
            axios.get(getUrl).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {

                        cookie.save('store_name', resData.data.store_info.store_name)
                        console.log(resData.data);
                        setLimitDetails(resData.data)
                        setLoading(false)

                        addTag(resData.data.relation_id)
                    }
                    if (Number(resData.code) === 403) {
                        setLoading(false);
                        setPreview(true);
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
        return (<div>正在加载...</div>)
    }

    if (preview)
        return (
            <div className={"previewBox"}>
                <div className={"iconfont icon-icon-jinggao"}/>
                <p>二维码已失效</p>
            </div>
        )

    return (
        <div className={getUrlData("jordan")?"LimitDetails jordan":"LimitDetails"}>
            {
                getUrlData('code') ?
                    <div className="preview">此为预览页面，仅用于发布预览，将在短期内失效。</div> : null
            }
            <h2>{cookie.load('store_name')}</h2>
            <div className="CommodityDetails">
                <div className="commodityTitle">
                    {limitDetails.title}
                </div>
                <div className="commodityName">
                    Air Jordan VI Retro
                </div>
                <div className="commodityImg">
                    <img alt={''} src={limitDetails.kv}/>
                </div>
                <div className="commodityText" dangerouslySetInnerHTML={{__html: limitDetails.product_desc}}/>
                <div className="commodityText" dangerouslySetInnerHTML={{__html: limitDetails.content}}/>
                <div className="commodityTimes">
                    <div className="title">活动时间</div>
                    <div className="timeArea">
                        <p>报名时间</p>
                        <div className="time">
                            {limitDetails.enroll_begin_time}
                        </div>
                    </div>
                    <div className="timeArea">
                        <p>报名结束</p>
                        <div className="time">
                            {limitDetails.enroll_end_time}
                        </div>
                    </div>
                    <div className="timeArea">
                        <p>结果公示</p>
                        <div className="time">
                            {limitDetails.result_time}
                        </div>
                    </div>
                    <div className="timeArea">
                        <p>到店签到</p>
                        <div className="time">
                            {limitDetails.consume_time}
                        </div>
                    </div>
                </div>
                {
                    limitDetails.is_booking ?
                        limitDetails.is_avail_booking ?
                            <div className="btn">已报名</div> :
                            limitDetails.is_end_booking ?
                                <div className="btn">报名已结束</div> :
                                limitDetails.is_start_booking ?
                                    <div className="btn" onClick={() => {
                                        props.history.push('/commodity/limitAppointment' + props.location.search)
                                    }}>即刻报名</div> :
                                    <div className="btn">报名未开始</div> : <div className="btn">即刻报名</div>
                }
            </div>
        </div>
    )
}

export default LimitDetails;
