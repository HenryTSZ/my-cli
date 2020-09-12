#!/usr/bin/env node

const { program } = require('commander')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const ora = require('ora')

const { existsSync, loadAllFiles, replaceKeywords, replaceIco } = require('../utils/file')
const checkPath = require('../utils/checkPath')
const { API_MAP } = require('../constant')

program
  .version(`basis-web-cli ${require('../package').version}`)
  .command('create <app-name>')
  .description('create a new project powered by basis-web-cli')
  .action(async name => {
    const { projectType, projectTitle } = await inquirer.prompt([
      {
        name: 'projectType',
        type: 'rawlist',
        message: `Please choose a projectType:`,
        default: 'BridgeProduction',
        choices: [
          { name: 'BridgeProduction(桥梁)', value: 'BridgeProduction' },
          { name: 'BaseProduction(基建项目)', value: 'BaseProduction' },
          { name: 'EnterpriseProduction(基建企业)', value: 'EnterpriseProduction' }
        ]
      },
      {
        name: 'projectTitle',
        message: 'Please enter the project name:'
      }
    ])
    const dirPath = checkPath(name, projectType)
    // 判断目录是否已存在
    await existsSync(dirPath)
    const spinner = ora({
      text: 'Take it easy :）Is downloading the template...',
      color: 'green',
      spinner: {
        interval: 80,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
      }
    })
    spinner.start()
    download('HenryTSZ/GlodonBasisWebDemo', dirPath, err => {
      if (err) {
        spinner.fail(`Download failed: ${err}`)
      } else {
        const allFiles = loadAllFiles(dirPath)
        replaceKeywords(allFiles, [projectTitle, API_MAP[projectType], `${projectType}/${name}`])
        replaceIco(dirPath, projectType)
        spinner.succeed(`successfully created ${name}`)
      }
    })
  })

program.parse(process.argv)