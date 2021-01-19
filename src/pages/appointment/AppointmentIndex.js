import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";

const AppointmentIndex = (props) => {

    const [loading, setLoading] = useState(true);

    const [typeList] = useState([
        {'id': 0, 'name': '全部', type: ["ALL"]},
        {'id': 1, 'name': '抽鞋/抽号', type: ["luckydraw"]},
        {'id': 2, 'name': '产品', type: ["product_try", "product_buy"]},
        {'id': 3, 'name': '顾问', type: ["ambassador"]},
        {'id': 4, 'name': '活动', type: ["event"]},
    ])
    const [typeListBtn, setTypeListBtn] = useState(0)

    const [navList, setNavList] = useState([])
    const [navListBtn, setNavListBtn] = useState(0)

    const [appointmentIndexData, setAppointmentIndexData] = useState({
        booking_list: {
            id: '',  //  id
            title: '',   //  名称
            status: '',  //  状态
            type: '',    //  类型  product_try 预约试穿 product_buy 预留产品 event 活动预约 ambassador 专属顾问预约 luckydraw 抽鞋抽号
            luckydraw_type: '',  //  0 抽号  抽鞋
            booking_time: '',
        },
        prod_list: {
            thumbnail: '',   //  图片地址
            product_name: '',    //  名称
            price: '',   //  价钱
            lack_stock: '',  //  库存
            product_code: '' //  编号
        }
    })

    useEffect(() => {
        switch (typeListBtn) {
            case 0:
                setNavList([
                    {id: 0, list: '全部', status: 'ALL'},
                    {id: 1, list: '待处理', status: [0]},
                    {id: 2, list: '已接受', status: [1, 4]},
                    {id: 3, list: '已拒绝', status: [-1]},
                    {id: 4, list: '已结束', status: [-2, 2, 3]},
                    {id: 5, list: '未公布', status: [0]},
                    {id: 6, list: '未中选', status: [1]},
                    {id: 7, list: '已中选', status: [2, 4]},
                    {id: 8, list: '已取消', status: [-1]},
                ]);
                break;
            case 1:
                setNavList([
                    {id: 0, list: '全部'},
                    {id: 1, list: '未公布', status: [0]},
                    {id: 2, list: '未中选', status: [1]},
                    {id: 3, list: '已中选', status: [2, 4]},
                    {id: 4, list: '已取消', status: [-1]},
                ]);
                break;
            default:
                setNavList([
                    {id: 0, list: '全部'},
                    {id: 1, list: '待处理', status: [0]},
                    {id: 2, list: '已接受', status: [1, 4]},
                    {id: 3, list: '已拒绝', status: [-1]},
                    {id: 4, list: '已结束', status: [-2, 2, 3]},
                ]);
        }
    }, [typeListBtn])


    useEffect(() => {
        if (loading) {
            axios.get("/booking/index?store_id=" + getUrlData('store_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        console.log(resData)
                        cookie.save('store_name', resData.data.store_info.store_name)

                        setAppointmentIndexData(resData.data)

                        setLoading(false)
                    }
                },
                (error) => {
                    console.log(error)
                }
            )

        }
    }, [loading])

    if (loading)
        return (<div>loading</div>)

    return (
        <div className="AppointmentIndex">
            <div className={'headers'}>
                <div className="store-name">
                    {cookie.load('store_name')}
                </div>
            </div>
            <div className={'appointment_type'}>
                <h5>类型：</h5>
                <ul>
                    {
                        typeList.map((item, index) => {
                            return <li key={index} onClick={() => {
                                setTypeListBtn(index);
                                setNavListBtn(0);
                            }} className={item.id === typeListBtn ? 'on' : ''}>{item.name}</li>
                        })
                    }
                </ul>
            </div>
            <div className={'appointment_type'}>
                <h5>状态：</h5>
                <ul>
                    {
                        navList.map((item, index) => {
                            return <li key={index} onClick={() => {
                                setNavListBtn(index)
                            }} className={item.id === navListBtn ? 'on' : ''}>{item.list}</li>
                        })
                    }
                </ul>
            </div>
            <div className={'appointment_content'}>
                {
                    appointmentIndexData.booking_list.map((item, index) => {
                        if (item.type !== "luckydraw")
                            return <div className={
                                item.status === '-2' || item.status === '-1' || item.status === '2' || item.status === '3' ?
                                    "appointment_list end" : "appointment_list"} key={index} onClick={() => {
                                props.history.push("/appointment/details" + props.location.search + "&booking_id=" + item.id + "&type=" + item.type)
                            }}>
                                <p className={'appointment_list_type'}>{
                                    item.type === 'product_try' ?
                                        "预约试穿" : item.type === 'product_buy' ?
                                        "预留产品" : item.type === 'event' ?
                                            "活动预约" : item.type === 'ambassador' &&
                                            "专属顾问预约"
                                }</p>
                                <p className={'appointment_list_title'}>{item.title}</p>
                                <p>
                                    {item.booking_time}
                                    <span>
                                    {
                                        item.status === '-2' ?
                                            "已结束" : item.status === '-1' ?
                                            "已拒绝" : item.status === '0' ?
                                                "待处理" : item.status === '1' ?
                                                    "已接受" : item.status === '2' ?
                                                        "已结束" : item.status === '3' ?
                                                            "已结束" : item.status === '4' ?
                                                                "已接受" : null
                                    }
                                    </span>
                                </p>
                            </div>
                        else
                            return <div className={item.status === '-1' ?
                                "appointment_list end" : "appointment_list"} key={index} onClick={() => {
                                props.history.push("/commodity/detailsLuckydraw" + props.location.search + "&booking_id=" + item.id)
                            }}>
                                <p className={'appointment_list_type'}>{
                                    item.luckydraw_type === 0 ?
                                        "抽号活动" : "抽鞋活动"
                                }</p>
                                <p className={'appointment_list_title'}>{item.title}</p>
                                <p>{item.booking_time}
                                    <span>
                                    {
                                        item.status === '-1' ?
                                            "已取消" : item.status === '0' ?
                                            "未公布" : item.status === '1' ?
                                                "未中选" : item.status === '2' ?
                                                    "已中选" : item.status === '4' ?
                                                        "已中选" : null
                                    }
                                </span>
                                </p>
                            </div>
                    })
                }
            </div>
            {
                appointmentIndexData.booking_list.length === 0 &&
                <div className={"appointment_resultList"}>
                    <p className="noHasList">暂无预约记录</p>
                    <div className="resultHeader">
                        为您推荐
                    </div>
                    {
                        appointmentIndexData.prod_list.map((item, index) => {
                            return <div className="row" key={index} onClick={() => {
                                props.history.push("/commodity/details" + props.location.search + "&product_code=" + item.product_code)
                            }}>
                                <div className="resultItems">
                                    <div className="imgGrid">
                                        <img alt={''} src={item.thumbnail}/>
                                        {
                                            item.lack_stock &&
                                            <span className="o_stock">库存紧张</span>
                                        }
                                    </div>
                                    <div className="item_copy">
                                        <p className="item_name">{item.product_name}</p>
                                        <p className="item_price">建议零售价 <span>¥ {item.price}</span></p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            }

        </div>
    )
}

export default AppointmentIndex;
