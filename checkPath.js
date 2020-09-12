const path = require('path')
const { PATH_MAP } = require('./constant')

module.exports = function checkPath(name, type) {
  const basename = path.basename(process.cwd())
  const joinPath = PATH_MAP[type][basename]
  if (joinPath !== undefined) {
    return path.join(joinPath, name)
  } else {
    console.log('Current path is illegal, please check it')
    process.exit(-1)
  }
}
