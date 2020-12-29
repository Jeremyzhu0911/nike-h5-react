import React, {Component} from "react";

import Headers from "../../components/headers";

import "../../assets/css/pages/appointment/style.css";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '我的预约',
            navList: [
                {'id': 0, 'dn': false, 'list': '全部', 'active': true},
                {'id': 1, 'dn': false, 'list': '待处理', 'active': false},
                {'id': 2, 'dn': false, 'list': '已接受', 'active': false},
                {'id': 3, 'dn': false, 'list': '已拒绝', 'active': false},
                {'id': 4, 'dn': false, 'list': '已结束', 'active': false},
                {'id': 5, 'dn': false, 'list': '未公布', 'active': false},
                {'id': 6, 'dn': false, 'list': '未中选', 'active': false},
                {'id': 7, 'dn': false, 'list': '已中选', 'active': false},
                {'id': 8, 'dn': false, 'list': '已取消', 'active': false},
            ],
            statusId: 0,
            //type 1 预约试穿 2 预留产品 3 活动预约 4 大使预约
            //status 0 待处理 1 已接受 2 已拒绝 3 已结束
            typeList: [
                {'id': 0, 'type': 4, 'type_id': 0, 'name': '全部', 'active': true},
                {'id': 1, 'type': 5, 'type_id': 1, 'name': '抽鞋/抽号', 'active': false},
                {'id': 2, 'type': 1, 'type_id': 2, 'name': '产品', 'active': false},
                {'id': 3, 'type': 2, 'type_id': 3, 'name': '顾问', 'active': false},
                {'id': 4, 'type': 3, 'type_id': 4, 'name': '活动', 'active': false},
            ],
            typeId: 0,
            //type 1 预约试穿 2 预留产品 3 活动预约 4 大使预约
            //status 0 待处理 1 已接受 2 已拒绝 3 已结束
            //type_id2 1抽签 2产品 3顾问 4活动
            //二期
            //typeid 0 全部 1抽签 2产品 3专属顾问预约 4活动预约
            //
            listDetails: [],
            commodityList: [],
            noHasList: false,
            storeName: '安捷达广州',
            jordan: 1
        }
        // console.log(this.props.location.state.name)
    }

    render() {
        return (
            <div className="appointment">
                <Headers datas={this.state}/>
                <div className={'appointment_type'}>
                    <h5>类型：</h5>
                    <ul>
                        {
                            this.state.typeList.map((item, index) => {
                                return <li key={index} data-idx={index} data-type={item.type_id} className={item.active ? 'on' : ''}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
                <div className={'appointment_type'}>
                    <h5>类型：</h5>
                    <ul>
                        {
                            this.state.navList.map((item, index) => {
                                return <li key={index} data-idx={index} className={item.active ? 'on' : ''}>{item.list}</li>
                            })
                        }
                    </ul>
                </div>
                <div className={'appointment_content'}>
                    <div className={'appointment_list'}>
                        <p className={'appointment_list_type'}>专属顾问预约</p>
                        <p className={'appointment_list_title'}>William</p>
                        <p>2020-12-24 <span>待处理</span></p>
                    </div>
                    <div className={'appointment_list end'}>
                        <p className={'appointment_list_type'}>专属顾问预约</p>
                        <p className={'appointment_list_title'}>William</p>
                        <p>2020-12-24 <span>已取消</span></p>
                    </div>
                    <div className={'appointment_list'}>
                        <p className={'appointment_list_type'}>专属顾问预约</p>
                        <p className={'appointment_list_title'}>William</p>
                        <p>2020-12-24 <span>待处理</span></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default index;
