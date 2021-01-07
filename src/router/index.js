import React,{Component} from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
// import {createHashHistory} from 'history';

//redux流
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userInfoActionsFromOtherFiles from '../actions/userinfo';

//本地缓存配置 & 工具类
import {CITYNAME} from '../config/localStorekey';
import LocalStore from '../util/localStore';
import {getUrlData} from "../config/common";

//url配置
import routes from '../router/config';

class RouteConfigExample extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }

    componentDidMount() {
        let jordan = LocalStore.getItem(CITYNAME);

        if (parseInt(getUrlData('jordan', window.location.search))) {
            jordan = parseInt(getUrlData('jordan', window.location.search))
        }

        this.props.userInfoActions.update({
            jordan: jordan
        })

        this.setState({
            initDone: true
        })
    }

    render() {

        return (
            <Router>
                {/*此处可以增加导航*/}
                {this.state.initDone ?
                    <Switch>
                        {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                    : <div>正在加载...</div>
                }
            </Router>
        )
    }
}

const RouteWithSubRoutes = route => {
    return (
        <Route
            path={route.path}
            render={props => {
                document.title = route.title || "Nike";
                return <route.component {...props} routes={route.routes}/>
            }}
        />
    );
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFiles, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouteConfigExample)