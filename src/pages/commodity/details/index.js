import React, {useState, useEffect} from "react";
import axios from "axios";
import LocalStore from '../../../util/localStore';
import Headers from "../../../components/headers";

import "../../../assets/css/pages/commodity/details/style.css";
import img from "../../../assets/images/sp.jpg";
import {getUrlData} from "../../../config/common";

const CommodityDetails = (props) => {

    // loading
    const [loading, setLoading] = useState(true);

    // userInfo
    const [userInfo, setUserInfo] = useState({
        isAj: !!getUrlData('jordan', props.location.search),
        store_id: parseInt(getUrlData('store_id', props.location.search)),
        store_name: ''
    });

    // initData
    const [state, setState] = useState({
        header_type: 'home',
        title: '商品详情',
        product_code: getUrlData('product_code', props.location.search),
        product_name: '名字',
        price: '金额',
        product_color: {
            0: {
                "color_image": {
                    0: {"img":"url"}
                },
                "sku": "款式详细编号"
            }
        },
        product_description:'商品简介'
    });

    // product Img Index
    const [productIndex, setProductIndex] = useState(0);

    useEffect(() => {
        if (loading) {
            axios.get("/product/default/view-product?store_id=" + userInfo.store_id + '&product_code=' + state.product_code).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        setState({
                            ...state,
                            ...resData.data,
                        })
                        setUserInfo({
                            ...userInfo,
                            store_name: LocalStore.getItem("store_name")
                        })
                        setLoading(false)
                    }
                    console.log(resData)

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
        <div className="CommodityDetails">
            {console.log(state)}
            <Headers userInfo={userInfo} state={state}/>
            <div className={'big_title'}>
                <span>{state.product_name}</span>
                建议零售价<br/>¥ {state.price}
            </div>
            <div className={'big_image'}>
                <ul>
                    {
                        state.product_color[productIndex].color_image.map((item, index) => {
                            return <li key={index}><img alt={''} src={item.img}/></li>
                        })
                    }
                </ul>
            </div>
            <div className={'small_image'}>
                <ul>
                    {
                        state.product_color.map((item, index) => {
                            return <li onClick={()=>{
                                setProductIndex(index)
                            }} key={index}><img alt={''} src={item.color_image[0].img}/></li>
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
            <div className={'btn_box'}>
                <ul>
                    <li onClick={()=>{
                        props.history.push("/commodity/appointment"+ props.location.search + "&type=" + 1)
                    }}>预留产品</li>
                    <li onClick={()=>{
                        props.history.push("/commodity/appointment"+ props.location.search + "&type=" + 0)
                    }}>预约试穿</li>
                </ul>
            </div>
        </div>
    )

}

export default CommodityDetails;
