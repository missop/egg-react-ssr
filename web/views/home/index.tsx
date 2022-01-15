import React, { Component } from 'react'

export default class Test extends Component {
  static getInitialProps (ctx){}

  componentDidMount () {
    console.log("ssr not invoked")
  }

  render () {
    return (
      <div>
        123
      </div>
    )
  }
}

Test.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return window.__isBrowser__ ? ((await window.fetch("/api")).json()) : ctx.service.api.newsIndex()
}
