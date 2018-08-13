/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.on('pull_request.opened', async context => {
    const config = await context.config(`deploy-notifier.yml`)
    const { s3BucketURL, notifyMessage } = config || {}
    const repoName = context.payload.repository.name
    const owner = context.payload.repository.owner.login
    const issueNumber = context.payload.number
    const pullRequest = await context.github.pullRequests.get({
      owner: owner,
      repo: repoName,
      number: issueNumber
    })
    const branchName = pullRequest.data.head.ref
    const buildURL = s3BucketURL + '/' + branchName
    const prComment = context.issue({
      body: notifyMessage.replace('{{LINK}}', buildURL)
    })
    return context.github.issues.createComment(prComment)
  })

  // For debugging
  // app.on(`*`, async context => {
  //   context.log({event: context.event, thing: context})
  // })
}
