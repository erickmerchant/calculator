#!/usr/bin/env node
import childProcess from 'child_process'

const options = {stdio: 'inherit'}
const command = process.argv[2]

const spawn = (...args) =>
  new Promise((resolve) => {
    const spawned = childProcess.spawn(...args)

    spawned.on('exit', () => {
      resolve()
    })
  })

const program = async () => {
  try {
    if (command === 'start') {
      spawn('css', ['src/styles.js', 'dist/css/styles', '-wd'], options)

      spawn('dev', ['serve', 'src', 'dist', '-de', 'dev.html'], options)
    }
  } catch (error) {
    console.error(error)

    process.exit(1)
  }
}

program()
