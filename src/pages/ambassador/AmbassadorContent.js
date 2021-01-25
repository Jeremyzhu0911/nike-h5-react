import React, {useState, useEffect} from "react";
import cookie from 'react-cookies';
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import Swiper from "swiper";


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
                enName: ''
            }
        ]
    })

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (loading) {
            if (getUrlData('store_id')) {
                const url = '/ambassador/site/get-ambassador-list?store_id=' + getUrlData('store_id');
                axios.get(url).then(
                    (res) => {
                        let resData = res.data;
                        if (Number(resData.code) === 200) {
                            console.log(resData.data);

                            cookie.save('store_name', resData.data.store.store_name)

                            setStateData(resData.data)

                            setLoading(false)

                            if (resData.data.am_list.length < 4) {
                                new Swiper(".swiper-container", {
                                    slidesPerView: (750 / 654) * 4,
                                    slidesPerGroup: 1,
                                    spaceBetween: 5,
                                    on: {
                                        slideChange: function () {
                                            console.log(this.realIndex)
                                            console.log(this.$el.find(".swiper-slide").length)
                                            if (this.realIndex + 1 === 1)
                                                this.$el.find(".swiper-slide").eq(0).removeClass("right_one");
                                            else if (Number(this.realIndex + 1) === this.$el.find(".swiper-slide").length)
                                                this.$el.find(".swiper-slide").eq(0).addClass("right_one");
                                        }
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
        <div className="AmbassadorContent">
            <h2>{cookie.load('store_name')}</h2>
            <div className={'list swiper-container'}>
                <ul className={
                    stateData.am_list.length === 2 ? "ul_align1 swiper-wrapper" :
                        stateData.am_list.length === 3 ? "ul_align2 swiper-wrapper" : "ul_align3 swiper-wrapper"
                }>
                    {
                        stateData.am_list.map((item, index) => {
                            return <li key={index} className={index === 0 ? 'swiper-slide left_one' : 'swiper-slide'}
                                       onClick={() => {
                                           setTabIndex(index)
                                       }}>
                                <div className={'images'}>
                                    <img alt={''} src={item.imgUrl}/>
                                </div>
                                <h4>{item.cnName}</h4>
                                <p>标签</p>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className={'synopsis'}>
                <div className={'images'}>
                    <img alt={''} src={stateData.am_list[tabIndex].imgUrl}/>
                </div>
                <h4>{stateData.am_list[tabIndex].cnName}</h4>
                <p>标签 <span onClick={() => {
                    props.history.push("/details-ambassador" + props.location.search + "&ambassador_id=" + stateData.am_list[tabIndex].id)
                }}>了解详情</span></p>
            </div>
        </div>
    )

}

export default AmbassadorContent;
