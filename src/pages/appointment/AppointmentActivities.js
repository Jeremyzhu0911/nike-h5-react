import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";

import img from "../../assets/images/minImg.png";
import Swiper from "swiper";

const AppointmentActivities = (props) => {

    const [loading, setLoading] = useState(true);

    const [swiperList, setSwiperList] = useState([]);

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
                        let imgLength = [];
                        cookie.save('store_name', resData.data.store_info.store_name)
                        console.log(resData.data)
                        resData.data.type_list.forEach((item,index)=>{
                            imgLength[index] = [resData.data.type_list[index].list.length,1]
                        })
                        setSwiperList(imgLength)
                        setDataList(resData.data)

                        setLoading(false)

                        new Swiper(".swiper-mini", {
                            slidesPerView: (750 / 654) * 3,
                            slidesPerGroup: 3,
                            spaceBetween: 10,
                            pagination: {
                                el: '.swiper-pagination',
                            },
                            on: {
                                slideChange: function () {
                                    if (this.realIndex + 1 === 4)
                                        this.$el.find(".swiper-slide").eq(0).removeClass("right_one");
                                    else if (Number(this.realIndex + 4) === this.$el.find(".swiper-slide").length)
                                        this.$el.find(".swiper-slide").eq(0).addClass("right_one");

                                    this.$el.find(".swiper-num span").text(this.realIndex + 1)
                                }
                            }
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
        <div className="AppointmentActivities">
            <h2>{cookie.load("store_name")}</h2>
            {
                dataList.booking_list.length === 0 ?
                    <>
                        <div className={'content'}>
                            <h5>暂无参与记录</h5>
                        </div>
                        <div className={'content'}>
                            <h4>为您推荐</h4>
                            <div className={'list_recommend'}>
                                {
                                    dataList.prod_list.map((item, index) => {
                                        return <div className={'list_box'} key={index} onClick={() => {
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
                                <h4>{item.type_name}</h4>
                                <div className="RotationBigImg">
                                    <div className="carousel swiper-mini">
                                        <div className="carousel-box swiper-wrapper">
                                            {
                                                item.list.map((listItem, index) => {
                                                    return <div
                                                        className={index === 0 ? "carousel-item swiper-slide left_one" : "carousel-item swiper-slide"}
                                                        key={index} onClick={()=>{
                                                            props.history.push("/details-activities" + props.location.search + "&store_event_id=" + listItem.store_event_id)
                                                    }}>
                                                        <img alt={''} src={listItem.event_url}/>
                                                        <h4>{listItem.event_title}</h4>
                                                        <p>{listItem.event_start_date}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="index-container">
                                            <div className={"swiper-pagination"}/>
                                            <span className="swiper-num"><span>{swiperList[0][1]}</span>/{swiperList[0][0]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    })
            }
        </div>
    )
}

export default AppointmentActivities;
