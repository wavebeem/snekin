"use strict"

require("isomorphic-fetch")
const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const conf = require("./conf")
const invite = require("./invite")

const app = express()
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static("static"))

function index(req, res) {
  res.render("index", conf)
}

function goHome(req, res) {
  res.redirect("/")
}

app.get("/", index)
app.post("/invite", invite)
app.get("/*", goHome)

function start() {
  console.log("Customize with keys \"host\" and \"port\"")
  console.log("Snekin listening on http://" + conf.HOST + ":" + conf.PORT)
}

app.listen(conf.PORT, conf.HOST, start)
