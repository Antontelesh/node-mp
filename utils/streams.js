#!/usr/bin/env node

const yargs = require('yargs')
const fs = require('fs')
const path = require('path')

const isCLI = require.main === module

const inputOutput = (_path) =>
  fs.createReadStream(path.relative(process.cwd(), _path))
    .pipe(process.stdout)

const perform = ({ action, path }) => {
  switch (action) {
    case 'io': return inputOutput(path)
    default: throw new Error(`Unknown action "${action}"`)
  }
}

const argv = yargs
  .options({
    'a': {
      alias: 'action',
      choices: [ 'io', 'transform-file', 'transform', 'bundle-css' ],
      describe: 'An action to perform',
      demandOption: true,
    },
    'p': {
      alias: 'path',
      describe: 'An action to perform',
      demandOption: true,
    },
    'h': {
      alias: 'help',
    },
  })
  .locale('en')
  .version(false)
  .argv

perform(argv)