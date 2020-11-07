const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

async function discord(webhook, args) {
  try {
    const res = await fetch(webhook, {
      method: 'POST',
      body: JSON.stringify({
        username: 'GitHub',
        avatar_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        ...args,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return res;
  } catch (e) {
    console.log(e)
  }
}

async function debug(webhook) {
  await discord(webhook, {
    content: JSON.stringify(github),
  })
}

async function main() {
  try {
    const discordWebhook = core.getInput('discord-webhook');
    await debug(discordWebhook);
  } catch (e) {
    core.setFailed(e.message);
  }
}

main();