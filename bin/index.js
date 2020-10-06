#!/usr/bin/env node

const { program } = require('commander')
const path = require('path')
const fs = require('fs-extra')
const https = require('https')
const figlet = require('figlet')
const url = require('url')
const chalk = require('chalk')
const figures = require('figures')
const ora = require('ora')
const { ByteSize, RoundNum } = require('trample/node')

const { IMG_REGEXP } = require('../util/getting')
const { RandomHeader } = require('../util/setting')

program
  .version(`tiny ${require('../package').version}`)
  .command('t [name]')
  .description('Compressed images under the current folder')
  .action(name => {
    console.log(chalk.green(figlet.textSync('tiny-photo-cli!', { horizontalLayout: 'full' })))
    const imgs = loadImgFiles()
    if (!imgs.length) {
      console.log(chalk.red(`${figures.cross} 当前文件夹下暂无 jpg / png 图片`))
      process.exit(0)
    }
    if (name) {
      fs.mkdirSync(name, { recursive: true })
    }
    const promises = imgs.map(img => compressImg(name, img))
    const spinner = ora('图片正在压缩......').start()
    Promise.all(promises).then(res => {
      spinner.stop()
      res.forEach(item => console.log(item))
    })
  })

program.parse(process.argv)

function loadImgFiles(filePath = '.') {
  let files = []
  const loadFiles = filePath => {
    const fileDirs = fs.readdirSync(filePath)
    fileDirs.forEach(filename => {
      const fileDir = path.join(filePath, filename)
      const stat = fs.statSync(fileDir)
      if (stat.isDirectory()) {
        loadFiles(fileDir)
      } else if (stat.isFile() && IMG_REGEXP.test(fileDir)) {
        files.push({
          original: fileDir,
          buffer: fs.readFileSync(fileDir)
        })
      }
    })
  }
  loadFiles(filePath)
  return files
}

async function compressImg(name = '', { original, buffer }) {
  try {
    const obj = await uploadImg(buffer)
    const data = await downloadImg(obj.output.url)
    const oldSize = chalk.redBright(ByteSize(obj.input.size))
    const newSize = chalk.greenBright(ByteSize(obj.output.size))
    const ratio = chalk.blueBright(RoundNum(1 - obj.output.ratio, 2, true))
    const output = path.join(name, path.basename(original))
    const compressPath = name ? `, 压缩后路径 ${output}` : ''
    const msg = `${figures.tick} 压缩 [${chalk.yellowBright(original)}] ${chalk.green(
      '成功'
    )}: 压缩前 ${oldSize}, 压缩后 ${newSize}, 压缩率 ${ratio}${compressPath}`
    fs.writeFileSync(output, data, 'binary')
    return Promise.resolve(msg)
  } catch (err) {
    const msg = `${figures.cross} 压缩 [${chalk.yellowBright(original)}] ${chalk.red(
      '失败'
    )}: ${chalk.redBright(err)}`
    return Promise.resolve(msg)
  }
}
function downloadImg(u) {
  const opts = new url.URL(u)
  return new Promise((resolve, reject) => {
    const req = https.request(opts, res => {
      let file = ''
      res.setEncoding('binary')
      res.on('data', chunk => (file += chunk))
      res.on('end', () => resolve(file))
    })
    req.on('error', e => reject(e))
    req.end()
  })
}
function uploadImg(file) {
  const opts = RandomHeader()
  return new Promise((resolve, reject) => {
    const req = https.request(opts, res =>
      res.on('data', data => {
        const obj = JSON.parse(data.toString())
        obj.error ? reject(obj.message) : resolve(obj)
      })
    )
    req.write(file, 'binary')
    req.on('error', e => reject(e))
    req.end()
  })
}
