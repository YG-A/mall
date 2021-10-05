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
  }
}