import React from 'react';

import "../../assets/css/components/headers/style.css";

const Headers = (props) => {

    console.log(props)
    let store_name = props.userInfo.store_name;
    let header_type = props.state.header_type;
    return (
        <div className={'headers'}>
            <div className="store-name">
                {store_name}
                {
                    header_type === "home" ? <div className={'nav'}><i className={'iconfont icon-sousuo'}/><i
                            className={'iconfont icon-home'}/></div> :
                        header_type === "details" ? <div className={'nav'}><i className={'iconfont icon-home'}/></div> :
                            header_type === "content" ? <span>返回</span> :
                                header_type === "close" ? <span>关闭</span> : null
                }
            </div>
        </div>
    )

}

export default Headers;