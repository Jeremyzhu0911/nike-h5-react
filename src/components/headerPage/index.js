import React, {Component} from 'react';

import "../../assets/css/components/headerPage/style.css";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.datas;
    }
    render() {
        let storeName = this.state.storeName;
        return (
            <div className={'headerPage'}>
                <p className="store-name">{ storeName }</p>
            </div>
        )
    }
}

export default Index;