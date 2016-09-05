"use strict"

const fs = require('fs')
const die = require("./die")

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
  die(`\
Snekin requires a configuration file to function.

Please take the following template and fill in your configuration details
and save it somewhere, then call Snekin again with the path to the
configuration file.

Save this to ~/.snekin.json:

{
  "host": "127.0.0.1",
  "port": 8080,
  "slack_domain": "my-slack-team-name",
  "slack_token": "MY_SLACK_TOKEN"
}

And then run this command:

$ snekin ~/.snekin.json`)
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
