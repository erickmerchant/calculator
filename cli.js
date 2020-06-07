#!/usr/bin/env node
const {command, start} = require('sergeant')('cli.js')
const execa = require('execa')
const execaOptions = {shell: true, stdio: 'inherit', cwd: process.cwd()}

command({
  name: 'start',
  async action() {
    execa('css src/styles.mjs src/css/styles -wd', execaOptions)

    execa('dev serve src -d -e dev.html', execaOptions)
  }
})

command({
  name: 'build',
  async action() {
    await Promise.all([
      execa('css src/styles.mjs src/css/styles', execaOptions),

      execa('dev cache src dist', execaOptions)
    ])
  }
})

start(process.argv.slice(2))
