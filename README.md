# update-file action

This action updates the provided file through the Github api.

## Inputs

### `token`

**Required** Token to authenticate with.
This can be `${{ secrets.GITHUB_TOKEN }} or a personal access token

### `file`

**Required** File to update

### `commiter_name`

**Required** Name of the committer

### `committer_email`

**Required** Email of the committer

### `message`

**Required** The commit message

### `branch`

Optional name of the branch to act on

## Outputs

### `sha`

The sha of the updated file

## Example usage

uses: marcelblijleven/update-file@v1
with:
  token: ${{ secrets.PAT }}
  file: 'testFile.js'
  committer_name: 'marcel'
  committer_email: 'marcel@users.noreply.github.com'
  message: 'chore(release): bump version'
