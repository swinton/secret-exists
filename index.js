const core = require('@actions/core');

const secretExists = require('./lib/secret-exists');

async function run() {
  try {
    const secret = core.getInput('secret-name');
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
    const exists = await secretExists({ owner, repo, secret });
    core.setOutput('exists', exists ? 'true' : 'false');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
