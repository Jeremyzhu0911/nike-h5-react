import React, {useState, useEffect} from "react";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import cookie from "react-cookies";

const LimitList = (props) => {

    const [loading, setLoading] = useState(true)

    const [limitList, setLimitList] = useState([
        {
            article_img: "",
            created_at: "2021/01/18",
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
        }
    ])

    useEffect(() => {
        if (loading) {
            axios.get("/luckydraw/default/limited-product?store_id=" + getUrlData('store_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {

                        cookie.save('store_name', resData.data.store_info.store_name)
                        console.log(resData.data);
                        setLimitList(resData.data.data)
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
        <div className={getUrlData("jordan") ? "Limit_list jordan" : "Limit_list"}>
            <h2>{cookie.load('store_name')}</h2>
            {
                limitList.map((item, index) => {
                    return <div className="ListBigImgBox" key={index} onClick={() => {
                        window.location.href = item.link
                    }}>
                        <div className="content">
                            <div className="title">{item.title}</div>
                            <div className="time">{item.created_at}</div>
                            <div className="images">
                                <img alt={''} src={item.article_img}/>
                            </div>
                            {
                                item.is_booking ?
                                    // item.is_avail_booking ?
                                    //     <div className="s_btn s_btn1">已报名</div> :
                                    item.is_end_booking ?
                                        <div className="s_btn s_btn2">报名已结束</div> :
                                        item.is_start_booking ?
                                            <div className="s_btn s_btn1">即刻报名</div> :
                                            <div className="s_btn s_btn1">报名未开始</div> : null
                            }
                            {
                                index === 0 ?
                                    <div className="down-icon iconfont icon-xiangxia"/> : null
                            }
                        </div>
                        {
                            item.is_end_booking ?
                                <div className="mask"/> : null
                        }
                    </div>
                })
            }
        </div>
    )

}

export default LimitList;
