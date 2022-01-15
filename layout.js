import React from 'react'
import serialize from 'serialize-javascript'
import { ConfigProvider } from 'antd'
// import { getMeta } from '@/utils';

const commonNode = (props) => (
  // 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ?  props.children  : ''
  props.children
    ? <ConfigProvider prefixCls="pfm">
      <div className="page">
        {props.children}
      </div>
    </ConfigProvider>
    : ''
)

const Layout = (props) => {
  try {
    scrollTo(0, 0);
    document.body.style.overflow = 'auto';
  } catch (e) { }

  if (__isBrowser__) {
    return commonNode(props)
  } else {
    const { serverData } = props.layoutData
    const { injectCss, injectScript, isMobile, cdnHost, } = props.layoutData.app.config
    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width' />
          <meta name='keywords' content='' />
          <meta name='description' content='' />
          <link rel='shortcut icon' href='https://a.perfma.net/fe/www/favicon.ico' />
          <title></title>
          {
            injectCss && injectCss.map(item => <link rel='stylesheet' href={`${cdnHost}${item}`} key={item} />)
          }
        </head>
        <body className={isMobile ? 'mobile' : 'pc'}>
          <div id='app'>{commonNode(props)}</div>
          {
            serverData && <script dangerouslySetInnerHTML={{
              __html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${serialize(serverData)}` // 使用pathname作为组件初始化数据的隔离，防止props污染
            }} />
          }
          <div dangerouslySetInnerHTML={{
            __html: `
              <script>window.__IS_MOBILE__ = ${isMobile};</script>
              ${injectScript && injectScript.map(item => '<script type="text/javascript" src="' + cdnHost + item + '"></script>').join('')}`
                        }} />
                        <div style={{ display: 'none' }} dangerouslySetInnerHTML={{
                          __html: `
              <script type="text/javascript" src="https://v1.cnzz.com/z_stat.php?id=1278042739&web_id=1278042739"></script>
              <script>
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?3b88c951bddd7678d1ccbbca56cada2b";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
              </script>`
          }} />
        </body>
      </html>
    )
  }
}

export default Layout
