import React, {useState, useEffect} from "react";
import cookie from 'react-cookies';
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import Swiper from 'swiper';
import WeiXin from "../../server/wx.config";

let swiperList;
let productSku = [];

const CommodityIndex = (props) => {

    const [loading, setLoading] = useState(true)

    const [choice, setChoice] = useState(false)

    const [page,setPage] = useState(1)

    const [productData, setProductData] = useState({
        data_list:[],
        page_info:{}
    })

    useEffect(() => {
        if (loading) {
            axios.get("/product/default/get-favorite-list?store_id=" + getUrlData('store_id')+"&page=" + page).then(
                (res) => {
                    let restData = res.data;
                    if (Number(restData.code) === 200) {
                        restData.data.data_list.forEach((T)=>{
                            T.choice = false
                        })
                        setProductData({
                            ...restData.data
                        })

                        WeiXin.share("我的收藏宝贝，快来瞧瞧吧", window.location.href, restData.data.store_image, "是不是也有你中意的？",`我的心愿单分享`);

                        setLoading(false)

                        swiperList = new Swiper(".swiper-container", {
                            slidesPerView: 'auto',
                            initialSlide: 0,
                            resistanceRatio: 0,
                            slideToClickedSlide: true,
                            preventInteractionOnTransition: true,
                            noSwiping: true,
                            on: {
                                slideChangeTransitionStart: function () {
                                    let slider = this;
                                    if (slider.activeIndex === 0) {
                                        // menuButton.classList.add('cross');
                                        // // required because of slideToClickedSlide
                                        // menuButton.removeEventListener('click', openMenu, true);
                                        console.log('选择？')
                                        console.log(slider.activeIndex)
                                    } else if (slider.activeIndex === 2) {
                                        console.log('删除？')
                                        // menuButton.classList.remove('cross');
                                    } else {
                                        console.log('原点')
                                    }
                                },
                                slideChangeTransitionEnd: function () {
                                    let slider = this;
                                    if (slider.activeIndex === 1) {
                                        // menuButton.addEventListener('click', openMenu, true);
                                        console.log('回来了')
                                        console.log(slider.activeIndex)
                                    }
                                },
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
        <div className={parseInt(cookie.load('jordan')) === 1 ? "CollectionIndex jordan" : "CollectionIndex"}>
            <div className={"StoreName"}>{cookie.load('store_name')}</div>
            {
                !productData.data_list.length ?  <div className={"noCollection"}>暂无收藏记录</div> :null
            }

            {
                productData.data_list.map((item, index) => {
                    return <div className={"Collection_box"} key={index}>
                        {
                            !!Number(item.status)?
                            choice ? <div className={ item.choice ? "choice iconfont icon-choiceOn":"choice iconfont icon-choiceOff"}  onClick={()=>{
                                let list = productData.data_list
                                list[index].choice = !item.choice
                                setProductData({
                                    ...productData,
                                    data_list:list
                                })
                                if(productSku.length < 4){
                                    if(item.choice){
                                        productSku.splice(productSku.length, 1,item.sku);
                                    }else{
                                        productSku.splice(productSku.indexOf(item.sku),1)
                                    }
                                }
                                console.log("创建一个分享")
                                console.log(productSku)
                            }}/> : null :null
                        }
                        <div className={"Collection_List"}>
                            <div className={"swiper-container"}>
                                <div className={choice ? "swiper-wrapper swiper-no-swiping" : "swiper-wrapper"}>
                                    <div className="swiper-slide list_content">
                                        <img alt=""
                                             src={item.thumbnail}/>
                                        <div className={"list_txt"}>
                                            <h4>{item.product_name}</h4>
                                            <p>{item.sku}</p>
                                            <span>¥ {item.price}</span>
                                        </div>
                                        <div className="Collection_off">
                                            {!!Number(item.status)?"已收藏":"已下架"}
                                        </div>
                                        {!Number(item.status)?<div className={"mask"}/>:null}

                                    </div>

                                    <div className="swiper-slide list_del" onClick={()=>{
                                        console.log("删除")
                                        console.log(item.sku)
                                        axios({
                                            url: "/product/default/remove-favorite",
                                            method: "post",
                                            data: {
                                                store_id:getUrlData('store_id'),
                                                sku: item.sku
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
                                                    let list = productData.data_list;
                                                    list.splice(index, 1);
                                                    setProductData({
                                                        ...productData,
                                                        data_list:list
                                                    })
                                                    swiperList[index].setTranslate(0);
                                                } else {
                                                    alert(resData.message);
                                                }
                                            }
                                        )
                                    }}>
                                        删除
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
            <div className={'btn'} onClick={() => {
                for (let i = 0; i < swiperList.length; i++) {
                    swiperList[i].setTranslate(0);
                }
                if(productSku.length > 0){
                    if (choice) {
                        console.log('选择完了')

                        axios({
                            url: "/product/default/add-wishlist",
                            method: "post",
                            data: {
                                store_id:getUrlData('store_id'),
                                skus: productSku
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
                                    props.history.push("/collection/share" + props.location.search + "&share_id=" + resData.data.share_id);
                                } else {
                                    alert(resData.message);
                                }
                            }
                        )
                    }
                }
                setChoice(!choice)
            }}>
                生成我的心愿单
            </div>
        </div>
    )
}

export default CommodityIndex;
