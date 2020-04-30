const fs = jest.genMockFromModule('fs');

let result = null;

function __setResult(message) {
    result = message;
}

function readFileSync(fileName, options) {
}

readFileSync = jest.fn(() => {
    if (result) {
        return result;
    }

    throw new Error('error');
})

fs.__setResult = __setResult;
fs.readFileSync = readFileSync;

module.exports = fs;