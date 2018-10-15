# build-notifier :robot:

> GitHub bot to comment on new pull requests with a link to a live demo of the requested PR. It is available [here](https://github.com/apps/build-notifier).

![Screenshot](https://ryanmillerc.github.io/build-notifier/screenshot.png)

## Description

Build-notifier is a GitHub bot to comment on new pull requests. Bot will comment with a predefinded message including a URL to a build of the requested PR. This assumes that all PRs are being deployed to a specific URL under a resource name matching the PR branch name. For example, a link to, `http://devopsmachine.com/PRs/add-spacing-to-navbar`, would be added to the bot's comment on a PR to merge the branch, `add-spacing-to-navbar`, into master. In this example, `http://devopsmachine.com/PRs`, is where all builds are being deployed, each under a seperate resource suffix matching the branch name.

The notification message and deployment location are configured in, `.github/build-notifier.yml`, on the target repo. There are
two values that must be set in the configuration file:

  `deploymentURL` - Base URL where builds will be deployed. In the example above this is `http://devopsmachine.com/PRs`.
  `notifyMessage` - Bot comment message. This can be formatted with any Markdown that is supported in PR comments. The text, `{{LINK}}`, with be replaced with a link to the PR build.
  
This app uses the [Probot](https://github.com/probot/probot) framework and [@Probot/serverless-lambda](https://github.com/probot/serverless-lambda). The production application is hosted on AWS using API Gateway/Lambda and is deployed using [Serverless](https://github.com/serverless/serverless).

## Setup

1. Enable build-notifier for your repo [here](https://github.com/apps/build-notifier).

2. Create the file, `.github/build-notifier.yml`, in your repo.

3. Copy the contents of [.github/build-notifier.yml](.github/build-notifier.yml) into the new file from step #2 in your repo.

4. Replace `deploymentURL` and `notifyMessage` values with a your URL and a custom message for your app.

That's it! You can confirm it's working by creating a pull request and waiting a moment for the bot to comment. 

## Issues/Comments

If you experience any problems getting this bot working, open an issue and I'll get back with you.

## License

[ISC](LICENSE) © 2018 Ryan Miller <ryan@devopsmachine.com>
