import React from 'react'
import ReactDOM from 'react-dom'
import * as pathMatch from 'path-match';
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom'
import defaultLayout from './layout'
import { getWrappedComponent, getComponent } from 'ykfe-utils'
import { routes as Routes } from './config/config.ssr'

function getRoute(pathname) {
  let ret;
  const match = pathMatch({
    // path-to-regexp options
    sensitive: false,
    strict: true,
    end: true,
  });
  Routes.some(route => {
    const params = match(route.path)(pathname.replace(/[?#]+[^/]*/i, ''));
    if (params) {
      ret = route;
      return true;
    }
    return false;
  });

  return ret;
}

const clientRender = async () => {
  // 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <BrowserRouter>
      <Switch>
        {
        // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
          Routes.map(route => {
            const { path, exact, meta, Component } = route;
            const ActiveComponent = Component()
            const Layout = ActiveComponent.Layout || defaultLayout
            const WrappedComponent = getWrappedComponent(ActiveComponent)
            return <Route exact={exact} key={path} path={path} render={() => <Layout key={window.location.pathname} route={route}><WrappedComponent /></Layout>} />
          })
        }
      </Switch>
    </BrowserRouter>
    , document.getElementById('app'))

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

const serverRender = async (ctx) => {
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(Routes, ctx.path)()
  const Layout = ActiveComponent.Layout || defaultLayout
  const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
  ctx.serverData = serverData
  return <StaticRouter location={ctx.req.url} context={serverData}>
    <Layout route={getRoute(ctx.request.url)} layoutData={ctx}>
      <ActiveComponent {...serverData} />
    </Layout>
  </StaticRouter>
}

export default __isBrowser__ ? clientRender() : serverRender
