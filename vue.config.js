module.exports = {
  devServer:{
    host:'localhost',// 设置主机名
    port:8080,// 设置端口
    proxy:{
      // 如果请求的前缀是api(http://lcoalhost:8080/api),那就走代理服务器，
      '/api':{
        target:'http://mall-pre.springboot.cn',// 真实地址
        /* 
          用于修改请求头中host值，如果为true，代理服务器会把请求头信息中的
          host值改为被请求的那个服务器的host，从而偷偷请求它，[这样就支持域名不同也跨域了]
        */
        changeOrigin:true,
        /* 
          为了判断是否需要走代理服务器，所以加了一个前缀判断/api
          真实请求时，需要去掉这个作为判断工具使用的前缀/api
        */ 
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },
  // 默认'/',表示是域名紧接着页面，'/app'表示域名下还有个子项目叫app，再下面才是页面
  // publicPath: '/',

  // 打包文件出来的文件名
  // outputDir: 'dist',

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // indexPath: 'index.html',

  // eslint检查一些设置
  // lintOnSave: 'default',

  // 上线时,可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,

  // 删除空闲时加载的js,等真正用到再加载,真正意义上的懒加载
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}