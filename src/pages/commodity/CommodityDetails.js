import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";

import {getUrlData} from "../../util/getUrlData";
import Swiper from "swiper";
import addTag from "../../util/addTag";
import DataTracking from "../../util/DataStatistics";
import WeiXin from "../../server/wx.config";

const CommodityDetails = (props) => {

    // loading
    const [loading, setLoading] = useState(true);

    // initData
    const [state, setState] = useState({
        title: '商品详情',
        product_code: '',
        product_name: '名字',
        price: '金额',
        product_color: {
            0: {
                "color_image": {
                    0: {"img": "url"}
                },
                "sku": "款式详细编号"
            }
        },
        product_description: '商品简介',
        is_favorite: 0
    });

    // product Img AmbassadorAppointment
    const [productIndex, setProductIndex] = useState(0);

    const [collectionBtn,setCollectionBtn] = useState(false)

    useEffect(() => {
        if (loading) {
            axios.get("/product/default/view-product?store_id=" + getUrlData('store_id') + '&product_code=' + getUrlData('product_code')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        setState({
                            ...state,
                            ...resData.data,
                        })
                        let is_favorite = [];
                        resData.data.product_color.forEach((t,i)=>{
                            is_favorite[i] =  !!t.is_favorite
                        })
                        setCollectionBtn(is_favorite)
                        DataTracking.GAPage(getUrlData('product_code'))
                        WeiXin.share(resData.data.product_name + "，新鲜尖货快来看", window.location.href, resData.data.product_color[0].color_image[0].img, "Nike出道新品，点击获取最新资讯",`产品详情页分享｜${resData.data.product_name}`);
                        setLoading(false)

                        addTag(resData.data.relation_id)
                    }

                    new Swiper(".swiper-container", {
                        slidesPerView: 1,
                        centeredSlides: true,
                        spaceBetween: 0,
                        watchSlidesProgress: true,
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    });

                },
                (error) => {
                    console.log(error)
                    props.history.push("/404")
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    if (loading) {
        return (<div>正在加载...</div>)
    }

    return (
        <div className={parseInt(cookie.load('jordan')) === 1 ? "CommodityDetails jordan" : "CommodityDetails"}>
            <div className={'headers'}>
                <div className="name">
                    {cookie.load('store_name')}
                    <div className={'nav'}><i onClick={() => {
                        DataTracking.GAEvent(state.product_name, '返回首页');
                        DataTracking.BDEvent(state.product_name,'返回首页');
                        props.history.push("/commodity/index?store_id=" + getUrlData("store_id"))
                    }} className={'iconfont icon-home'}/></div>
                </div>
            </div>
            <div className={'big_title'}>
                <span>{state.product_name}</span>
                建议零售价<br/>¥ {state.price}
            </div>
            <div className={'big_image swiper-container'}>
                <ul className={"swiper-wrapper"}>
                    {
                        state.product_color[productIndex].color_image.map((item, index) => {
                            return <li key={index} className={"swiper-slide"}><img alt={''} src={item.img}/></li>
                        })
                    }
                </ul>
                <div className={"swiper-pagination"}></div>
            </div>
            <div className={'small_image'}>
                <ul className={'image_list'}>
                    {
                        state.product_color.map((item, index) => {
                            if (item.color_image[0])
                                return <li onClick={() => {
                                    setProductIndex(index)
                                }} key={index} className={productIndex === index?'on':null}><img alt={''} src={item.color_image[0].img}/></li>
                        })
                    }
                </ul>
            </div>
            <div className={'briefly'}>
                <h3>商品简介</h3>
                <div className={'briefly_content'}>
                    <p dangerouslySetInnerHTML={{__html: state.product_description}}/>
                    <br/>
                    <p>敬请注意，同款但不同配色的商品有可能在材质等方面有些许差异，本页面中的商品介绍内容及建议零售价仅供参考，商品具体信息请以门店实物展示为准。</p>
                    <br/>
                    <p>款式：{state.product_color[0].sku}</p>
                    <br/>
                    <br/>
                </div>
            </div>
            <div className={'Collection_btn'}>
                <span onClick={()=>{
                    axios({
                        url: collectionBtn[productIndex]?"/product/default/remove-favorite":"/product/default/add-favorite",
                        method: "post",
                        data: {
                            store_id:getUrlData('store_id'),
                            sku: state.product_color[productIndex].sku
                        },
                        transformRequest: [
                            function (data) {
                                let ret = "";
                                for (let it in data) {
                                    ret +=
                                        encodeURIComponent(it) +
                                        "=" +
                                        encodeURIComponent(data[it]) +
                                        "&";
                                }
                                return ret;
                            },
                        ],
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }).then(
                        (res) => {
                            let resData = res.data;
                            if (Number(resData.code) === 200) {
                                console.log(resData)
                            } else {
                                alert(resData.message);
                            }
                        }
                    )

                    let list = collectionBtn;
                    list.splice(productIndex, 1,!collectionBtn[productIndex]);

                    setCollectionBtn([...list])
                }}>收藏 <i className={collectionBtn[productIndex] ?'iconfont icon-collection_on':'iconfont icon-collection_off'}/></span>
            </div>
            {/*<div className={'btn_box'}>*/}
            {/*    <ul>*/}
            {/*        <li onClick={() => {*/}
            {/*            DataTracking.GAEvent(state.product_name,'预留产品' + state.product_code);*/}
            {/*            DataTracking.BDEvent(state.product_name,'预留产品 | ' + state.product_code);*/}
            {/*            DataTracking.GAPage("预留产品 | " + state.product_code)*/}
            {/*            props.history.push("/commodity/appointment" + props.location.search + "&type=" + 1)*/}
            {/*        }}>预留产品*/}
            {/*        </li>*/}
            {/*        <li onClick={() => {*/}
            {/*            DataTracking.GAEvent(state.product_name,'预约试穿' + state.product_code);*/}
            {/*            DataTracking.BDEvent(state.product_name,'预约试穿 | ' + state.product_code);*/}
            {/*            DataTracking.GAPage("预约试穿 | " + state.product_code)*/}
            {/*            props.history.push("/commodity/appointment" + props.location.search + "&type=" + 0)*/}
            {/*        }}>预约试穿*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    )

}

export default CommodityDetails;
