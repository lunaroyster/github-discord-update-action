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
  if (res.status >= 400) {
    throw new Error(`Webhook returned HTTP ${res.status}: ${JSON.stringify(await res.json())}`)
  }
  return res;
}

async function helloworld(webhook) {
  await discord(webhook, {
    content: "hello world",
  });
  console.log(`Posted hello world message.`);
}

async function debug(webhook) {
  await discord(webhook, {
    content: JSON.stringify(github.context),
  });
  console.log(`Posted debug message.`);
}

async function pushEvent(webhook) {
  const { payload } = github.context;
  await discord(webhook, {
    embeds: [
      {
        title: `${payload.commits.length} commit(s) on ${payload.ref.split('/').slice(2).join('/')}`,
        url: `${payload.compare}`,
        author: {
          name: `${payload.sender.login}`,
          url: `${payload.sender.html_url}`,
          icon_url: `${payload.sender.avatar_url}`
        },
        description: payload.commits.map(c => `[[${c.id.slice(0,7)}](${c.url})] ${c.message}`).join('\n'),
      }
    ],
  });
  console.log(`Posted pushEvent notification`);
}

async function main() {
  try {
    const discordWebhook = core.getInput('discordwebhook');
    await pushEvent(discordWebhook);
  } catch (e) {
    console.log(e);
    core.setFailed(e.message);
  }
}

main();