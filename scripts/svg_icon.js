#!/usr/bin/env node
'use strict'

const SVGO = require('svgo')
const base = require('app-root-dir')
const path = require('path')
const fs = require('fs')
const consola = require('consola')

process.on('unhandledRejection', err => {
  throw err
})

// https://github.com/svg/svgo  可配置项参考
// 由于这两项默认值为 true，而我们的使用场景不能删除这两项，所以这两项不使用默认配置,
// 由于多个 svg 文件的 id 可能会出现重名冲突，所以为 id 添加 prefix 前缀。
const getSvgoConfig = dir => {
  const prefix = dir.replace(/.*src\/(.*).svg$/, (m, $1) => `${$1}-`)
  return {
    plugins: [
      {
        cleanupIDs: {
          prefix: prefix
        }
      },
      {
        removeViewBox: false
      }
    ]
  }
}

const isSvg = dir => {
  return /.svg$/.test(dir)
}

const args = process.argv.slice(2)

// 压缩文件
const compress = dir => {
  fs.readFile(dir, 'utf8', (err, svgStr) => {
    if (!err) {
      const svgo = new SVGO(getSvgoConfig(dir))
      svgo.optimize(svgStr).then(result => {
        if (svgStr !== result.data) {
          fs.writeFile(dir, result.data, err => {
            if (!err) {
              consola
                .withScope('svgo_icon')
                .info(`${dir}: compressed successed`)
            }
          })
        }
      })
    }
  })
}

// 遍历 icons 文件，将 .svg 文件进行压缩
const walk = dir => {
  const curDirList = fs.readdirSync(dir)
  curDirList.forEach(curDir => {
    curDir = dir + '/' + curDir
    const stat = fs.statSync(curDir)
    if (stat && stat.isDirectory()) {
      walk(curDir)
    } else {
      if (isSvg(curDir)) {
        compress(curDir)
      }
    }
  })
}

if (args.length) {
  // git pre-commit
  for (let i = 0; i < args.length; i++) {
    compress(args[i])
  }
} else {
  // npm run svgo_icon
  walk(path.resolve(base.get(), 'icons/'))
}
