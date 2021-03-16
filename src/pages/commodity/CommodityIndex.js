import React, {useState, useEffect} from "react";
import cookie from 'react-cookies';
import axios from "axios";
import {getLinkUrl, getUrlData} from "../../util/getUrlData";
import Swiper from 'swiper';
import DataTracking from "../../util/DataStatistics"
import WeiXin from "../../server/wx.config"

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
                                        ...swiperList,
                                        swiperList[0] = [index + 1, 1]
                                    ]
                                )
                            }
                        })
                        let maxlength = restData.data.product_list.length;

                        if (maxlength <= 9) {
                            if (maxlength % 3 === 1) {
                                restData.data.product_list.push(
                                    {
                                        id: "",
                                        owner_id: "",
                                        owner_type: "",
                                        product_code: "",
                                        product_name: "",
                                        thumbnail: "",
                                        price: ""
                                    }
                                )
                                restData.data.product_list.push(
                                    {
                                        id: "",
                                        owner_id: "",
                                        owner_type: "",
                                        product_code: "",
                                        product_name: "",
                                        thumbnail: "",
                                        price: ""
                                    }
                                )
                            } else if (maxlength % 3 === 2)
                                restData.data.product_list.push(
                                    {
                                        id: "",
                                        owner_id: "",
                                        owner_type: "",
                                        product_code: "",
                                        product_name: "",
                                        thumbnail: "",
                                        price: ""
                                    }
                                )

                            setProductNewList({
                                ...productNewList,
                                product_list: restData.data.product_list
                            })
                        } else {
                            restData.data.product_list.map((item, index) => {
                                if (index < 9) {
                                    setProductNewList({
                                        ...productNewList,
                                        product_list: [
                                            ...productNewList.product_list,
                                            productNewList.product_list[index] = item
                                        ]
                                    })
                                }
                            })
                        }

                        setSwiperList(
                            [
                                ...swiperList,
                                swiperList[1] = [maxlength, 1]
                            ]
                        )

                        cookie.save('store_name', restData.data.store_info.store_name);
                        DataTracking.GAPage('最新上市')

                        WeiXin.share("不可错过的Nike尖货，我正在看", window.location.href, restData.data.store_info.share_img, "点击获取Nike最新资讯",'列表页分享｜最新上市')

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
                                    this.$el.find(".swiper-num span").text(this.realIndex + 1)
                                }
                            }
                        });

                        new Swiper(".swiper-mini", {
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                            spaceBetween: 10,
                            pagination: {
                                el: '.swiper-pagination',
                                // type: "bullets",
                                renderBullet: function (index) {

                                    maxlength = (this.slides.length % 3 === 0 ? this.slides.length / 3 : parseInt(this.slides.length / 3) + 1)

                                    setSwiperList(
                                        [
                                            ...swiperList,
                                            swiperList[1] = [maxlength, 1]
                                        ]
                                    )
                                    return '<span class="swiper-pagination-bullet" style="width:' + 100 / maxlength + '%">' + (index + 1) + '</span>';
                                }
                            },
                            on: {
                                slideChange: function () {
                                    this.$el.find(".swiper-num span").text(this.realIndex / 3 + 1)
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
        <div className={parseInt(cookie.load('jordan')) === 1 ? "CommodityIndex jordan" : "CommodityIndex"}>
            <div className={"StoreName"}>{cookie.load('store_name')}</div>
            <div className={"RotationBigImg"}>
                <div className={"swiper-container carousel"}>
                    <div className="swiper-wrapper carousel-box">
                        {
                            productNewList.data.map((item, index) => {
                                return <div className="carousel-item swiper-slide" key={index} onClick={() => {
                                    if (item.link_url) {
                                        DataTracking.GAEvent('最新上市', '海报 ｜ ' + getLinkUrl("product_code", item.link_url));
                                        DataTracking.BDEvent('最新上市', '海报 ｜ ' + getLinkUrl("product_code", item.link_url));
                                        window.location.href = item.link_url;
                                    }

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
                DataTracking.GAEvent('最新上市', '全部主推产品');
                DataTracking.BDEvent('最新上市', '全部主推产品');
                props.history.push("/commodity/list" + props.location.search);
            }}>全部主推产品</span></h1>
            <div className="RotationBigImg">
                <div className="swiper-mini carousel">
                    <div className="swiper-wrapper carousel-box">
                        {
                            productNewList.product_list.map((item, index) => {
                                return <div
                                    className={"carousel-item swiper-slide"}
                                    key={index} onClick={() => {
                                    if(item.product_code){
                                        DataTracking.GAEvent('最新上市', '店铺新品 ｜ ' + item.product_code);
                                        DataTracking.BDEvent('最新上市', '店铺新品 ｜ ' + item.product_code);
                                        props.history.push("/commodity/details?store_id=" + getUrlData("store_id") + "&product_code=" + item.product_code);
                                    }

                                }}>
                                    <img alt={''} src={item.thumbnail}/>
                                    <h4>{item.product_name}</h4>
                                    <p>{item.price && "¥ " + item.price}</p>
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
