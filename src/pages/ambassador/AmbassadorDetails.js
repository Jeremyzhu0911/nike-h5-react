import React, {useState, useEffect} from "react";

import img from "../../assets/images/image_160074378798579956.jpeg";
import {getUrlData} from "../../util/getUrlData";
import axios from "axios";
import cookie from "react-cookies";

const AmbassadorDetails = (props) => {

    const [loading, setLoading] = useState(true);

    const [AmbassadorDetailsData, setAmbassadorDetailsData] = useState({
        store_info: {
            store_name: ''  //店铺名称
        },
        am_info: {  //专家详情
            id: '',     //专家ID
            imgUrl: '',     //专家照片
            cnName: '',     //名字
            enName: '',    // 标签
            msg: ''      //专家简介
        },
        file_list: [ //更多
            {
                info_id: '',
                imgUrl: ''
            }
        ]
    })

    const [paragraphHide, setParagraphHide] = useState(true);
    const [imgHide, setImgHide] = useState(true);

    useEffect(() => {
        if (loading) {
            if (getUrlData('ambassador_id')) {
                const url = '/ambassador/site/view-ambassador?id=' + getUrlData('ambassador_id');
                axios.get(url).then(
                    (res) => {
                        let resData = res.data;
                        if (Number(resData.code) === 200) {
                            console.log(resData.data);

                            cookie.save('store_name', resData.data.store_info.store_name)

                            setAmbassadorDetailsData(resData.data)

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
        <div className="AmbassadorDetails">
            <h2>{cookie.load('store_name')}</h2>
            <div className={'content'}>
                <h4>{AmbassadorDetailsData.am_info.cnName}</h4>
                <h5>{AmbassadorDetailsData.am_info.enName}</h5>
                <div className={'big_img'}>
                    <img alt={''} src={AmbassadorDetailsData.am_info.imgUrl}/>
                </div>
                <div className={paragraphHide ? 'paragraph' : 'paragraph on'}>
                    <p dangerouslySetInnerHTML={{__html: AmbassadorDetailsData.am_info.msg}}/>
                    <span onClick={() => {
                        setParagraphHide(!paragraphHide)
                    }}>展开+</span>
                </div>
            </div>
            <div className={AmbassadorDetailsData.file_list.length > 6 && imgHide ? 'img_list' : 'img_list on'}>
                <ul>
                    {
                        AmbassadorDetailsData.file_list.map((item, index) => {
                            return <li key={index}>
                                <img alt={''} src={item.imgUrl}/>
                            </li>
                        })
                    }
                </ul>
                {
                    AmbassadorDetailsData.file_list.length > 6 && <span onClick={() => {
                        setImgHide(!imgHide)
                    }}>展开+</span>
                }
            </div>
            <div className={'order'}>
                <div className="btn" onClick={()=>{
                    props.history.push("/appointment" + props.location.search + "&&is_ambassador=1")
                }}>
                    预约此顾问
                </div>
            </div>
        </div>
    )

}

export default AmbassadorDetails;
