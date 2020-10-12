const fs = require('fs-extra')
const inquirer = require('inquirer')
const chalk = require('chalk')
const symbols = require('log-symbols')
const path = require('path')
const replace = require('replace-in-file')
const rimraf = require('rimraf')

const { REPLACE_KEYWORDS, ICO_NAME_MAP, HOME_TYPE_MAP } = require('../constant')

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
      console.log(symbols.warning, chalk.red(`Removing ${name} ...`))
      await fs.remove(name)
      console.log(symbols.success, chalk.green(`removed ${name} successfully`))
    } else {
      process.exit(-1)
    }
  }
}

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
        console.log(symbols.warning, chalk.red(`Invalid local preset path: ${fileDir}`))
        return
      }
    })
  }
  loadFiles(filePath)
  return files
}

exports.replaceKeywords = (files, to) => {
  const options = {
    files,
    from: REPLACE_KEYWORDS,
    to
  }
  replace.sync(options)
}

exports.replaceIco = (filePath, type) => {
  fs.rename(
    path.join(filePath, `public/${ICO_NAME_MAP[type]}.png`),
    path.join(filePath, 'public/favicon.ico')
  )
  // 删除多余的 .png 图片
  rimraf(path.join(filePath, 'public/*.png'), err => {
    if (err) {
      console.log(symbols.warning, chalk.red(err))
    }
  })
}

exports.replaceHome = (filePath, type) => {
  const homePath = path.join(filePath, 'src/views')
  fs.rename(path.join(homePath, `${HOME_TYPE_MAP[type]}.txt`), path.join(homePath, 'Home.vue'))
  // 删除该文件夹下多余的 .txt 文件
  rimraf(path.join(homePath, '*.txt'), err => {
    if (err) {
      console.log(symbols.warning, chalk.red(err))
    }
  })
}
