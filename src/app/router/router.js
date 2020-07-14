const initialRoute = Symbol('initialRoute');
const loadRoute = Symbol('loadRoute');
const matchUrlToRoute = Symbol('matchUrlToRoute');
const mountView = Symbol('mountView');
const instance = Symbol('instance');

const NOT_FOUND = '/not-found';

export class Router {
  static params = {};

  constructor(routes) {
    if (this[instance]) {
      return this[instance];
    }

    this[instance] = this;

    this.routes = routes;
    this.root = document.querySelector('router-view');

    this[initialRoute](true);

    addEventListener('pushstate', (event) => {
      this[loadRoute](event.detail.pathname);
    });
    addEventListener('popstate', () => {
      this[initialRoute](false);
    });
  }

  static go(path = '/') {
    const pathname = path.startsWith('/') ? path : `/${path}`;
    dispatchEvent(
      new CustomEvent('pushstate', {
        detail: {
          pathname,
        },
      }),
    );
  }

  static back() {
    history.back();
  }

  static forward() {
    history.forward();
  }

  [loadRoute](url, pushState = true) {
    const route = this[matchUrlToRoute](url);

    if (!route) return;

    if (pushState) {
      if (route.path === NOT_FOUND) {
        history.replaceState(null, '', route.path);
      } else {
        history.pushState(null, '', url);
      }
    }

    this[mountView](route);
  }

  [mountView](route) {
    const routerOutletElement = this.root;

    while (routerOutletElement.firstChild) {
      routerOutletElement.removeChild(routerOutletElement.firstChild);
    }

    routerOutletElement.append(new route.template());
  }

  [matchUrlToRoute](url) {
    Router.params = {};

    let routeFragments;
    const urlFragments = url.split('/');

    const route = this.routes.find((route) => {
      routeFragments = route.path.split('/');

      if (routeFragments.length !== urlFragments.length) {
        return false;
      }

      return routeFragments.every((fragment, i) => {
        return fragment === urlFragments[i] || fragment.startsWith(':');
      });
    });

    if (route) {
      routeFragments.forEach((fragment, idx) => {
        if (fragment.startsWith(':')) {
          Router.params[fragment.replace(':', '')] = urlFragments[idx];
        }
      });

      return route;
    }

    const notFound = this.routes.find((route) => route.path === '*');

    if (notFound) {
      return { ...notFound, path: NOT_FOUND };
    }

    return;
  }

  [initialRoute](pushState) {
    this[loadRoute](window.location.pathname, pushState);
  }
}
