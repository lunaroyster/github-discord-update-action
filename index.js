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
  const context = github.context;
  await discord(webhook, {
    embeds: [
      {
        title: `${context.payload.commits.length} commit(s) on main`,
        author: {
          name: `${context.sender.login}`,
          url: `${context.sender.html_url}`,
          icon_url: `${context.sender.avatar_url}`
        },
        description: context.payload.commits.join(c => `[[${c.id}](${c.url})] ${c.message}`)
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