const path = require('path')
require('babel-register')
require('./main')
const Importer = require('./importer')

const importer = new Importer()

importer.import(path.relative(__dirname, './data/MOCK_DATA.csv'))
  .then(
    data => { console.log('data', data) },
    error => { console.log('error', data) },
  )