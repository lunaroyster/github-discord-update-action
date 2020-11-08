# github-discord-update-action

This creates discord notifications upon GitHub events.

It's a [JavaScript action](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/about-actions) so it runs super fast.
## Usage

Place this file at `.github/workflows/discord.yml`

```yaml
name: Discord Notification
on:
  push:
    branches: '**'

jobs:
  notification:
    runs-on: ubuntu-latest
    steps:
      - name: Discord action
        uses: lunaroyster/github-discord-update-action@master
        with:
          discordwebhook: <your discord webhook here>

```
