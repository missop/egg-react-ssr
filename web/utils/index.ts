import * as pathMatch from 'path-match';
import * as config from '../../config/config.ssr';

const match = pathMatch({
  // path-to-regexp options
  sensitive: false,
  strict: true,
  end: true,
});

export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

export function getRoute(pathname) {
  let ret;
  config.routes.some(route => {
    const params = match(route.path)(pathname.replace(/[?#]+[^/]*/i, ''));
    if (params) {
      ret = route;
      return true;
    }
    return false;
  });

  return ret;
}

export function getMeta(route, pathname) {
  if (route && route.meta) {
    const params = match(route.path)(pathname);

    try {
      return route.meta.call(null, params);
    }
    catch (e) {
      return route.meta;
    }
  }

  return {}
}
