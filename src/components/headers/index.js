import React, {Component} from 'react';

import "../../assets/css/components/headers/style.css";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.datas;
        this.state.header_type = this.state.header_type ? this.state.header_type : null;
    }
    render() {
        let storeName = this.state.storeName;
        let header_type = this.state.header_type;
        return (
            <div className={'headers'}>
                <div className="store-name">
                    { storeName }
                    {
                        header_type === "home" ? <div className={'nav'}><i className={'iconfont icon-sousuo'}/><i className={'iconfont icon-home'}/></div> :
                            header_type === "details" ? <div className={'nav'}><i className={'iconfont icon-home'}/></div> :
                            header_type === "content" ? <span>返回</span> : null
                    }
                </div>
            </div>
        )
    }
}

export default Index;