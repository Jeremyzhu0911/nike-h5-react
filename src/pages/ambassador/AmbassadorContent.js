import React, {useState, useEffect} from "react";
import cookie from 'react-cookies';
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import Swiper from "swiper";
import defaultImd from "../../assets/images/ambassadorImd.jpg";
import DataTracking from "../../util/DataStatistics";
import WeiXin from "../../server/wx.config";


const AmbassadorContent = (props) => {

    const [loading, setLoading] = useState(true);

    const [stateData, setStateData] = useState({
        store: {
            store_name: ''
        },
        am_list: [
            {
                id: '',
                imgUrl: '',
                cnName: '',
                enName: '',
                tag: ''
            }
        ]
    })

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (loading) {
            if (getUrlData('store_id')) {
                let url = '/ambassador/site/get-ambassador-list?store_id=' + getUrlData('store_id');
                axios.get(url).then(
                    (res) => {
                        let restData = res.data;
                        if (Number(restData.code) === 200) {

                            cookie.save('store_name', restData.data.store.store_name)

                            setStateData(restData.data)

                            DataTracking.GAPage(' | 专属顾问')

                            WeiXin.share("我在体验Nike个性化服务，快来预约你的专属时刻", window.location.href, restData.data.store.share_img, "尽享更多专属服务")

                            setLoading(false)

                            if (restData.data.am_list.length > 4) {
                                new Swiper(".swiper-container", {
                                    slidesPerView: 3,
                                    slidesPerGroup: 1,
                                    on: {
                                        init: function () {
                                            this.$el.find("h4,p").css("width", this.slides.css('width'))
                                        },
                                        click: function () {
                                            if(this.clickedIndex >= 0)
                                                this.$el.find(".swiper-slide").removeClass("on").eq(this.clickedIndex).addClass("on")
                                        }
                                        // slideChange: function(){
                                        //     this.$el.find(".swiper-slide").removeClass("on").eq(this.activeIndex).addClass("on");
                                        //     this.$el.find(".swiper-slide").eq(this.activeIndex).trigger("click")
                                        // },
                                    }
                                });
                            }
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

    if (loading)
        return (<div>loading</div>)

    return (
        <div className={parseInt(getUrlData("jordan")) === 1 ? "AmbassadorContent jordan" : "AmbassadorContent"}>
            <div className={"StoreName"}>{cookie.load('store_name')}</div>
            <div className={'list swiper-container'}>
                <ul className={
                    stateData.am_list.length === 2 ? "ul_align1 swiper-wrapper" :
                        stateData.am_list.length === 3 ? "ul_align2 swiper-wrapper" : "ul_align3 swiper-wrapper"
                }>
                    {
                        stateData.am_list.map((item, index) => {
                            return <li key={index} className={index === 0 ? 'swiper-slide on': 'swiper-slide'}>
                                <div className={'images'}>
                                    <img onClick={() => {
                                        setTabIndex(index)
                                    }} alt="" src={item.imgUrl ? item.imgUrl : defaultImd}/>
                                </div>
                                <h4>{item.cnName}</h4>
                                <p>{item.tag? item.tag : 'Nike'}大使</p>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className={'synopsis'}>
                <div className={'images'}>
                    <img alt={''}
                         src={stateData.am_list[tabIndex].imgUrl ? stateData.am_list[tabIndex].imgUrl : defaultImd}/>
                </div>
                <h4>{stateData.am_list[tabIndex].cnName}</h4>
                <p>{stateData.am_list[tabIndex].tag}大使 <span onClick={() => {
                    DataTracking.GAEvent('专属顾问', stateData.am_list[tabIndex].cnName);
                    DataTracking.GAPage(" | 专属顾问 | " + stateData.am_list[tabIndex].cnName);
                    props.history.push("/details-ambassador" + props.location.search + "&ambassador_id=" + stateData.am_list[tabIndex].id)
                }}>了解详情</span></p>
            </div>
        </div>
    )
}

export default AmbassadorContent;
