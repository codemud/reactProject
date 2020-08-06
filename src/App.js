import React from 'react';
import { HashRouter, Switch, Route} from 'react-router-dom';

import Index from "./views/login";

export default class App extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route component={ Index } path="/"/>
                </Switch>
            </HashRouter>
        )
    }
}
