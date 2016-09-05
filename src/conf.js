"use strict"

const fs = require('fs')
const die = require("./die")
const usage = require("./usage")

function CONF(conf, key, fallback) {
  if (conf.hasOwnProperty(key)) {
    return conf[key]
  } else {
    return fallback()
  }
}

function CONFR(conf, key) {
  function fn() {
    die("Missing configuration key \"" + key + "\"")
  }
  return CONF(conf, key, fn)
}


const conf = {}
const wantsHelp =
  process.argv.length !== 3 ||
  /^(?:--help|-help|help|-h|-\?)$/.test(process.argv[2])

if (wantsHelp) {
  usage()
}

const filename = process.argv[2]
try {
  const rawConf = JSON.parse(fs.readFileSync(filename))
  conf.HOST = CONF(rawConf, "host", () => "127.0.0.1")
  conf.PORT = CONF(rawConf, "port", () => 8080)
  conf.COC = CONF(rawConf, "coc", () => "")
  conf.DOMAIN = CONFR(rawConf, "slack_domain")
  conf.TOKEN = CONFR(rawConf, "slack_token")
} catch (error) {
  console.log(error)
  die("Failed to parse " + filename)
}

module.exports = conf
