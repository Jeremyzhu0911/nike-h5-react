import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";

import {getUrlData} from "../../util/getUrlData";

import Swiper from 'swiper';
import WeiXin from "../../server/wx.config";
import DataTracking from "../../util/DataStatistics";

const CommodityFashion = (props) => {

    const [loading, setLoading] = useState(true);

    const [swiperList, setSwiperList] = useState([]);

    const [stateDate, setStateDate] = useState({
        id: "",
        title: "",
        subtitle: "",
        images: [],
        link: "",
        created_at: "",
    })

    useEffect(() => {
        if (loading) {
            let getDate = axios.get("/article/index?cate_id=1&store_id=" + getUrlData("store_id"));
            getDate.then(
                (res) => {
                    let restDate = res.data;
                    if (Number(restDate.code) === 200) {
                        let imgLength = [];
                        cookie.save('store_name', restDate.data.store_info.store_name);
                        restDate.data.data.forEach((item, index) => {
                            imgLength[index] = [item.images.length, 1]
                        })
                        setSwiperList(imgLength)

                        setStateDate(restDate.data.data)

                        DataTracking.GAPage('潮流穿搭')

                        WeiXin.share("不可错过的Nike尖货，我正在看", window.location.href, restDate.data.store_info.share_img, "点击获取Nike最新资讯")

                        setLoading(false)

                        new Swiper(".swiper-container", {
                            slidesPerView: 1,
                            centeredSlides: true,
                            spaceBetween: 10,
                            watchSlidesProgress: true,
                            pagination: {
                                el: '.swiper-pagination',
                                // type: "bullets",
                                renderBullet: function (index) {
                                    return '<span class="swiper-pagination-bullet" style="width:' + 100 / this.slides.length + '%">' + (index + 1) + '</span>';
                                }
                            },
                            on: {
                                slideChange: function () {
                                    if (this.slides.length > 1)
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
        <div className={parseInt(cookie.load('jordan')) === 1 ? "CommodityFashion jordan" : "CommodityFashion"}>
            <div className={"StoreName"}>{cookie.load('store_name')}</div>
            {
                stateDate.map((stateList, index) => {
                    return <div key={index} className={'FashionBox'}>
                        <h1>{stateList.title}</h1>
                        <h4>{stateList.subtitle}</h4>
                        <div className={"RotationBigImg"}>
                            <div className={"swiper-container carousel"}>
                                <div className="swiper-wrapper carousel-box">
                                    {
                                        stateList.images.length >= 1 ?
                                            stateList.images.map((item, index) => {
                                                return <div className="carousel-item swiper-slide" key={index}
                                                            data-idx={stateList.relation_id}>
                                                    <img alt={''} src={item}/>
                                                </div>
                                            }) : <div className="carousel-item swiper-slide">
                                                <img alt={''} src={stateList.article_img}/>
                                            </div>
                                    }
                                </div>
                                <div className="index-container">
                                    <div className={"swiper-pagination"}/>
                                    <span
                                        className="swiper-num"><span>{swiperList[index][1]}</span>/{swiperList[index][0]}</span>
                                </div>
                            </div>

                        </div>
                        {
                            stateList.link ? <div onClick={() => {
                                DataTracking.GAEvent('潮流穿搭', stateList.title)
                                DataTracking.BDEvent(`潮流穿搭`,`查看穿搭｜${stateList.title}`)
                                window.location.href = stateList.link
                            }} className="s_btn">查看穿搭</div> : null
                        }
                        <div className={'jianju'}/>
                    </div>
                })
            }
        </div>
    );
}

export default CommodityFashion;
