import React from 'react';
import Router from './routers/index';

export default class App extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router />
        )
    }
}
