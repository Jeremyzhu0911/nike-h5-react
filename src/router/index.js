import React, {useState, useEffect} from "react";
import {HashRouter as Router, Switch, Route} from "react-router-dom";

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

import onFans from '../config/onFans';

let isAj = LocalStore.getItem(CITYNAME);
let store_id = LocalStore.getItem(CITYNAME);

const RouteConfigExample = (props) => {
    // initData
    const [state, setState] = useState({
        isAj: '',
        store_id:''
    })

    useEffect(() => {

        props.userInfoActions.update({
            isAj: isAj,
            store_id:store_id
        })

        setState({
            ...state,
            isAj: isAj,
            store_id:store_id})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    console.log(state)

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
                store_id = getUrlData('store_id', props.location.search)
                isAj = !!parseInt(getUrlData('jordan', window.location.search))
                onFans(store_id);
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