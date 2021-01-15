import React, {useState, useEffect} from "react";
import cookie from 'react-cookies';
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";


const AmbassadorContent = (props) => {

    const [loading, setLoading] = useState(true);

    const [AmbassadorContentData, setAmbassadorContentData] = useState({
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

                            setAmbassadorContentData(resData.data)

                            setLoading(false)
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
            <div className={'list'}>
                <ul className={
                    AmbassadorContentData.am_list.length === 2 ? "ul_align1" :
                        AmbassadorContentData.am_list.length === 3 ? "ul_align2" : "ul_align3"
                }>
                    {
                        AmbassadorContentData.am_list.map((item, index) => {
                            return <li key={index} className={index === tabIndex ? 'on': null} onClick={()=>{
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
                    <img alt={''} src={AmbassadorContentData.am_list[tabIndex].imgUrl}/>
                </div>
                <h4>{AmbassadorContentData.am_list[tabIndex].cnName}</h4>
                <p>标签 <span onClick={()=>{
                    props.history.push("/details-ambassador" + props.location.search +"&ambassador_id=" + AmbassadorContentData.am_list[tabIndex].id)
                }}>了解详情</span></p>
            </div>
        </div>
    )

}

export default AmbassadorContent;
