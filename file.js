const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')

exports.loadAllFiles = filePath => {
  let files = []
  const loadFiles = filePath => {
    const fileDirs = fs.readdirSync(filePath)
    fileDirs.forEach(filename => {
      // 获取当前文件的绝对路径
      const fileDir = path.join(filePath, filename)
      // 根据文件路径获取文件信息, 返回一个 fs.Stats 对象
      const stat = fs.statSync(fileDir)
      if (stat.isDirectory()) {
        loadFiles(fileDir) // 递归, 如果是文件夹, 就继续遍历该文件夹下面的文件
      } else if (stat.isFile()) {
        files.push(fileDir)
      } else {
        console.log(`Invalid local preset path: ${fileDir}`)
        return
      }
    })
  }
  loadFiles(filePath)
  return files
}

exports.existsSync = async name => {
  if (fs.existsSync(name)) {
    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `Target directory ${name} already exists. Pick an action:`,
        default: false,
        choices: [
          { name: 'Overwrite', value: true },
          { name: 'Cancel', value: false }
        ]
      }
    ])
    if (action) {
      console.log(`Removing ${name} ...`)
      await fs.remove(name)
      console.log(`removed ${name} successfully`)
    } else {
      process.exit(-1)
    }
  }
}
