const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

async function discord(webhook, args) {
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
  console.log(res);
  return res;
}

async function debug(webhook) {
  await discord(webhook, {
    content: JSON.stringify(github),
  });
  console.log(`Posted debug message.`);
}

async function main() {
  try {
    const discordWebhook = core.getInput('discordwebhook');
    console.log(`Using ${discordWebhook}`);
    await debug(discordWebhook);
  } catch (e) {
    console.log(e);
    core.setFailed(e.message);
  }
}

main();