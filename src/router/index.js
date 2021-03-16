import React, {useState, useEffect} from "react";
import {HashRouter as Router, Switch, Route} from "react-router-dom";

//redux流
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userInfoActionsFromOtherFiles from '../actions/userinfo';

//本地缓存配置 & 工具类
import cookie from "react-cookies";
import {CITYNAME} from '../config/localStorekey';
import LocalStore from '../util/localStore';
import {getUrlData} from "../util/getUrlData";

//url配置
import routes from '../router/config';
import onFans from '../util/onFans';


let isAj = LocalStore.getItem(CITYNAME);
let store_id = LocalStore.getItem(CITYNAME);

const RouteConfigExample = (props) => {
    const [loading, setLoading] = useState(true)

    store_id = getUrlData('store_id')
    isAj = !!parseInt(cookie.load('jordan'))

    // // initData
    // const [userInfo, setUserInfo] = useState({
    //     isAj: '',
    //     store_id:'',
    //     store_name:'',
    //     open_id:''
    // })

    useEffect(() => {

        props.userInfoActions.update({
            isAj: isAj,
            store_id: store_id
        })

        setLoading(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    if (loading) {
        onFans(store_id);
        return <div>正在登录</div>
    }

    return (
        <Router>
            {/*此处可以增加导航*/}
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>

        </Router>
    )
}

const RouteWithSubRoutes = route => {
    return (
        <Route
            path={route.path}
            render={props => {
                document.title = route.title || "Nike";
                if (parseInt(cookie.load('jordan')) === 1) {
                    window.document.body.style.backgroundColor = '#000';
                }
                return <route.component {...props} apiData={route.apiData}/>
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