import React, {useState, useEffect} from "react";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import cookie from "react-cookies";
import DataTracking from "../../util/DataStatistics";
import WeiXin from "../../server/wx.config";

const LimitList = (props) => {

    const [loading, setLoading] = useState(true)

    const [limitList, setLimitList] = useState([
        {
            article_img: "",
            created_at: "2021/01/18",
            now_time: '',
            des: "",
            link: "",
            luckydraw_id: "251",
            price: "",
            store_id: 57,
            sub_title: "测试-hogan 2021年1月18日",
            title: "测试-hogan 2021年1月18日",
            is_start_booking: "",   // 已经到了报名开始时间
            is_avail_booking: "", // 是否已经报名  true 未报名 false 已报名
            is_end_booking: '', // 报名结束
            is_booking: "", // 活动是否需要报名
            enroll_begin_time: '',
            enroll_end_time: ''
        }
    ])

    useEffect(() => {
        if (loading) {
            axios.get("/luckydraw/default/limited-product?store_id=" + getUrlData('store_id')).then(
                (res) => {
                    let restData = res.data;
                    if (Number(restData.code) === 200) {

                        cookie.save('store_name', restData.data.store_info.store_name)

                        setLimitList(restData.data.data)

                        DataTracking.GAPage(' | 限量发售')

                        WeiXin.share("不可错过的Nike尖货，我正在看", window.location.href, restData.data.store_info.share_img, "点击获取Nike最新资讯")

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
        return (<div>正在加载...</div>)
    }

    return (
        <div className={parseInt(cookie.load('jordan')) === 1 ? "Limit_list jordan" : "Limit_list"}>
            <div className={"StoreName"}>{cookie.load('store_name')}</div>
            {
                limitList.map((item, index) => {
                    return <div className="ListBigImgBox" key={index}>
                        <div className={item.enroll_end_time < item.now_time ? "content mask" : "content"}
                             onClick={() => {
                                 DataTracking.GAEvent('限量发售', item.title);
                                 window.location.href = item.link
                             }}>
                            <div className="title">{item.title}</div>
                            <div className="time">{item.created_at}</div>
                            <div className="images" onClick={() => {
                                DataTracking.BDEvent(`限量发售 ｜ ${item.title} ｜ '${item.now_time < item.enroll_begin_time ? '报名未开始' : item.enroll_end_time < item.now_time ? '报名已结束' : '报名中'}`, '封面图');
                            }}>
                                <img alt={''} src={item.article_img}/>
                            </div>
                            {
                                item.now_time < item.enroll_begin_time ?
                                    <div className="s_btn s_btn1" onClick={() => {
                                        DataTracking.BDEvent(`限量发售 ｜ ${item.title} ｜ 报名未开始`, '报名按钮');
                                    }}>报名未开始</div> :
                                    item.enroll_end_time < item.now_time ?
                                        <div className="s_btn s_btn2" onClick={() => {
                                            DataTracking.BDEvent(`限量发售 ｜ ${item.title} ｜ 报名已结束`, '报名按钮');
                                        }}>报名已结束</div> :
                                        <div className="s_btn s_btn1" onClick={() => {
                                            DataTracking.BDEvent(`限量发售 ｜ ${item.title} ｜ 报名中`, '报名按钮');
                                        }}>报名中</div>
                            }
                        </div>
                        {
                            index === 0 ?
                                <div className="down-icon iconfont icon-xiangxia"/> : null
                        }
                    </div>
                })
            }
        </div>
    )

}

export default LimitList;
