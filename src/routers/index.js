import React from 'react'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import routerList from './providers'
import models from "../utils/models";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={
            props => models.Init({ component: Component, ...rest })
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }} />
        }
    />
);

export default function() {
    return <BrowserRouter>
        <Switch>{
            routerList.map(
                (item, key) => <PrivateRoute key={ key } { ...item } />
            )
        }</Switch>
    </BrowserRouter>
}
