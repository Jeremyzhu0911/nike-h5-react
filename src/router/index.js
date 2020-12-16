import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from '../router/config';
import "../assets/css/style.css";

export default function RouteConfigExample() {
    return (
        <Router>
            <div className={"aaa"}>
                <ul>
                    <li>
                        <Link to="/historical-record">historical-record</Link>
                    </li>
                    <li>
                        <Link to="/commodity/limitlist">限量发售列表</Link>
                    </li>
                </ul>
            </div>
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </Router>
    );
}

const RouteWithSubRoutes = route => {
    return (
        <Route
            path={route.path}
            render={props => {
                document.title = route.title || "Nike";
                return <route.component {...props} routes={route.routes} />
            }}
        />
    );
}