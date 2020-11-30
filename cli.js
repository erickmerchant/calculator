#!/usr/bin/env node
import childProcess from 'child_process'

const options = {stdio: 'inherit'}
const command = process.argv[2]

const spawn = (strs, ...quoted) =>
  new Promise((resolve) => {
    const args = []

    for (let i = 0; i < strs.length; i++) {
      args.push(...strs[i].split(' '))

      if (quoted[i] != null) {
        args.push(quoted[i])
      }
    }

    const spawned = childProcess.spawn(args[0], args.slice(1), options)

    spawned.on('exit', () => {
      resolve()
    })
  })

const program = async () => {
  try {
    if (command === 'start') {
      spawn`css src/styles.js dist/css -wd`

      spawn`dev serve src dist -de dev.html`
    }
  } catch (error) {
    console.error(error)

    process.exit(1)
  }
}

program()
