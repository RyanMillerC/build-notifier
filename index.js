//index.js

module.exports = app => {
  app.on('pull_request.opened', async probotContext => {
    let config
    try {
      config = await probotContext.config('build-notifier.yml')
      console.log(config, 'config')
    } catch (e) {
      console.log(e)
    }
    try {
      const { deploymentURL, notifyMessage } = config
    } catch(e) {
      console.log('Unable to pull settings from ".github/build-notifier.yml".')
      process.exit(1)
    }

    const repoName = probotContext.payload.repository.name
    const owner = probotContext.payload.repository.owner.login
    const issueNumber = probotContext.payload.number
    const pullRequest = await probotContext.github.pullRequests.get({
      owner: owner,
      repo: repoName,
      number: issueNumber
    })
    const branchName = pullRequest.data.head.ref
    const buildURL = deploymentURL + '/' + branchName
    const prComment = probotContext.issue({
      body: notifyMessage.replace('{{LINK}}', buildURL)
    })
    return probotContext.github.issues.createComment(prComment)
  })
}
