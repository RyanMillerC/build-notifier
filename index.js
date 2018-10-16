/**
 * build-notifier
 *
 * GitHub bot to comment on new pull requests. Bot will comment with
 * a predefinded message including a URL to a build of the requested
 * PR. This assumes that all PRs are being deployed to a specific
 * URL under a resource name matching the PR branch name. For example,
 * a link to, `http://devopsmachine.com/PRs/add-spacing-to-navbar`,
 * would be added to the bot's comment on a PR to merge the branch,
 * `add-spacing-to-navbar`, into master. In this example, `http://dev-
 * opsmachine.com/PRs`, is where all builds are being deployed, each
 * under a seperate resource suffix matching the branch name.
 *
 * The notification message and deployment location are configured
 * in, `.github/build-notifier.yml`, on the target repo. There are
 * two values that must be set in the configuration file:
 *
 *   `deploymentURL` - Base URL where builds will be deployed. In the
 *        example above this is "http://devopsmachine.com/PRs".
 *   `notifyMessage` - Bot comment message. This can be formatted
 *        with any Markdown that is supported in PR comments. The text,
 *        `{{LINK}}`, with be replaced with a link to the PR build.
 *
 * @summary GitHub bot to comment on new pull requests with a link to
 *          a live demo of the requested PR.
 *     @see https://github.com/RyanMillerC/build-notifier/README.md
 **/

module.exports = app => {
  app.on('pull_request.opened', async probotContext => {
    let config
    try {
      config = await probotContext.config('build-notifier.yml')
      console.log(config, 'config')
    } catch (e) {
      console.log(e)
    }

    let deploymentURL, notifyMessage
    try {
      deploymentURL = config.deploymentURL
      notifyMessage = config.notifyMessage
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
