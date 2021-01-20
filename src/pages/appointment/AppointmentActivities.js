import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";

import img from "../../assets/images/minImg.png";

const AppointmentActivities = (props) => {

    const [loading, setLoading] = useState(true);

    const [dataList, setDataList] = useState({
        booking_list: [
            {
                event_type: ''
            }
        ],
        prod_list: [
            {
                product_name: '',
                price: '',
                thumbnail: '',
                product_code: ''
            }
        ],
        type_list: [
            {
                type_name: '',
                list: [
                    {
                        store_event_id: '',
                        event_title: '',
                        event_url: '',
                        event_start_date: '',
                        event_end_date: '',
                        booking_name: '',
                    }
                ]
            }
        ]

    })

    useEffect(() => {
        if (loading) {
            axios.get("/event/default/get-booking-list?store_id=" + getUrlData("store_id")).then(
                (res) => {
                    let resData = res.data
                    if (Number(resData.code) === 200) {
                        cookie.save('store_name', resData.data.store_info.store_name)
                        console.log(resData.data)
                        setDataList(resData.data)
                    }
                },
                (error) => {
                    console.log(error)
                    props.history.push("/500")
                }
            )

            setLoading(false)
        }
    }, [loading])

    if (loading) {
        return (<div>正在加载中</div>)
    }

    return (
        <div className="AppointmentActivities">
            <h2>{cookie.load("store_name")}</h2>
            {
                dataList.booking_list.length === 0 ?
                    <>
                        <div className={'content'}>
                            <h5>暂无参与记录</h5>
                        </div>
                        <div className={'content'}>
                            <h4>为您推荐</h4>
                            <div className={'list_recommend'}>
                                {
                                    dataList.prod_list.map((item, index) => {
                                        return <div className={'list_box'} key={index} onClick={() => {
                                            props.history.push("/commodity/details" + props.location.search + "&product_code=" + item.product_code)
                                        }}>
                                            <div className={'list_img'}>
                                                <img alt={''} src={item.thumbnail}/>
                                            </div>
                                            <h3>{item.product_name}</h3>
                                            <p>¥ {item.price}</p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </> :
                    dataList.type_list.map((item, index) => {
                        if (item.list.length > 0)
                            return <div className={'content'} key={index}>
                                <h4>{item.type_name}</h4>
                                <div className="RotationMinImg">
                                    <div className="carousel">
                                        <div className="carousel-box">
                                            {
                                                item.list.map((listItem, index) => {
                                                    return <div className="carousel-item" key={index}>
                                                        <img alt={''} src={listItem.event_url}/>
                                                        <h4>{listItem.event_title}</h4>
                                                        <p>{listItem.event_start_date}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="index-container">
                                        <ul>
                                            {
                                                item.list.map((listItem, index) => {
                                                    return <li className={'selected'} key={index}/>
                                                })
                                            }
                                        </ul>
                                        <span>1/{item.list.length%3}</span>
                                    </div>
                                </div>
                            </div>
                    })
            }
        </div>
    )
}

export default AppointmentActivities;
