import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";

import {getUrlData} from "../../util/getUrlData";

import Swiper from 'swiper';

const CommodityFashion = (props) => {

    const [loading, setLoading] = useState(true);

    const [swiperList,setSwiperList] = useState([]);

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
                        restDate.data.data.forEach((item,index)=>{
                            imgLength[index] = [item.images.length,1]
                        })
                        setSwiperList(imgLength)

                        setStateDate(restDate.data.data)

                        setLoading(false)

                        new Swiper(".swiper-container", {
                            slidesPerView: (750 / 654),
                            centeredSlides: true,
                            spaceBetween: 10,
                            watchSlidesProgress: true,
                            pagination: {
                                el: '.swiper-pagination',
                            },
                            on:{
                                slideChange:function (){
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
    }, [loading])

    if (loading) {
        return (<div>正在加载中</div>)
    }

    return (
        <div className="CommodityFashion">
            <h2>上海长宁来福士NIKE体验店</h2>
            {
                stateDate.map((stateList, index) => {
                    return <div key={index}>
                        <h1>{stateList.title}</h1>
                        <h4>{stateList.subtitle}</h4>
                        <div className={"RotationBigImg"}>
                            <div className={"swiper-container carousel"}>
                                <div className="swiper-wrapper carousel-box">
                                    {
                                        stateList.images.length >= 1?
                                        stateList.images.map((item, index) => {
                                            return <div className="carousel-item swiper-slide" key={index}>
                                                <img alt={''} src={item}/>
                                            </div>
                                        }) : <div className="carousel-item swiper-slide">
                                                <img alt={''} src={stateList.article_img}/>
                                            </div>
                                    }
                                </div>
                                <div className="index-container">
                                    <div className={"swiper-pagination"}/>
                                    <span className="swiper-num"><span>{swiperList[index][1]}</span>/{swiperList[index][0]}</span>
                                </div>
                            </div>

                        </div>
                        <input type="submit" value="查看穿搭" onClick={()=>{
                            window.location.href = stateList.link
                        }} className="s_btn"/>
                    </div>
                })
            }
        </div>
    );
}

export default CommodityFashion;
