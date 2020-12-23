import React, {Component} from 'react';

import "../../assets/css/components/headerClose/style.css";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.datas;
    }
    render() {
        let storeName = this.state.storeName;
        return (
            <div className={'headerClose'}>
                <p className="store-name">{ storeName }<span>返回</span></p>
            </div>
        )
    }
}

export default Index;