#!/usr/bin/env node

const yargs = require('yargs')
const fs = require('fs')
const path = require('path')
const throught2 = require('through2')
const JSONStream = require('JSONStream')
const parse = require('csv-parse')
const { promisify } = require('util')
const request = require('request')

const readdir = promisify(fs.readdir)

const isCLI = require.main === module

const readStream = (_path) =>
  fs.createReadStream(path.relative(process.cwd(), _path))

const transformCSV = (stream) =>
  stream
    .pipe(parse({
      columns: true,
    }))
    .pipe(JSONStream.stringify())

const inputOutput = (_path) =>
  readStream(_path)
    .pipe(process.stdout)

const transformFile = (_path) => {
  const normalized = path.relative(process.cwd(), _path)
  transformCSV(readStream(normalized))
    .pipe(fs.createWriteStream(normalized.replace('.csv', '.json')))
}

const transform = () =>
  transformCSV(process.stdin)
    .pipe(process.stdout)

const bundleCss = async (_path, resultFilename = 'bundle.css') => {
  const dir = path.relative(process.cwd(), _path)
  const destination = fs.createWriteStream(path.join(dir, resultFilename))
  const files = await readdir(dir)

  const paths = files
    .filter(file => file.endsWith('.css'))
    .filter(file => file !== resultFilename)
    .map(file => path.join(dir, file))

  const streams = paths
    .map(p => fs.createReadStream(p))
    .concat(request('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css'))

  const write = (sx, dest) => {
    const [ source, ...rest ] = sx
    if (source) {
      source.pipe(destination, { end: false })
      source.on('end', () => {
        write(rest, dest)
      })
    }
  }

  write(streams, destination)
}

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
    (argv) => bundleCss(argv.path)
  )
  .demandCommand(1, 'You need at least one command before moving on')
  .locale('en')
  .version(false)
  .argv

console.log(argv)

module.exports = {
  inputOutput,
  transformFile,
  bundleCss,
}