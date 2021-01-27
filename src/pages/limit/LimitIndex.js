import React, {useState, useEffect} from "react";
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";
import cookie from "react-cookies";

const LimitIndex = (props) => {

    const [loading, setLoading] = useState(true)

    const [limitList,setLimitList] = useState([
        {
            article_img: "",
            created_at: "2021/01/18",
            des: "",
            link: "",
            luckydraw_id: "251",
            price: "",
            store_id: 57,
            sub_title: "测试-hogan 2021年1月18日",
            title: "测试-hogan 2021年1月18日",
        }
    ])

    useEffect(()=>{
        if(loading){
            axios.get("/article/limited-product?cate_id=1&store_id=" + getUrlData('store_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {

                        cookie.save('store_name', resData.data.store_info.store_name)
                        console.log(resData.data);
                        setLimitList(resData.data.data)
                        setLoading(false)
                    }
                },
                (error)=>{
                    console.log(error)
                    props.history.push('/500');
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading])

    if (loading) {
        return (<div>正在加载...</div>)
    }

    return (
        <div className="Limit_list">
            <h2>{cookie.load('store_name')}</h2>
            {
                limitList.map((item,index)=>{
                    return <div className="ListBigImgBox" key={index}>
                        <div className="content">
                            <div className="title">{item.title}</div>
                            <div className="time">{item.created_at}</div>
                            <div className="images">
                                <img alt={''} src={item.article_img}/>
                            </div>
                            <button type="submit" className={"s_btn s_btn1"}>报名未开始</button>
                            {
                                index === 0 ?
                                    <div className="down-icon iconfont icon-xiangxia"/> : null
                            }
                        </div>
                        {/*{data2.types === 3 ?*/}
                        {/*    <div className="mask"/> : null*/}
                        {/*}*/}
                    </div>
                })
            }
        </div>
    )

}

export default LimitIndex;
