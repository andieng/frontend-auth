import { Route, Navigate } from 'react-router-dom';
import { Props, RouteProperties } from 'src/types/types';
import config from 'src/config';

// Pages
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import Signup from 'src/pages/Signup';
import User from 'src/pages/User';
import Profile from 'src/pages/Profile';

const publicRoutes: Array<RouteProperties> = [
    { path: config.routes.home, page: Home },
    { path: config.routes.login, page: Login },
    { path: config.routes.signup, page: Signup },
];

const privateRoutes: Array<RouteProperties> = [
    { path: config.routes.user, page: User },
    { path: config.routes.profile, page: Profile },
];

export { privateRoutes, publicRoutes};
