const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function secretExists({ owner, repo, secret }) {
  try {
    const response = await octokit.request(
      {
        method: 'GET',
        url: `https://api.github.com/repos/${owner}/${repo}/actions/secrets/${secret}`
      },
      {
        headers: { 'user-agent': 'swinton/secret-exists' }
      }
    );
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    // Re-raise this error unless its a 404
    if (error.status && error.status !== 404) {
      throw error;
    }
  }
  // Secret was not found, return false
  return false;
}
module.exports = secretExists;
