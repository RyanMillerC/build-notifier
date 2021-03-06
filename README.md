# build-notifier :robot: 

[![Travis (.org)](https://img.shields.io/travis/RyanMillerC/build-notifier.svg)](https://travis-ci.org/RyanMillerC/build-notifier)
[![GitHub](https://img.shields.io/github/license/RyanMillerC/build-notifier.svg)](https://github.com/RyanMillerC/build-notifier/blob/master/LICENSE)
[![Made with Probot](https://img.shields.io/badge/Made%20with-Probot-blue.svg)](https://github.com/probot/probot)

> GitHub bot will comment on new pull requests with a link to a live demo of the requested PR. It is available [here](https://github.com/apps/build-notifier).

![Screenshot](/docs/build-notifier-screenshot.png)

## Description

Build-notifier is a GitHub [Probot](https://github.com/probot/probot) App to comment on new pull requests. This bot will comment with a predefinded message including a URL to a build of the requested PR. This assumes that all PRs are being deployed to a specific URL for testing under a resource name matching the PR branch name. For example, a link to, `http://devopsmachine.com/PRs/add-spacing-to-navbar`, would be added to the bot's comment on a PR to merge the branch, `add-spacing-to-navbar`, into master. In this example, `http://devopsmachine.com/PRs`, is where all builds are being deployed, each under a seperate resource suffix matching the branch name.

The notification message and deployment location are configured in, `.github/build-notifier.yml`, on the target repo. There are
two values that must be set in the configuration file:

+ **deploymentURL** - Base URL where builds will be deployed. In the example above this is `http://devopsmachine.com/PRs`.
+ **notifyMessage** - Bot comment message. This can be formatted with any Markdown that is supported in PR comments. The text, `{{LINK}}`, with be replaced with a link to the PR build.
  
This app uses the [Probot](https://github.com/probot/probot) framework and [@Probot/serverless-lambda](https://github.com/probot/serverless-lambda). The production application is hosted on [AWS](https://aws.amazon.com/) using [Lambda](https://aws.amazon.com/lambda/)/[API Gateway](https://aws.amazon.com/api-gateway/) and is continously deployed through [Travis CI](https://travis-ci.org/RyanMillerC/build-notifier) using the [Serverless](https://github.com/serverless/serverless) Framework.

## Setup

To set up build-notifier for your repo,

1. Enable build-notifier for your repo [here](https://github.com/apps/build-notifier).

2. Create the file, `.github/build-notifier.yml`, in your repo.

3. Copy the contents of *[.github/build-notifier.yml](.github/build-notifier.yml)* into the new file from step #2 in your repo.

4. Replace `deploymentURL` and `notifyMessage` values with your URL and a custom message for your app.

That's it! You can confirm it's working by creating a pull request and waiting a moment for the bot to comment. 

## Issues/Comments

If you experience any problems getting this bot working, open an issue and I'll get back with you.

## License

[ISC](LICENSE) © 2018 Ryan Miller <ryan@devopsmachine.com>.

Logo provided by [icons8](https://icons8.com) under [CC BY-ND 3.0](https://icons8.com/license/).
