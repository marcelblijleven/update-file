const core = require('@actions/core');
const github = require('@actions/github');
const fileHelpers = require('./src/fileHelpers');

async function executeAction() {
    try {
        const token = core.getInput('token');
        const file = core.getInput('file');
        const branch = core.getInput('branch');
        const message = core.getInput('message');
        const committerName = core.getInput('commiter_name');
        const committerEmail = core.getInput('commiter_email');

        // Prepare file
        const fileContents = fileHelpers.getFileContentsAsString(file);
        const encodedContents = fileHelpers.fileContentsToBase64(fileContents);
        
        // Prepare API
        const octokit = new github.GitHub(token);
        const owner = github.context.repo.owner;
        const repo = github.context.repo.repo;

        const getContentsParams = { owner: owner, path: file, repo: repo, }

        if (branch.length > 0) {
            getContentsParams.branch = branch;
        }

        const getResult = await octokit.repos.getContents(getContentsParams);
        
        const createOrUpdateFileParams = {
            committer: { email: committerEmail, name: committerName },
            content: encodedContents,
            message: message,
            owner: owner,
            path: file,
            repo: repo,
            sha: getResult.data.sha
        }

        if (branch.length > 0) {
            createOrUpdateFileParams.branch = branch;
        }
        
        const updateResult = await octokit.repos.createOrUpdateFile(createOrUpdateFileParams);
        core.setOutput('sha', updateResult.data.commit.sha);
    } catch (error) {
        core.setFailed(error.message);
    }
}

executeAction();
