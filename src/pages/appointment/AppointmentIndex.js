import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";

const AppointmentIndex = (props) => {

    const [loading, setLoading] = useState(true);

    const [typeList] = useState([
        {'id': 0, 'name': '全部', type: ["luckydraw", "product_try", "product_buy", "ambassador", "event"]},
        {'id': 1, 'name': '抽鞋/抽号', type: ["luckydraw"]},
        {'id': 2, 'name': '产品', type: ["product_try", "product_buy"]},
        {'id': 3, 'name': '顾问', type: ["ambassador"]},
        {'id': 4, 'name': '活动', type: ["event"]},
    ])
    const [typeListBtn, setTypeListBtn] = useState(0)

    const [navList, setNavList] = useState([])
    const [navListBtn, setNavListBtn] = useState(0)

    const [bookingList, setBookingList] = useState({})

    const [stateData, setStateData] = useState({
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
                    {idx: 0, id: 0, list: '全部', status: [0, 1, 2, 3, 4, 5, 6, 7, 8]},
                    {idx: 1, id: 1, list: '待处理', status: [1]},
                    {idx: 2, id: 2, list: '已接受', status: [2]},
                    {idx: 3, id: 3, list: '已拒绝', status: [3]},
                    {idx: 4, id: 4, list: '已结束', status: [4]},
                    {idx: 5, id: 5, list: '未公布', status: [5]},
                    {idx: 6, id: 6, list: '未中选', status: [6]},
                    {idx: 7, id: 7, list: '已中选', status: [7]},
                    {idx: 8, id: 8, list: '已取消', status: [8]},
                ]);
                break;
            case 1:
                setNavList([
                    {idx: 0, id: 0, list: '全部', status: [0, 5, 6, 7, 8]},
                    {idx: 1, id: 5, list: '未公布', status: [5]},
                    {idx: 2, id: 6, list: '未中选', status: [6]},
                    {idx: 3, id: 7, list: '已中选', status: [7]},
                    {idx: 4, id: 8, list: '已取消', status: [8]},
                ]);
                break;
            default:
                setNavList([
                    {idx: 0, id: 0, list: '全部', status: [0, 1, 2, 3, 4]},
                    {idx: 1, id: 1, list: '待处理', status: [1]},
                    {idx: 2, id: 2, list: '已接受', status: [2]},
                    {idx: 3, id: 3, list: '已拒绝', status: [3]},
                    {idx: 4, id: 4, list: '已结束', status: [4]},
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

                        resData.data.booking_list.forEach((item, index) => {
                            if (item.type === "luckydraw") {
                                resData.data.booking_list[index].link = "/commodity/detailsLuckydraw" + props.location.search + "&booking_id=" + item.id;
                                switch (item.status) {
                                    case "-1":
                                        resData.data.booking_list[index].statusId = 8;
                                        break;
                                    case "0":
                                        resData.data.booking_list[index].statusId = 5;
                                        break;
                                    case "1":
                                        resData.data.booking_list[index].statusId = 6;
                                        break;
                                    default:
                                        resData.data.booking_list[index].statusId = 7;
                                        break;
                                }
                            } else {
                                resData.data.booking_list[index].link = "/appointment/details" + props.location.search + "&booking_id=" + item.id + "&type=" + item.type;
                                switch (item.status) {
                                    case "-1":
                                        resData.data.booking_list[index].statusId = 3;
                                        break;
                                    case "0":
                                        resData.data.booking_list[index].statusId = 1;
                                        break;
                                    case "1":
                                        resData.data.booking_list[index].statusId = 2;
                                        break;
                                    case "4":
                                        resData.data.booking_list[index].statusId = 2;
                                        break;
                                    default:
                                        resData.data.booking_list[index].statusId = 4;
                                        break;
                                }
                            }
                        })
                        console.log(resData)

                        setStateData(resData.data)

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
                            }} className={item.idx === navListBtn ? 'on' : ''}>{item.list}</li>
                        })
                    }
                </ul>
            </div>
            <div className={'appointment_content'}>
                {
                    stateData.booking_list.map((item, index) => {
                        if (typeList[typeListBtn].type.some(some => {
                            return some === item.type
                        })) {
                            if (navList[navListBtn].status.some(some => {
                                return some === item.statusId
                            }))
                                return <div className={
                                    item.status === '-2' || item.status === '-1' || item.status === '2' || item.status === '3' ?
                                        "appointment_list end" : "appointment_list"} key={index} onClick={() => {
                                    props.history.push(item.link)
                                }}>
                                    <p className={'appointment_list_type'}>{
                                        item.type === 'product_try' ?
                                            "预约试穿" : item.type === 'product_buy' ?
                                            "预留产品" : item.type === 'event' ?
                                                "活动预约" : item.type === 'ambassador' ?
                                                    "专属顾问预约" : item.type === 'luckydraw' ?
                                                        item.luckydraw_type === 0 ?
                                                            "抽号活动" : "抽鞋活动"
                                                        : null
                                    }</p>
                                    <p className={'appointment_list_title'}>{item.title}</p>
                                    <p>
                                        {item.booking_time}
                                        {navList.map((some, index) => {
                                            if (some.id === item.statusId)
                                                return <span key={index}>{some.list}</span>
                                        })}
                                    </p>
                                </div>
                        }
                    })
                }
            </div>
            {
                stateData.booking_list.length === 0 &&
                <div className={"appointment_resultList"}>
                    <p className="noHasList">暂无预约记录</p>
                    <div className="resultHeader">
                        为您推荐
                    </div>
                    {
                        stateData.prod_list.map((item, index) => {
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
