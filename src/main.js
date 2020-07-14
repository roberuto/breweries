import { Router, RouterView } from './app/router';
import { register } from './app/register';
import { registerSW } from './register-sw';

import * as components from './app/components';
import * as views from './app/views';

import './main.css';

register({ RouterView, ...components, ...views });

const routes = [
  { path: '/', template: views.HomeView },
  { path: '/about', template: views.AboutView },
  { path: '/details/:id', template: views.DetailsView },
  { path: '*', template: views.NotFoundView },
];

new Router(routes);

registerSW();
