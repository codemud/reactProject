import React from 'react'
import Home from "../../pages/home";
import Login from '../../pages/login';
import NotFound from "../../pages/NotFound";
import sysModule from '../moudels/sys'
import Layouts from '../../components/Layout'

export default [
    {
        name: 'login',
        path: '/login',
        exact: true,
        component: Login
    },
    {
        name: 'home',
        path: '/',
        exact: true,
        component: Home,
        render(props){
            return <Layouts {...props}/>
        }
    },
    ...sysModule,
    {
        name: '404',
        path: '*',
        exact: true,
        component: NotFound
    },
]
