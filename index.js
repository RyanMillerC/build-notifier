module.exports = app => {
  app.on('pull_request.opened', async context => {
    const config = await context.config(`deploy-notifier.yml`)
    const { deploymentURL, notifyMessage } = config || {}
    const repoName = context.payload.repository.name
    const owner = context.payload.repository.owner.login
    const issueNumber = context.payload.number
    const pullRequest = await context.github.pullRequests.get({
      owner: owner,
      repo: repoName,
      number: issueNumber
    })
    const branchName = pullRequest.data.head.ref
    const buildURL = deploymentURL + '/' + branchName
    const prComment = context.issue({
      body: notifyMessage.replace('{{LINK}}', buildURL)
    })
    return context.github.issues.createComment(prComment)
  })
}
