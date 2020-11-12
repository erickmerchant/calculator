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
      spawn('css', ['src/styles.js', 'src/css/styles', '-wd'], options)

      spawn('dev', ['serve', 'src', '-de', 'dev.html'], options)
    }

    if (command === 'build') {
      await Promise.all([
        spawn('css', ['src/styles.js', 'src/css/styles'], options),

        spawn('dev', ['cache', 'src', 'dist'], options)
      ])
    }
  } catch (error) {
    console.error(error)

    process.exit(1)
  }
}

program()
