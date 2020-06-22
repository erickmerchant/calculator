#!/usr/bin/env node
import execa from 'execa'

const options = {stdio: 'inherit', preferLocal: true, cwd: process.cwd()}
const command = process.argv[2]

const program = async () => {
  try {
    if (command === 'start') {
      execa('css', ['src/styles.js', 'src/css/styles', '-wd'], options)

      execa('dev', ['serve', 'src', '-d', '-e', 'dev.html'], options)
    }

    if (command === 'build') {
      await Promise.all([
        execa('css', ['src/styles.js', 'src/css/styles'], options),

        execa('dev', ['cache', 'src', 'dist'], options)
      ])
    }
  } catch (error) {
    console.error(error)

    process.exit(1)
  }
}

program()
