import React, {useState, useEffect} from "react";
import cookie from "react-cookies";
import axios from "axios";

import {getUrlData} from "../../util/getUrlData";
import DataTracking from "../../util/DataStatistics";

const CommodityList = (props) => {

    const [loading, setLoading] = useState(true)

    const [load, setLoad] = useState(true)

    const [state, setState] = useState({
        title: '最新上市',
        isShowOverlay: false,
        isSearch: false,
        overlayTxt: '筛选',
        pageTitle: '门店当季产品',
        commodityList: [],
        commodityListAll: [],
        listNum: '',
        keyWord: '',
        gaPageName: '全部商品',
        searchList: [
            {
                'id': "gender",
                'name': '款式',
                'list': [{'id': 'mens', 'click': false, 'name': '男士'}, {
                    'id': 'mens',
                    'click': false,
                    'name': '男士'
                }, {'id': 'mens', 'click': false, 'name': '男士'}, {
                    'id': 'mens',
                    'click': false,
                    'name': '男士'
                }, {'id': 'mens', 'click': false, 'name': '男士'}]
            },
            {'id': "gender", 'name': '类型', 'list': [{'id': 'mens', 'click': false, 'name': '鞋类'}]}
        ],
        productInfoSearch: {'category': [], 'gender': [], 'product_group': [], 'tag_id': ''},
        totalPage: 1,
        currentPage: '',
        isLoadData: true,
        showLoadTips: true,
    })

    useEffect(() => {
        if (loading) {
            let getUrl = "/product/default/get-all-product-by-store?store_id=" + getUrlData('store_id')
                + "&ProductInfoSearch[category]=" + state.productInfoSearch['category']
                + "&ProductInfoSearch[gender]=" + state.productInfoSearch['gender']
                + "&ProductInfoSearch[group_id]=" + state.productInfoSearch['product_group']
                + "&ProductInfoSearch[tag_id]=" + state.productInfoSearch['tag_id']
                + "&ProductInfoSearch[keyword]=" + state.keyWord;
            axios.get(getUrl).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        resData.data.filter.forEach(item => {
                            if (item.id === 'gender') {
                                item.name = '款式'
                            }
                            if (item.id === 'category') {
                                item.name = '类型'
                            }
                            if (item.id === 'product_group') {
                                item.name = '分类'
                            }
                            item.list.forEach(x => {
                                x.click = false;
                            })
                        })

                        setState({
                            ...state,
                            commodityListAll: resData.data.data_list,
                            commodityList: resData.data.data_list,
                            totalPage: resData.data.page_info.total_page,
                            currentPage: resData.data.page_info.current_page,
                            listNum: resData.data.page_info.total_count,
                            searchList: resData.data.filter,
                            productInfoSearch: {'category': [], 'gender': [], 'product_group': [], 'tag_id': ''},
                        });
                        if (load)
                            DataTracking.GAPage('全部商品')
                        setLoading(false)
                        setLoad(false)
                    }
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
        <div className={parseInt(getUrlData("jordan")) === 1 ? "CommodityList jordan" : "CommodityList"}>
            <div className={'headers'}>
                <div className="name">
                    {cookie.load('store_name')}
                    <div className={'nav'}><i onClick={() => {
                        DataTracking.GAPage('搜索')
                        DataTracking.GAEvent('搜索结果', '搜索')
                        setState({...state, isShowOverlay: true, isSearch: true, overlayTxt: '搜索'})
                    }} className={'iconfont icon-sousuo'}/><i onClick={() => {
                        DataTracking.GAEvent(state.gaPageName, '返回首页')
                        props.history.push("/commodity/index?store_id=" + getUrlData("store_id"))
                    }} className={'iconfont icon-home'}/></div>
                </div>
            </div>
            <div className={'resultHeader'}>
                <h2>{state.pageTitle}<br/><span>共 <i>{state.listNum}</i> 件商品</span></h2>
                <div className={'btn_search'} onClick={() => {
                    DataTracking.GAPage('筛选')
                    DataTracking.GAEvent('筛选结果', '筛选')
                    setState({...state, isShowOverlay: true, isSearch: false, overlayTxt: '筛选'})
                }}>筛选
                </div>
            </div>
            <ul className={'list'}>
                {
                    state.commodityList.map((item, index) => {
                        return <li key={index} onClick={() => {
                            DataTracking.GAEvent(state.gaPageName, item.product_code)
                            props.history.push("/commodity/details" + props.location.search + "&product_code=" + item.product_code)
                        }}>
                            <div className={'CommodityListImages'}>
                                <img alt={''} src={item.thumbnail}/>
                            </div>
                            <h5>{item.product_name}</h5>
                            <p>建议零售价 ¥ {item.price}</p>
                        </li>
                    })
                }
            </ul>
            {
                state.isShowOverlay && <div className={'overlay'}>
                    <h2>{state.overlayTxt}产品<span onClick={() => {
                        DataTracking.GAEvent(state.overlayTxt, '关闭')
                        setState({...state, isShowOverlay: false})
                    }}>关闭</span></h2>
                    {
                        state.isSearch ? <div className={'filterSearch'}>
                            <input type={'txt'} placeholder="关键字搜索" onChange={(event) => {
                                setState({...state, keyWord: event.target.value})
                            }}/>
                        </div> : state.searchList.map((item, index) => {
                            return <div className={'filterItems'} key={index}>
                                <h3>{item.name}</h3>
                                <ul>
                                    {
                                        item.list.map((items, index) => {
                                            return <li className={items.click ? 'on' : null} key={index}
                                                       onClick={() => {
                                                           if (items.click) {
                                                               items.click = false;
                                                               state.productInfoSearch[item.id].splice(state.productInfoSearch[item.id].indexOf(items.id), 1);
                                                           } else {
                                                               items.click = true;
                                                               state.productInfoSearch[item.id].push(items.id)
                                                           }
                                                           setState({...state, isShowOverlay: true})
                                                       }}>{items.name}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        })
                    }
                    <div className={'filterBtnWrap'}>
                        <div className={'btn_full'} onClick={() => {
                            setLoading(true)
                            if (state.keyWord)
                                DataTracking.GAEvent(state.overlayTxt, '提交：' + state.keyWord)
                            setState({...state, isShowOverlay: false, pageTitle: state.overlayTxt + '结果'})
                        }}>显示{state.overlayTxt}结果
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CommodityList;
