config.default.js 为默认的配置文件，所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。

当指定 env 时会同时加载默认配置和对应的配置(具名配置)文件，具名配置和默认配置将合并(使用extend2深拷贝)成最终配置，具名配置项会覆盖默认配置文件的同名配置。如 prod 环境会加载 config.prod.js 和 config.default.js 文件，config.prod.js 会覆盖 config.default.js 的同名配置。

config.default.js 所有配置的基础配置，包含kyes（必须），static，cdnHost，域名以及端口号，还有一些nodejs请求时用到的常量，比如接口域名等

config.local.js 本地开发配置

config.prod.js 线上/测试环境开发配置

config.ssr.js ssr相关配置
路由配置
css资源地址
js资源地址