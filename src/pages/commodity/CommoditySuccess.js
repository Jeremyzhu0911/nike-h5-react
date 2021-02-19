import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import {getUrlData} from "../../util/getUrlData";
import axios from "axios";
import FollowPop from "../../components/FollowPop";

const CommoditySuccess = (props) => {

    ///commodity/success?type=2&booking_id=179&is_subscribe=0&status=0&jordan=1

    const [loading, setLoading] = useState(true);

    const [stateData, setStateData] = useState({
        type: Number(getUrlData('type')),   //  1 预约试穿 2 预留产品
        data: {
            book_day: "",
            book_type: '',
            booking_id: '',
            checkin_qrcode: "",
            checkin_status: 0,
            color_name: "",
            gender: 1,
            mobile: "",
            prize: "",
            product_img: "",
            product_name: "Nike F.C. 男子足球T恤",
            qrcode: "",
            size: "M",
            sku: "",
            status: 0,
            store_id: '',
            store_info: {store_name: "", shop_unique_id: "", share_img: ""},
            store_latitude: '',
            store_longitude: '',
            store_name: "",
            user_name: "",
        }
    })

    const [showHide, setShowHide] = useState(false)
    useEffect(() => {
        console.log('超时', showHide)
    }, [showHide])
    const updateShowHide = (state) => {
        setShowHide(state)
    }

    useEffect(() => {
        if (loading) {
            let url = '/product/default/view-booking?booking_id=';

            axios.get(url + getUrlData('booking_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        console.log(resData)
                        setStateData({
                            ...stateData,
                            ...resData.data
                        })
                    }
                }
            )
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    if (loading)
        return (<div>loading</div>)

    return (
        <div className={parseInt(getUrlData("jordan")) === 1 ? "AmbassadorSuccess jordan" : "AmbassadorSuccess"}>
            <div className={'headers'}>
                <div className="name">
                    {cookie.load('store_name')}
                </div>
            </div>
            <h3>
                {
                    stateData.type === 2 ? '预留产品' : '预约试穿'
                }成功
            </h3>
            <div className={'userinfo product'}>
                <div className={'userimg'}>
                    <img alt={''} src={stateData.data.product_img}/>
                </div>
                <div className={'username'}>
                    <p>
                        {stateData.data.product_name}
                        <br/>
                        <span>¥ {stateData.data.prize}</span>
                    </p>
                </div>
            </div>
            <div className={'txt'}>
                <p>预约时间</p>
                <p>{stateData.data.book_day}</p>
            </div>
            <div className={'txt'} onClick={() => {
                props.history.push('/map?lng=' + stateData.data.store_longitude + '&lat=' + stateData.data.store_latitude);
            }}>
                <p>门店地址</p>
                <p>{stateData.data.store_name}</p>
                <span className={'iconfont icon-dingwei'}/>
            </div>
            <div className={'txt'}>
                <p>预留信息</p>
                <p>{stateData.data.user_name + ' ' + stateData.data.mobile}</p>
            </div>
            <div className={'order'}>
                <div className="btn" onClick={() => {
                    if (Number(getUrlData('is_subscribe')) === 0) {   //  是否关注公众号
                        setShowHide(true)
                    } else {
                        if (getUrlData("jordan")) {
                            props.history.push('/appointment/index?jordan=1&store_id=' + stateData.data.store_id);
                        } else {
                            props.history.push("/appointment/index?store_id=" + stateData.data.store_id);
                        }
                    }
                }}>
                    查看我的预约
                </div>
            </div>
            {
                showHide ? <FollowPop {...props} updateShowHide={updateShowHide}
                                      data={stateData.data.qrcode}/> : null
            }

        </div>
    )

}

export default CommoditySuccess;
