exports.fromEntries = arrArg => {
  // Map
  if (Object.prototype.toString.call(arrArg) === '[object Map]') {
    const resMap = {}
    for (const key of arrArg.keys()) {
      resMap[key] = arrArg.get(key)
    }
    return resMap
  }
  // array
  if (Array.isArray(arrArg)) {
    const resArr = {}
    arrArg.map(([key, value]) => {
      resArr[key] = value
    })
    return resArr
  }
  throw 'Uncaught TypeError: argument is not iterable'
}
