import home from '../../pages/home'
import NotFound from "../../pages/NotFound";

export default [
    {
        name: 'home',
        path: '/',
        exact: true,
        component: home
    },
    {
        name: '404',
        path: '*',
        exact: true,
        component: NotFound
    }
]
