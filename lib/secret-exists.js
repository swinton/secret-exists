const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function secretExists({owner, repo, secret}) {
  try {
    const response = await octokit.request({
      method: 'GET',
      url: `https://api.github.com/repos/${ owner }/${ repo }/actions/secrets/${ secret }`
    })
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

if (require.main === module) {
  (async () => {
    const secret = 'FOO';
    const exists = await secretExists({owner: 'swinton', repo: 'actions-playground', secret});
    console.log(`${secret} exists? ${exists}.`);
  })();
}
