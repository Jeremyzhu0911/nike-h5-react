import React, {useState, useEffect} from "react";
import cookie from 'react-cookies';
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import Swiper from 'swiper';

const CommodityIndex = (props) => {

    const [loading, setLoading] = useState(true)

    const [swiperList, setSwiperList] = useState([6, 1]);

    const [productNewList, setProductNewList] = useState({
        data: [
            {
                image_path: "",
                link_url: ""
            }
        ],
        product_list: [
            {
                id: "",
                owner_id: "",
                owner_type: "",
                product_code: "",
                product_name: "",
                thumbnail: "",
                price: ""
            }
        ]
    })

    useEffect(() => {
        if (loading) {
            axios.get("/product/default/new?store_id=" + getUrlData('store_id')).then(
                (res) => {
                    let restData = res.data;
                    if (Number(restData.code) === 200) {
                        let imgLength = [];
                        console.log(restData.data)
                        restData.data.data.map((item, index) => {
                            if (index < 6) {
                                setProductNewList({
                                    ...productNewList,
                                    data: [
                                        ...productNewList.data,
                                        productNewList.data[index] = item
                                    ]
                                })
                                setSwiperList(
                                    [
                                        swiperList[0] = [index + 1, 1]
                                    ]
                                )
                            } else {
                                return
                            }
                        })

                        restData.data.product_list.map((item, index) => {
                            if (index < 9) {
                                setProductNewList({
                                    ...productNewList,
                                    product_list: [
                                        ...productNewList.product_list,
                                        productNewList.product_list[index] = item
                                    ]
                                })
                                let idx;
                                if (index % 3 === 0)
                                    idx = index / 3
                                else
                                    idx = parseInt(index / 3) + 1
                                setSwiperList(
                                    [
                                        ...swiperList,
                                        swiperList[1] = [idx, 1]
                                    ]
                                )
                            } else {
                                return
                            }
                        })

                        cookie.save('store_name', restData.data.store_info.store_name);

                        setLoading(false)

                        new Swiper(".swiper-container", {
                            slidesPerView: (750 / 654),
                            centeredSlides: true,
                            spaceBetween: 10,
                            watchSlidesProgress: true,
                            pagination: {
                                el: '.swiper-pagination',
                            },
                            on: {
                                slideChange: function () {
                                    this.$el.find(".swiper-num span").text(this.realIndex + 1)
                                }
                            }
                        });

                        new Swiper(".swiper-mini", {
                            slidesPerView: (750 / 654) * 3,
                            slidesPerGroup: 3,
                            spaceBetween: 10,
                            pagination: {
                                el: '.swiper-pagination',
                                type: "progressbar",
                            },
                            on: {
                                slideChange: function () {
                                    if (this.realIndex + 1 === 4)
                                        this.$el.find(".swiper-slide").eq(0).removeClass("right_one");
                                    else if (Number(this.realIndex + 4) === this.$el.find(".swiper-slide").length)
                                        this.$el.find(".swiper-slide").eq(0).addClass("right_one");

                                    let idx;
                                    if (this.realIndex % 3 === 0)
                                        idx = this.realIndex / 3
                                    else
                                        idx = parseInt(this.realIndex / 3) + 1

                                    this.$el.find(".swiper-num span").text(idx)
                                }
                            }
                        });
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
        <div className={getUrlData('jordan') ? "CommodityIndex jordan" : "CommodityIndex"}>
            <h2>{cookie.load('store_name')}</h2>
            <div className={"RotationBigImg"}>
                <div className={"swiper-container carousel"}>
                    <div className="swiper-wrapper carousel-box">
                        {
                            productNewList.data.map((item, index) => {
                                return <div className="carousel-item swiper-slide" key={index} onClick={() => {
                                    if(item.link_url)
                                        props.history.push(item.link_url)
                                }}>
                                    <img alt={''} src={item.image_path}/>
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
            <h1>店铺新品<span onClick={() => {
                props.history.push("/commodity/list" + props.location.search)
            }}>全部主推产品</span></h1>
            <div className="RotationBigImg">
                <div className="swiper-mini carousel">
                    <div className="swiper-wrapper carousel-box">
                        {
                            productNewList.product_list.map((item, index) => {
                                return <div
                                    className={index === 0 ? "carousel-item swiper-slide left_one" : "carousel-item swiper-slide"}
                                    key={index} onClick={() => {
                                    props.history.push("/commodity/details?store_id=" + getUrlData("store_id") + "&product_code=" + item.product_code)
                                }}>
                                    <img alt={''} src={item.thumbnail}/>
                                    <h4>{item.product_name}</h4>
                                    <p>¥ {item.price}</p>
                                </div>
                            })
                        }
                    </div>
                    <div className="index-container">
                        <div className={"swiper-pagination"}/>
                        <span className="swiper-num"><span>{swiperList[1][1]}</span>/{swiperList[1][0]}</span>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default CommodityIndex;
