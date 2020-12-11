#!/usr/bin/env node

const chalk = require('chalk')
console.log(chalk.red('hello my-cli'))

const { program } = require('commander')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const checkPath = require('./checkPath')
const path = require('path')
const replace = require('replace-in-file')
const { loadAllFiles, existsSync } = require('./file')
const ora = require('ora')

program
  .version(`my-cli ${require('./package').version}`)
  .command('create <app-name>')
  .description('create a new project powered by my-cli')
  .action(async name => {
    const { template } = await inquirer.prompt([
      {
        name: 'template',
        type: 'rawlist',
        message: 'Please choose a template:',
        default: 'ProjectA',
        choices: [
          {
            name: '项目 A',
            value: 'ProjectA'
          },
          {
            name: '项目 B',
            value: 'ProjectB'
          },
          {
            name: '项目 C',
            value: 'ProjectC'
          }
        ]
      }
    ])
    const dirPath = checkPath(name, template)
    // 判断目录是否已存在
    await existsSync(dirPath)
    const spinner = ora({
      text: 'Take it easy :）Is downloading the template...',
      color: 'yellow'
    })
    spinner.start()
    download('HenryTSZ/hello-world', dirPath, error => {
      if (error) {
        spinner.fail(`创建 ${name} 项目失败`)
        console.log('失败原因: ', error)
      } else {
        const files = loadAllFiles(dirPath)
        const options = {
          files,
          from: 'replaceOutputDir',
          to: path.join(template, name)
        }
        replace.sync(options)
        spinner.succeed(`成功创建 ${name} 项目`)
      }
    })
  })

program.parse(process.argv)
