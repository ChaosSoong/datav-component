var MD5 = require('MD5')
var $ = require('jquery');
/**
 * 生成签名
 * @param {Object} res  需要签名的请求对象
 * @return {String}     返回签名串
 */
const _signature = res => {
  var objs = []
  var strs = ''

  // 1. 将对象转成数组
  for (var i in res) {
    objs.push([i, res[i]])
  }

  // 2. 对数组进行排序
  __sort(objs, function (a, b) {
    return a[0] > b[0]
  })

  // 3. 拼接成字符串(过滤值为 null / undefined)
  for (let i = 0; i < objs.length; i++) {
    strs += objs[i][0] + '' + ((objs[i][1] === null || objs[i][1] === undefined) ? '' : objs[i][1])
  }
  // 4. MD5加密串
  return MD5('f7af5fba518c79bff68de814e7c0efbb' + strs + 'f7af5fba518c79bff68de814e7c0efbb').toLowerCase()
}

/**
 * 模拟 sort 排序 (解决 Safari 下 soft 的 BUG)
 * @param  {Array}   array 需要排序的数组
 * @param  {Function} fn   排序函数
 * @return {Array}         返回排序后的数组
 */
const __sort = (array, fn) => {
  for (var i = 0; i < array.length - 1; i++) {
    var isSorted = true
    for (var j = 0; j < array.length - 1 - i; j++) {
      if (fn(array[j], array[j + 1]) > 0) {
        var temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
        isSorted = false
      }
    }
    if (isSorted) {
      return false
    }
  }
}
const ajax = (url) => {
  return new Promise((resolve, reject)=>{
    let timestamp = new Date().getTime()
    let data = { 
      app_key: 'pcmwlhff68de',
      timestamp: timestamp,
      token: '',
      sign: _signature({
        app_key: 'pcmwlhff68de',
        timestamp: timestamp,
        token:''
      })
    }
    $.ajax({
      url: url, 
      type: 'POST',
      contentType:'application/x-www-form-urlencoded;charset=UTF-8',
      data: data, 
      success: function(res) {
        resolve(res)
      },
      error: function(error){
        reject(error)
      }
    });
  })
    
}
export {
  ajax
}