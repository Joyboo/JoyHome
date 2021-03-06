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
    if (key === 'a') { return ['???', '???', '???', '???', '???', '???', '???'][value ] }
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

function listdate(beginday, endday, fmt) {
  endday = endday || 0
  fmt = fmt || '{y}{m}{d}'
  let beginStamp = beforeDay(beginday)
  const endStamp = beforeDay(endday)

  const list = []
  while (beginStamp <= endStamp) {
    list.push(parseTime(beginStamp, fmt))
    beginStamp += 86400 * 1000
  }
  return list
}

/**
 * ??????????????????????????????
 * @param {number} n ???????????????
 * @param {number} f ???????????????
 * @returns {string}
 */
function makeRound(n, f) {
  f = f || 0
  let t = ''
  const len = n + f
  for (let i = 0; i < len;) {
    const rd = Math.floor(Math.random() * 10)
    // ?????????????????? 0012 ?????????
    if (t !== '' || rd !== 0) {
      t += rd
      i++
    }
  }

  if (f > 0) {
    // 1?????????/10, 2???/100, 3???/1000 ...
    const func = n => {
      let mul = 1
      for (let i = 1; i <= n; i++) {
        mul *= 10
      }
      return mul
    }
    t = t / func(f)
  } else {
    t = parseInt(t)
  }
  return t
}

/**
 * ?????????????????????
 * @param e ??????
 * @returns {string}
 */
function makeRoundString(e) {
  e = e || 32
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const a = t.length
  let n = ''
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

module.exports = {
  param2Obj,
  deepClone,
  beforeDay,
  parseTime,
  listdate,
  makeRound,
  makeRoundString
}
