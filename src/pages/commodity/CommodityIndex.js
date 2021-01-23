import React, {useState, useEffect} from "react";
import cookie from 'react-cookies';
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import Swiper from 'swiper';
import img from "../../assets/images/minImg.png";

const CommodityIndex = (props) => {

    const [loading, setLoading] = useState(true)

    const [swiperList, setSwiperList] = useState([]);

    const [CommodityIndexData, setCommodityIndexData] = useState({
        title: '最新上市',
        listAll: [
            {
                image_path: ''
            }
        ],
        listSwiper: [],
        realListSwiper: [],
        listBox: [],
        listSBox: [],
    })

    useEffect(() => {
        if (loading) {
            axios.get("/product/default/index?store_id=" + getUrlData('store_id')).then(
                (res) => {
                    let restDate = res.data;
                    if (Number(restDate.code) === 200) {
                        let imgLength = [];
                        setCommodityIndexData({
                            ...CommodityIndexData,
                            listAll: restDate.data.data,
                        });

                        restDate.data.data.forEach((item,index)=>{
                            imgLength[index] = [restDate.data.data.length,1]
                        })
                        setSwiperList(imgLength)

                        cookie.save('store_name', restDate.data.store_info.store_name);

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
                            },
                            on: {
                                slideChange: function () {
                                    if(this.realIndex + 1 === 4)
                                        this.$el.find(".swiper-slide").eq(0).removeClass("right_one");
                                    else if(Number(this.realIndex + 4) === this.$el.find(".swiper-slide").length)
                                        this.$el.find(".swiper-slide").eq(0).addClass("right_one");

                                    this.$el.find(".swiper-num span").text(this.realIndex + 1)
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
        <div className={!!getUrlData('jordan') ? "CommodityIndex jordan" : "CommodityIndex"}>
            <h2>{cookie.load('store_name')}</h2>
            {/*<BigImg {...props} data={CommodityIndexData}/>*/}
            <div className={"RotationBigImg"}>
                <div className={"swiper-container carousel"}>
                    <div className="swiper-wrapper carousel-box">
                        {
                            CommodityIndexData.listAll.map((item, index) => {
                                return <div className="carousel-item swiper-slide" key={index}>
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
                        <div className="swiper-slide carousel-item left_one">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="swiper-slide carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="swiper-slide carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="swiper-slide carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="swiper-slide carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="swiper-slide carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="swiper-slide carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="swiper-slide carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                    </div>
                    <div className="index-container">
                        <div className={"swiper-pagination"}/>
                        <span className="swiper-num"><span>{swiperList[0][1]}</span>/{swiperList[0][0]}</span>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default CommodityIndex;
