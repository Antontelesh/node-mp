#!/usr/bin/env node

const yargs = require('yargs')
const fs = require('fs')
const path = require('path')
const throught2 = require('through2')
const parse = require('csv-parse')

const isCLI = require.main === module

const inputOutput = (_path) =>
  fs.createReadStream(path.relative(process.cwd(), _path))
    .pipe(process.stdout)

const transformFile = (_path) =>
  fs.createReadStream(path.relative(process.cwd(), _path))
    .pipe(parse({
      columns: true,
    }))
    .pipe(throught2.obj(function (chunk, enc, cb) {
      this.push(JSON.stringify(chunk, null, 2))
      cb()
    }))
    .pipe(process.stdout)

const argv = yargs
  .options({
    'help': {
      alias: 'h'
    },
  })
  .command(
    'io',
    'Read the file',
    {
      file: {
        alias: 'f',
        describe: 'path to the file',
        normalize: true,
        demandOption: true,
      },
    },
    (argv) => inputOutput(argv.file)
  )
  .command(
    'transform-file',
    'Parse CSV file as JSON',
    {
      file: {
        alias: 'f',
        describe: 'path to the file',
        normalize: true,
        demandOption: true,
      },
    },
    (argv) => transformFile(argv.file)
  )
  .command(
    'transform',
    'Parse CSV input as JSON',
    {},
    () => transform()
  )
  .command(
    'bundle-css',
    'Bundles all css files in the folder into one file',
    {
      path: {
        alias: 'p',
        describe: 'directory with css files to bundle',
        normalize: true,
        demandOption: true,
      }
    },
    (argv) => bundleCss(path)
  )
  .locale('en')
  .version(false)
  .argv