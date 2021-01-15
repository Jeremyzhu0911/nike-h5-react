import React from 'react';
import cookie from "react-cookies";

const Headers = (props) => {
    console.log(props)
    return (
        <div className={'headers'}>
            <div className="store-name">
                {cookie.load('store_name')}
                {
                    props.header_type === "home" ? <div className={'nav'}><i className={'iconfont icon-sousuo'}/><i
                            className={'iconfont icon-home'}/></div> :
                        props.header_type === "details" ? <div className={'nav'}><i className={'iconfont icon-home'}/></div> :
                            props.header_type === "content" ? <span>返回</span> :
                                props.header_type === "close" ? <span>关闭</span> : null
                }
            </div>
        </div>
    )

}

export default Headers;