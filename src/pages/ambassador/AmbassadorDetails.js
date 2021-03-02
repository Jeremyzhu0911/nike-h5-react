import React, {useState, useEffect} from "react";
import {getUrlData} from "../../util/getUrlData";
import addTag from "../../util/addTag";
import axios from "axios";
import cookie from "react-cookies";
import Swiper from "swiper";
import WeiXin from "../../server/wx.config";
import DataTracking from "../../util/DataStatistics";

const AmbassadorDetails = (props) => {

    const [loading, setLoading] = useState(true);

    const [swiperList, setSwiperList] = useState([9, 1]);

    const [showBigSwiper, setShowBigSwiper] = useState(false)

    const [AmbassadorDetailsData, setAmbassadorDetailsData] = useState({
        store_info: {
            store_name: ''  //店铺名称
        },
        am_info: {  //专家详情
            id: '',     //专家ID
            imgUrl: '',     //专家照片
            cnName: '',     //名字
            enName: '',    // 标签
            msg: ''      //专家简介
        },
        file_list: [ //更多
            {
                info_id: '',
                imgUrl: ''
            }
        ]
    })

    const [paragraphHide, setParagraphHide] = useState(true);
    const [imgHide, setImgHide] = useState(true);

    useEffect(() => {
        if (loading) {
            if (getUrlData('ambassador_id')) {
                const url = '/ambassador/site/view-ambassador?id=' + getUrlData('ambassador_id');
                axios.get(url).then(
                    (res) => {
                        let restData = res.data;
                        if (Number(restData.code) === 200) {

                            cookie.save('store_name', restData.data.store_info.store_name)
                            cookie.save('ambassadorName', restData.data.am_info.cnName)

                            setAmbassadorDetailsData(restData.data)

                            WeiXin.share("我正在体验Nike专属顾问服务，快来预约你的专属顾问", window.location.href, restData.data.store_info.share_img, "了解更多Nike专属惊喜")

                            setLoading(false)

                            addTag(restData.data.am_info.relation_id)
                        }
                    }, (error) => {
                        console.log(error)
                        return props.history.push("/500")
                    }
                )
            } else {
                return props.history.push("/404")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    useEffect(() => {
        if (showBigSwiper) {

            setSwiperList(
                [AmbassadorDetailsData.file_list.length, 1]
            )

            new Swiper(".swiper-container", {
                slidesPerView: (750 / 654),
                centeredSlides: true,
                spaceBetween: 10,
                watchSlidesProgress: true,
                pagination: {
                    el: '.swiper-pagination',
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
        }
    }, [showBigSwiper])

    if (loading)
        return (<div>loading</div>)

    return (
        <div className={parseInt(getUrlData("jordan")) === 1 ? "AmbassadorDetails jordan" : "AmbassadorDetails"}>
            <div className={"StoreName"}>{cookie.load('store_name')}</div>
            <div className={'content'}>
                <h4>{AmbassadorDetailsData.am_info.cnName}</h4>
                <h5>{AmbassadorDetailsData.am_info.tag ? AmbassadorDetailsData.am_info.tag : "Nike"}大使</h5>
                <div className={'big_img'}>
                    <img alt={''} src={AmbassadorDetailsData.am_info.imgUrl}/>
                </div>
                <div className={paragraphHide ? 'paragraph' : 'paragraph on'}>
                    <p dangerouslySetInnerHTML={{__html: AmbassadorDetailsData.am_info.msg}}/>
                    {
                        AmbassadorDetailsData.am_info.msg ? <span onClick={() => {
                            setParagraphHide(!paragraphHide)
                        }}>展开+</span> : null
                    }
                </div>
            </div>
            <div className={AmbassadorDetailsData.file_list.length > 6 && imgHide ? 'img_list' : 'img_list on'}>
                <ul>
                    {
                        AmbassadorDetailsData.file_list.map((item, index) => {
                            return <li key={index} onClick={() => {
                                DataTracking.GAPage(" | 专属顾问 | " + AmbassadorDetailsData.am_info.cnName + "照片");
                                setShowBigSwiper(!showBigSwiper)
                            }}>
                                <img alt={''} src={item.imgUrl}/>
                            </li>
                        })
                    }
                </ul>
                {
                    AmbassadorDetailsData.file_list.length > 6 && <span onClick={() => {
                        setImgHide(!imgHide)
                    }}>展开+</span>
                }
            </div>
            <div className={'order'}>
                <div className="btn" onClick={() => {
                    DataTracking.GAEvent('专属顾问 | ' + AmbassadorDetailsData.am_info.cnName, AmbassadorDetailsData.am_info.cnName + " 预约大使");
                    DataTracking.GAPage(" | 大使预约 | " + AmbassadorDetailsData.am_info.cnName);
                    props.history.push("/appointment" + props.location.search + "&is_ambassador=1")
                }}>
                    预约此顾问
                </div>
            </div>
            {
                showBigSwiper ?
                    <div className={"bigSwiper"}>
                        <h2>{cookie.load('store_name')}</h2>
                        <h4>{AmbassadorDetailsData.am_info.cnName} <span className={"iconfont icon-close"}
                                                                         onClick={() => {
                                                                             setShowBigSwiper(!showBigSwiper)
                                                                         }}/></h4>
                        <h5>{AmbassadorDetailsData.am_info.enName}</h5>
                        <div className={"RotationBigImg"}>
                            <div className={"swiper-container carousel"}>
                                <div className="swiper-wrapper carousel-box">
                                    {
                                        AmbassadorDetailsData.file_list.map((item, index) => {
                                            return <div className="carousel-item swiper-slide" key={index}>
                                                <img alt={''} src={item.imgUrl}/>
                                            </div>
                                        })
                                    }
                                </div>
                                <div className="index-container">
                                    <div className={"swiper-pagination"}/>
                                    <span className="swiper-num swiper-numCL"><span>{swiperList[1]}</span>/{swiperList[0]}</span>
                                </div>
                            </div>
                        </div>
                    </div> : null
            }

        </div>
    )

}

export default AmbassadorDetails;
