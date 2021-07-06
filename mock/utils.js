/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

function beforeDay(day) {
  day = day === true ? -14 : day
  const d = new Date()
  d.setTime(d.getTime() + 3600 * 1000 * 24 * day)
  return d.getTime()
}

function listdate(beginday, endday)
{
  endday = endday || 0
  let beginStamp = beforeDay(beginday)
  const endStamp = beforeDay(endday)

  const list = []
  while (beginStamp <= endStamp)
  {
    list.push(parseTime(beginStamp, '{y}{m}{d}'))
    beginStamp += 86400 * 1000
  }
  return list
}

/**
 * 生成指定位数的随机数
 * @param {number} n 整数位长度
 * @param {number} f 小数位长度
 * @returns {string}
 */
function makeRound(n, f){
  f = f || 0
  let t = '';
  const len = n + f
  for(let i = 0; i < len;){
    const rd = Math.floor(Math.random()*10);
    // 避免出现类似 0012 的数字
    if (t !== '' || rd !== 0)
    {
      t += rd
      i++
    }
  }

  if (f > 0)
  {
    t = t / f * 10
  } else {
    t = parseInt(t)
  }
  return t;
}

module.exports = {
  param2Obj,
  deepClone,
  beforeDay,
  parseTime,
  listdate,
  makeRound
}
