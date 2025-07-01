import fs from 'fs'

let packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const yunzaiVersion = packageJson.version
const isMiao = packageJson.name === 'miao-yunzai'
const isElia = packageJson.name === 'elia-yunzai'
const isAcid = packageJson.name === 'acid-yunzai'
const isTrss = packageJson.name === 'trss-yunzai'

let Version = {
  isMiao,
  isTrss,
  isElia,
  isAcid,
  get version() {
    return yunzaiVersion
  }
}

export default Version
