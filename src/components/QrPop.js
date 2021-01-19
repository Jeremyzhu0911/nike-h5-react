import React from 'react';

const QrPop = (props) => {

    const {updateShowHide} = props

    let txt;

    if (props.data.checkin_status === 0)
        txt = '未到签到时间<br><p class="bip">签到二维码将于<br>预约时间开始前15分钟开放</p>'
    else if (props.data.checkin_status === 1)
        txt = '请于' + props.data.event_start_date + '<br/>至' + props.data.event_end_date + '<br/>到店签到<br/><p class="bip">签到二维码将于<br/>预约时间后10分钟失效<br/>仅限本人使用<br/>且仅能只用1次</p>'
    else
        txt = '请于' + props.data.event_start_date + '<br/>至' + props.data.event_end_date + '<br/>到店签到<br/><p class="bip">超过预约时间10分钟<br/>签到二维码将会失效</p><p class="bipErr">二维码已失效</p>'

    return (
        <div className={'FollowPop'}>
            <div className={'box'}>
                <img alt={''} src={props.data.checkin_qrcode}/>
                <div className="content_txt" dangerouslySetInnerHTML={{__html: txt}}/>
                <div className={'btnBox'}>
                    <button className="close" onClick={() => {
                        updateShowHide(false)
                    }}>关闭
                    </button>
                </div>
            </div>
            <div className={'desk'} onClick={() => {
                updateShowHide(false)
            }}/>
        </div>
    )
}

export default QrPop;