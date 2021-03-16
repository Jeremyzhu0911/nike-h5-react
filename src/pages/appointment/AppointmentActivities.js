import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import Swiper from "swiper";
import DataTracking from "../../util/DataStatistics";

const AppointmentActivities = (props) => {

    const [loading, setLoading] = useState(true);

    // const [swiperList, setSwiperList] = useState([]);

    const [dataList, setDataList] = useState({
        booking_list: [
            {
                event_type: ''
            }
        ],
        prod_list: [
            {
                product_name: '',
                price: '',
                thumbnail: '',
                product_code: ''
            }
        ],
        type_list: [
            {
                type_name: '',
                list: [
                    {
                        store_event_id: '',
                        event_title: '',
                        event_url: '',
                        event_start_date: '',
                        event_end_date: '',
                        booking_name: '',
                    }
                ]
            }
        ]

    })

    useEffect(() => {
        if (loading) {
            axios.get("/event/default/get-booking-list?store_id=" + getUrlData("store_id")).then(
                (res) => {
                    let resData = res.data
                    if (Number(resData.code) === 200) {
                        // let imgLength = [];
                        cookie.save('store_name', resData.data.store_info.store_name)
                        console.log(resData.data)
                        // resData.data.type_list.forEach((item, index) => {
                        //     let listLng = resData.data.type_list[index].list.length;
                        //     imgLength[index] = [(listLng % 3 === 0 ? listLng / 3 : parseInt(listLng / 3) + 1), 1]
                        // })

                        // setSwiperList(imgLength)

                        setDataList(resData.data)

                        setLoading(false)

                        new Swiper(".swiper-mini", {
                            slidesPerView: 3,
                            slidesPerGroup: 1,
                            spaceBetween: 10,
                            setWrapperSize: true,
                            on: {
                                init: function (swiper) {
                                    this.$el.find(".img-box").css("height", this.slides.css('width'))
                                },
                            }
                            // pagination: {
                            //     el: '.swiper-pagination',
                            //     // type: "bullets",
                            //     renderBullet: function (index) {
                            //         console.log(index)
                            //
                            //         let maxlength = (this.slides.length % 3 === 0 ? this.slides.length / 3 : parseInt(this.slides.length / 3) + 1)
                            //
                            //         return '<span class="swiper-pagination-bullet" style="width:' + 100 / maxlength + '%">' + (index + 1) + '</span>';
                            //     }
                            // },
                            // on: {
                            //     slideChange: function () {
                            //         this.$el.find(".swiper-num span").text(this.realIndex / 3 + 1)
                            //     }
                            // }
                        });
                    }
                },
                (error) => {
                    console.log(error)
                    props.history.push("/500")
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    if (loading) {
        return (<div>正在加载中</div>)
    }

    return (
        <div
            className={parseInt(cookie.load('jordan')) === 1 ? "AppointmentActivities jordan" : "AppointmentActivities"}>
            <div className={"StoreName"}>{cookie.load('store_name')}</div>
            {
                dataList.booking_list.length === 0 ?
                    <>
                        <div className={'content'}>
                            <h5>暂无参与记录</h5>
                        </div>
                        <div className={'content'}>
                            <h3>为您推荐</h3>
                            <div className={'list_recommend'}>
                                {
                                    dataList.prod_list.map((item, index) => {
                                        return <div className={'list_box'} key={index} onClick={() => {
                                            DataTracking.BDEvent(`我的活动`,`为您推荐｜${item.product_code}`);
                                            props.history.push("/commodity/details" + props.location.search + "&product_code=" + item.product_code)
                                        }}>
                                            <div className={'list_img'}>
                                                <img alt={''} src={item.thumbnail}/>
                                            </div>
                                            <h3>{item.product_name}</h3>
                                            <p>¥ {item.price}</p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </> :
                    dataList.type_list.map((item, index) => {
                        if (item.list.length > 0)
                            return <div className={'content'} key={index}>
                                <h3>{item.type_name}</h3>
                                <div className="RotationBigImg">
                                    <div className="carousel swiper-mini">
                                        <div className="carousel-box swiper-wrapper">
                                            {
                                                item.list.map((listItem, index) => {
                                                    return <div
                                                        className={"carousel-item swiper-slide"}
                                                        key={index} onClick={() => {
                                                        DataTracking.BDEvent(`我的活动`,`${item.type_name}｜${listItem.event_title}`);
                                                        props.history.push("/details-activities" + props.location.search + "&store_event_id=" + listItem.store_event_id)
                                                    }}>
                                                        <div className={"img-box"}>
                                                            <img alt={''} src={listItem.event_url}/>
                                                        </div>
                                                        <h4 className={'actTxt'}>{listItem.event_title}</h4>
                                                        <p className={'timeTxt'}>{listItem.event_start_date}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        {/*<div className="index-container">*/}
                                        {/*    <div className={"swiper-pagination"}/>*/}
                                        {/*    <span*/}
                                        {/*        className="swiper-num"><span>{swiperList[0][1]}</span>/{swiperList[0][0]}</span>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                    })
            }
        </div>
    )
}

export default AppointmentActivities;
