import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {routerList} from './providers'

function Router() {
    return <BrowserRouter>
        <Switch>{
            routerList.map(
                (item, key) => <Route key={ key } { ...item } />
            )
        }</Switch>
    </BrowserRouter>
}
export default Router
