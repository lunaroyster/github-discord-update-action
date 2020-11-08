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

async function helloworld(webhook) {
  await discord(webhook, {
    content: "hello world",
  });
  console.log(`Posted debug message.`);
}

async function debug(webhook) {
  await discord(webhook, {
    content: JSON.stringify(github.context),
  });
  console.log(`Posted debug message.`);
}

async function pushEvent(webhook) {
  const { payload } = github.context;
  console.log(payload)
  await discord(webhook, {
    embeds: [
      {
        title: `${payload.commits.length} commit(s) on main`,
        author: {
          name: `${payload.sender.login}`,
          url: `${payload.sender.html_url}`,
          icon_url: `${payload.sender.avatar_url}`
        },
        description: payload.commits.join(c => `[[${c.id}](${c.url})] ${c.message}`)
      }
    ],
  });
  console.log(`Posted debug message.`);
}

async function main() {
  try {
    const discordWebhook = core.getInput('discordwebhook');
    console.log(`Using ${discordWebhook}`);
    await pushEvent(discordWebhook);
  } catch (e) {
    console.log(e);
    core.setFailed(e.message);
  }
}

main();