import RegisterForm from '../components/Credentials/RegisterForm';
import Error from '../components/Error';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Player from '../containers/Player';

const routes = [
  {

    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    exact: true,
    path: '/register',
    component: RegisterForm,
  },
  {
    exact: true,
    path: '/error',
    component: Error,
  },
  {
    exact: true,
    path: '/palyer/:id',
    component: Player,
  },
];

export default routes;
