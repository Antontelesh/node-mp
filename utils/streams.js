#!/usr/bin/env node

const yargs = require('yargs')

const isCLI = require.main === module

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

console.log(argv)