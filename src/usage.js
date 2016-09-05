"use strict"

// TODO: Yeah it's kind of awful to just print the Markdown source code for the
// README, but I don't really want to bother duplicating that explanation right
// now, or probably ever.

const fs = require("fs")
const path = require("path")
const die = require("./die")

const filename = path.resolve(__dirname, "..", "README.md")
const message = fs.readFileSync(filename, "utf-8")

function usage() {
  die(message)
}

module.exports = usage
