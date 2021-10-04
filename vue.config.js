module.exports = {

  // #region devServer设置
  // devServer: {
  //   host: 'localhost',
  //   port: 8000,
  //   proxy: {
  //     // 如果请求的前缀是api(http://lcoalhost:8080/api),那就走代理服务器，代理到5000
  //     '/api': {
  //       target: 'http://localhost:5000',// 真实地址
  //       ws: true,//是否支持webSocket
  //       /* 
  //         用于修改请求头中host值，如果为true，代理服务器会把请求头信息中的
  //         host值改为被请求的那个服务器的host，从而偷偷请求它，[这样就支持域名不同也跨域了]
  //       */
  //       changeOrigin: true, // 是否支持域名跨域

  //       /* 
  //         为了判断是否需要走代理服务器，所以加了一个前缀判断/api
  //         真实请求时，需要去掉这个作为判断工具使用的前缀/api
  //       */
  //       pathRewrite:{//请求路径重写 
  //         '^/api': ''
  //       }
  //     },
  //     '/car': {//前缀为/car,就代理到5001
  //       target: 'http://localhost:5001',
  //       ws: true,
  //       changeOrigin: true, // 是否支持域名跨域
  //       pathRewrite:{//请求路径重写
  //         '^/car': ''
  //       }
  //     }

  //   }
  // }
  //#endregion
}