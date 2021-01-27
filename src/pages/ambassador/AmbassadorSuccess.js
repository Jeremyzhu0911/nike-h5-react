import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import {getUrlData} from "../../util/getUrlData";
import axios from "axios";
import FollowPop from "../../components/FollowPop";

const AmbassadorSuccess = (props) => {

    const [loading, setLoading] = useState(true);

    const [AmbassadorSuccessData, setAmbassadorSuccessData] = useState({
        type: Number(getUrlData('type')),   //  1 预约试穿 2 预留产品 3 活动预约 4 专家预约
        data: {
            // 4
            ambassador_info: '', //  专家名称
            ambassador_headimgurl: '',   //  专家照片
            booking_time: '',    //  预约时间
            store_address: '',   //  门店地址
            booking_name: '',    //  姓名
            mobile: '',  //  手机号
            qrcode: '',  //  微信关注公众号图片
            store_longitude: '',    //  map 坐标lng
            store_latitude: ''  //  map 坐标lat
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
            let url;
            if (AmbassadorSuccessData.type === 4)
                url = '/ambassador/site/view-booking?id=';
            else if (AmbassadorSuccessData.type === 3)
                url = '/event/default/view-booking?id=';
            else
                url = '/product/default/view-booking?booking_id=';

            axios.get(url + getUrlData('booking_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        console.log(resData)
                        setAmbassadorSuccessData({
                            ...AmbassadorSuccessData,
                            ...resData
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
        <div className={getUrlData("jordan") ? "AmbassadorSuccess jordan" : "AmbassadorSuccess"}>
            <div className={'headers'}>
                <div className="name">
                    {cookie.load('store_name')}
                </div>
            </div>
            <h3>
                {
                    AmbassadorSuccessData.type === 4 ? '预约申请' :
                        AmbassadorSuccessData.type === 3 ? '活动预约' :
                            AmbassadorSuccessData.type === 2 ? '预留产品' : '预约试穿'
                }成功
            </h3>
            <div className={'userinfo'}>
                <div className={'userimg'}>
                    <img alt={''} src={AmbassadorSuccessData.data.ambassador_headimgurl}/>
                </div>
                <div className={'username'}>
                    <p>
                        专属顾问<br/>
                        {AmbassadorSuccessData.data.ambassador_info}
                    </p>
                </div>
            </div>
            <div className={'txt'}>
                <p>预约时间</p>
                <p>{AmbassadorSuccessData.data.booking_time}</p>
            </div>
            <div className={'txt'} onClick={() => {
                props.history.push('/map?lng=' + AmbassadorSuccessData.data.store_longitude + '&lat=' + AmbassadorSuccessData.data.store_latitude);
            }}>
                <p>门店地址</p>
                <p>{AmbassadorSuccessData.data.store_address}</p>
                <span className={'iconfont icon-dingwei'}/>
            </div>
            <div className={'txt'}>
                <p>预留信息</p>
                <p>{AmbassadorSuccessData.data.booking_name + ' ' + AmbassadorSuccessData.data.mobile}</p>
            </div>
            <div className={'order'}>
                <div className="btn" onClick={() => {
                    if (Number(getUrlData('is_subscribe')) === 0) {   //  是否关注公众号
                        setShowHide(true)
                    } else {
                        if (getUrlData('jordan')) {
                            props.history.push('/appointment/appointmentDetails?jordan=1&store_id=' + AmbassadorSuccessData.data.store_id);
                        } else {
                            props.history.push("/appointment/appointmentDetails?store_id=" + AmbassadorSuccessData.data.store_id);
                        }
                    }
                }}>
                    查看我的预约
                </div>

                <div className="btn2" onClick={()=>{
                    let gotoUrl;
                    if(AmbassadorSuccessData.type === 4){
                        gotoUrl = "/content-ambassador"
                    }else if(AmbassadorSuccessData.type === 3){
                        gotoUrl = "/content-ambassador"
                    }else{
                        gotoUrl = "/content-ambassador"
                    }
                    if (getUrlData("jordan")) {
                        props.history.push(gotoUrl +"?store_id=" + AmbassadorSuccessData.data.store_id + "&jordan=1");
                    } else {
                        props.history.push(gotoUrl +"?store_id=" + AmbassadorSuccessData.data.store_id);
                    }

                }}>
                    {
                        AmbassadorSuccessData.type === 4 ? '返回顾问' :
                            AmbassadorSuccessData.type === 3 ? '返回活动' : '返回'
                    }
                </div>
            </div>
            {
                showHide ? <FollowPop {...props} updateShowHide={updateShowHide}
                                      data={AmbassadorSuccessData.data.qrcode}/> : null
            }

        </div>
    )

}

export default AmbassadorSuccess;
