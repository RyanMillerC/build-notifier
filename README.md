# build-notifier :robot:

> A GitHub App built with [Probot](https://github.com/probot/probot) that comments on new pull requests with a link to the compiled PR. It is available [here](https://github.com/apps/build-notifier).

![Screenshot](https://ryanmillerc.github.io/build-notifier/screenshot.png)

## Use Case

This bot can be used to notify users that a compiled React demo, built from the Pull Requests code-base, is available at the included URL.

### How We Use This App

Using automated deployments, we deploy all Pull Requests to an S3 bucket in a folder that is the same name as the branch to-be-merged, (Example: *http://my-app.s3-website-us-east-1.amazonaws.com/feature_branch_1*). This allows anyone on the team to easily review the potential changes in their browser without the need to use `npm` to compile the code. This bot makes it easy to open a PR, click the generated link, and review any changes.

## Setup

1. Enable this GitHub App for your repo [here](https://github.com/apps/build-notifier).

2. Create the file, `.github/build-notifier.yml`, in your repo.

3. Copy the contents of `sample/build-notifier.yml` from this repo into the new file from step #2, replacing `deploymentURL` and `notifyMessage` with a URL and message for your app.

That's it! You can confirm it's working by creating a pull request and waiting a moment for the bot to comment.

## Self-hosting

To install the app on your own server, clone this repo, then:

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Contributing

If you have suggestions for how build-notifier could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2018 Ryan Miller <ryan@devopsmachine.com>
