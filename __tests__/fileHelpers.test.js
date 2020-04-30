const fs = require('fs');
const { getFileContentsAsString, fileContentsToBase64 } = require('../src/fileHelpers');

jest.mock('fs');

describe('getFileContentsAsString', () => {
    test('should return the contents of the file', () => {
        fs.__setResult('Contents of the file');
        const result = getFileContentsAsString('testFile.js');
        expect(result).toEqual('Contents of the file')
    });

    test('should throw an error if the file cannot be read or doesn\'t exist', () => {
        fs.__setResult(null);
        expect(() => getFileContentsAsString('testFile.js')).toThrow('error');
    });
});

describe('fileContentsToBase64', () => {
    test('should return the correct base64 encoded string', () => {
        const result = fileContentsToBase64('convert this please');
        expect(result).toEqual('Y29udmVydCB0aGlzIHBsZWFzZQ==');
    });
});