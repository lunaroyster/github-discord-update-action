# github-discord-update-action

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
