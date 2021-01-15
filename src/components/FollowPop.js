import React from 'react';

const FollowPop = (props) => {

    const {updateShowHide} = props

    return (
        <div className={'FollowPop'}>
            <div className={'box'}>
                <img alt={''} src={props.data}/>
                <p className="txt">关注店铺公众号，预约结果将通过微信第一时间告知您，同时您也可在公众号“我的预约”中查看预约详情</p>
                <button className="close" onClick={()=>{
                    updateShowHide(false)
                }}>确定</button>
                <p className="tips"><span>友情提示：</span>未关注公众号的小伙伴将无法获得预约结果哦~</p>
            </div>
            <div className={'desk'} onClick={()=>{
                updateShowHide(false)
            }}/>
        </div>
    )
}

export default FollowPop;