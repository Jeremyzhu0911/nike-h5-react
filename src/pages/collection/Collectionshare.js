import React, {useState, useEffect} from "react";
import cookie from 'react-cookies';
import axios from "axios";
import html2canvas from "html2canvas"
import {getUrlData} from "../../util/getUrlData";

import collection_logo from "../../assets/images/collection_logo.png"
import collection_down from "../../assets/images/collection_down.png"
import collection_share from "../../assets/images/collection_share.png"
import WeiXin from "../../server/wx.config";

const CommodityShare = (props) => {

    const [loading, setLoading] = useState(true)

    const [shareData, setShareData] = useState({
        data_list:[],
        store_image:''
    })

    const [btn,setBtn] = useState({
        name:'',
        url:'',
        onload: true
    })


    useEffect(() => {
        if (loading) {
            axios.get("/product/default/get-wishlist?store_id=" + getUrlData('store_id') + "&share_id=" + getUrlData('share_id')).then(
                (res) => {
                    let restData = res.data;
                    if (Number(restData.code) === 200) {
                        setShareData({
                            ...restData.data
                        })
                        console.log(restData)
                        WeiXin.share("我的心愿单，快来瞧瞧吧", window.location.href, restData.data.store_image, "是不是也有你中意的？",`我的心愿单分享`);
                        setLoading(false)
                    }
                },
                (error) => {
                    console.log(error)
                    props.history.push('/500');
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    if (loading) {
        return (<div>正在加载...</div>)
    }

    return (
        <div className={parseInt(cookie.load('jordan')) === 1 ? "Collectionshare jordan" : "Collectionshare"}>
            <div className={"StoreName"}>{cookie.load('store_name')}</div>
            <div id="capture" className={"shareList"}>
                <img alt={""} src={collection_logo}/>
                {
                    shareData.data_list.map((item,index)=>{
                        return <>
                            <img alt={""} src={item.thumbnail}/>
                            <h4>{item.product_name}</h4>
                            <p>{item.sku}</p>
                        </>
                    })
                }
            </div>
            <div className={'btn iconfont icon-xiazai'} onClick={()=>{
                if(btn.onload){
                    download()
                }
                setBtn({
                    name:"down",
                    url:collection_down,
                    onload:false
                })
            }}/>
            <div className={'btn2 iconfont icon-fenxiang'} onClick={()=>{
                setBtn({
                    name:"share",
                    url:collection_share
                })
            }}/>
            {
                !!btn.name ? <div className={'mask'} onClick={()=>{
                    setBtn({
                        name:"",
                        url:""
                    })
                }}>
                    <img className={btn.name} alt={""} src={btn.url}/>
                </div> : null
            }

        </div>
    )
}

export default CommodityShare;

function download(){
    window.pageYoffset = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    html2canvas(document.querySelector("#capture"),{
        useCORS:true,
        allowTaint: true,
        width:window.screen.availWidth,
        height:document.body.scrollHeight,
        windowWidth:document.body.scrollWidth,
        windowHeight:document.body.scrollHeight,
        x:0,
        y:window.pageXOffset
    }).then(canvas => {
        canvas.id = "mycanvas";
        let dataUrl = canvas.toDataURL('image/jpeg', 1.0);
        let newImg = document.createElement("img");
        newImg.src = dataUrl;

        let a = document.createElement('div')
        a.className = "shareList2"
        a.appendChild(newImg)

        document.querySelector("#capture").remove()

        document.querySelector(".Collectionshare").appendChild(a)

        // // 生成一个a元素
        // let a = document.createElement('a')
        // // 创建一个单击事件
        // let event = new MouseEvent('click')
        //
        // // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        // a.download = new Date().getTime()+".jpeg"
        // // 将生成的URL设置为a.href属性
        // a.href = dataUrl
        //
        // // 触发a的单击事件
        // a.dispatchEvent(event)
        // console.log(dataUrl)
        // document.querySelector("#capture").appendChild(newImg)
        // document.body.appendChild(canvas)
    });
}