fis.match('*', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://tutu.lianwx.com/extends/zhongwt/web/api/fisReceiverStatic.php',
    to: '/' // 注意这个是指的是测试机器的路径，而非本地机器
  })
})