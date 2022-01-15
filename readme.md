## 项目目录(遵循egg项目约定)
├── app
│   ├── controller
│   │   └── page.js      渲染页面的主要逻辑
│   ├── public
│   │   ├── assets
│   │   └── robots.txt
│   ├── readme.md
│   ├── router
│   │   ├── app.js    
│   │   └── ssr.js      
│   ├── router.js
│   ├── service
│   │   └── api.js
│   └── utils
├── build
│   ├── paths.js
│   ├── util.js
│   ├── webpack.config.base.js
│   ├── webpack.config.client.js
│   └── webpack.config.server.js
├── config
│   ├── config.default.js    为默认的配置文件，所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。
│   ├── config.local.js      本地开发配置
│   ├── config.prod.js       线上/测试环境开发配置
│   ├── config.ssr.js        ssr相关配置，路由配置，前后端公用一套
│   ├── plugin.local.js      插件配置
│   └── readme.md
├── dist
│   ├── layout.server.js
│   └── page.server.js
├── entry.js                  入口文件
├── jsconfig.json
├── layout.js                 
├── package-lock.json
├── package.json
├── readme.md
└── web
    ├── apis
    │   └── index.js
    ├── components
    ├── styles
    ├── utils
    │   ├── index.js
    │   └── request.js
    └── views
        └── home
            └── index.js


## 最后：开发历程
第一个命令:npm run csr 先把前端资源跑起来
第二个命令:npm run debug  把后端egg服务跑起来
第三个命令:npm run ssr 测试服务端代码
最后： rm -rf dist && npm-run-all --parallel ssr csr