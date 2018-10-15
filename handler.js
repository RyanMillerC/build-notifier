// handler.js
const serverlessLambda = require('@probot/serverless-lambda')
const appFn = require('./')
module.exports.main = serverlessLambda.serverless(appFn)
