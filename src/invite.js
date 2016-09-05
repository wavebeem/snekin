"use strict"

const request = require("request")
const conf = require("./conf")

const url = "https://" + conf.DOMAIN + ".slack.com/api/users.admin.invite"

function messageForBody(err, unparsedBody) {
  const body = unparsedBody ? JSON.parse(unparsedBody) : {}
  const ok = body.ok
  const slackError = body.error
  const needed = body.needed
  if (err) {
    console.error("Network error:", err)
    return "TODO: err"
  } else if (ok) {
    return "Please check your email for a link to join " +
      conf.DOMAIN + ".slack.com"
  } else if (slackError === "missing_scope" && needed === "admin") {
    return "The Slack token is missing admin scope"
  } else if (slackError === "already_invited") {
    return "You have already been invited, please check your email again"
  } else if (slackError === "already_in_team") {
    return "You are already part of " + conf.DOMAIN + ".slack.com"
  } else if (slackError === "invalid_email") {
    return "Invalid email"
  } else {
    console.error(slackError)
    return "Unknown Slack API error"
  }
  throw new Error("SHOULD NOT GET HERE")
}

function invite(req, res) {
  const form = {
    set_active: true,
    email: req.body.email,
    token: conf.TOKEN
  }
  request.post(url, {form}, (err, _slackResponse, body) => {
    const message = messageForBody(err, body)
    res.render("invite", {message, DOMAIN: conf.DOMAIN})
  })
}

module.exports = invite
